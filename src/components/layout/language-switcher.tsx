"use client";

import { useState } from "react";
import { Select } from "@/components/ui/input";
import { Lang } from "@/data/translations";
import { getLanguage, setLanguage } from "@/lib/i18n";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>(() => getLanguage());

  return (
    <Select
      value={lang}
      onChange={(event) => {
        const next = event.target.value as Lang;
        setLang(next);
        setLanguage(next);
      }}
      className="w-28"
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="kk">Қазақша</option>
    </Select>
  );
}
