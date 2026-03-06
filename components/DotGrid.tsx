"use client";

import {
  formatDate,
  getColumnsForMode,
  getDateForUnit,
  getLivedUnits,
  getMilestonesForUnit,
  getTotalUnits,
} from "@/lib/calculations";
import { useT } from "@/lib/i18n";
import type { DotShape, Milestone, ViewMode } from "@/lib/types";
import { memo, useMemo, useState } from "react";

interface Props {
  birthDate: Date;
  lifeExpectancy: number;
  viewMode: ViewMode;
  milestones: Milestone[];
  dotShape?: DotShape;
  onDotClick?: (date: Date) => void;
  dateLocale?: string;
}

interface DotData {
  isLived: boolean;
  milestones: Milestone[];
  date: Date;
}

function dotBackground(milestones: Milestone[]): React.CSSProperties | undefined {
  if (milestones.length === 0) return undefined;
  if (milestones.length === 1) return { backgroundColor: milestones[0].color };
  const stops = milestones
    .map((m, i) => {
      const start = (i / milestones.length) * 100;
      const end = ((i + 1) / milestones.length) * 100;
      return `${m.color} ${start}% ${end}%`;
    })
    .join(", ");
  return { background: `conic-gradient(${stops})` };
}

function dotShapeStyle(shape: DotShape, sizeClass: string): { className: string } {
  if (shape === "square") return { className: `${sizeClass} rounded-none` };
  if (shape === "diamond") return { className: `${sizeClass} rounded-none rotate-45` };
  return { className: `${sizeClass} rounded-full` };
}

const Dot = memo(function Dot({
  dot,
  index,
  sizeClass,
  dotShape,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  viewMode,
  isTopRows,
  dateLocale,
  weekLabel,
  monthLabel,
  yearLabel,
}: {
  dot: DotData;
  index: number;
  sizeClass: string;
  dotShape: DotShape;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  viewMode: ViewMode;
  isTopRows: boolean;
  dateLocale: string;
  weekLabel: string;
  monthLabel: string;
  yearLabel: string;
}) {
  const hasMilestones = dot.milestones.length > 0;
  const bgStyle = dotBackground(dot.milestones);
  const shapeInfo = dotShapeStyle(dotShape, sizeClass);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className={`${shapeInfo.className} transition-transform hover:scale-150 ${
          dot.isLived
            ? hasMilestones
              ? ""
              : "bg-zinc-800 dark:bg-zinc-200"
            : "bg-zinc-200 dark:bg-zinc-700"
        }`}
        style={bgStyle}
      />

      {isHovered && (
        <div
          className={`absolute ${
            isTopRows
              ? "top-full mt-2"
              : "bottom-full mb-2"
          } left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900`}
        >
          <p className="font-medium">{formatDate(dot.date, dateLocale)}</p>
          {dot.milestones.map((m) => (
            <div key={m.id} className="mt-0.5 flex items-center gap-1.5 text-zinc-300 dark:text-zinc-600">
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: m.color }}
              />
              <span>{m.label}</span>
              {m.endDate && (
                <span className="text-zinc-400 dark:text-zinc-500">
                  {m.date} — {m.endDate}
                </span>
              )}
            </div>
          ))}
          {viewMode !== "years" && (
            <p className="text-zinc-400 dark:text-zinc-500">
              {viewMode === "weeks" ? weekLabel : monthLabel} {index + 1}
              {" | "}
              {yearLabel} {Math.floor(index / (viewMode === "weeks" ? 52 : 12))}
            </p>
          )}
          <div
            className={`absolute ${
              isTopRows
                ? "bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900 dark:border-b-zinc-100"
                : "top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"
            }`}
          />
        </div>
      )}
    </div>
  );
});

export function DotGrid({
  birthDate,
  lifeExpectancy,
  viewMode,
  milestones,
  dotShape = "circle",
  onDotClick,
  dateLocale = "es-ES",
}: Props) {
  const t = useT();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = getTotalUnits(lifeExpectancy, viewMode);
  const lived = getLivedUnits(birthDate, viewMode);
  const columns = getColumnsForMode(viewMode);

  const dots = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const isLived = i < lived;
      const dotMilestones = getMilestonesForUnit(birthDate, i, viewMode, milestones);
      const date = getDateForUnit(birthDate, i, viewMode);
      return { isLived, milestones: dotMilestones, date };
    });
  }, [total, lived, birthDate, viewMode, milestones]);

  const rowLabels = useMemo(() => {
    const rows = Math.ceil(total / columns);
    return Array.from({ length: rows }, (_, i) => {
      if (viewMode === "years") return `${i * 10}`;
      if (viewMode === "months") return `${i}`;
      return `${i}`;
    });
  }, [total, columns, viewMode]);

  const dotSize =
    viewMode === "weeks" ? "sm" : viewMode === "months" ? "md" : "lg";

  const sizeClasses = {
    sm: "h-2 w-2 sm:h-2.5 sm:w-2.5",
    md: "h-3 w-3 sm:h-4 sm:w-4",
    lg: "h-5 w-5 sm:h-7 sm:w-7",
  };

  const gapClasses = {
    sm: "gap-[2px] sm:gap-[3px]",
    md: "gap-1 sm:gap-1.5",
    lg: "gap-1.5 sm:gap-2",
  };

  // Top 3 rows — tooltips go below instead of above
  const topRowThreshold = columns * 3;

  return (
    <div className="relative w-full overflow-x-auto overflow-y-visible">
      <div className="flex flex-col items-center">
        <div className="mb-1">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
            {viewMode === "weeks" && t.eachRowYear(columns)}
            {viewMode === "months" && t.eachRowYearMonths(columns)}
            {viewMode === "years" && t.eachRowDecade(columns)}
          </p>
        </div>

        <div className="flex">
        {/* Age labels column */}
        <div
          className={`flex flex-col ${gapClasses[dotSize]} mr-1 sm:mr-2 shrink-0`}
        >
          {rowLabels.map((label, i) => (
            <div
              key={i}
              className={`flex items-center justify-end ${sizeClasses[dotSize]}`}
            >
              {(viewMode === "years" || i % 5 === 0) && (
                <span className="text-[9px] leading-none text-zinc-400 sm:text-[10px] dark:text-zinc-500">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Dots grid */}
        <div
          className={`grid ${gapClasses[dotSize]}`}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {dots.map((dot, i) => (
            <Dot
              key={i}
              dot={dot}
              index={i}
              sizeClass={sizeClasses[dotSize]}
              dotShape={dotShape}
              isHovered={hoveredIndex === i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onDotClick?.(dot.date)}
              viewMode={viewMode}
              isTopRows={i < topRowThreshold}
              dateLocale={dateLocale}
              weekLabel={t.weekLabel}
              monthLabel={t.monthLabel}
              yearLabel={t.yearLabel}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
          <span>{t.lived}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <span>{t.toLive}</span>
        </div>
        {milestones.length > 0 &&
          milestones.map((m) => (
            <div key={m.id} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: m.color }}
              />
              <span>{m.label}</span>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}
