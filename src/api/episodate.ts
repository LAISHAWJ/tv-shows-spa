import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.episodate.com/api',
});

export const getPopularShows = async (page: number) => {
  const response = await api.get(`/most-popular?page=${page}`);
  return response.data;  // { tv_shows: [], page: number, pages: number }
};

export const searchShows = async (query: string, page: number) => {
  const response = await api.get(`/search?q=${query}&page=${page}`);
  return response.data;  // { tv_shows: [], page: number, pages: number, total: string }
};

export const getShowDetails = async (id: string) => {
  const response = await api.get(`/show-details?q=${id}`);
  return response.data.tvShow;  // Objeto con details
};