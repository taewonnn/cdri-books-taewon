import { fetchBooks, type BookSearchOptions } from '@/api/books';
import { useQuery } from '@tanstack/react-query';

export default function useSearchBooks(params: BookSearchOptions) {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => fetchBooks(params),
    enabled: !!params.query,
    staleTime: 30 * 1000,
  });
}
