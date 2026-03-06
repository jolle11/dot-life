"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useT } from "@/lib/i18n";
import { CirclesFour } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onSubmit: (birthDate: string) => void;
}

export function WelcomeScreen({ onSubmit }: Props) {
  const [birthDate, setBirthDate] = useState("");
  const t = useT();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-zinc-900">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Decorative dot grid background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04] dark:opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center gap-10"
      >
        {/* Logo & title */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CirclesFour
              size={56}
              weight="duotone"
              className="text-zinc-800 dark:text-zinc-200"
            />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            dot life
          </h1>
          <p className="max-w-xs text-center text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t.welcomeDescription}
          </p>
        </div>

        {/* Birth date form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full"
        >
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
            <label
              htmlFor="welcome-birthdate"
              className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {t.welcomeQuestion}
            </label>
            <input
              id="welcome-birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
              max={new Date().toISOString().split("T")[0]}
            />
            <button
              type="button"
              disabled={!birthDate}
              onClick={() => onSubmit(birthDate)}
              className="mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900"
            >
              {t.welcomeStart}
            </button>
          </div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-zinc-400 dark:text-zinc-500"
        >
          {t.welcomeFooter}
        </motion.p>
      </motion.div>
    </div>
  );
}
