"use client";

import { useState } from "react";
import SplitText from "@/components/animations/SplitText";
import { MentoriaAssistantPanel } from "@/components/ai/MentoriaAssistantPanel";
import { ResourceCard } from "@/components/features/cards";
import { AppShell, PublicNav } from "@/components/layout/nav";
import { CardTitle } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { externalResources } from "@/data/externalResources";
import { majors } from "@/data/majors";
import { resources as base } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";
import { Resource, UserProfile } from "@/lib/types";
import { calculateMatchScore, getLocal } from "@/lib/utils";

const ECON_PRIORITY_IDS = ["mankiw-principles-6th", "core-econ"] as const;

function prioritizeResources(items: Resource[], priorityIds: readonly string[]) {
  const priorityMap = new Map(priorityIds.map((id, index) => [id, index]));
  return [...items].sort((left, right) => {
    const leftPriority = priorityMap.get(left.id);
    const rightPriority = priorityMap.get(right.id);

    if (leftPriority !== undefined || rightPriority !== undefined) {
      if (leftPriority === undefined) return 1;
      if (rightPriority === undefined) return -1;
      return leftPriority - rightPriority;
    }

    return 0;
  });
}

export default function ResourcesPage() {
  const { lang, t } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal<UserProfile | null>("current-user", null));
  const [items] = useState<Resource[]>(() => [
    ...base,
    ...externalResources,
    ...getLocal<Resource[]>("admin-resources", []),
  ]);
  const [query, setQuery] = useState("");
  const [major, setMajor] = useState(() => getLocal<UserProfile | null>("current-user", null)?.major || "All");
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");
  const [language, setLanguage] = useState("All");
  const savedResources = getLocal<string[]>("saved-resources", []);
  const copy =
    lang === "ru"
      ? { all: "Все", searchResources: "Искать ресурсы" }
      : lang === "kk"
        ? { all: "Барлығы", searchResources: "Ресурстарды іздеу" }
        : { all: "All", searchResources: "Search resources" };

  const filtered = items
    .filter(
      (item) =>
        (query
          ? `${item.title} ${item.description} ${item.tags.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : true) &&
        (major === "All" || item.majorTargets.includes(major)) &&
        (subject === "All" || item.subject === subject) &&
        (type === "All" || item.type === type) &&
        (language === "All" || item.language === language),
    )
    .sort((a, b) => calculateMatchScore(profile, b) - calculateMatchScore(profile, a));

  const preferredMajor = major === "All" ? profile?.major : major;
  const prioritizedFiltered =
    preferredMajor === "economics" ? prioritizeResources(filtered, ECON_PRIORITY_IDS) : filtered;

  const sections = {
    forMajor: prioritizedFiltered.slice(0, 4),
    books: prioritizeResources(
      prioritizedFiltered.filter(
        (item) =>
          ["Book", "PDF", "Notes", "Guide"].includes(item.type) ||
          (preferredMajor === "economics" && item.id === "core-econ"),
      ),
      ECON_PRIORITY_IDS,
    ).slice(0, 4),
    practice: filtered.filter((item) => ["Worksheet", "Past Paper", "Checklist"].includes(item.type)).slice(0, 4),
    videos: filtered.filter((item) => item.embedUrl || item.type === "Video").slice(0, 4),
    official: filtered.filter((item) => /official|college board|ielts|bluebook/i.test(item.title)).slice(0, 4),
    essays: filtered.filter((item) => /essay|admission|ielts/i.test(item.title + item.subject)).slice(0, 4),
    research: filtered.filter((item) => /research|lumiere|polygence|pioneer/i.test(item.title + item.description)).slice(0, 4),
    social: filtered.filter((item) => /instagram|linkedin/i.test(item.title + item.description)).slice(0, 4),
    recent: [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
    saved: filtered.filter((item) => savedResources.includes(item.id)).slice(0, 4),
  };

  const content = (
    <>
      <SplitText
        tag="h1"
        text={t("resourcesTitle")}
        splitType="words"
        delay={70}
        duration={0.8}
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        className="display text-5xl font-black uppercase"
        textAlign="left"
      />
      <p className="mt-3 text-slate-300">{t("resourcesIntro")}</p>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        <Input
          placeholder={copy.searchResources}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select value={major} onChange={(event) => setMajor(event.target.value)}>
          <option value="All">{copy.all}</option>
          {majors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select value={subject} onChange={(event) => setSubject(event.target.value)}>
          <option value="All">{copy.all}</option>
          {Array.from(new Set(items.map((item) => item.subject))).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="All">{copy.all}</option>
          {Array.from(new Set(items.map((item) => item.type))).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="All">{copy.all}</option>
          {Array.from(new Set(items.map((item) => item.language))).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-10">
          <Section title={t("forYourMajor")} items={sections.forMajor} profile={profile} />
          <Section title={t("booksAndFiles")} items={sections.books} profile={profile} />
          <Section title={t("practiceBanks")} items={sections.practice} profile={profile} />
          <Section title={t("videoPlaylists")} items={sections.videos} profile={profile} />
          <Section title={t("officialTests")} items={sections.official} profile={profile} />
          <Section title={t("essayGuides")} items={sections.essays} profile={profile} />
          <Section title={t("researchPrograms")} items={sections.research} profile={profile} />
          <Section title={t("socialResources")} items={sections.social} profile={profile} />
          <Section title={t("recentlyAdded")} items={sections.recent} profile={profile} />
          <Section title={t("savedResourcesLabel")} items={sections.saved} profile={profile} />
        </div>
        <div>
          <MentoriaAssistantPanel />
        </div>
      </div>
    </>
  );

  if (profile) {
    return <AppShell>{content}</AppShell>;
  }

  return (
    <div className="min-h-screen bg-[#0F1621] text-white">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-10">{content}</main>
    </div>
  );
}

function Section({
  title,
  items,
  profile,
}: {
  title: string;
  items: Resource[];
  profile: UserProfile | null;
}) {
  if (!items.length) return null;

  return (
    <section>
      <CardTitle>{title}</CardTitle>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <ResourceCard key={item.id} item={item} profile={profile} />
        ))}
      </div>
    </section>
  );
}
