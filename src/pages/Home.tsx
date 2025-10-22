// src/pages/Home.tsx
import React from 'react';
import { ShowCard } from '../components/ShowCard';
import { SearchBar } from '../components/SearchBar';
import { useTvShows } from '../hooks/useTvShows';

export const Home: React.FC = () => {
  const { shows, page, pages, loading, error, query, setQuery, goPage } = useTvShows();

  return (
    <main className="page-container">
      <header className="hero">
        <h1 className="brand">Wever<span className="accent">Watch</span></h1>
        <p className="subtitle">Explora series populares y busca tus favoritas</p>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <section className="content">
        {loading && <div className="info">Cargando...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && shows.length === 0 && <div className="info">No hay resultados.</div>}

        <div className="grid">
          {shows.map((s) => <ShowCard key={s.id} show={s} />)}
        </div>

        <div className="pagination">
          <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="page-btn">Anterior</button>
          <div className="page-info">Página {page} / {pages}</div>
          <button onClick={() => goPage(page + 1)} disabled={page >= pages} className="page-btn">Siguiente</button>
        </div>
      </section>
    </main>
  );
};
