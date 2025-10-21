import { useParams, Link } from 'react-router-dom';
import { Spin, Alert, Button, message, Tag, List, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useShowDetails } from '../hooks/useTvShows';

interface ShowDetail {
  id: number;
  name: string;
  image_path: string; // HD
  description: string;
  genres: string[];
  cast?: string[]; // Elenco (si disponible en API)
  episodes: Array<{ season: number; episode: number; name: string; air_date: string }>; // Temporadas/episodios
  network: string;
  start_date: string;
  end_date: string | null;
  status: string;
  runtime: number;
  rating: number;
  rating_count: number;
  pictures: string[]; // Galería
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useShowDetails(id!);

  if (isLoading) return <Spin tip="Cargando detalles..." className="mt-20" />;
  if (isError) {
    message.error('Error al cargar detalles');
    return <Alert message="Error al cargar detalles" type="error" className="mt-20 max-w-md mx-auto" />;
  }

  const show: ShowDetail = data;

  // Agrupar episodios por temporada
  const seasons = show.episodes.reduce((acc: Record<number, { count: number; status: string }>, ep) => {
    if (!acc[ep.season]) acc[ep.season] = { count: 0, status: 'Ongoing' };
    acc[ep.season].count++;
    return acc;
  }, {});

  const seasonsList = Object.entries(seasons).map(([seasonNum, info]) => (
    <List.Item key={seasonNum}>
      <div className="flex justify-between w-full">
        <span className="text-white">Temporada {seasonNum}</span>
        <span className="text-emerald-green">{info.count} episodios - {info.status}</span>
      </div>
    </List.Item>
  ));

  return (
    <div
      className="min-h-screen bg-black-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${show.image_path || 'https://via.placeholder.com/1920x1080?text=No+Image'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-black-bg/90 backdrop-blur-md border-b border-emerald-green/20 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Button className="bg-emerald-green text-black hover:bg-emerald-dark">
            <Link to="/">
              <ArrowLeftOutlined /> Volver
            </Link>
          </Button>
        </div>
      </header>
      <div className="pt-24 max-w-6xl mx-auto px-4 pb-8 fade-in">
        <div className="flex flex-col lg:flex-row gap-8">
          <img
            src={show.image_path || 'https://via.placeholder.com/400x600?text=No+Image'}
            alt={show.name}
            className="w-full lg:w-1/3 rounded-lg shadow-2xl border-4 border-emerald-green/20"
          />
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-2 fade-in">{show.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-emerald-green mr-2">{show.rating}</span>
              <span className="text-gray-300">({show.rating_count} votos)</span>
            </div>
            <p className="mb-6 text-lg leading-relaxed fade-in">{show.description}</p>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-emerald-green">Géneros:</h3>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre, index) => (
                  <Tag
                    key={index}
                    color="success"
                    className="bg-emerald-green/20 border-emerald-green text-emerald-green hover:bg-emerald-green transition"
                  >
                    {genre}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 fade-in">
              <div>
                <p><strong>Network:</strong> {show.network || 'N/A'}</p>
                <p><strong>Start Date:</strong> {new Date(show.start_date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {show.end_date ? new Date(show.end_date).toLocaleDateString() : 'Ongoing'}</p>
                <p><strong>Status:</strong> <span className="text-emerald-green font-bold">{show.status}</span></p>
                <p><strong>Runtime:</strong> {show.runtime} min/episodio</p>
              </div>
              {show.cast && show.cast.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-emerald-green">Elenco Principal:</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {show.cast.slice(0, 5).map((actor, index) => (
                      <li key={index}>{actor}</li>
                    ))}
                    {show.cast.length > 5 && <li>...</li>}
                  </ul>
                </div>
              )}
            </div>
            <Divider className="border-emerald-green/20" />
            <h3 className="text-xl font-bold mb-2 text-emerald-green">Temporadas:</h3>
            <List
              dataSource={seasonsList}
              renderItem={(item) => <List.Item className="bg-gray-800 rounded p-2 mb-2 fade-in">{item}</List.Item>}
              className="mb-6"
            />
            {show.pictures && show.pictures.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-2 text-emerald-green">Galería:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {show.pictures.slice(0, 8).map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-32 object-cover rounded shadow-lg hover:shadow-emerald-green/50 transition"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;