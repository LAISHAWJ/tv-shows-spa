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
      .then((d) => {
        console.log('Datos de la serie:', d); // Para debug
        setShow(d);
      })
      .catch((err) => {
        console.error('Error al cargar detalles:', err);
        setError('No se pudieron cargar los detalles.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="page-container detail-page">
      <button className="back-btn" onClick={() => nav(-1)}>
        Volver
      </button>

      {loading && <div className="info">Cargando detalles de la serie...</div>}
      {error && <div className="error">{error}</div>}

      {show && (
        <div className="detail-card">
          <div className="left">
            <img 
              src={show.image_path || show.image_thumbnail_path || '/placeholder.jpg'} 
              alt={show.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.jpg';
              }}
            />
            
            {/* Info adicional en sidebar */}
            <div className="sidebar-info">
              <div className="info-block">
                <span className="info-label">Estado</span>
                <span className="info-value">{show.status || 'N/A'}</span>
              </div>
              <div className="info-block">
                <span className="info-label">País</span>
                <span className="info-value">{show.country || 'N/A'}</span>
              </div>
              <div className="info-block">
                <span className="info-label">Cadena</span>
                <span className="info-value">{show.network || 'N/A'}</span>
              </div>
              {show.start_date && (
                <div className="info-block">
                  <span className="info-label">Inicio</span>
                  <span className="info-value">{show.start_date}</span>
                </div>
              )}
            </div>
          </div>

          <div className="right">
            <h2 className="title">{show.name}</h2>
            
            {/* Géneros */}
            {show.genres && show.genres.length > 0 && (
              <div className="genres">
                {show.genres.map((g) => (
                  <span key={g} className="genre">{g}</span>
                ))}
              </div>
            )}

            {/* Resumen */}
            <section className="summary-section">
              <h3 className="section-title">Resumen</h3>
              <div 
                className="summary" 
                dangerouslySetInnerHTML={{ 
                  __html: show.description || 'Sin descripción disponible.' 
                }} 
              />
            </section>

            {/* Temporadas */}
            {(show as any).episodes && (show as any).episodes.length > 0 && (
              <section className="seasons-section">
                <h3 className="section-title">
                  Temporadas ({getSeasonCount((show as any).episodes)})
                </h3>
                <div className="seasons-grid">
                  {getSeasonsList((show as any).episodes).map((season) => (
                    <div key={season.number} className="season-card">
                      <div className="season-header">
                        <h4 className="season-title">Temporada {season.number}</h4>
                        <span className="season-count">{season.episodes} episodios</span>
                      </div>
                      <div className="season-episodes">
                        {season.episodeList.slice(0, 3).map((ep) => (
                          <div key={ep.episode} className="episode-mini">
                            <span className="ep-number">Ep. {ep.episode}</span>
                            <span className="ep-name">{ep.name}</span>
                          </div>
                        ))}
                        {season.episodes > 3 && (
                          <div className="episode-more">
                            +{season.episodes - 3} episodios más
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

// Funciones helper para procesar temporadas desde episodes
function getSeasonCount(episodes: any[]): number {
  const seasons = new Set(episodes.map(ep => ep.season));
  return seasons.size;
}

function getSeasonsList(episodes: any[]): Array<{
  number: number;
  episodes: number;
  episodeList: any[];
}> {
  const seasonsMap = new Map<number, any[]>();
  
  episodes.forEach(ep => {
    const season = ep.season;
    if (!seasonsMap.has(season)) {
      seasonsMap.set(season, []);
    }
    seasonsMap.get(season)!.push(ep);
  });
  
  return Array.from(seasonsMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([number, episodeList]) => ({
      number,
      episodes: episodeList.length,
      episodeList: episodeList.sort((a, b) => a.episode - b.episode)
    }));
}