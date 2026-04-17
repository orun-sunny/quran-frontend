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
    <>


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
    </>
  );
}
