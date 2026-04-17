import Link from "next/link";
import { notFound } from "next/navigation";
import type { Surah, ApiResponse } from "@/types/quran";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSurah(id: string): Promise<Surah | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/surahs/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.surah_info) return null;
    return {
      number: data.surah_info.id,
      name: data.surah_info.name_arabic,
      englishName: data.surah_info.name_english,
      numberOfAyahs: data.surah_info.total_ayah,
      ayahs: (data.ayahs || []).map((a: any) => ({
        numberInSurah: a.ayah_number,
        text: a.arabic_text,
        translation: a.translation,
      })),
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:5000/api/surahs");
    const data = await res.json();
    return (data || []).map((s: any) => ({ id: String(s.id) }));
  } catch {
    return [];
  }
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surah = await getSurah(id);

  if (!surah) notFound();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700"
        >
          ← Back
        </Link>

        {/* Surah header */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-medium text-emerald-700">
                {surah.number}
              </div>
              <div>
                <h1 className="font-serif text-lg font-medium text-gray-900">
                  {surah.englishName}
                </h1>
                <p className="text-sm text-gray-400">
                  {surah.numberOfAyahs} verses
                </p>
              </div>
            </div>
            <span className="text-2xl text-emerald-600">{surah.name}</span>
          </div>
        </div>

        {/* Ayahs */}
        <div className="space-y-3">
          {(surah.ayahs ?? []).map((ayah) => (
            <div
              key={ayah.numberInSurah}
              className="rounded-xl border border-gray-100 bg-white p-5"
            >
              <p className="mb-1 text-xs font-medium text-gray-300">
                Verse {ayah.numberInSurah}
              </p>
              <p className="mb-3 text-right text-2xl leading-loose text-gray-800">
                {ayah.text}
              </p>
              {ayah.translation && (
                <p className="text-sm leading-relaxed text-gray-500">
                  {ayah.translation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
