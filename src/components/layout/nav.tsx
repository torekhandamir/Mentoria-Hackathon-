"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, LayoutDashboard, Shield, Sparkles, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "@/lib/i18n";

export function Logo() {
  return <Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-[#5E96CA] via-[#86BCDE] to-[#94CFDB] text-[#07111F] shadow-lg shadow-[#5E96CA]/25"><GraduationCap size={24} /></span><span className="bg-gradient-to-r from-[#5E96CA] to-[#94CFDB] bg-clip-text text-xl font-black tracking-tight text-transparent">Mentoria</span></Link>;
}

export function PublicNav() {
  const { t } = useTranslation();
  return <header className="sticky top-0 z-40 border-b border-[#324E60]/70 bg-[#07111F]/80 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Logo /><nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex"><Link href="/">{t("home")}</Link><Link href="/#about">{t("about")}</Link><Link href="/opportunities">{t("opportunities")}</Link><Link href="/courses">{t("courses")}</Link><Link href="/resources">{t("resources")}</Link></nav><div className="flex items-center gap-2"><LanguageSwitcher /><Link href="/auth"><Button variant="ghost">{t("signIn")}</Button></Link><Link className="hidden sm:block" href="/auth"><Button>{t("join")}</Button></Link></div></div></header>;
}

export function AppShell({ children, admin = false, mentor = false }: { children: React.ReactNode; admin?: boolean; mentor?: boolean }) {
  const { t } = useTranslation();
  const links = admin
    ? [["/admin", t("overview"), Shield], ["/admin/opportunities", t("opportunities"), LayoutDashboard], ["/admin/courses", t("courses"), BookOpen], ["/admin/resources", t("resources"), BookOpen], ["/admin/activities", t("activities"), Sparkles], ["/admin/questions", t("questions"), LayoutDashboard], ["/admin/users", t("users"), Users], ["/admin/leaderboard", t("leaderboard"), Trophy], ["/admin/analytics", t("analytics"), LayoutDashboard], ["/admin/profile", t("profile"), LayoutDashboard]]
    : mentor
      ? [["/mentor", t("mentorHome"), Shield], ["/mentor/courses", t("courses"), BookOpen], ["/mentor/resources", t("resources"), BookOpen], ["/mentor/activities", t("activities"), Sparkles], ["/mentor/questions", t("questions"), LayoutDashboard], ["/mentor/students", t("users"), Users], ["/mentor/profile", t("profile"), LayoutDashboard]]
      : [["/dashboard", t("dashboard"), LayoutDashboard], ["/opportunities", t("opportunities"), LayoutDashboard], ["/courses", t("courses"), BookOpen], ["/resources", t("resources"), BookOpen], ["/activities", t("activities"), Sparkles], ["/roadmap", t("roadmap"), LayoutDashboard], ["/calendar", t("calendar"), LayoutDashboard], ["/ai-assistant", t("assistant"), LayoutDashboard], ["/profile", t("profile"), LayoutDashboard]];
  return <div className="min-h-screen bg-[#0F1621] text-slate-100"><div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#1E2F50_0,transparent_35%),radial-gradient(circle_at_80%_20%,rgba(148,207,219,.18),transparent_28%)]" /><aside className="fixed inset-x-0 bottom-0 z-40 border-t border-[#324E60]/70 bg-[#0F1621]/95 p-2 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-r md:border-t-0 md:p-4"><div className="hidden md:block"><Logo /></div><nav className="mt-0 flex gap-1 overflow-x-auto md:mt-8 md:flex-col">{links.map(([href, label, Icon]) => <Link key={href as string} href={href as string} className="flex min-w-max items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><Icon size={16} />{label as string}</Link>)}</nav></aside><main className="mx-auto max-w-7xl animate-[fadeIn_.5s_ease-out] px-4 pb-24 pt-6 md:ml-64 md:px-8 md:pb-10"><div className="mb-6 flex items-center justify-between"><div className="md:hidden"><Logo /></div><LanguageSwitcher /></div>{children}</main></div>;
}
