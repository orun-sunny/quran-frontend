import type { Surah } from "@/types/quran";

interface SurahCardProps {
  surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
  return (
    <div className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-medium text-emerald-700">
          {surah.number}
        </div>
      </div>
      <p className="mb-1 text-right text-xl text-emerald-600">{surah.name}</p>
      <p className="text-sm font-medium text-gray-800">{surah.englishName}</p>
      <p className="mt-0.5 text-xs text-gray-400">
        {surah.numberOfAyahs} verses
      </p>
    </div>
  );
}
