export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-4">
        {/* Animated dot grid skeleton */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"
              style={{ animationDelay: `${i * 75}ms` }}
            />
          ))}
        </div>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">dot life</p>
      </div>
    </div>
  );
}
