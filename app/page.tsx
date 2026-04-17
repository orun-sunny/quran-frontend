import type { Surah, ApiResponse } from "@/types/quran";

async function getSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch("http://localhost:5000/api/surahs", {
      cache: "force-cache",
    });
    console.log("API Response:", res.status);

    const json = await res.json();
    console.log("🔥 API Response:", json);
    if (!res.ok) return [];
    const apiResponse: ApiResponse<Surah[]> = await res.json();
    return apiResponse?.data ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="font-serif text-2xl font-medium tracking-tight">
            Al<span className="text-emerald-600">Quran</span>
          </h1>
          <span className="text-sm text-gray-400">114 Surahs</span>
        </div>

        {/* Client component handles search + filter state */}
      </div>
    </div>
  );
}
