import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useShowDetails } from '../hooks/useTvShows';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useShowDetails(id!);

  if (isLoading) return <Spin tip="Cargando detalles..." />;
  if (isError) return <Alert message="Error al cargar detalles" type="error" />;

  return (
    <Card title={data.name} style={{ margin: 16 }}>
      <img src={data.image} alt={data.name} style={{ maxWidth: '100%' }} />
      <p>{data.description}</p>
      <p>Géneros: {data.genres.join(', ')}</p>
      {/* Agrega más: elenco, temporadas, etc. según API */}
    </Card>
  );
};

export default Detail;