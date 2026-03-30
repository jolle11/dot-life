"use client";

import {
  formatDate,
  getColumnsForMode,
  getDateForUnit,
  getLivedUnits,
  getTotalUnits,
} from "@/lib/calculations";
import { useT } from "@/lib/i18n";
import type { DotShape, Milestone, ViewMode } from "@/lib/types";
import {
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Props {
  birthDate: Date;
  lifeExpectancy: number;
  viewMode: ViewMode;
  milestones: Milestone[];
  dotShape?: DotShape;
  onDotClick?: (date: Date) => void;
  dateLocale?: string;
  /** Ref that the parent can call to clear the hovered tooltip (e.g. before export) */
  clearHoverRef?: MutableRefObject<(() => void) | null>;
}

interface DotData {
  isLived: boolean;
  isCurrent: boolean;
  milestones: Milestone[];
  date: Date;
}

/**
 * Pre-compute a Map<dotIndex, Milestone[]> so we avoid O(dots × milestones)
 * per render. For each milestone we figure out which dot range it covers and
 * populate the map in O(milestones × span) which is much cheaper.
 */
function buildMilestoneMap(
  birthDate: Date,
  totalUnits: number,
  viewMode: ViewMode,
  milestones: Milestone[],
): Map<number, Milestone[]> {
  if (milestones.length === 0) return new Map();

  const map = new Map<number, Milestone[]>();

  for (const m of milestones) {
    const [sy, sm, sd] = m.date.split("-").map(Number);
    const startDate = new Date(sy, sm - 1, sd);

    const endStr = m.endDate || m.date;
    const [ey, em, ed] = endStr.split("-").map(Number);
    const endDate = new Date(ey, em - 1, ed);

    let startIdx: number;
    let endIdx: number;

    const msPerDay = 1000 * 60 * 60 * 24;

    switch (viewMode) {
      case "weeks": {
        const daysFromBirthToStart = Math.floor(
          (startDate.getTime() - birthDate.getTime()) / msPerDay,
        );
        const daysFromBirthToEnd = Math.floor(
          (endDate.getTime() - birthDate.getTime()) / msPerDay,
        );
        startIdx = Math.max(0, Math.floor(daysFromBirthToStart / 7));
        endIdx = Math.min(totalUnits - 1, Math.floor(daysFromBirthToEnd / 7));
        break;
      }
      case "months": {
        startIdx = Math.max(
          0,
          (startDate.getFullYear() - birthDate.getFullYear()) * 12 +
            (startDate.getMonth() - birthDate.getMonth()),
        );
        endIdx = Math.min(
          totalUnits - 1,
          (endDate.getFullYear() - birthDate.getFullYear()) * 12 +
            (endDate.getMonth() - birthDate.getMonth()),
        );
        break;
      }
      case "years": {
        startIdx = Math.max(0, startDate.getFullYear() - birthDate.getFullYear());
        endIdx = Math.min(totalUnits - 1, endDate.getFullYear() - birthDate.getFullYear());
        break;
      }
    }

    for (let i = startIdx; i <= endIdx; i++) {
      const existing = map.get(i);
      if (existing) {
        existing.push(m);
      } else {
        map.set(i, [m]);
      }
    }
  }

  return map;
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

/** Build an accessible label for a single dot */
function buildDotAriaLabel(
  dot: DotData,
  index: number,
  viewMode: ViewMode,
  dateLocale: string,
  labels: { dotLived: string; dotFuture: string; dotToday: string },
): string {
  const dateStr = formatDate(dot.date, dateLocale);
  let status: string;
  if (dot.isCurrent) {
    status = labels.dotToday;
  } else if (dot.isLived) {
    status = labels.dotLived;
  } else {
    status = labels.dotFuture;
  }
  const milestoneNames = dot.milestones.map((m) => m.label).join(", ");
  const base = `${dateStr} — ${status}`;
  return milestoneNames ? `${base} (${milestoneNames})` : base;
}

const Dot = memo(function Dot({
  dot,
  index,
  sizeClass,
  dotShape,
  isHovered,
  isFocused,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  viewMode,
  isTopRows,
  dateLocale,
  weekLabel,
  monthLabel,
  yearLabel,
  ariaLabel,
}: {
  dot: DotData;
  index: number;
  sizeClass: string;
  dotShape: DotShape;
  isHovered: boolean;
  isFocused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: ReactKeyboardEvent) => void;
  viewMode: ViewMode;
  isTopRows: boolean;
  dateLocale: string;
  weekLabel: string;
  monthLabel: string;
  yearLabel: string;
  ariaLabel: string;
}) {
  const hasMilestones = dot.milestones.length > 0;
  const bgStyle = dotBackground(dot.milestones);
  const shapeInfo = dotShapeStyle(dotShape, sizeClass);
  const showTooltip = isHovered || isFocused;

  return (
    <div
      className="relative"
      role="gridcell"
      aria-label={ariaLabel}
      tabIndex={-1}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div
        className={`${shapeInfo.className} cursor-pointer transition-transform hover:scale-150 ${
          dot.isCurrent
            ? hasMilestones
              ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-white dark:ring-blue-400 dark:ring-offset-zinc-900 dot-today-pulse"
              : "bg-blue-500 dark:bg-blue-400 dot-today-pulse"
            : dot.isLived
              ? hasMilestones
                ? ""
                : "bg-zinc-800 dark:bg-zinc-200"
              : "bg-zinc-200 dark:bg-zinc-700"
        }`}
        style={bgStyle}
      />

      {showTooltip && (
        <div
          role="tooltip"
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
  clearHoverRef,
}: Props) {
  const t = useT();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Expose a way for the parent to clear the hovered tooltip
  const clearHover = useCallback(() => {
    setHoveredIndex(null);
    setFocusedIndex(null);
  }, []);
  useEffect(() => {
    if (clearHoverRef) clearHoverRef.current = clearHover;
    return () => { if (clearHoverRef) clearHoverRef.current = null; };
  }, [clearHoverRef, clearHover]);

  const total = getTotalUnits(lifeExpectancy, viewMode);
  const lived = getLivedUnits(birthDate, viewMode);
  const columns = getColumnsForMode(viewMode);

  // The "current" dot index — the one that contains today
  const currentDotIndex = useMemo(() => Math.max(0, lived - 1), [lived]);

  // Pre-compute milestone map
  const milestoneMap = useMemo(
    () => buildMilestoneMap(birthDate, total, viewMode, milestones),
    [birthDate, total, viewMode, milestones],
  );

  const dots = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const isLived = i < lived;
      const isCurrent = i === currentDotIndex;
      const dotMilestones = milestoneMap.get(i) ?? [];
      const date = getDateForUnit(birthDate, i, viewMode);
      return { isLived, isCurrent, milestones: dotMilestones, date };
    });
  }, [total, lived, currentDotIndex, birthDate, viewMode, milestoneMap]);

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

  // Stable callbacks
  const handleMouseEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);
  const handleDotClick = useCallback(
    (date: Date) => onDotClick?.(date),
    [onDotClick],
  );

  // Keyboard navigation inside the grid
  const moveFocus = useCallback(
    (nextIdx: number) => {
      if (nextIdx < 0 || nextIdx >= total) return;
      setFocusedIndex(nextIdx);
      // Move DOM focus to the cell
      const container = gridContainerRef.current;
      if (container) {
        const cells = container.querySelectorAll<HTMLElement>("[role='gridcell']");
        cells[nextIdx]?.focus({ preventScroll: false });
      }
    },
    [total],
  );

  const handleGridKeyDown = useCallback(
    (e: ReactKeyboardEvent, index: number) => {
      let handled = true;
      switch (e.key) {
        case "ArrowRight":
          moveFocus(index + 1);
          break;
        case "ArrowLeft":
          moveFocus(index - 1);
          break;
        case "ArrowDown":
          moveFocus(index + columns);
          break;
        case "ArrowUp":
          moveFocus(index - columns);
          break;
        case "Home":
          moveFocus(0);
          break;
        case "End":
          moveFocus(total - 1);
          break;
        case "Enter":
        case " ":
          if (dots[index]) handleDotClick(dots[index].date);
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    },
    [moveFocus, columns, total, dots, handleDotClick],
  );

  // Aria labels cache
  const ariaLabels = useMemo(() => {
    const labels = { dotLived: t.dotLived, dotFuture: t.dotFuture, dotToday: t.dotToday };
    return dots.map((dot, i) => buildDotAriaLabel(dot, i, viewMode, dateLocale, labels));
  }, [dots, viewMode, dateLocale, t.dotLived, t.dotFuture, t.dotToday]);

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
          aria-hidden="true"
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
          ref={gridContainerRef}
          role="grid"
          aria-label={t.gridLabel}
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
              isFocused={focusedIndex === i}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleDotClick(dot.date)}
              onKeyDown={(e) => handleGridKeyDown(e, i)}
              viewMode={viewMode}
              isTopRows={i < topRowThreshold}
              dateLocale={dateLocale}
              weekLabel={t.weekLabel}
              monthLabel={t.monthLabel}
              yearLabel={t.yearLabel}
              ariaLabel={ariaLabels[i]}
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
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 dark:bg-blue-400 dot-today-pulse" />
          <span>{t.today}</span>
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
