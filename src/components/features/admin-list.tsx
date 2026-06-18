"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n";
import { getLocal, setLocal } from "@/lib/utils";

type Item = { id: string; title: string; description?: string; [key: string]: unknown };

export function AdminList<T extends Item>({
  title,
  storageKey,
  base,
  makeItem,
}: {
  title: string;
  storageKey: string;
  base: T[];
  makeItem: (title: string, description: string) => T;
}) {
  const { lang } = useTranslation();
  const [items, setItems] = useState<T[]>(() => [...base, ...getLocal<T[]>(storageKey, [])]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const copy = useMemo(
    () =>
      ({
        en: {
          addNew: "Add new",
          title: "Title",
          description: "Description",
          add: "Add",
          edit: "Edit",
          delete: "Delete",
          added: "Added",
          updated: "Updated",
          deleted: "Deleted",
          editPrompt: "Edit title",
        },
        ru: {
          addNew: "Добавить",
          title: "Название",
          description: "Описание",
          add: "Добавить",
          edit: "Изменить",
          delete: "Удалить",
          added: "Добавлено",
          updated: "Обновлено",
          deleted: "Удалено",
          editPrompt: "Изменить название",
        },
        kk: {
          addNew: "Қосу",
          title: "Атауы",
          description: "Сипаттама",
          add: "Қосу",
          edit: "Өзгерту",
          delete: "Жою",
          added: "Қосылды",
          updated: "Жаңартылды",
          deleted: "Жойылды",
          editPrompt: "Атауын өзгерту",
        },
      })[lang],
    [lang],
  );

  const persist = (next: T[]) => {
    const custom = next.filter((item) => !base.some((baseItem) => baseItem.id === item.id));
    setLocal(storageKey, custom);
    setItems(next);
  };

  return (
    <div>
      <h1 className="display text-4xl font-black uppercase">{title}</h1>
      <Card className="mt-6">
        <CardTitle>{copy.addNew}</CardTitle>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={copy.title} />
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={copy.description}
          />
          <Button
            onClick={() => {
              if (!name) return;
              persist([makeItem(name, description), ...items]);
              setName("");
              setDescription("");
              toast.success(copy.added);
            }}
          >
            {copy.add}
          </Button>
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div>
              <b>{item.title}</b>
              <p className="mt-1 text-sm text-slate-400">{item.description as string}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const nextTitle = prompt(copy.editPrompt, item.title);
                  if (nextTitle) {
                    persist(items.map((current) => (current.id === item.id ? { ...current, title: nextTitle } : current)));
                    toast.success(copy.updated);
                  }
                }}
              >
                {copy.edit}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  persist(items.filter((current) => current.id !== item.id));
                  toast.success(copy.deleted);
                }}
              >
                {copy.delete}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
