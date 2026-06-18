"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PublicNav } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { demoMentor, demoStudent } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";
import { Role, UserProfile } from "@/lib/types";
import { setLocal } from "@/lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const { lang, t } = useTranslation();
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState<UserProfile["grade"]>("10");
  const [country, setCountry] = useState("Kazakhstan");
  const [language, setLanguage] = useState<UserProfile["language"]>("ru");
  const [expertise, setExpertise] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState("English, Russian");

  const copy = useMemo(
    () =>
      ({
        en: { russian: "Russian", kazakh: "Kazakh", newUser: "New User", adminName: "Admin" },
        ru: { russian: "Русский", kazakh: "Қазақша", newUser: "Новый пользователь", adminName: "Админ" },
        kk: { russian: "Орысша", kazakh: "Қазақша", newUser: "Жаңа қолданушы", adminName: "Әкімші" },
      })[lang],
    [lang],
  );

  const login = (user: UserProfile) => {
    setLocal("current-user", user);
    setLocal("mentoria-lang", user.language || "ru");
    router.push(
      user.role === "admin"
        ? "/admin"
        : user.role === "mentor"
          ? "/mentor"
          : user.major
            ? "/dashboard"
            : "/onboarding",
    );
  };

  return (
    <div className="min-h-screen bg-[#0F1621] text-white">
      <PublicNav />
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1fr_440px]">
        <div className="flex flex-col justify-center">
          <h1 className="display text-5xl font-black uppercase leading-none md:text-7xl">
            {t("authTitle")}
            <span className="text-[#94CFDB]">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{t("authIntro")}</p>
        </div>

        <Card>
          <CardTitle>{t("signIn")}</CardTitle>
          <div className="mt-5 space-y-3">
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={t("fullName")} />
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("email")} />
            <Input type="password" placeholder={t("password")} />
            <Select value={role} onChange={(event) => setRole(event.target.value as Role)}>
              <option value="student">{t("studentRole")}</option>
              <option value="mentor">{t("mentorRole")}</option>
              <option value="admin">{t("adminRole")}</option>
            </Select>

            {role === "student" && (
              <>
                <Select value={grade} onChange={(event) => setGrade(event.target.value as UserProfile["grade"])}>
                  {["8", "9", "10", "11", "12", "Gap Year"].map((item) => (
                    <option key={item} value={item}>
                      {t("grade")} {item}
                    </option>
                  ))}
                </Select>
                <Input value={country} onChange={(event) => setCountry(event.target.value)} placeholder={t("country")} />
                <Select value={language} onChange={(event) => setLanguage(event.target.value as UserProfile["language"])}>
                  <option value="ru">{copy.russian}</option>
                  <option value="en">English</option>
                  <option value="kk">{copy.kazakh}</option>
                </Select>
              </>
            )}

            {role === "mentor" && (
              <>
                <Input value={expertise} onChange={(event) => setExpertise(event.target.value)} placeholder={t("expertise")} />
                <Input value={languages} onChange={(event) => setLanguages(event.target.value)} placeholder={t("languages")} />
                <Textarea value={bio} onChange={(event) => setBio(event.target.value)} placeholder={t("shortBio")} />
              </>
            )}

            <Button
              className="w-full"
              onClick={() =>
                login({
                  id: crypto.randomUUID(),
                  name: name || copy.newUser,
                  email: email || "new@mentoria.demo",
                  role,
                  grade: role === "student" ? grade : undefined,
                  country: role === "student" ? country : undefined,
                  language,
                  expertise: role === "mentor" ? expertise : undefined,
                  bio: role === "mentor" ? bio : undefined,
                  languages:
                    role === "mentor" ? languages.split(",").map((item) => item.trim()) : undefined,
                  interests: [],
                  goals: [],
                })
              }
            >
              {t("continue")}
            </Button>

            <div className="grid gap-2 sm:grid-cols-3">
              <Button variant="outline" onClick={() => login(demoStudent)}>
                {t("demoStudent")}
              </Button>
              <Button variant="outline" onClick={() => login(demoMentor)}>
                {t("demoMentor")}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  login({
                    id: "admin-demo",
                    name: copy.adminName,
                    email: "admin@mentoria.demo",
                    role: "admin",
                    interests: [],
                    goals: [],
                    language: "ru",
                  })
                }
              >
                {t("demoAdmin")}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
