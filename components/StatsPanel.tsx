"use client";

import { getStats } from "@/lib/calculations";
import { getNumberLocale, useT } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import {
  Calendar,
  Clock,
  HourglassHigh,
  HourglassLow,
  Percent,
  Cake,
  Timer,
} from "@phosphor-icons/react";
import { type ReactNode, useEffect, useState } from "react";

interface Props {
  birthDate: Date;
  lifeExpectancy: number;
  locale: Locale;
}

function StatCard({
  icon,
  label,
  value,
}: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
      <div className="text-zinc-400">{icon}</div>
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="font-semibold text-zinc-900 text-base dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );
}

interface TimeParts {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diffDates(from: Date, to: Date): TimeParts {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prev;
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days), hours: Math.max(0, hours), minutes: Math.max(0, minutes), seconds: Math.max(0, seconds) };
}

function useLiveClocks(birthDate: Date, lifeExpectancy: number) {
  const endDate = new Date(birthDate);
  endDate.setFullYear(endDate.getFullYear() + lifeExpectancy);

  const [state, setState] = useState(() => ({
    elapsed: diffDates(birthDate, new Date()),
    remaining: diffDates(new Date(), endDate),
  }));

  useEffect(() => {
    const end = new Date(birthDate);
    end.setFullYear(end.getFullYear() + lifeExpectancy);

    const id = setInterval(() => {
      const now = new Date();
      setState({
        elapsed: diffDates(birthDate, now),
        remaining: diffDates(now, end),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [birthDate, lifeExpectancy]);

  return state;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function StatsPanel({ birthDate, lifeExpectancy, locale }: Props) {
  const t = useT();
  const stats = getStats(birthDate, lifeExpectancy);
  const { elapsed, remaining } = useLiveClocks(birthDate, lifeExpectancy);
  const numLocale = getNumberLocale(locale);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <StatCard
        icon={<Calendar size={20} />}
        label={t.age}
        value={`${stats.age} ${t.years}`}
      />
      <StatCard
        icon={<Clock size={20} />}
        label={t.daysLived}
        value={stats.daysLived.toLocaleString(numLocale)}
      />
      <StatCard
        icon={<HourglassHigh size={20} />}
        label={t.weeksLived}
        value={stats.weeksLived.toLocaleString(numLocale)}
      />
      <StatCard
        icon={<HourglassLow size={20} />}
        label={t.weeksRemaining}
        value={stats.weeksRemaining.toLocaleString(numLocale)}
      />
      <StatCard
        icon={<Percent size={20} />}
        label={t.lifeLived}
        value={`${stats.percentLived.toFixed(1)}%`}
      />
      <StatCard
        icon={<Cake size={20} />}
        label={t.nextBirthday}
        value={`${stats.daysUntilBirthday} ${t.daysUnit}`}
      />
      <div className="col-span-2 flex items-center gap-3 rounded-lg border border-zinc-200 p-3 sm:col-span-3 dark:border-zinc-700">
        <div className="text-zinc-400">
          <Timer size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.timeLived}
          </p>
          <p className="font-semibold tabular-nums text-base text-zinc-900 dark:text-zinc-100">
            {elapsed.years}a {elapsed.months}m {elapsed.days}d{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              {pad(elapsed.hours)}:{pad(elapsed.minutes)}:{pad(elapsed.seconds)}
            </span>
          </p>
        </div>
        <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />
        <div className="hidden sm:block">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.timeRemaining}
          </p>
          <p className="font-semibold tabular-nums text-base text-zinc-900 dark:text-zinc-100">
            {remaining.years}a {remaining.months}m {remaining.days}d{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
            </span>
          </p>
        </div>
      </div>
      <div className="col-span-2 flex items-center gap-3 rounded-lg border border-zinc-200 p-3 sm:hidden dark:border-zinc-700">
        <div className="text-zinc-400">
          <HourglassLow size={20} />
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.timeRemaining}
          </p>
          <p className="font-semibold tabular-nums text-base text-zinc-900 dark:text-zinc-100">
            {remaining.years}a {remaining.months}m {remaining.days}d{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
