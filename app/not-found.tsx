import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-zinc-900">
      <div className="mb-4 grid grid-cols-2 gap-1.5">
        <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <div className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <h1 className="mb-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        404
      </h1>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        Esta página no existe.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
