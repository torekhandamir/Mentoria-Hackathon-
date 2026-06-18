"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { getLocal, setLocal } from "@/lib/utils";

type Item = { id: string; title: string; description?: string; [key: string]: unknown };

export function AdminList<T extends Item>({ title, storageKey, base, makeItem }: { title: string; storageKey: string; base: T[]; makeItem: (title: string, description: string) => T }) {
  const [items, setItems] = useState<T[]>(() => [...base, ...getLocal<T[]>(storageKey, [])]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const persist = (next: T[]) => { const custom = next.filter((x) => !base.some((b) => b.id === x.id)); setLocal(storageKey, custom); setItems(next); };
  return <div><h1 className="display text-4xl font-black uppercase">{title}</h1><Card className="mt-6"><CardTitle>Add new</CardTitle><div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Title" /><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><Button onClick={() => { if (!name) return; persist([makeItem(name, description), ...items]); setName(""); setDescription(""); toast.success("Added"); }}>Add</Button></div></Card><div className="mt-6 space-y-3">{items.map((item) => <Card key={item.id} className="grid gap-3 md:grid-cols-[1fr_auto]"><div><b>{item.title}</b><p className="mt-1 text-sm text-slate-400">{item.description as string}</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => { const nextTitle = prompt("Edit title", item.title); if (nextTitle) { persist(items.map((x) => x.id === item.id ? { ...x, title: nextTitle } : x)); toast.success("Updated"); } }}>Edit</Button><Button variant="secondary" onClick={() => { persist(items.filter((x) => x.id !== item.id)); toast.success("Deleted"); }}>Delete</Button></div></Card>)}</div></div>;
}
