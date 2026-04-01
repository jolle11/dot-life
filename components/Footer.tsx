"use client";

import { GlobeSimple, XLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} dot life
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://www.jordi-olle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            aria-label="Website"
          >
            <GlobeSimple size={20} />
          </a>
          <a
            href="https://x.com/jordi0lle"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            aria-label="X (Twitter)"
          >
            <XLogo size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
