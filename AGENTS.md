# AGENTS.md - Mentoria Hub MVP

## Project Identity

Mentoria Hub is a working EdTech SaaS MVP for Mentoria's hackathon case. It helps students in grades 8-12 discover educational opportunities, complete asynchronous courses, save resources, track deadlines, and receive profile-based recommendations. It must not be just a landing page.

## Official Case Acceptance Checklist

Judging priorities from the case brief:
- Problem understanding, 20%: show why Telegram and live lessons do not scale for every student.
- MVP functionality, 25%: working pages, filters, saved opportunities, courses, progress, dashboard, and admin panel.
- UX and design, 20%: clear structure, modern responsive interface, simple navigation.
- Mentoria impact, 20%: demonstrate how the platform helps Mentoria scale, retain students, and look professional to partners.
- Innovation, 15%: recommendations, deadline calendar, roadmap, multilingual UI, and other useful extensions.

Minimum MVP must include:
- Home page with a clear Mentoria Hub value proposition.
- Opportunities catalog with at least 8-10 examples, filters/search, and save/favorite behavior.
- Courses with lessons, materials, mini quizzes, and progress tracking.
- Student dashboard with saved opportunities, course progress, recommendations, resources, and deadlines.
- Onboarding that captures grade, interests, subjects/major, and goals.
- Simple recommendation logic using tags, grade, major, and goals.
- Admin panel for adding/editing/deleting opportunities, courses, and resources.
- Deployable demo build using mock data and localStorage.

## Implementation Rules

- Use Next.js App Router, TypeScript, Tailwind CSS, shadcn-style local components, lucide-react, sonner, mock data, and localStorage.
- Keep Supabase/API-key-free for the MVP.
- Use the Mentoria palette: `#07111F`, `#0F1622`, `#203252`, `#5E95CB`, `#85BCDD`, `#93CFDB`, `#62A3AD`, `#F8FAFC`, `#94A3B8`.
- Use premium dark SaaS/EdTech UI, glass cards, strong hierarchy, responsive layouts, accessible controls, hover/focus states, and clean dashboards.
- Use Inter Tight or Space Grotesk-inspired uppercase heavy hero headings.
- Keep ReactBits-style Aurora only in the hero background, and use Haikei-style SVG gradients/waves in `/public/backgrounds`.
- Do not add heavy or conflicting UI libraries.
- Protect mock dashboard/admin pages with client-side checks where practical.
- Store current user, onboarding profile, saved opportunities/resources, completed lessons, roadmap tasks, and admin-added content in localStorage.

## Required Routes

`/`, `/auth`, `/onboarding`, `/opportunities`, `/courses`, `/resources`, `/dashboard`, `/roadmap`, `/calendar`, `/profile`, `/admin`, `/admin/opportunities`, `/admin/courses`, `/admin/resources`, `/admin/users`, `/admin/analytics`.

## Demo Flows

Student flow:
1. Home -> Get Recommendations.
2. Continue as demo student or sign up.
3. Complete onboarding, choose Economics.
4. See Economics recommendations.
5. Save an opportunity.
6. Complete a course lesson.
7. Dashboard reflects progress, saved deadline, and recommended Economics resources.

Admin flow:
1. Continue as demo admin.
2. Open Admin Center.
3. Add/edit/delete an opportunity, course, or resource.
4. Confirm it appears in public catalogs.

Language flow:
1. Switch between English, Russian, and Kazakh.
2. Main labels update.
3. Choice persists in localStorage.

