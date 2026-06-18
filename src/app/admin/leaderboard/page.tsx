"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { majors } from "@/data/majors";
import { mockUsers } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";
import { getLocal } from "@/lib/utils";

export default function LeaderboardPage() {
  const { lang, t } = useTranslation();
  const [major, setMajor] = useState("All");
  const [grade, setGrade] = useState("All");
  const [period, setPeriod] = useState("All time");
  const current = getLocal("current-user", null) as { name?: string; grade?: string; major?: string } | null;
  const copy = useMemo(
    () =>
      ({
        en: {
          all: "All",
          today: "Today",
          week: "Week",
          month: "Month",
          allTime: "All time",
          days: "days",
          major: "Major",
          streak: "Streak",
          tasks: "Tasks",
          saved: "Saved",
          topMajor: "Economics",
          topCourse: "Introduction to Economics",
        },
        ru: {
          all: "Все",
          today: "Сегодня",
          week: "Неделя",
          month: "Месяц",
          allTime: "Все время",
          days: "дней",
          major: "Направление",
          streak: "Стрик",
          tasks: "Задачи",
          saved: "Сохранено",
          topMajor: "Economics",
          topCourse: "Introduction to Economics",
        },
        kk: {
          all: "Барлығы",
          today: "Бүгін",
          week: "Апта",
          month: "Ай",
          allTime: "Барлық уақыт",
          days: "күн",
          major: "Бағыт",
          streak: "Стрик",
          tasks: "Тапсырмалар",
          saved: "Сақталған",
          topMajor: "Economics",
          topCourse: "Introduction to Economics",
        },
      })[lang],
    [lang],
  );

  const rows = useMemo(
    () =>
      [
        ...mockUsers,
        ...(current?.name
          ? [
              {
                ...mockUsers[0],
                id: "current-local",
                name: current.name,
                grade: current.grade || "10",
                major: current.major || "economics",
              },
            ]
          : []),
      ]
        .filter((user) => major === "All" || user.major === major)
        .filter((user) => grade === "All" || user.grade === grade)
        .map((user, index) => ({
          ...user,
          xp: 860 - index * 95 + (user.id === "current-local" ? getLocal<number>("student-xp", 0) : 0),
          streak: 7 - index,
          questions: 42 - index * 5,
          averageScore: 91 - index * 6,
          tasks: 18 - index * 2,
          saved: 6 - index,
          progress: 88 - index * 10,
          period,
        }))
        .sort((a, b) => b.xp - a.xp),
    [current, grade, major, period],
  );

  return (
    <AppShell admin>
      <h1 className="display text-4xl font-black uppercase">{t("studentLeaderboard")}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardTitle>{t("topStudent")}</CardTitle>
          <p className="mt-2 text-[#94CFDB]">{rows[0]?.name}</p>
        </Card>
        <Card>
          <CardTitle>{t("highestStreak")}</CardTitle>
          <p className="mt-2 text-[#94CFDB]">
            {rows[0]?.streak} {copy.days}
          </p>
        </Card>
        <Card>
          <CardTitle>{t("mostActiveMajor")}</CardTitle>
          <p className="mt-2 text-[#94CFDB]">{major === "All" ? copy.topMajor : major}</p>
        </Card>
        <Card>
          <CardTitle>{t("mostCompletedCourse")}</CardTitle>
          <p className="mt-2 text-[#94CFDB]">{copy.topCourse}</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Select value={major} onChange={(event) => setMajor(event.target.value)}>
          <option value="All">{copy.all}</option>
          {majors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select value={grade} onChange={(event) => setGrade(event.target.value)}>
          <option value="All">{copy.all}</option>
          {["8", "9", "10", "11", "12", "Gap Year"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select value={period} onChange={(event) => setPeriod(event.target.value)}>
          <option>{copy.today}</option>
          <option>{copy.week}</option>
          <option>{copy.month}</option>
          <option>{copy.allTime}</option>
        </Select>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#324E60]">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-[#07111F] text-slate-300">
            <tr>
              {[
                t("rank"),
                t("studentRole"),
                t("grade"),
                copy.major,
                "XP",
                copy.streak,
                t("questions"),
                t("averageScore"),
                copy.tasks,
                copy.saved,
                t("progress"),
              ].map((heading) => (
                <th key={heading} className="p-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((user, index) => (
              <tr key={user.id} className="border-t border-[#324E60]">
                <td className="p-3">
                  <Badge>#{index + 1}</Badge>
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.grade}</td>
                <td className="p-3">{user.major}</td>
                <td className="p-3">{user.xp}</td>
                <td className="p-3">{user.streak}</td>
                <td className="p-3">{user.questions}</td>
                <td className="p-3">{user.averageScore}%</td>
                <td className="p-3">{user.tasks}</td>
                <td className="p-3">{user.saved}</td>
                <td className="p-3">{user.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
