// src/hooks/useTvShows.ts
import { useEffect, useState, useCallback } from 'react';
import { getMostPopular, searchShows } from '../api/episodate';
import type { BasicShow } from '../api/episodate';

export function useTvShows() {
  const [shows, setShows] = useState<BasicShow[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const fetchMostPopular = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMostPopular(p);
      setShows(data.tv_shows);
      setPage(data.page || p);
      setPages((data as any).pages || 1);
    } catch (err: any) {
      setError('No se pudo cargar los programas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSearch = useCallback(async (q: string, p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchShows(q, p);
      setShows(data.tv_shows);
      setPage(data.page || p);
      setPages((data as any).pages || 1);
    } catch (err: any) {
      setError('Error en la búsqueda. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // si query tiene texto, hacer búsqueda; si no, cargar most-popular
    if (query && query.trim().length > 0) {
      fetchSearch(query, 1);
    } else {
      fetchMostPopular(1);
    }
  }, [query, fetchMostPopular, fetchSearch]);

  const goPage = async (p: number) => {
    if (p < 1 || p > pages) return;
    setLoading(true);
    setError(null);
    try {
      if (query && query.trim().length > 0) {
        const data = await searchShows(query, p);
        setShows(data.tv_shows);
        setPage(data.page || p);
        setPages((data as any).pages || 1);
      } else {
        const data = await getMostPopular(p);
        setShows(data.tv_shows);
        setPage(data.page || p);
        setPages((data as any).pages || 1);
      }
    } catch {
      setError('No se pudo cambiar de página.');
    } finally {
      setLoading(false);
    }
  };

  return {
    shows,
    page,
    pages,
    loading,
    error,
    query,
    setQuery,
    goPage,
    refresh: () => {
      if (query && query.trim().length > 0) fetchSearch(query, page);
      else fetchMostPopular(page);
    },
  };
}
