"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SplitText from "@/components/animations/SplitText";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/courses";
import { goals, interests, majors } from "@/data/majors";
import { opportunities } from "@/data/opportunities";
import { resources } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { calculateMatchScore, getLocal, setLocal } from "@/lib/utils";

export default function Onboarding() {
  const router = useRouter();
  const { lang, t } = useTranslation();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(() =>
    getLocal<UserProfile>("current-user", {
      id: "student",
      name: "",
      email: "",
      role: "student",
      grade: "10",
      country: "Kazakhstan",
      language: "ru",
      major: "economics",
      interests: [],
      goals: [],
    }),
  );

  const copy = useMemo(
    () =>
      ({
        en: {
          russian: "Russian",
          kazakh: "Kazakh",
          other: "Other",
          summary:
            "Profile: {major}. In your first 30 days, focus on one lesson, one saved opportunity, one resource pack and one portfolio update.",
        },
        ru: {
          russian: "Русский",
          kazakh: "Қазақша",
          other: "Другая страна",
          summary:
            "Профиль: {major}. В первые 30 дней сфокусируйтесь на одном уроке, одной сохраненной возможности, одном наборе ресурсов и одном обновлении портфолио.",
        },
        kk: {
          russian: "Орысша",
          kazakh: "Қазақша",
          other: "Басқа ел",
          summary:
            "Профиль: {major}. Алғашқы 30 күнде бір сабаққа, бір сақталған мүмкіндікке, бір ресурс жинағына және бір портфолио жаңартуына назар аударыңыз.",
        },
      })[lang],
    [lang],
  );

  const toggle = (key: "interests" | "goals", value: string) =>
    setProfile((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));

  const finish = () => {
    setLocal("current-user", profile);
    setLocal("student-profile", profile);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <SplitText
            tag="h1"
            text={t("onboardingTitle")}
            splitType="words"
            delay={70}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            className="display text-4xl font-black uppercase"
            textAlign="left"
          />
          <div className="mt-4">
            <Progress value={(step / 5) * 100} />
          </div>
        </div>

        <Card>
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                value={profile.name}
                onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                placeholder={t("fullName")}
              />
              <Select
                value={profile.grade}
                onChange={(event) => setProfile({ ...profile, grade: event.target.value as UserProfile["grade"] })}
              >
                {["8", "9", "10", "11", "12", "Gap Year"].map((grade) => (
                  <option key={grade} value={grade}>
                    {t("grade")} {grade}
                  </option>
                ))}
              </Select>
              <Select
                value={profile.country}
                onChange={(event) => setProfile({ ...profile, country: event.target.value })}
              >
                <option>Kazakhstan</option>
                <option>{copy.other}</option>
              </Select>
              <Select
                value={profile.language}
                onChange={(event) =>
                  setProfile({ ...profile, language: event.target.value as UserProfile["language"] })
                }
              >
                <option value="ru">{copy.russian}</option>
                <option value="en">English</option>
                <option value="kk">{copy.kazakh}</option>
              </Select>
            </div>
          )}

          {step === 2 && (
            <Grid
              items={majors.map((major) => major.title)}
              selected={[majors.find((major) => major.id === profile.major)?.title || ""]}
              onPick={(title) =>
                setProfile({
                  ...profile,
                  major: majors.find((major) => major.title === title)?.id || "economics",
                })
              }
            />
          )}

          {step === 3 && (
            <Grid items={interests} selected={profile.interests} onPick={(value) => toggle("interests", value)} multi />
          )}

          {step === 4 && (
            <Grid items={goals} selected={profile.goals} onPick={(value) => toggle("goals", value)} multi />
          )}

          {step === 5 && (
            <div className="space-y-5">
              <CardTitle>{t("generatedProfile")}</CardTitle>
              <p className="text-slate-300">
                {copy.summary.replace(
                  "{major}",
                  majors.find((major) => major.id === profile.major)?.title || profile.major || "economics",
                )}
              </p>
              <Preview
                title={t("recommendedCourses")}
                items={courses
                  .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
                  .slice(0, 3)
                  .map((course) => course.title)}
              />
              <Preview
                title={t("recommendedOpportunities")}
                items={opportunities
                  .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
                  .slice(0, 3)
                  .map((opportunity) => opportunity.title)}
              />
              <Preview
                title={t("recommendedResources")}
                items={resources
                  .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a))
                  .slice(0, 3)
                  .map((resource) => resource.title)}
              />
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" disabled={step === 1} onClick={() => setStep((current) => current - 1)}>
              {t("back")}
            </Button>
            {step < 5 ? (
              <Button onClick={() => setStep((current) => current + 1)}>{t("next")}</Button>
            ) : (
              <Button onClick={finish}>{t("openDashboard")}</Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}

function Grid({
  items,
  selected,
  onPick,
  multi,
}: {
  items: string[];
  selected: string[];
  onPick: (value: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPick(item)}
          className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
            selected.includes(item)
              ? "border-[#93CFDB] bg-[#93CFDB]/15 text-white"
              : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10"
          }`}
        >
          {item}
          {multi && selected.includes(item) && <span className="ml-2 text-[#93CFDB]">+</span>}
        </button>
      ))}
    </div>
  );
}

function Preview({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
