import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.episodate.com/api',
});

export const getPopularShows = async (page: number) => {
  try {
    const response = await api.get(`/most-popular?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener shows populares');
  }
};

export const searchShows = async (query: string, page: number) => {
  try {
    const response = await api.get(`/search?q=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al buscar shows');
  }
};

export const getShowDetails = async (id: string) => {
  try {
    const response = await api.get(`/show-details?q=${id}`);
    return response.data.tvShow; // tvShow con todos los detalles: genres, episodes, pictures, etc.
  } catch (error) {
    throw new Error('Error al obtener detalles del show');
  }
};