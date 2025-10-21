import { useParams, Link } from 'react-router-dom';
import { Spin, Alert, Button, message, Tag, List, Divider, Rate } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useShowDetails } from '../hooks/useTvShows';

interface ShowDetail {
  id: number;
  name: string;
  image_path: string; // HD
  description: string;
  genres: string[];
  cast?: string[];
  episodes: Array<{ season: number; episode: number; name: string; air_date: string }>;
  network: string;
  start_date: string;
  end_date: string | null;
  status: string;
  runtime: number;
  rating: number;
  rating_count: number;
  pictures: string[];
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useShowDetails(id!);

  if (isLoading) return <Spin tip="Cargando detalles..." className="mt-20 text-emerald-green" />;
  if (isError) {
    message.error('Error al cargar detalles');
    return <Alert message="Error al cargar detalles" type="error" className="mt-20 max-w-md mx-auto border-emerald-green/20" />;
  }

  const show: ShowDetail = data;

  // Agrupar episodios por temporada
  const seasons = show.episodes.reduce((acc: Record<number, { count: number; status: string }>, ep) => {
    if (!acc[ep.season]) acc[ep.season] = { count: 0, status: 'Ongoing' };
    acc[ep.season].count++;
    return acc;
  }, {});

  const seasonsList = Object.entries(seasons).map(([seasonNum, info]) => (
    <List.Item key={seasonNum} className="bg-black-bg rounded p-2 mb-2 border border-emerald-dark/20 fade-in">
      <div className="flex justify-between w-full text-white">
        <span className="font-bold">Temporada {seasonNum}</span>
        <span className="text-emerald-green">{info.count} episodios - {info.status}</span>
      </div>
    </List.Item>
  ));

  return (
    <div
      className="min-h-screen bg-black-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${show.image_path || 'https://via.placeholder.com/1920x1080?text=No+Image'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-5xl mx-auto p-6 fade-in">
        <Button className="mb-6 bg-emerald-green text-black hover:bg-emerald-dark glow-hover">
          <Link to="/">
            <ArrowLeftOutlined /> Volver
          </Link>
        </Button>
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={show.image_path || 'https://via.placeholder.com/300x450?text=HD+Image'}
            alt={show.name}
            className="w-full lg:w-1/4 rounded-lg shadow-lg border-2 border-emerald-dark"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-white">{show.name}</h1>
            <Rate disabled defaultValue={show.rating / 2} className="mb-4 text-emerald-green" />
            <p className="text-light-gray mb-4"><strong>Descripción:</strong> {show.description}</p>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-emerald-green">Géneros:</h3>
              {show.genres.map((genre, index) => (
                <Tag key={index} color="success" className="mb-2 bg-emerald-green/20 border-emerald-green text-emerald-green hover:bg-emerald-dark transition">
                  {genre}
                </Tag>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-emerald-green">Elenco:</h3>
              <ul className="list-disc list-inside text-light-gray">
                {show.cast?.map((actor, index) => (
                  <li key={index}>{actor}</li>
                )) || <li>N/A</li>}
              </ul>
            </div>
            <Divider className="border-emerald-dark/20" />
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-emerald-green">Temporadas:</h3>
              <List dataSource={seasonsList} renderItem={(item) => item} className="bg-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-light-gray">
              <p><strong>Network:</strong> {show.network || 'N/A'}</p>
              <p><strong>Start Date:</strong> {new Date(show.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {show.end_date ? new Date(show.end_date).toLocaleDateString() : 'Ongoing'}</p>
              <p><strong>Status:</strong> {show.status}</p>
              <p><strong>Runtime:</strong> {show.runtime} min</p>
              <p><strong>Rating:</strong> {show.rating} ({show.rating_count} votos)</p>
            </div>
            {show.pictures && show.pictures.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2 text-emerald-green">Galería:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {show.pictures.slice(0, 6).map((pic, index) => (
                    <img key={index} src={pic} alt={`Galería ${index + 1}`} className="w-full h-32 object-cover rounded shadow-md hover:shadow-emerald-green/50 transition" />
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