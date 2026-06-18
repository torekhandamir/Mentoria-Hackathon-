"use client";

import { useMemo, useState } from "react";
import ShinyText from "@/components/animations/ShinyText";
import SplitText from "@/components/animations/SplitText";
import { OpportunityCard } from "@/components/features/cards";
import { AppShell, PublicNav } from "@/components/layout/nav";
import { Badge } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { majors } from "@/data/majors";
import { opportunities as base } from "@/data/opportunities";
import { useTranslation } from "@/lib/i18n";
import { Opportunity, UserProfile } from "@/lib/types";
import { calculateMatchScore, getLocal, urgency } from "@/lib/utils";

export default function OpportunitiesPage() {
  const { lang, t } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal<UserProfile | null>("current-user", null));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [major, setMajor] = useState("All");
  const [format, setFormat] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [deadline, setDeadline] = useState("All");
  const [items] = useState<Opportunity[]>(() => [...base, ...getLocal<Opportunity[]>("admin-opportunities", [])]);
  const copy =
    lang === "ru"
      ? {
          subtitle: "Возможности Mentoria",
          all: "Все",
          urgent: "Срочно",
          soon: "Скоро",
          later: "Позже",
        }
      : lang === "kk"
        ? {
            subtitle: "Mentoria мүмкіндіктері",
            all: "Барлығы",
            urgent: "Шұғыл",
            soon: "Жақында",
            later: "Кейін",
          }
        : {
            subtitle: "Mentoria opportunities",
            all: "All",
            urgent: "Urgent",
            soon: "Soon",
            later: "Later",
          };

  const filtered = useMemo(
    () =>
      items
        .filter(
          (item) =>
            (query
              ? `${item.title} ${item.description} ${item.tags.join(" ")}`
                  .toLowerCase()
                  .includes(query.toLowerCase())
              : true) &&
            (category === "All" || item.category === category) &&
            (major === "All" || item.majorTargets.includes(major)) &&
            (format === "All" || item.format === format) &&
            (difficulty === "All" || item.difficulty === difficulty) &&
            (deadline === "All" || urgency(item.deadline) === deadline),
        )
        .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a)),
    [items, query, category, major, format, difficulty, deadline, profile],
  );

  const content = (
    <>
      <ShinyText
        text={copy.subtitle}
        speed={2.5}
        color="#86BCDE"
        shineColor="#F8FAFC"
        className="text-sm font-semibold uppercase tracking-[0.2em]"
      />
      <SplitText
        tag="h1"
        text={t("opportunitiesTitle")}
        splitType="words"
        delay={70}
        duration={0.8}
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        className="display mt-3 text-5xl font-black uppercase"
        textAlign="left"
      />
      <p className="mt-3 text-slate-300">{t("opportunitiesIntro")}</p>

      <div className="mt-8 grid gap-3 md:grid-cols-6">
        <Input placeholder={t("search")} value={query} onChange={(event) => setQuery(event.target.value)} />
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="All">{copy.all}</option>
          {Array.from(new Set(items.map((item) => item.category))).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Select value={major} onChange={(event) => setMajor(event.target.value)}>
          <option value="All">{copy.all}</option>
          {majors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select value={format} onChange={(event) => setFormat(event.target.value)}>
          <option value="All">{copy.all}</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Hybrid</option>
        </Select>
        <Select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="All">{copy.all}</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </Select>
        <Select value={deadline} onChange={(event) => setDeadline(event.target.value)}>
          <option value="All">{copy.all}</option>
          <option value="urgent">{copy.urgent}</option>
          <option value="soon">{copy.soon}</option>
          <option value="later">{copy.later}</option>
        </Select>
      </div>

      <div className="mt-5">
        <Badge>
          {filtered.length} {t("results")}
        </Badge>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <OpportunityCard key={item.id} item={item} profile={profile} />
        ))}
      </div>
    </>
  );

  if (profile) {
    return <AppShell>{content}</AppShell>;
  }

  return (
    <div className="min-h-screen bg-[#07111F] text-white">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-10">{content}</main>
    </div>
  );
}
