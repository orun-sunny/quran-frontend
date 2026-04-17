"use client";

import { useState, useEffect } from "react";
import type { Surah } from "@/types/quran";

interface SurahDetailClientProps {
  surah: Surah;
}

export default function SurahDetailClient({ surah }: SurahDetailClientProps) {
  const [search, setSearch] = useState("");
  const [settings, setSettings] = useState({
    arabicFont: "amiri",
    arabicSize: 24,
    translationSize: 16,
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("quran_settings", JSON.stringify(settings));
  }, [settings]);

  const filteredAyahs = (surah.ayahs ?? []).filter((ayah) => {
    return (
      !search ||
      (ayah.translation &&
        ayah.translation.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-6">
      {/* Sidebar Settings Panel */}
      <div className="mb-6 lg:col-span-1 lg:mb-0">
        <div className="sticky top-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-medium text-gray-900">
            Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Arabic Font
              </label>
              <select
                value={settings.arabicFont}
                onChange={(e) =>
                  setSettings({ ...settings, arabicFont: e.target.value })
                }
                className="w-full rounded border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="amiri">Amiri (Traditional)</option>
                <option value="noto">Noto Naskh Arabic</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Arabic Size ({settings.arabicSize}px)
              </label>
              <input
                type="range"
                min="16"
                max="48"
                value={settings.arabicSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    arabicSize: Number(e.target.value),
                  })
                }
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Translation Size ({settings.translationSize}px)
              </label>
              <input
                type="range"
                min="12"
                max="32"
                value={settings.translationSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    translationSize: Number(e.target.value),
                  })
                }
                className="w-full accent-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ayahs List */}
      <div className="lg:col-span-3">
        <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search by translation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-gray-200 p-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-4">
          {filteredAyahs.length === 0 && (
            <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
              No ayah found.
            </div>
          )}
          {filteredAyahs.map((ayah) => (
            <div
              key={ayah.numberInSurah}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p
                className="mb-4 text-right leading-loose text-gray-800"
                style={{
                  fontSize: `${settings.arabicSize}px`,
                  fontFamily:
                    settings.arabicFont === "noto"
                      ? "'Noto Naskh Arabic', serif"
                      : "'Amiri', serif",
                }}
              >
                {ayah.text}
              </p>
              {ayah.translation && (
                <p
                  className="leading-relaxed text-gray-600"
                  style={{ fontSize: `${settings.translationSize}px` }}
                >
                  {ayah.translation}
                </p>
              )}
              <p className="mt-3 text-xs font-medium text-gray-300">
                Ayah {ayah.numberInSurah}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
