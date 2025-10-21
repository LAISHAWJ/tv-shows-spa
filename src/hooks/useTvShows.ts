import { useQuery } from '@tanstack/react-query';
import { getPopularShows, searchShows, getShowDetails } from '../api/episodate';

export const usePopularShows = (page: number) => {
  return useQuery({
    queryKey: ['popularShows', page],
    queryFn: () => getPopularShows(page),
  });
};

export const useSearchShows = (query: string, page: number) => {
  return useQuery({
    queryKey: ['searchShows', query, page],
    queryFn: () => searchShows(query, page),
    enabled: !!query,  // Solo fetch si hay query
  });
};

export const useShowDetails = (id: string) => {
  return useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => getShowDetails(id),
  });
};