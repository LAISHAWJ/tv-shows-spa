import { useState } from 'react';
import { Spin, Alert, message } from 'antd';
import Slider from 'react-slick';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import { usePopularShows, useSearchShows } from '../hooks/useTvShows';

interface Show {
  id: number;
  name: string;
  permalink: string;
  image_thumbnail_path?: string;
}

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: popularData, isLoading: popularLoading, isError: popularError } = usePopularShows(page);
  const { data: searchData, isLoading: searchLoading, isError: searchError } = useSearchShows(searchQuery, page);

  const data = searchQuery ? searchData : popularData;
  const loading = searchQuery ? searchLoading : popularLoading;
  const error = searchQuery ? searchError : popularError;

  const shows: Show[] = data?.tv_shows || [];
  const totalPages = data?.pages || 1;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) return <Spin tip="Cargando series..." className="mt-20" />;
  if (error) {
    message.error('Error al cargar datos');
    return <Alert message="Error al cargar datos" type="error" className="mt-20 max-w-md mx-auto" />;
  }

  return (
    <div className="min-h-screen bg-netflix-dark p-6">
      <div className="max-w-7xl mx-auto">
        <SearchBar onSearch={(query) => { setSearchQuery(query); setPage(1); }} />
        <h2 className="text-2xl font-bold text-white mb-4">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Series Populares'}
        </h2>
        <Slider {...sliderSettings}>
          {shows.map((show) => (
            <div key={show.id} className="px-2">
              <ShowCard id={show.id} name={show.name} image={show.image_thumbnail_path || 'https://via.placeholder.com/150'} />
            </div>
          ))}
        </Slider>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50 hover:bg-red-700 transition"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50 hover:bg-red-700 transition"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;