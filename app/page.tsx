"use client";

import { DotGrid } from "@/components/DotGrid";
import { LocalePicker } from "@/components/LocalePicker";
import { MilestoneEditor } from "@/components/MilestoneEditor";
import { QuickMilestone } from "@/components/QuickMilestone";
import { SettingsDrawer } from "@/components/SettingsDrawer";
import { StatsPanel } from "@/components/StatsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
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
import { CaretDown, CirclesFour, Export, List, LinkSimple, Check, X } from "@phosphor-icons/react";
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
  const [showHelp, setShowHelp] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

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
    } else {
      // system default: follow OS preference and keep watching for changes
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      document.documentElement.classList.toggle("dark", mq.matches);
      const handler = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("dot-life-theme")) {
          document.documentElement.classList.toggle("dark", e.matches);
        }
      };
      mq.addEventListener("change", handler);
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

  useEffect(() => {
    if (sharedConfig !== null) return;
    const handleTouchStart = (e: TouchEvent) => {
      swipeStartX.current = e.touches[0].clientX;
      swipeStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (swipeStartX.current === null || swipeStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - swipeStartX.current;
      const dy = Math.abs(e.changedTouches[0].clientY - swipeStartY.current);
      // Ignore if more vertical than horizontal
      if (dy > Math.abs(dx)) return;
      // Swipe left from right edge → open drawer
      if (!showControls && dx < -50 && swipeStartX.current > window.innerWidth - 60) {
        setShowControls(true);
      }
      // Swipe right while drawer is open → close drawer
      if (showControls && dx > 50) {
        setShowControls(false);
      }
      swipeStartX.current = null;
      swipeStartY.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showControls, sharedConfig]);

  useEffect(() => {
    if (!config?.birthDate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      switch (e.key) {
        case "w":
        case "W":
          update({ viewMode: "weeks" });
          break;
        case "m":
        case "M":
          update({ viewMode: "months" });
          break;
        case "y":
        case "Y":
          update({ viewMode: "years" });
          break;
        case "?":
          setShowHelp((v) => !v);
          break;
        case "Escape":
          setShowHelp(false);
          setShowControls(false);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [config, update]);

  useEffect(() => {
    if (!config?.birthDate) return;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (showControls) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const isRightEdge = touchStartX > window.innerWidth - 32;
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
      const isSwipeLeft = deltaX < -50;
      if (isRightEdge && isHorizontalSwipe && isSwipeLeft) {
        setShowControls(true);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [config?.birthDate, showControls]);

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
        width: gridRef.current.scrollWidth,
        height: gridRef.current.scrollHeight,
        style: { overflow: "hidden" },
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
                className="hidden sm:inline-flex rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                aria-label={t.exportChart}
              >
                {exporting ? (
                  <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Export size={18} />
                )}
              </button>
              <LocalePicker value={locale} onChange={setLocale} />
              <ThemeToggle />
              {!isShared && (
                <button
                  type="button"
                  onClick={() => setShowControls(!showControls)}
                  className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                  aria-label={t.settings}
                >
                  <List size={18} />
                </button>
              )}
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

          {/* Stats */}
          {!isShared && (
            <div className="mb-3">
              <StatsPanel
                birthDate={birthDate}
                lifeExpectancy={config.lifeExpectancy}
                locale={locale}
              />
            </div>
          )}

          {/* Milestones */}
          {!isShared && (
            <div className="mb-3 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowMilestones((v) => !v)}
                className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {t.milestones} ({config.milestones.length})
                </span>
                <CaretDown
                  size={16}
                  className={`text-zinc-400 transition-transform duration-200 ${showMilestones ? "rotate-180" : ""}`}
                />
              </button>
              {showMilestones && (
                <div className="border-t border-zinc-200 dark:border-zinc-700 p-4">
                  <MilestoneEditor
                    milestones={config.milestones}
                    onChange={(milestones) => update({ milestones })}
                    birthDate={config.birthDate}
                  />
                </div>
              )}
            </div>
          )}

          {/* Dot Grid */}
          <div ref={gridRef} className="rounded-xl border border-zinc-200 p-4 sm:p-6 dark:border-zinc-700">
            <DotGrid
              birthDate={birthDate}
              lifeExpectancy={config.lifeExpectancy}
              viewMode={config.viewMode}
              milestones={config.milestones}
              dotShape={config.dotShape ?? "circle"}
              onDotClick={isShared ? undefined : (date) => setQuickMilestoneDate(date)}
              dateLocale={dateLocale}
            />
          </div>
        </main>

        {!isShared && (
          <SettingsDrawer
            open={showControls}
            onClose={() => setShowControls(false)}
            config={config}
            onUpdate={update}
            onShowHelp={() => setShowHelp(true)}
          />
        )}

        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
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
          )}
        </AnimatePresence>

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
