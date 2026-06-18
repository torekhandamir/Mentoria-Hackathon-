"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/lib/i18n";
import { Course, Opportunity, Resource, UserProfile } from "@/lib/types";
import { calculateMatchScore, getLocal, setLocal } from "@/lib/utils";

export function OpportunityCard({
  item,
  profile,
}: {
  item: Opportunity;
  profile: UserProfile | null;
}) {
  const { t } = useTranslation();
  const score = calculateMatchScore(profile, item);

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{item.category}</Badge>
            {item.provider && <Badge>{item.provider}</Badge>}
            {item.sourceType && <Badge>{item.sourceType}</Badge>}
          </div>
          <CardTitle className="mt-3">{item.title}</CardTitle>
        </div>
        <span className="rounded-xl bg-[#94CFDB] px-3 py-2 text-sm font-black text-[#07111F]">
          {score}%
        </span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag} className="border-[#324E60] text-slate-200">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-auto grid gap-2 text-sm text-slate-400">
        <span>
          {t("deadline")}: {item.deadlineLabel || item.deadline || t("checkOfficialWebsite")}
        </span>
        <span>
          {item.format} · Grades {item.gradeRange} · {item.difficulty}
        </span>
        <span className="text-[#94CFDB]">
          {t("whyMatchesYou")}: {item.whyUseful || "major, tags and grade fit your profile."}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            const saved = getLocal<string[]>("saved-opportunities", []);
            setLocal("saved-opportunities", Array.from(new Set([...saved, item.id])));
            toast.success(t("saveToDashboard"));
          }}
        >
          {t("saveToDashboard")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const saved = getLocal<string[]>("calendar-opportunities", []);
            setLocal("calendar-opportunities", Array.from(new Set([...saved, item.id])));
            toast.success(t("addToCalendar"));
          }}
        >
          {t("addToCalendar")}
        </Button>
        <a href={item.applicationLink} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{t("openOfficialWebsite")}</Button>
        </a>
      </div>
    </Card>
  );
}

export function CourseCard({
  course,
  profile,
}: {
  course: Course;
  profile: UserProfile | null;
}) {
  const { t } = useTranslation();
  const completed = getLocal<string[]>("completed-lessons", []);
  const total = course.lessons.length;
  const done = course.lessons.filter((lesson) => completed.includes(lesson.id)).length;

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge>{course.level}</Badge>
          <CardTitle className="mt-3">{course.title}</CardTitle>
        </div>
        <span className="text-sm font-bold text-[#94CFDB]">{calculateMatchScore(profile, course)}%</span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{course.description}</p>
      {course.embedUrl && (
        <iframe
          className="aspect-video w-full rounded-2xl border border-[#324E60]"
          src={course.embedUrl}
          title={course.title}
          allowFullScreen
        />
      )}
      <Progress value={(done / total) * 100} />
      <p className="text-sm text-slate-400">
        {done}/{total} {t("lessonsCompleted").toLowerCase()} · {course.duration}
      </p>
      {course.sourceUrl && (
        <a
          className="text-sm font-bold text-[#94CFDB]"
          href={course.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("open")}
        </a>
      )}
      <div className="space-y-2">
        {course.lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-xl border border-[#324E60] bg-[#07111F]/50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <b className="text-white">{lesson.title}</b>
                <p className="text-xs text-slate-400">{lesson.description}</p>
                <p className="mt-2 text-xs text-slate-300">
                  Activity: video · reading · flashcards · quiz · practice task
                </p>
              </div>
              <Button
                variant={completed.includes(lesson.id) ? "secondary" : "default"}
                onClick={() => {
                  setLocal(
                    "completed-lessons",
                    Array.from(new Set([...getLocal<string[]>("completed-lessons", []), lesson.id])),
                  );
                  setLocal("student-xp", getLocal<number>("student-xp", 0) + 25);
                  toast.success("Lesson complete +25 XP");
                  location.reload();
                }}
              >
                {completed.includes(lesson.id) ? t("done") : t("complete")}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {done === total && <Badge>Certificate placeholder unlocked</Badge>}
    </Card>
  );
}

export function ResourceCard({
  item,
  profile,
}: {
  item: Resource;
  profile: UserProfile | null;
}) {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge>{item.source || item.type}</Badge>
          <CardTitle className="mt-3">{item.title}</CardTitle>
        </div>
        <span className="text-sm font-bold text-[#94CFDB]">{calculateMatchScore(profile, item)}%</span>
      </div>
      <p className="text-sm text-slate-300">{item.description}</p>
      {item.embedUrl && (
        <iframe
          className="aspect-video w-full rounded-xl border border-[#324E60]"
          src={item.embedUrl}
          title={item.title}
          allowFullScreen
        />
      )}
      <div className="flex flex-wrap gap-2">
        <Badge>{item.subject}</Badge>
        <Badge>{item.language}</Badge>
        <Badge>{item.estimatedReadingTime}</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            const saved = getLocal<string[]>("saved-resources", []);
            setLocal("saved-resources", Array.from(new Set([...saved, item.id])));
            toast.success(t("save"));
          }}
        >
          {t("save")}
        </Button>
        <a href={item.externalUrl || item.fileUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{t("open")}</Button>
        </a>
      </div>
    </Card>
  );
}
