import { useState } from 'react';
import { Table, Pagination, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { usePopularShows } from '../hooks/useTvShows';
import { useSearchShows } from '../hooks/useTvShows';

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: popularData, isLoading: popularLoading, isError: popularError } = usePopularShows(page);
  const { data: searchData, isLoading: searchLoading, isError: searchError } = useSearchShows(searchQuery, page);

  const data = searchQuery ? searchData : popularData;
  const loading = searchQuery ? searchLoading : popularLoading;
  const error = searchQuery ? searchError : popularError;

  const shows = data?.tv_shows || [];  // tv_shows es el array
  const totalPages = data?.pages || 1;  // Para paginación

  const columns = [
    { title: 'Título', dataIndex: 'name', key: 'name', render: (text: string, record: any) => <Link to={`/show/${record.id}`}>{text}</Link> },
    { title: 'Resumen', dataIndex: 'permalink', key: 'permalink' },  // Ajusta según API
    // Agrega más columnas si quieres (ej: imagen con <img src={record.image_thumbnail_path} />)
  ];

  if (loading) return <Spin tip="Cargando..." />;
  if (error) return <Alert message="Error al cargar datos" type="error" />;

  return (
    <div style={{ padding: 16 }}>
      <SearchBar onSearch={setSearchQuery} />
      <Table columns={columns} dataSource={shows} rowKey="id" pagination={false} />
      <Pagination current={page} total={totalPages * 10} pageSize={10} onChange={setPage} style={{ marginTop: 16 }} />
    </div>
  );
};

export default Home;