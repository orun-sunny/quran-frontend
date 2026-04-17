import Link from "next/link";
import { notFound } from "next/navigation";
import type { Surah, ApiResponse } from "@/types/quran";
import SurahDetailClient from "@/components/SurahDetailClient";
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
      <div className="mx-auto max-w-7xl">
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

        {/* Client-side Ayahs and Settings */}
        <SurahDetailClient surah={surah} />
      </div>
    </div>
  );
}
