import BookList from '@/components/books/BookList';
import SearchBar from '@/components/search/SearchBar';
import SearchSection from '@/components/search/SearchSection';
import useSearchBooks from '@/hooks/useSearchBooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  /** 검색 결과 */
  /** @todo 시간 남으면 중복 제거 */
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchBooks({ query });

  const books = data?.pages.flatMap(page => page.documents) ?? [];
  const totalCount = data?.pages?.[0]?.meta?.total_count ?? 0;

  return (
    <div>
      {/* 검색 */}
      <SearchSection className="mt-26">
        <SearchBar initialValue={query} onSubmit={q => navigate(`/search?query=${encodeURIComponent(q)}`)} />
      </SearchSection>

      <p className="mt-6 mb-9 text-base text-primary font-medium">
        도서검색 결과 : <span className="text-blue">{totalCount}</span>건
      </p>

      {/* 결과 */}
      <BookList books={books} isLoading={isPending} isFetchingNextPage={isFetchingNextPage} nextSkeletonCount={3} />

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="h-12 px-8 rounded-lg bg-lightGray text-secondary font-medium disabled:opacity-50"
          >
            {isFetchingNextPage ? '불러오는 중...' : '더보기'}
          </button>
        </div>
      )}

      {!hasNextPage && books.length > 0 && (
        <p className="my-8 text-center text-sm text-secondary">마지막 페이지입니다.</p>
      )}
    </div>
  );
}
