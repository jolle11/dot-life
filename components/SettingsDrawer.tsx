"use client";

import { BirthDateInput } from "@/components/BirthDateInput";
import { DotShapePicker } from "@/components/DotShapePicker";
import { LifeExpectancySlider } from "@/components/LifeExpectancySlider";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { useT } from "@/lib/i18n";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { LifeConfig } from "@/lib/types";
import { Question, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  config: LifeConfig;
  onUpdate: (partial: Partial<LifeConfig>) => void;
  onShowHelp: () => void;
}

function DrawerContent({ onClose, config, onUpdate, onShowHelp }: Omit<Props, "open">) {
  const t = useT();
  const trapRef = useFocusTrap<HTMLElement>();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.settings}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.6 }}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80 || info.velocity.x > 400) {
            onClose();
          }
        }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col overflow-hidden border-l border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t.settings}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            aria-label={t.shortcutClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-5 py-5">
            <BirthDateInput
              value={config.birthDate}
              onChange={(birthDate) => onUpdate({ birthDate })}
            />

            <LifeExpectancySlider
              value={config.lifeExpectancy}
              onChange={(lifeExpectancy) => onUpdate({ lifeExpectancy })}
            />

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {t.view}
              </span>
              <ViewModeToggle
                value={config.viewMode}
                onChange={(viewMode) => onUpdate({ viewMode })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {t.dotShape}
              </span>
              <DotShapePicker
                value={config.dotShape ?? "circle"}
                onChange={(dotShape) => onUpdate({ dotShape })}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => { onClose(); onShowHelp(); }}
            className="flex items-center gap-1.5 rounded-md p-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            aria-label={t.keyboardShortcuts}
          >
            <Question size={15} />
            {t.keyboardShortcuts}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export function SettingsDrawer({ open, ...rest }: Props) {
  return (
    <AnimatePresence>
      {open && <DrawerContent {...rest} />}
    </AnimatePresence>
  );
}
