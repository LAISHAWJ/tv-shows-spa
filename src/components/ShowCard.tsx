import React from 'react';
import { Link } from 'react-router-dom';
import type { BasicShow } from '../api/episodate';

const placeholder =
  'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850"><rect fill="%23222222" width="600" height="850"/></svg>';

export const ShowCard: React.FC<{ show: BasicShow }> = ({ show }) => {
  return (
    <article className="show-card">
      <Link to={`/detail/${show.id}`} className="card-link">
        <div className="thumb">
          <img
            src={show.image_thumbnail_path || placeholder}
            alt={show.name}
            loading="lazy"
          />
        </div>
        <div className="meta">
          <h3 className="title">{show.name}</h3>
          <p className="small">{show.network ? `${show.network} • ${show.country || ''}` : show.start_date}</p>
        </div>
      </Link>
    </article>
  );
};
