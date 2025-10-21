import { useState } from 'react';
import { Spin, Alert, message } from 'antd';
import Slider from 'react-slick';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import { usePopularShows, useSearchShows } from '../hooks/useTvShows';

interface Show {
  id: number;
  name: string;
  permalink: string;
  image_thumbnail_path?: string;
  image_path?: string; // HD
  rating?: number;
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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    prevArrow: <ArrowLeftOutlined className="text-emerald-green text-2xl" />,
    nextArrow: <ArrowRightOutlined className="text-emerald-green text-2xl" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) return <Spin tip="Cargando series..." className="mt-20 text-emerald-green" />;
  if (error) {
    message.error('Error al cargar datos');
    return <Alert message="Error al cargar datos" type="error" className="mt-20 max-w-md mx-auto border-emerald-green/20" />;
  }

  return (
    <div className="min-h-screen bg-black-bg p-4">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black-bg/80 backdrop-blur-md border-b border-emerald-green/20 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-emerald-green mb-2">TV Esmeralda</h1>
          <SearchBar onSearch={(query) => { setSearchQuery(query); setPage(1); }} />
        </div>
      </header>
      <div className="pt-24 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6 fade-in">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Series Populares'}
        </h2>
        <Slider {...sliderSettings}>
          {shows.map((show) => (
            <div key={show.id} className="px-2">
              <ShowCard
                id={show.id}
                name={show.name}
                image={show.image_path || show.image_thumbnail_path || 'https://via.placeholder.com/300x450?text=No+Image'} // HD priority
                rating={show.rating}
              />
            </div>
          ))}
        </Slider>
        <div className="mt-8 flex justify-center gap-4 fade-in">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-6 py-2 bg-emerald-green text-black rounded-full font-bold shadow-lg hover:shadow-emerald-green/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <span className="text-white self-center">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-6 py-2 bg-emerald-green text-black rounded-full font-bold shadow-lg hover:shadow-emerald-green/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;