import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "@/components/animations/ShinyText.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mentoria Hub",
  description: "Working MVP for opportunities, asynchronous courses, resources and student roadmaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#07111F] text-slate-100">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
