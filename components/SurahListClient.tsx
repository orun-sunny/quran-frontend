"use client";

import { useState } from "react";
import Link from "next/link";
import type { Surah } from "@/types/quran";
import SurahCard from "./SurahCard";

interface SurahListClientProps {
  surahs: Surah[];
}

export default function SurahListClient({ surahs }: SurahListClientProps) {
  const [query, setQuery] = useState("");

  const filtered = surahs.filter((s) => {
    const matchQuery =
      !query ||
      s.englishName.toLowerCase().includes(query.toLowerCase()) ||
      String(s.number).includes(query);
    return matchQuery;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-24">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1609599006353-e629aaab31ce?auto=format&fit=crop&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient from-slate-900/80 to-transparent"></div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Al Qur'an Digital
          </h1>
          <p className="mb-8 text-lg text-slate-200">
            "Read the Quran, for verily it will come on the Day of Resurrection
            as an intercessor for its companions."
          </p>

          <div className="mx-auto max-w-2xl text-left">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="What surah do you want to read?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border-0 bg-white/95 py-4 pl-6 pr-12 text-slate-800 shadow-lg outline-none backdrop-blur-sm focus:ring-2 focus:ring-emerald-500"
              />
              <div className="absolute right-4 text-emerald-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Al Kahf", "Al Mulk", "Yaseen"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white/30 backdrop-blur-md"
                >
                  Surah {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((surah) => (
          <Link key={surah.number} href={`/surah/${surah.number}`}>
            <SurahCard surah={surah} />
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-gray-400">
          No surahs found.
        </p>
      )}
    </div>
  );
}
