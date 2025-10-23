import React from 'react';
import { ShowCard } from '../components/ShowCard';
import { SearchBar } from '../components/SearchBar';
import { useTvShows } from '../hooks/useTvShows';

export const Home: React.FC = () => {
  const { shows, page, pages, loading, error, query, setQuery, goPage } = useTvShows();

  return (
    <>
      {/* Navbar superior */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <img src="/logoww.png" alt="WeverWatch" className="navbar-logo" />
            <span className="navbar-subtitle">Explora series populares y busca tus favoritas</span>
          </div>
          
          <div className="navbar-search">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="page-container">
        <section className="content">
          {loading && <div className="info">Cargando...</div>}
          {error && <div className="error">{error}</div>}

          {!loading && shows.length === 0 && <div className="info">No hay resultados.</div>}

          <div className="grid">
            {shows.map((s) => <ShowCard key={s.id} show={s} />)}
          </div>

          <div className="pagination">
            <button onClick={() => goPage(page - 1)} disabled={page <= 1} className="page-btn">
              Anterior
            </button>
            <div className="page-info">Página {page} / {pages}</div>
            <button onClick={() => goPage(page + 1)} disabled={page >= pages} className="page-btn">
              Siguiente
            </button>
          </div>
        </section>
      </main>
    </>
  );
};