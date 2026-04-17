import type { Surah, ApiResponse } from "@/types/quran";
import SurahCard from "@/components/SurahCard";
import SurahListClient from "@/components/SurahListClient";

async function getSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch(
      "https://quran-web-api-kappa.vercel.app/api/surahs",
      {
        cache: "force-cache",
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map((s: any) => ({
      number: s.id,
      name: s.name_arabic,
      englishName: s.name_english,
      numberOfAyahs: s.total_ayah,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero & Surah List */}

        {/* Client component handles search*/}
        <SurahListClient surahs={surahs} />
      </div>
    </div>
  );
}
