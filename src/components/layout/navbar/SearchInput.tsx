"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchIcon = (
  <svg
    height="18"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="18"
    style={{ color: "currentcolor" }}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
      fill="currentColor"
    />
  </svg>
);

function SearchInputContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentQuery = searchParams.get("q") ?? "";
  const [term, setTerm] = useState(currentQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTerm(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    if (term === currentQuery) return;

    const timer = window.setTimeout(() => {
      startTransition(() => {
        router.replace(term.trim() ? `/search?q=${encodeURIComponent(term.trim())}` : "/search");
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [currentQuery, router, term]);

  return (
    <div className="relative flex h-12 w-full min-w-0 overflow-hidden rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm transition focus-within:border-[#073c55] focus-within:ring-2 focus-within:ring-[#073c55]/10">
      <span className="flex w-12 shrink-0 items-center justify-center text-[#073c55]">
        {SearchIcon}
      </span>
      <input
        name="q"
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
        placeholder="Buscar productos o categorías..."
        aria-label="Buscar productos"
        className="h-full w-full min-w-0 bg-white px-2 pr-20 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400"
        aria-live="polite"
      >
        {isPending ? "Buscando..." : ""}
      </span>
    </div>
  );
}

export const SearchInput = () => (
  <Suspense
    fallback={
      <div className="flex h-12 w-full min-w-0 overflow-hidden rounded-md border border-slate-300 bg-white">
        <span className="flex w-12 items-center justify-center text-[#073c55]">{SearchIcon}</span>
        <input
          placeholder="Buscar productos o categorías..."
          aria-label="Buscar productos"
          className="h-full w-full bg-white px-2 text-sm"
          type="search"
          disabled
        />
      </div>
    }
  >
    <SearchInputContent />
  </Suspense>
);
