"use client";

import { BirthDateInput } from "@/components/BirthDateInput";
import { DotGrid } from "@/components/DotGrid";
import { LifeExpectancySlider } from "@/components/LifeExpectancySlider";
import { LocalePicker } from "@/components/LocalePicker";
import { MilestoneEditor } from "@/components/MilestoneEditor";
import { QuickMilestone } from "@/components/QuickMilestone";
import { StatsPanel } from "@/components/StatsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import {
  type Locale,
  I18nProvider,
  LOCALE_STORAGE_KEY,
  getDateLocale,
  locales,
  useT,
} from "@/lib/i18n";
import { parseLocalDate } from "@/lib/calculations";
import { loadConfig, saveConfig } from "@/lib/storage";
import type { LifeConfig, Milestone } from "@/lib/types";
import { decodeShareURL, encodeShareURL, shareDataToConfig } from "@/lib/share";
import { CirclesFour, Export, GearSix, LinkSimple, Check } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [config, setConfig] = useState<LifeConfig | null>(null);
  const [sharedConfig, setSharedConfig] = useState<LifeConfig | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [quickMilestoneDate, setQuickMilestoneDate] = useState<Date | null>(null);
  const [locale, setLocale] = useState<Locale>("es");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for shared URL first
    const shareData = decodeShareURL(window.location.search);
    if (shareData) {
      const cfg = shareDataToConfig(shareData);
      setSharedConfig(cfg);
      setConfig(cfg);
    } else {
      const saved = loadConfig();
      setConfig(saved);
    }

    // Apply saved theme
    const theme = localStorage.getItem("dot-life-theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }

    // Apply saved locale
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (savedLocale && savedLocale in locales) {
      setLocale(savedLocale);
    }
  }, []);

  const update = useCallback(
    (partial: Partial<LifeConfig>) => {
      if (!config) return;
      const next = { ...config, ...partial };
      setConfig(next);
      saveConfig(next);
    },
    [config],
  );

  const exportChart = useCallback(async () => {
    if (!gridRef.current || exporting) return;
    setExporting(true);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const dataUrl = await toPng(gridRef.current, {
        backgroundColor:
          document.documentElement.classList.contains("dark")
            ? "#18181b"
            : "#ffffff",
        pixelRatio: isMobile ? 1 : 2,
      });

      // Convert data URL to blob for better mobile compatibility
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "dot-life.png", { type: "image/png" });

      // Use Web Share API on mobile if available
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        // Desktop fallback: download via link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "dot-life.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setExporting(false);
    }
  }, [exporting]);

  const handleShare = useCallback(async () => {
    if (!config || !config.birthDate) return;
    const url = encodeShareURL(
      parseLocalDate(config.birthDate),
      config.lifeExpectancy,
      config.viewMode,
      config.milestones,
    );
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, [config]);

  const isShared = sharedConfig !== null;

  const t = locales[locale];
  const dateLocale = getDateLocale(locale);

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = locale;
  }, [t.pageTitle, locale]);

  if (config === null) return null;

  if (!config.birthDate) {
    return (
      <I18nProvider value={t}>
        <WelcomeScreen
          onSubmit={(birthDate) => update({ birthDate })}
        />
      </I18nProvider>
    );
  }

  const birthDate = parseLocalDate(config.birthDate);

  return (
    <I18nProvider value={t}>
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <CirclesFour
                size={24}
                weight="duotone"
                className="text-zinc-800 dark:text-zinc-200"
              />
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                dot life
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {!isShared && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                  aria-label={t.shareLink}
                >
                  {linkCopied ? (
                    <Check size={18} className="text-emerald-500" />
                  ) : (
                    <LinkSimple size={18} />
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={exportChart}
                disabled={exporting}
                className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                aria-label={t.exportChart}
              >
                {exporting ? (
                  <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Export size={18} />
                )}
              </button>
              {!isShared && (
                <button
                  type="button"
                  onClick={() => setShowControls(!showControls)}
                  className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                  aria-label={t.settings}
                >
                  <GearSix size={18} />
                </button>
              )}
              <LocalePicker value={locale} onChange={setLocale} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          {/* Shared view banner */}
          {isShared && (
            <div className="mb-6 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t.sharedView}
              </p>
              <a
                href={window.location.pathname}
                className="text-sm font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
              >
                {t.welcomeStart}
              </a>
            </div>
          )}

          {/* Controls panel */}
          <AnimatePresence>
            {showControls && !isShared && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mb-6 flex flex-col gap-6 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-end dark:border-zinc-700">
                  <div className="sm:flex-1">
                    <BirthDateInput
                      value={config.birthDate}
                      onChange={(birthDate) => update({ birthDate })}
                    />
                  </div>
                  <div className="sm:flex-1">
                    <LifeExpectancySlider
                      value={config.lifeExpectancy}
                      onChange={(lifeExpectancy) => update({ lifeExpectancy })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {t.view}
                    </span>
                    <ViewModeToggle
                      value={config.viewMode}
                      onChange={(viewMode) => update({ viewMode })}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <MilestoneEditor
                    milestones={config.milestones}
                    onChange={(milestones) => update({ milestones })}
                    birthDate={config.birthDate}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          {!isShared && (
            <div className="mb-6">
              <StatsPanel
                birthDate={birthDate}
                lifeExpectancy={config.lifeExpectancy}
                locale={locale}
              />
            </div>
          )}

          {/* Dot Grid */}
          <div ref={gridRef} className="rounded-xl border border-zinc-200 p-4 sm:p-6 dark:border-zinc-700">
            <DotGrid
              birthDate={birthDate}
              lifeExpectancy={config.lifeExpectancy}
              viewMode={config.viewMode}
              milestones={config.milestones}
              onDotClick={isShared ? undefined : (date) => setQuickMilestoneDate(date)}
              dateLocale={dateLocale}
            />
          </div>
        </main>

        {!isShared && quickMilestoneDate && (
          <QuickMilestone
            date={quickMilestoneDate}
            existingMilestones={config.milestones}
            onSave={(milestone: Milestone) => {
              update({ milestones: [...config.milestones, milestone] });
              setQuickMilestoneDate(null);
            }}
            onCancel={() => setQuickMilestoneDate(null)}
            dateLocale={dateLocale}
          />
        )}
      </div>
    </I18nProvider>
  );
}
