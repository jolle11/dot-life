export default function Loading() {
  const skeletonDots = Array.from({ length: 16 }, (_, index) => ({
    id: `dot-${index}`,
    delay: `${index * 75}ms`,
  }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-4">
        {/* Animated dot grid skeleton */}
        <div className="grid grid-cols-4 gap-2">
          {skeletonDots.map((dot) => (
            <div
              key={dot.id}
              className="h-3 w-3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"
              style={{ animationDelay: dot.delay }}
            />
          ))}
        </div>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">dot life</p>
      </div>
    </div>
  );
}
