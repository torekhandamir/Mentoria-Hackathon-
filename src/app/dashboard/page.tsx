"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import ShinyText from "@/components/animations/ShinyText";
import { MentoriaAssistantPanel } from "@/components/ai/MentoriaAssistantPanel";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { activities } from "@/data/activities";
import { courses } from "@/data/courses";
import { externalResources } from "@/data/externalResources";
import { majors } from "@/data/majors";
import { opportunities } from "@/data/opportunities";
import { resources } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import {
  calculateMatchScore,
  getLocal,
  getPracticeSummary,
  levelFromXp,
  recordActivity,
} from "@/lib/utils";

export default function Dashboard() {
  const { lang, t } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal<UserProfile | null>("current-user", null));
  const [savedOpps] = useState<string[]>(() => getLocal("saved-opportunities", []));
  const [savedResources] = useState<string[]>(() => getLocal("saved-resources", []));
  const [completed] = useState<string[]>(() => getLocal("completed-lessons", []));
  const [doneActivities, setDoneActivities] = useState<string[]>(() => getLocal("completed-activities", []));
  const [xp, setXp] = useState<number>(() => getLocal("student-xp", 0));
  const [streak, setStreak] = useState<number>(() => getLocal("student-streak", 0));

  const copy = useMemo(
    () =>
      ({
        en: {
          fallbackName: "student",
          nextOpportunity: "Your next opportunity is waiting.",
          chooseMajor: "Choose major",
          dayStreak: "day streak",
          completedLabel: "completed",
          xpTotal: "XP total",
          tasksCompleted: "tasks completed",
          dailyTaskToast: "Daily task complete",
          practiceRecommendation: "SAT Math and Economics drills",
          weakTopics: ["Linear Functions", "Elasticity"],
          weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          trackerIntro: "Saved opportunities, deadline review and portfolio tasks appear here.",
        },
        ru: {
          fallbackName: "студент",
          nextOpportunity: "Следующая возможность уже ждет вас.",
          chooseMajor: "Выберите направление",
          dayStreak: "дней стрика",
          completedLabel: "выполнено",
          xpTotal: "XP всего",
          tasksCompleted: "задач выполнено",
          dailyTaskToast: "Задача дня выполнена",
          practiceRecommendation: "SAT Math и задачи по экономике",
          weakTopics: ["Линейные функции", "Эластичность"],
          weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          trackerIntro: "Здесь отображаются сохраненные возможности, дедлайны и задачи по портфолио.",
        },
        kk: {
          fallbackName: "студент",
          nextOpportunity: "Келесі мүмкіндік сізді күтіп тұр.",
          chooseMajor: "Бағыт таңдаңыз",
          dayStreak: "күндік стрик",
          completedLabel: "аяқталды",
          xpTotal: "XP барлығы",
          tasksCompleted: "тапсырма орындалды",
          dailyTaskToast: "Күндік тапсырма орындалды",
          practiceRecommendation: "SAT Math және экономика тапсырмалары",
          weakTopics: ["Сызықтық функциялар", "Икемділік"],
          weekdays: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"],
          trackerIntro: "Мұнда сақталған мүмкіндіктер, дедлайндар және портфолио тапсырмалары көрсетіледі.",
        },
      })[lang],
    [lang],
  );

  const feed = getLocal<{ title: string; date: string; xp: number }[]>("activity-feed", []);
  const allResources = [...resources, ...externalResources];
  const dailyTasks = activities
    .filter((activity) => !profile?.major || activity.majorTargets.includes(profile.major))
    .slice(0, 5);
  const dailyPercent = dailyTasks.length
    ? Math.round(
        (dailyTasks.filter((activity) => doneActivities.includes(activity.id)).length / dailyTasks.length) * 100,
      )
    : 0;
  const recommendedOpps = [...opportunities]
    .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
    .slice(0, 3);
  const recommendedResources = [...allResources]
    .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
    .slice(0, 4);
  const practiceSummary = useMemo(() => getPracticeSummary(), []);

  const completeTask = (id: string) => {
    const task = activities.find((activity) => activity.id === id);
    if (!task) return;
    if (recordActivity(task)) {
      setDoneActivities(getLocal("completed-activities", []));
      setXp(getLocal("student-xp", 0));
      setStreak(getLocal("student-streak", 0));
      toast.success(`${copy.dailyTaskToast} +${task.xp} XP`);
    }
  };

  return (
    <AppShell>
      <h1 className="display text-4xl font-black uppercase">{t("dashboardTitle")}</h1>
      <Card className="mt-6">
        <ShinyText
          text={`${t("welcomeBackTitle")}, ${profile?.name || copy.fallbackName}`}
          speed={2.5}
          color="#86BCDE"
          shineColor="#F8FAFC"
          className="text-sm font-semibold uppercase tracking-[0.2em]"
        />
        <CardTitle className="mt-3">
          {profile?.name || copy.fallbackName}. {copy.nextOpportunity}
        </CardTitle>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>
            {t("grade")} {profile?.grade || "10"}
          </Badge>
          <Badge>
            {majors.find((major) => major.id === profile?.major)?.title || copy.chooseMajor}
          </Badge>
          <Badge>{levelFromXp(xp)}</Badge>
          <Badge>
            {streak} {copy.dayStreak}
          </Badge>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <Stat label={t("savedOpportunitiesLabel")} value={savedOpps.length} />
        <Stat label={t("activeCourses")} value={courses.length} />
        <Stat label={t("lessonsCompleted")} value={completed.length} />
        <Stat label={t("xpEarned")} value={xp} />
        <Stat label={t("savedResourcesLabel")} value={savedResources.length} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <CardTitle>{t("dailyProgress")}</CardTitle>
          <div className="mt-4">
            <Progress value={dailyPercent} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <span>
              {dailyPercent}% {copy.completedLabel}
            </span>
            <span>
              {xp} {copy.xpTotal}
            </span>
            <span>
              {streak} {copy.dayStreak}
            </span>
            <span>
              {doneActivities.length} {copy.tasksCompleted}
            </span>
          </div>
        </Card>
        <Card>
          <CardTitle>{t("todayChecklist")}</CardTitle>
          <div className="mt-4 space-y-3">
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#324E60] p-3"
              >
                <div>
                  <b>{task.title}</b>
                  <p className="text-xs text-slate-400">
                    {task.type} · +{task.xp} XP
                  </p>
                </div>
                <Button
                  variant={doneActivities.includes(task.id) ? "secondary" : "default"}
                  onClick={() => completeTask(task.id)}
                >
                  {doneActivities.includes(task.id) ? t("done") : t("complete")}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardTitle>{t("recommendedForYou")}</CardTitle>
          <div className="mt-4 space-y-3">
            {recommendedOpps.map((opportunity) => (
              <div key={opportunity.id} className="rounded-xl border border-[#324E60] p-3">
                <div className="flex justify-between gap-3">
                  <b>{opportunity.title}</b>
                  <span className="text-[#94CFDB]">{calculateMatchScore(profile, opportunity)}%</span>
                </div>
                <p className="text-sm text-slate-400">
                  {opportunity.deadlineLabel || opportunity.deadline} · {opportunity.category}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>{t("continuePractice")}</CardTitle>
          <div className="mt-4 space-y-4">
            {courses.slice(0, 4).map((course) => {
              const done = course.lessons.filter((lesson) => completed.includes(lesson.id)).length;
              return (
                <div key={course.id}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{course.title}</span>
                    <span>
                      {done}/{course.lessons.length}
                    </span>
                  </div>
                  <Progress value={(done / course.lessons.length) * 100} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle>{t("practiceStats")}</CardTitle>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>
              {t("questionsAnsweredToday")}:{" "}
              {practiceSummary.answeredToday || practiceSummary.totalAnswered}
            </p>
            <p>
              {t("averageScore")}: {practiceSummary.averageScore}%
            </p>
            <p>
              {t("recommendedNextPractice")}: {copy.practiceRecommendation}
            </p>
          </div>
        </Card>
        <Card>
          <CardTitle>{t("weakTopics")}</CardTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {(practiceSummary.weakTopics.length ? practiceSummary.weakTopics : copy.weakTopics).map((topic) => (
              <Badge key={topic}>{topic}</Badge>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>{t("upcomingDeadlines")}</CardTitle>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {recommendedOpps.map((opportunity) => (
              <p key={opportunity.id}>
                {opportunity.title} · {opportunity.deadlineLabel || opportunity.deadline}
              </p>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle>{t("recentActivity")}</CardTitle>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {feed.length ? (
              feed.map((item) => (
                <p key={`${item.title}-${item.date}`}>
                  {item.title} <span className="text-[#94CFDB]">+{item.xp} XP</span>
                </p>
              ))
            ) : (
              <p>{t("noActivityYet")}</p>
            )}
          </div>
        </Card>
        <Card>
          <CardTitle>{t("economicsResources")}</CardTitle>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {recommendedResources.map((resource) => (
              <p key={resource.id}>{resource.title}</p>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>{t("weeklyProgress")}</CardTitle>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
            {copy.weekdays.map((day, index) => (
              <div key={day} className="rounded-xl border border-[#324E60] p-2">
                <b>{day}</b>
                <p className="mt-2 text-[#94CFDB]">{Math.max(0, doneActivities.length - index)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <MentoriaAssistantPanel />
        <Card>
          <CardTitle>{t("applicationTracker")}</CardTitle>
          <p className="mt-3 text-sm text-slate-400">{copy.trackerIntro}</p>
          <div className="mt-4 space-y-2 text-sm">
            {opportunities
              .filter((opportunity) => savedOpps.includes(opportunity.id))
              .map((opportunity) => (
                <p key={opportunity.id}>
                  {opportunity.title} · {opportunity.deadlineLabel || opportunity.deadline}
                </p>
              ))}
            {!savedOpps.length && <p>{t("noSavedApplications")}</p>}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/opportunities">
          <Button>{t("findOpportunities")}</Button>
        </Link>
        <Link href="/courses">
          <Button variant="outline">{t("continueCourse")}</Button>
        </Link>
        <Link href="/resources">
          <Button variant="secondary">{t("openResourceLibrary")}</Button>
        </Link>
        <Link href="/activities">
          <Button variant="ghost">{t("openActivities")}</Button>
        </Link>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <div className="text-3xl font-black">{value}</div>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </Card>
  );
}
