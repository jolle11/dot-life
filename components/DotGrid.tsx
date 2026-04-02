"use client";

import {
  type MutableRefObject,
  memo,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  addUnits,
  formatDate,
  getUnitsBetween,
  getColumnsForMode,
  getDateForUnit,
  getTotalUnits,
  parseLocalDate,
} from "@/lib/calculations";
import { useT } from "@/lib/i18n";
import type { DotShape, Milestone, ViewMode } from "@/lib/types";

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
  isGhost: boolean;
  isLived: boolean;
  isCurrent: boolean;
  milestones: Milestone[];
  date: Date;
  startDate: Date;
  endDate: Date;
  positionInRow: number;
  rowLabel: string;
}

/**
 * Pre-compute a Map<dotIndex, Milestone[]> by intersecting milestone ranges
 * with the rendered dot intervals. The grid is small enough that this stays
 * cheap while keeping the calendar-aligned logic straightforward.
 */
function buildMilestoneMap(
  dots: Pick<DotData, "isGhost" | "startDate" | "endDate">[],
  milestones: Milestone[],
): Map<number, Milestone[]> {
  if (milestones.length === 0) return new Map();

  const map = new Map<number, Milestone[]>();

  for (const m of milestones) {
    const startDate = parseLocalDate(m.date);
    const endInclusive = parseLocalDate(m.endDate || m.date);
    const endExclusive = new Date(endInclusive);
    endExclusive.setDate(endExclusive.getDate() + 1);

    dots.forEach((dot, index) => {
      if (dot.isGhost) return;
      if (endExclusive > dot.startDate && startDate < dot.endDate) {
        const existing = map.get(index);
        if (existing) {
          existing.push(m);
        } else {
          map.set(index, [m]);
        }
      }
    });
  }

  return map;
}

function dotBackground(
  milestones: Milestone[],
): React.CSSProperties | undefined {
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

function dotShapeStyle(
  shape: DotShape,
  sizeClass: string,
): { className: string } {
  if (shape === "square") return { className: `${sizeClass} rounded-none` };
  if (shape === "diamond")
    return { className: `${sizeClass} rounded-none rotate-45` };
  return { className: `${sizeClass} rounded-full` };
}

/** Build an accessible label for a single dot */
function buildDotAriaLabel(
  dot: DotData,
  dateLocale: string,
  labels: { dotLived: string; dotFuture: string; dotToday: string },
): string {
  const dateStr = formatDate(dot.date, dateLocale);
  if (dot.isGhost) return dateStr;
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
  ariaLabel,
}: {
  dot: DotData;
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
  ariaLabel: string;
}) {
  const hasMilestones = dot.milestones.length > 0;
  const bgStyle = dotBackground(dot.milestones);
  const shapeInfo = dotShapeStyle(dotShape, sizeClass);
  const showTooltip = !dot.isGhost && (isHovered || isFocused);
  const dotClassName = dot.isGhost
    ? "bg-zinc-100 opacity-70 dark:bg-zinc-800/70"
    : dot.isCurrent
      ? hasMilestones
        ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-white dark:ring-blue-400 dark:ring-offset-zinc-900 dot-today-pulse"
        : "bg-blue-500 dark:bg-blue-400 dot-today-pulse"
      : dot.isLived
        ? hasMilestones
          ? ""
          : "bg-zinc-800 dark:bg-zinc-200"
        : "bg-zinc-200 dark:bg-zinc-700";

  return (
    <div
      className="relative"
      role="gridcell"
      aria-label={ariaLabel}
      aria-disabled={dot.isGhost || undefined}
      tabIndex={-1}
      onMouseEnter={dot.isGhost ? undefined : onMouseEnter}
      onMouseLeave={dot.isGhost ? undefined : onMouseLeave}
      onClick={dot.isGhost ? undefined : onClick}
      onKeyDown={onKeyDown}
    >
      <div
        className={`${shapeInfo.className} ${dot.isGhost ? "" : "cursor-pointer transition-transform hover:scale-150"} ${dotClassName}`}
        style={bgStyle}
      />

      {showTooltip && (
        <div
          role="tooltip"
          className={`absolute ${
            isTopRows ? "top-full mt-2" : "bottom-full mb-2"
          } left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900`}
        >
          <p className="font-medium">{formatDate(dot.date, dateLocale)}</p>
          {dot.milestones.map((m) => (
            <div
              key={m.id}
              className="mt-0.5 flex items-center gap-1.5 text-zinc-300 dark:text-zinc-600"
            >
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
              {viewMode === "weeks" ? weekLabel : monthLabel}{" "}
              {dot.positionInRow + 1}
              {" | "}
              {dot.rowLabel}
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
    return () => {
      if (clearHoverRef) clearHoverRef.current = null;
    };
  }, [clearHoverRef, clearHover]);

  const totalLifeUnits = getTotalUnits(lifeExpectancy, viewMode);
  const columns = getColumnsForMode(viewMode);
  const now = new Date();
  const lifeEndDate = useMemo(
    () => getDateForUnit(birthDate, totalLifeUnits, viewMode),
    [birthDate, totalLifeUnits, viewMode],
  );

  const { gridStartDate, displayTotal, rowLabels } = useMemo(() => {
    if (viewMode === "years") {
      const rows = Math.ceil(totalLifeUnits / columns);
      return {
        gridStartDate: birthDate,
        displayTotal: totalLifeUnits,
        rowLabels: Array.from({ length: rows }, (_, i) => `${i * 10}`),
      };
    }

    const startYear = birthDate.getFullYear();
    const endYear = startYear + lifeExpectancy;
    const rows = endYear - startYear + 1;

    return {
      gridStartDate: new Date(startYear, 0, 1),
      displayTotal: rows * columns,
      rowLabels: Array.from({ length: rows }, (_, i) => `${startYear + i}`),
    };
  }, [birthDate, columns, lifeExpectancy, totalLifeUnits, viewMode]);

  const boundaryPosition = useMemo(() => {
    if (viewMode === "years") return 0;
    const yearStart = new Date(birthDate.getFullYear(), 0, 1);
    return Math.min(
      columns - 1,
      Math.max(0, getUnitsBetween(yearStart, birthDate, viewMode)),
    );
  }, [birthDate, columns, viewMode]);

  const baseDots = useMemo(() => {
    const lastRowIndex = rowLabels.length - 1;

    return Array.from({ length: displayTotal }, (_, i) => {
      const startDate = addUnits(gridStartDate, i, viewMode);
      const endDate = addUnits(gridStartDate, i + 1, viewMode);
      const rowIndex = Math.floor(i / columns);
      const positionInRow = i % columns;
      const isGhost =
        viewMode === "years"
          ? false
          : rowIndex === 0
            ? positionInRow < boundaryPosition
            : rowIndex === lastRowIndex
              ? positionInRow > boundaryPosition
              : false;
      const isCurrent = !isGhost && now >= startDate && now < endDate;
      const isLived = !isGhost && !isCurrent && endDate <= now;
      const clampedDate = isGhost
        ? startDate
        : new Date(Math.max(startDate.getTime(), birthDate.getTime()));

      return {
        isGhost,
        isLived,
        isCurrent,
        milestones: [],
        date: clampedDate,
        startDate,
        endDate,
        positionInRow,
        rowLabel:
          viewMode === "years"
            ? rowLabels[rowIndex]
            : `${t.yearLabel} ${rowLabels[rowIndex]}`,
      };
    });
  }, [
    birthDate,
    columns,
    displayTotal,
    gridStartDate,
    lifeEndDate,
    now,
    rowLabels,
    boundaryPosition,
    t.yearLabel,
    viewMode,
  ]);

  const milestoneMap = useMemo(
    () => buildMilestoneMap(baseDots, milestones),
    [baseDots, milestones],
  );

  const dots = useMemo(() => {
    return baseDots.map((dot, i) => ({
      ...dot,
      milestones: milestoneMap.get(i) ?? [],
    }));
  }, [baseDots, milestoneMap]);

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
      if (nextIdx < 0 || nextIdx >= displayTotal) return;
      setFocusedIndex(nextIdx);
      // Move DOM focus to the cell
      const container = gridContainerRef.current;
      if (container) {
        const cells =
          container.querySelectorAll<HTMLElement>("[role='gridcell']");
        cells[nextIdx]?.focus({ preventScroll: false });
      }
    },
    [displayTotal],
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
          moveFocus(displayTotal - 1);
          break;
        case "Enter":
        case " ":
          if (dots[index] && !dots[index].isGhost)
            handleDotClick(dots[index].date);
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    },
    [moveFocus, columns, displayTotal, dots, handleDotClick],
  );

  // Aria labels cache
  const ariaLabels = useMemo(() => {
    const labels = {
      dotLived: t.dotLived,
      dotFuture: t.dotFuture,
      dotToday: t.dotToday,
    };
    return dots.map((dot) => buildDotAriaLabel(dot, dateLocale, labels));
  }, [dots, dateLocale, t.dotLived, t.dotFuture, t.dotToday]);

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
          {/* Row labels column */}
          <div
            className={`flex flex-col ${gapClasses[dotSize]} mr-1 sm:mr-2 shrink-0`}
            aria-hidden="true"
          >
            {rowLabels.map((label, i) => (
              <div
                key={label}
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
                key={dot.startDate.toISOString()}
                dot={dot}
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
