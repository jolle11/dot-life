"use client";

import { useT } from "@/lib/i18n";
import { Moon, Sun, DeviceMobile, Check } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

export function ThemeToggle() {
  const t = useT();
  const [mode, setMode] = useState<ThemeMode>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("dot-life-theme") as ThemeMode | null;
    setMode(saved ?? "system");
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(next: ThemeMode) {
    setMode(next);
    setOpen(false);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dot-life-theme", "dark");
    } else if (next === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dot-life-theme", "light");
    } else {
      localStorage.removeItem("dot-life-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }

  const icon =
    mode === "dark" ? <Moon size={18} /> :
    mode === "light" ? <Sun size={18} /> :
    <DeviceMobile size={18} />;

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: "system", label: t.themeSystem, icon: <DeviceMobile size={16} /> },
    { value: "light",  label: t.themeLight,  icon: <Sun size={16} /> },
    { value: "dark",   label: t.themeDark,   icon: <Moon size={16} /> },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label={t.toggleTheme}
        title={t.toggleTheme}
      >
        {icon}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {opt.icon}
              <span className="flex-1 text-left">{opt.label}</span>
              {mode === opt.value && <Check size={14} className="text-zinc-500 dark:text-zinc-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
