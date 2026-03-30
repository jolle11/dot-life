"use client";

import { useT } from "@/lib/i18n";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

function HelpDialogContent({ onClose }: { onClose: () => void }) {
  const t = useT();
  const trapRef = useFocusTrap<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.keyboardShortcuts}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          aria-label={t.shortcutClose}
        >
          <X size={18} />
        </button>
        <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {t.keyboardShortcuts}
        </h2>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {[
            { key: "W", desc: t.shortcutWeeks },
            { key: "M", desc: t.shortcutMonths },
            { key: "Y", desc: t.shortcutYears },
            { key: "?", desc: t.shortcutHelp },
            { key: "Esc", desc: t.shortcutClose },
          ].map(({ key, desc }) => (
            <li key={key} className="flex items-center gap-3">
              <kbd className="min-w-[2rem] rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-center font-mono text-xs font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {key}
              </kbd>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function HelpDialog({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && <HelpDialogContent onClose={onClose} />}
    </AnimatePresence>
  );
}
