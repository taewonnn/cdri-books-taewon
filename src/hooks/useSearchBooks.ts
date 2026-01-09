import { fetchBooks, type BookSearchOptions } from '@/api/books';
import { useInfiniteQuery } from '@tanstack/react-query';

type UseSearchBooksParams = Omit<BookSearchOptions, 'page'>;

export default function useSearchBooks(params: UseSearchBooksParams) {
  const { query, sort = 'accuracy', size = 10, target } = params;

  return useInfiniteQuery({
    queryKey: ['books', { query, sort, size, target }],
    enabled: !!query,
    staleTime: 30 * 1000,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchBooks({
        query,
        sort,
        size,
        target,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta?.is_end) return undefined;
      return allPages.length + 1;
    },
  });
}
