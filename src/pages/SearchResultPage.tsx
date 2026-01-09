import BookList from '@/components/books/BookList';
import SearchBar from '@/components/search/SearchBar';
import SearchSection from '@/components/search/SearchSection';
import useSearchBooks from '@/hooks/useSearchBooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  /** 검색 결과 */
  const { data, isLoading } = useSearchBooks({ query, page });

  return (
    <div>
      {/* 검색 */}
      <SearchSection className="mt-26">
        <SearchBar
          initialValue={query}
          onSubmit={query => navigate(`/search?query=${encodeURIComponent(query)}&page=1`)}
        />
      </SearchSection>

      <p className="mt-6 mb-9 text-base text-primary font-medium">
        도서검색 결과 : <span className="text-blue">{data?.meta.total_count}</span>건
      </p>

      {/* 결과 */}
      <BookList books={data?.documents ?? []} isLoading={isLoading} />
    </div>
  );
}
