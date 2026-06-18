"use client";

import { useMemo, useState } from "react";
import ShinyText from "@/components/animations/ShinyText";
import SplitText from "@/components/animations/SplitText";
import { MentoriaAssistantPanel } from "@/components/ai/MentoriaAssistantPanel";
import { CourseRoadmap } from "@/components/courses/CourseRoadmap";
import { PublicNav } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { courseRoadmaps } from "@/data/courseRoadmaps";
import { courses as base } from "@/data/courses";
import { useTranslation } from "@/lib/i18n";
import { Course, UserProfile } from "@/lib/types";
import { calculateMatchScore, getLocal } from "@/lib/utils";

export default function CoursesPage() {
  const { lang } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal<UserProfile | null>("current-user", null));
  const [courses] = useState<Course[]>(() => [...base, ...getLocal<Course[]>("admin-courses", [])]);
  const [selectedCourseId, setSelectedCourseId] = useState("sat-math");
  const selectedCourse = courses.find((course) => course.id === selectedCourseId) || courses[0];

  const copy = useMemo(
    () =>
      ({
        en: {
          badge: "Mentoria course paths",
          title: "Practice through guided learning paths",
          intro:
            "Courses now use sections, nodes, readings, questions, flashcards and progress checkpoints instead of static completion cards.",
          progressLine: "progress updates after questions, readings and practice.",
          roadmapSoon: "Roadmap coming soon",
          roadmapSoonBody: "This course is still using the standard lesson set.",
        },
        ru: {
          badge: "Треки курсов Mentoria",
          title: "Практикуйтесь через структурированные учебные треки",
          intro:
            "Курсы теперь используют секции, узлы, чтение, вопросы, флешкарты и checkpoints прогресса вместо статичных карточек завершения.",
          progressLine: "прогресс обновляется после вопросов, чтения и практики.",
          roadmapSoon: "Roadmap скоро появится",
          roadmapSoonBody: "Этот курс пока использует стандартный набор уроков.",
        },
        kk: {
          badge: "Mentoria курс тректері",
          title: "Құрылымды оқу жолдары арқылы практика жасаңыз",
          intro:
            "Курстар енді статикалық аяқталу карталарының орнына бөлімдер, түйіндер, оқу, сұрақтар, флешкарталар және прогресс checkpoints қолданады.",
          progressLine: "прогресс сұрақ, оқу және практикадан кейін жаңарады.",
          roadmapSoon: "Roadmap жақында қосылады",
          roadmapSoonBody: "Бұл курс әзірге стандартты сабақ жинағын қолданады.",
        },
      })[lang],
    [lang],
  );

  return (
    <div className="min-h-screen bg-[#07111F] text-white">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <ShinyText
          text={copy.badge}
          speed={2.5}
          color="#86BCDE"
          shineColor="#F8FAFC"
          spread={120}
          className="text-sm font-semibold uppercase tracking-[0.2em]"
        />
        <SplitText
          tag="h1"
          text={copy.title}
          splitType="words"
          delay={70}
          duration={0.8}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          className="display mt-3 text-5xl font-black uppercase"
          textAlign="left"
        />
        <p className="mt-3 max-w-3xl text-slate-300">{copy.intro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-4">
            {courses
              .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
              .map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedCourseId === course.id
                      ? "border-[#94CFDB] bg-white/10"
                      : "border-[#324E60] bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge>{course.level}</Badge>
                      <CardTitle className="mt-3">{course.title}</CardTitle>
                    </div>
                    <span className="text-sm font-bold text-[#94CFDB]">
                      {calculateMatchScore(profile, course)}%
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{course.description}</p>
                </button>
              ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardTitle>{selectedCourse.title}</CardTitle>
              <p className="mt-2 text-sm text-slate-400">
                {selectedCourse.duration} · {copy.progressLine}
              </p>
            </Card>
            {courseRoadmaps[selectedCourseId] ? (
              <CourseRoadmap sections={courseRoadmaps[selectedCourseId]} />
            ) : (
              <Card>
                <CardTitle>{copy.roadmapSoon}</CardTitle>
                <p className="mt-2 text-slate-400">{copy.roadmapSoonBody}</p>
              </Card>
            )}
            <MentoriaAssistantPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
