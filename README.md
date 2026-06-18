# Mentoria Hub MVP

Mentoria Hub is a deploy-ready Next.js MVP for the Mentoria hackathon case. It brings opportunities, self-paced courses, resources, practice questions, roadmap tasks, deadlines, mentor content, and admin tools into one modern student platform.

## Main Goal

Mentoria Hub helps students:

- discover opportunities by major and goals;
- study through roadmap-based courses and original practice;
- save resources, tests, research programs, and admissions links;
- track daily tasks, progress, XP, streaks, and deadlines;
- receive profile-based recommendations;
- continue learning asynchronously.

It helps Mentoria scale through one organized digital platform for students, mentors, schools, and partners.

## Roles

- Student: onboarding, recommendations, saved opportunities/resources, courses, activities, dashboard, roadmap, calendar, profile.
- Mentor: mentor dashboard, courses, resources, activities, questions, students, profile.
- Admin: overview, opportunities, courses, resources, activities, questions, users, leaderboard, analytics, profile.

## Demo Accounts

- `student@mentoria.demo` / `demo123`
- `mentor@mentoria.demo` / `mentor123`
- `admin@mentoria.demo` / `admin123`

You can also use the demo role buttons on `/auth`.

## Routes

- `/`
- `/auth`
- `/onboarding`
- `/opportunities`
- `/courses`
- `/resources`
- `/activities`
- `/ai-assistant`
- `/dashboard`
- `/roadmap`
- `/calendar`
- `/profile`
- `/mentor`
- `/mentor/profile`
- `/mentor/courses`
- `/mentor/resources`
- `/mentor/activities`
- `/mentor/questions`
- `/mentor/students`
- `/admin`
- `/admin/opportunities`
- `/admin/courses`
- `/admin/resources`
- `/admin/activities`
- `/admin/questions`
- `/admin/users`
- `/admin/leaderboard`
- `/admin/analytics`
- `/admin/profile`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- local shadcn-style UI components
- lucide-react
- sonner
- motion
- gsap
- @gsap/react

## UI and Animation

- Premium dark Mentoria palette based on the provided logo
- Inter Tight display font for uppercase hero and section headings
- ShinyText for badges and stat highlights
- SplitText for hero, page, and section headings
- motion-based reveal, floating, aurora, progress, and stat animations

## Data Model

This MVP uses mock data from `src/data` and browser `localStorage`.

Persisted demo state includes:

- current user and role
- selected language
- onboarding profile
- saved opportunities
- saved resources
- completed activities
- completed lessons
- practice attempts and scores
- roadmap progress
- admin-created content
- mentor-created content

No real database or backend credentials are required for the demo.

## External Resources Policy

- Public resources use external official or public links where possible.
- Research and summer program links include LaunchX, Lumiere, Polygence, Pioneer, Ladder, Samsung Solve for Tomorrow, IEO, ISEF, IOI, IMO, IPhO, IChO, IBO, Technovation, Diamond Challenge, MIT THINK, GENIUS Olympiad, and more.
- Social resources such as Instagram and LinkedIn open externally and are not embedded.

## Private Uploaded Files Policy

- Uploaded CFA and IFT PDFs are not exposed publicly.
- Their exact questions are not copied into the product.
- They are used only as private topic inspiration for original finance practice.
- Private file cards can be shown as metadata placeholders only.

## Assistant

Mentoria Assistant is a neutral placeholder panel.

- It does not claim fake intelligent answers.
- It does not mention any specific provider in the UI.
- Assistant backend can be connected later.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the default Next.js framework preset.
4. Use `npm install` for install.
5. Use `npm run build` for build.
6. Deploy.

## Future Improvements

- real auth and backend
- persistent database
- mentor uploads with moderation
- reminder delivery
- richer multilingual content
- deeper analytics
- assistant backend integration
