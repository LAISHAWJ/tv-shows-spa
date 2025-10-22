// src/pages/Detail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowDetails, type ShowDetails } from '../api/episodate';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [show, setShow] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getShowDetails(id)
      .then((d) => setShow(d))
      .catch(() => setError('No se pudieron cargar los detalles.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="page-container detail-page">
      <button className="back-btn" onClick={() => nav(-1)}>← Volver</button>

      {loading && <div className="info">Cargando...</div>}
      {error && <div className="error">{error}</div>}

      {show && (
        <div className="detail-card">
          <div className="left">
            <img src={show.image_path || show.image_thumbnail_path || ''} alt={show.name} />
          </div>

          <div className="right">
            <h2 className="title">{show.name}</h2>
            <p className="meta">{show.country} • {show.network} • {show.status}</p>
            <div className="genres">
              {show.genres && show.genres.map((g) => <span key={g} className="genre">{g}</span>)}
            </div>

            <section className="summary" dangerouslySetInnerHTML={{ __html: show.description || 'Sin descripción disponible.' }} />

            {show.cast && show.cast.length > 0 && (
              <section>
                <h4>Elenco</h4>
                <div className="cast">
                  {show.cast.slice(0, 8).map((c, i) => (
                    <div className="cast-item" key={i}>
                      <div className="cast-img"><img src={c.image || ''} alt={c.name} /></div>
                      <div className="cast-name">{c.name}{c.character ? <span className="char"> — {c.character}</span> : null}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {show.seasons && show.seasons.length > 0 && (
              <section>
                <h4>Temporadas</h4>
                <ul className="seasons">
                  {show.seasons.map((s, i) => <li key={i}>Temporada {s.season_number} • {s.episode_count ?? 'N/A'} capítulos</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
