export interface Ayah {
  numberInSurah: number;
  text: string;
  translation?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  ayahs?: Ayah[];
}

export interface ApiResponse<T> {
  data: T;
  code: number;
  status: string;
}