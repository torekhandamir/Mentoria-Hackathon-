"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Layers,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { CountUpStat } from "@/components/animations/CountUpStat";
import { FloatingCard } from "@/components/animations/FloatingCard";
import ShinyText from "@/components/animations/ShinyText";
import SplitText from "@/components/animations/SplitText";
import { PublicNav } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

type MatchKey = "economics" | "stem" | "computer-science" | "medicine";

export default function Home() {
  const { lang, t } = useTranslation();
  const [activeMatch, setActiveMatch] = useState<MatchKey>("economics");

  const content = useMemo(
    () =>
      ({
        en: {
          badge: "Learning hub for ambitious students",
          heroTitle: "LEARN.\nAPPLY.\nGROW.",
          heroBody:
            "Mentoria Hub helps students discover opportunities, learn through self-paced courses, access major-based resources and track real academic progress in one platform.",
          previewTitle: "Student dashboard preview",
          previewMetrics: [
            ["Match Score", "92%"],
            ["SAT Practice", "40%"],
            ["Saved Opportunities", "4"],
            ["Economics Resources", "12"],
            ["Upcoming Deadline", "LaunchX"],
            ["Daily Tasks", "3/5"],
            ["Streak", "4 days"],
          ],
          aboutTitle: "What is Mentoria Hub?",
          aboutBodyOne:
            "Mentoria Hub is Mentoria's digital platform for opportunities, courses, resources, planning and student progress.",
          aboutBodyTwo:
            "It replaces scattered links and manual follow-up with one structured space for academic growth.",
          platformTitle: "One hub for your academic growth",
          platformBody:
            "From competitions and scholarships to courses, files, deadlines and mentor-created activities, Mentoria Hub helps students move from interest to action.",
          features: [
            [
              "Discover opportunities",
              Target,
              "Find competitions, olympiads, scholarships, internships, summer schools and research programs.",
            ],
            [
              "Learn at your own pace",
              BookOpen,
              "Complete structured courses through videos, files, quizzes and checkpoint-based progress.",
            ],
            [
              "Choose your major track",
              Layers,
              "Receive resource, course and opportunity recommendations based on your profile.",
            ],
            [
              "Track your growth",
              CalendarDays,
              "Follow deadlines, daily tasks, XP, streaks and your roadmap in one place.",
            ],
            [
              "Get mentor guidance",
              Users,
              "Mentors can add activities, resources, questions and structured support for students.",
            ],
            [
              "Use it in 3 languages",
              Globe2,
              "The platform supports English, Russian and Kazakh interface labels.",
            ],
          ] as const,
          howTitle: "How it works",
          steps: [
            "Create profile",
            "Choose major",
            "Get recommendations",
            "Practice",
            "Save opportunities",
            "Track growth",
          ],
          matchBadge: "Try Mentoria Match",
          matchSuffix: "match",
          matchBody:
            "Choose a focus and preview matched opportunities, courses, resources and a daily action.",
          matchLabels: {
            economics: "Economics",
            stem: "STEM",
            "computer-science": "Computer Science",
            medicine: "Medicine",
          },
          matchOptions: {
            economics: [
              "International Economics Olympiad",
              "LaunchX",
              "Introduction to Economics",
              "CFA Level 1 Quantitative Methods 2025",
              "Daily task: solve 5 demand and supply questions",
            ],
            stem: [
              "Samsung Solve for Tomorrow",
              "Regeneron ISEF",
              "MIT THINK",
              "OpenStax Physics",
              "Daily task: complete one STEM practice set",
            ],
            "computer-science": [
              "IOI",
              "CS50x",
              "CS50 Python",
              "Ladder Internships",
              "Daily task: solve one logic problem",
            ],
            medicine: [
              "IBO",
              "IChO",
              "Lumiere Research Scholar Program",
              "OpenStax Biology 2e",
              "Daily task: review one biology flashcard set",
            ],
          } satisfies Record<MatchKey, string[]>,
          stats: [
            ["opportunities planned", <CountUpStat key="s1" value={100} suffix="+" />],
            ["major tracks", <CountUpStat key="s2" value={20} />],
            ["languages", <CountUpStat key="s3" value={3} />],
            ["self-paced learning", "24/7"],
            ["economics resources", <CountUpStat key="s5" value={12} />],
          ] as const,
          quotes: [
            [
              '"I can study even when I miss live sessions."',
              "The platform keeps materials, tasks and deadlines in one place.",
            ],
            [
              '"I finally understand which opportunities fit my profile."',
              "Recommendations make the next step clear instead of manual searching.",
            ],
          ],
          ctaTitle: "Create your student profile",
          ctaBody:
            "Get major-based resources, course suggestions, saved deadlines, XP tasks and a personal roadmap.",
        },
        ru: {
          badge: "Платформа для амбициозных студентов",
          heroTitle: "УЧИСЬ.\nПРОБУЙ.\nРАСТИ.",
          heroBody:
            "Mentoria Hub помогает студентам находить возможности, проходить курсы в своем темпе, открывать ресурсы по направлению и отслеживать реальный академический прогресс в одной платформе.",
          previewTitle: "Превью кабинета студента",
          previewMetrics: [
            ["Совпадение", "92%"],
            ["Практика SAT", "40%"],
            ["Сохранено возможностей", "4"],
            ["Ресурсы по экономике", "12"],
            ["Ближайший дедлайн", "LaunchX"],
            ["Задачи дня", "3/5"],
            ["Стрик", "4 дня"],
          ],
          aboutTitle: "Что такое Mentoria Hub?",
          aboutBodyOne:
            "Mentoria Hub — это цифровая платформа Mentoria для возможностей, курсов, ресурсов, планирования и прогресса студентов.",
          aboutBodyTwo:
            "Она заменяет разрозненные ссылки и ручной контроль одним структурированным пространством для академического роста.",
          platformTitle: "Одна платформа для академического роста",
          platformBody:
            "От олимпиад и стипендий до курсов, файлов, дедлайнов и активностей от менторов — Mentoria Hub помогает перейти от интереса к действию.",
          features: [
            [
              "Находите возможности",
              Target,
              "Ищите конкурсы, олимпиады, стипендии, стажировки, summer schools и research programs.",
            ],
            [
              "Учитесь в своем темпе",
              BookOpen,
              "Проходите структурированные курсы через видео, файлы, квизы и контроль прогресса.",
            ],
            [
              "Выбирайте свой трек",
              Layers,
              "Получайте рекомендации по ресурсам, курсам и возможностям на основе профиля.",
            ],
            [
              "Отслеживайте рост",
              CalendarDays,
              "Следите за дедлайнами, daily tasks, XP, стриком и roadmap в одном месте.",
            ],
            [
              "Получайте поддержку ментора",
              Users,
              "Менторы могут добавлять активности, ресурсы, вопросы и структурированную поддержку.",
            ],
            [
              "Пользуйтесь на 3 языках",
              Globe2,
              "Платформа поддерживает интерфейс на английском, русском и казахском.",
            ],
          ] as const,
          howTitle: "Как это работает",
          steps: [
            "Создайте профиль",
            "Выберите направление",
            "Получите рекомендации",
            "Практикуйтесь",
            "Сохраняйте возможности",
            "Отслеживайте рост",
          ],
          matchBadge: "Попробуйте Mentoria Match",
          matchSuffix: "совпадение",
          matchBody:
            "Выберите фокус и посмотрите, какие возможности, курсы, ресурсы и ежедневные действия подойдут вам.",
          matchLabels: {
            economics: "Экономика",
            stem: "STEM",
            "computer-science": "Computer Science",
            medicine: "Медицина",
          },
          matchOptions: {
            economics: [
              "International Economics Olympiad",
              "LaunchX",
              "Introduction to Economics",
              "CFA Level 1 Quantitative Methods 2025",
              "Задача дня: решить 5 вопросов по спросу и предложению",
            ],
            stem: [
              "Samsung Solve for Tomorrow",
              "Regeneron ISEF",
              "MIT THINK",
              "OpenStax Physics",
              "Задача дня: пройти один STEM practice set",
            ],
            "computer-science": [
              "IOI",
              "CS50x",
              "CS50 Python",
              "Ladder Internships",
              "Задача дня: решить одну логическую задачу",
            ],
            medicine: [
              "IBO",
              "IChO",
              "Lumiere Research Scholar Program",
              "OpenStax Biology 2e",
              "Задача дня: повторить один набор biology flashcards",
            ],
          } satisfies Record<MatchKey, string[]>,
          stats: [
            ["запланировано возможностей", <CountUpStat key="rs1" value={100} suffix="+" />],
            ["треков направлений", <CountUpStat key="rs2" value={20} />],
            ["языка интерфейса", <CountUpStat key="rs3" value={3} />],
            ["обучение в своем темпе", "24/7"],
            ["ресурсов по экономике", <CountUpStat key="rs5" value={12} />],
          ] as const,
          quotes: [
            [
              '"Теперь я могу учиться, даже если пропустил live-сессию."',
              "Все материалы, задачи и дедлайны собраны в одном месте.",
            ],
            [
              '"Наконец стало понятно, какие возможности подходят именно мне."',
              "Рекомендации убирают хаос ручного поиска и показывают следующий шаг.",
            ],
          ],
          ctaTitle: "Создайте профиль студента",
          ctaBody:
            "Получайте ресурсы по направлению, подборку курсов, сохраненные дедлайны, XP-задачи и личный roadmap.",
        },
        kk: {
          badge: "Амбициясы жоғары студенттерге арналған платформа",
          heroTitle: "ОҚЫ.\nӘРЕКЕТ ЕТ.\nӨС.",
          heroBody:
            "Mentoria Hub студенттерге мүмкіндіктерді табуға, курстарды өз қарқынымен өтуге, бағытқа сай ресурстар ашуға және академиялық прогресті бір платформада бақылауға көмектеседі.",
          previewTitle: "Студент кабинетінің көрінісі",
          previewMetrics: [
            ["Сәйкестік", "92%"],
            ["SAT практикасы", "40%"],
            ["Сақталған мүмкіндіктер", "4"],
            ["Экономика ресурстары", "12"],
            ["Жақын дедлайн", "LaunchX"],
            ["Күндік тапсырмалар", "3/5"],
            ["Стрик", "4 күн"],
          ],
          aboutTitle: "Mentoria Hub деген не?",
          aboutBodyOne:
            "Mentoria Hub — бұл Mentoria ұйымының мүмкіндіктер, курстар, ресурстар, жоспарлау және студент прогресіне арналған цифрлық платформасы.",
          aboutBodyTwo:
            "Ол шашыраңқы сілтемелер мен қолмен бақылауды академиялық өсуге арналған бір құрылымды ортаға ауыстырады.",
          platformTitle: "Академиялық өсуге арналған бір платформа",
          platformBody:
            "Олимпиадалар мен шәкіртақылардан бастап курстарға, файлдарға, дедлайндарға және ментор белсенділіктеріне дейін Mentoria Hub қызығушылықтан нақты әрекетке өтуге көмектеседі.",
          features: [
            [
              "Мүмкіндіктерді табыңыз",
              Target,
              "Байқауларды, олимпиадаларды, шәкіртақыларды, тағылымдамаларды және research programs табыңыз.",
            ],
            [
              "Өз қарқыныңызбен оқыңыз",
              BookOpen,
              "Бейне, файл, квиз және прогресс бақылауы бар құрылымды курстардан өтіңіз.",
            ],
            [
              "Бағытыңызды таңдаңыз",
              Layers,
              "Профильге сай ресурс, курс және мүмкіндік ұсыныстарын алыңыз.",
            ],
            [
              "Өсуіңізді бақылаңыз",
              CalendarDays,
              "Дедлайн, daily tasks, XP, стрик және roadmap-ты бір жерден қадағалаңыз.",
            ],
            [
              "Ментор қолдауын алыңыз",
              Users,
              "Менторлар студенттерге белсенділік, ресурс, сұрақ және құрылымды қолдау қоса алады.",
            ],
            [
              "3 тілде қолданыңыз",
              Globe2,
              "Платформа ағылшын, орыс және қазақ тіліндегі интерфейсті қолдайды.",
            ],
          ] as const,
          howTitle: "Бұл қалай жұмыс істейді",
          steps: [
            "Профиль жасаңыз",
            "Бағыт таңдаңыз",
            "Ұсыныс алыңыз",
            "Практика жасаңыз",
            "Мүмкіндіктерді сақтаңыз",
            "Өсуді бақылаңыз",
          ],
          matchBadge: "Mentoria Match көріңіз",
          matchSuffix: "сәйкестік",
          matchBody:
            "Фокусты таңдаңыз және сізге лайық мүмкіндіктерді, курстарды, ресурстарды және күндік әрекеттерді көріңіз.",
          matchLabels: {
            economics: "Экономика",
            stem: "STEM",
            "computer-science": "Computer Science",
            medicine: "Медицина",
          },
          matchOptions: {
            economics: [
              "International Economics Olympiad",
              "LaunchX",
              "Introduction to Economics",
              "CFA Level 1 Quantitative Methods 2025",
              "Күндік тапсырма: сұраныс пен ұсыныс бойынша 5 сұрақ шешу",
            ],
            stem: [
              "Samsung Solve for Tomorrow",
              "Regeneron ISEF",
              "MIT THINK",
              "OpenStax Physics",
              "Күндік тапсырма: бір STEM practice set аяқтау",
            ],
            "computer-science": [
              "IOI",
              "CS50x",
              "CS50 Python",
              "Ladder Internships",
              "Күндік тапсырма: бір логикалық есеп шығару",
            ],
            medicine: [
              "IBO",
              "IChO",
              "Lumiere Research Scholar Program",
              "OpenStax Biology 2e",
              "Күндік тапсырма: бір biology flashcard жиынын қайталау",
            ],
          } satisfies Record<MatchKey, string[]>,
          stats: [
            ["жоспарланған мүмкіндіктер", <CountUpStat key="ks1" value={100} suffix="+" />],
            ["бағыт тректері", <CountUpStat key="ks2" value={20} />],
            ["интерфейс тілі", <CountUpStat key="ks3" value={3} />],
            ["өз қарқынымен оқу", "24/7"],
            ["экономика ресурстары", <CountUpStat key="ks5" value={12} />],
          ] as const,
          quotes: [
            [
              '"Тікелей сессияны жіберіп алсам да, оқуды жалғастыра аламын."',
              "Барлық материалдар, тапсырмалар мен дедлайндар бір жерде жиналған.",
            ],
            [
              '"Маған қай мүмкіндіктер сай келетінін енді түсіндім."',
              "Ұсыныстар қолмен іздеуді азайтып, келесі қадамды анық көрсетеді.",
            ],
          ],
          ctaTitle: "Студент профилін жасаңыз",
          ctaBody:
            "Бағытқа сай ресурстар, курс ұсыныстары, сақталған дедлайндар, XP тапсырмалары және жеке roadmap алыңыз.",
        },
      })[lang],
    [lang],
  );

  const activeLabel = content.matchLabels[activeMatch];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0F1621] text-white">
      <PublicNav />
      <main>
        <section className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[.95fr_1.05fr]">
          <AuroraBackground />
          <div className="absolute inset-0 -z-10 bg-[url('/backgrounds/aurora.svg')]" />
          <div className="absolute left-1/2 top-20 -z-10 h-72 w-[48rem] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#5E96CA]/20 via-[#94CFDB]/20 to-[#62A4AE]/20 blur-3xl" />

          <div className="animate-[fadeIn_.55s_ease-out]">
            <Badge className="mb-5 gap-2">
              <Sparkles size={14} />
              <ShinyText
                text={content.badge}
                speed={2.5}
                color="#86BCDE"
                shineColor="#F8FAFC"
                spread={120}
              />
            </Badge>

            <SplitText
              tag="h1"
              text={content.heroTitle}
              splitType="chars"
              delay={35}
              duration={0.9}
              from={{ opacity: 0, y: 70, rotateX: -35 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              className="display max-w-3xl text-[clamp(42px,8vw,136px)] font-black uppercase leading-[.86]"
              textAlign="left"
            />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{content.heroBody}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth">
                <Button>
                  {t("getRecommendations")} <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="#platform">
                <Button variant="outline">{t("explorePlatform")}</Button>
              </Link>
            </div>
          </div>

          <FloatingCard className="relative">
            <Card className="relative p-6">
              <div className="absolute -right-8 -top-8 size-28 rounded-full bg-[#94CFDB]/20 blur-2xl" />
              <CardTitle className="text-2xl">{content.previewTitle}</CardTitle>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {content.previewMetrics.map(([label, value]) => (
                  <Metric key={label} label={label} value={value} />
                ))}
              </div>
            </Card>
          </FloatingCard>
        </section>

        <section id="about" className="border-y border-[#324E60]/70 bg-[#07111F] px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <SplitText
              tag="h2"
              text={content.aboutTitle}
              splitType="words"
              delay={70}
              duration={0.8}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              className="display text-4xl font-black uppercase"
              textAlign="left"
            />
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">{content.aboutBodyOne}</p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">{content.aboutBodyTwo}</p>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-4 py-16">
          <SplitText
            tag="h2"
            text={content.platformTitle}
            splitType="words"
            delay={70}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            className="display text-4xl font-black uppercase"
            textAlign="left"
          />
          <p className="mt-3 max-w-3xl text-slate-300">{content.platformBody}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.features.map(([title, Icon, text]) => (
              <Card key={title}>
                <Icon className="mb-5 text-[#94CFDB]" />
                <CardTitle>{title}</CardTitle>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-[#07111F] px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <SplitText
              tag="h2"
              text={content.howTitle}
              splitType="words"
              delay={70}
              duration={0.8}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              className="display text-4xl font-black uppercase"
              textAlign="left"
            />
            <div className="mt-8 grid gap-3 md:grid-cols-6">
              {content.steps.map((step, index) => (
                <Card key={step} className="text-center">
                  <CheckCircle2 className="mx-auto mb-3 text-[#94CFDB]" />
                  <b>
                    {index + 1}. {step}
                  </b>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Badge>{content.matchBadge}</Badge>
            <SplitText
              tag="h2"
              text={`${activeLabel} ${content.matchSuffix}`}
              splitType="words"
              delay={50}
              duration={0.7}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="display mt-4 text-4xl font-black uppercase"
              textAlign="left"
            />
            <p className="mt-3 text-slate-300">{content.matchBody}</p>
          </div>
          <Card>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(content.matchLabels) as MatchKey[]).map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setActiveMatch(chip)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    activeMatch === chip
                      ? "border-[#94CFDB] bg-[#94CFDB]/15 text-white"
                      : "border-[#324E60] text-slate-300"
                  }`}
                >
                  {content.matchLabels[chip]}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {content.matchOptions[activeMatch].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-[#324E60] bg-[#07111F]/70 p-3"
                >
                  <span>{item}</span>
                  <b className="text-[#94CFDB]">{92 - index * 4}%</b>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="border-y border-[#324E60]/70 bg-[#07111F] px-4 py-14">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
            {content.stats.map(([label, value]) => (
              <Metric key={label} label={label} value={value} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {content.quotes.map(([title, body]) => (
              <Card key={title}>
                <CardTitle>{title}</CardTitle>
                <p className="mt-2 text-slate-400">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <Card className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <SplitText
                tag="h2"
                text={content.ctaTitle}
                splitType="words"
                delay={70}
                duration={0.8}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                className="display text-4xl font-black uppercase"
                textAlign="left"
              />
              <p className="mt-3 text-slate-300">{content.ctaBody}</p>
            </div>
            <Link href="/auth">
              <Button>{t("getRecommendations")}</Button>
            </Link>
          </Card>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#324E60] bg-white/[0.04] p-4">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}
