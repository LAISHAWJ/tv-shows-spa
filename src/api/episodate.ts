// src/api/episodate.ts
import axios from 'axios';

const API_BASE = 'https://www.episodate.com/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export interface BasicShow {
  id: number;
  name: string;
  permalink: string;
  start_date?: string;
  end_date?: string;
  country?: string;
  network?: string;
  status?: string;
  image_thumbnail_path?: string;
}

export interface MostPopularResponse {
  total: number;
  page: number;
  pages: number;
  tv_shows: BasicShow[];
}

export interface SearchResponse {
  total: number;
  page: number;
  pages: number;
  tv_shows: BasicShow[];
}

export interface ShowDetails {
  id?: number;
  name?: string;
  url?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  country?: string;
  network?: string;
  status?: string;
  runtime?: number;
  rating?: string | number;
  genres?: string[];
  language?: string;
  image_path?: string;
  image_thumbnail_path?: string;
  // the API may include cast and seasons fields
  cast?: Array<{ name: string; character?: string; image?: string }>;
  seasons?: Array<{ season_number?: number; episode_count?: number }>;
}

export const getMostPopular = async (page = 1) => {
  const { data } = await api.get<MostPopularResponse>(`/most-popular?page=${page}`);
  return data;
};

export const searchShows = async (query: string, page = 1) => {
  const q = encodeURIComponent(query);
  const { data } = await api.get<SearchResponse>(`/search?q=${q}&page=${page}`);
  return data;
};

export const getShowDetails = async (q: string | number) => {
  const query = encodeURIComponent(String(q));
  const { data } = await api.get<{ tvShow: ShowDetails }>(`/show-details?q=${query}`);
  // API wraps details under tvShow (based on typical responses) — guard por si cambia:
  if ((data as any).tvShow) return (data as any).tvShow as ShowDetails;
  return (data as any) as ShowDetails;
};
