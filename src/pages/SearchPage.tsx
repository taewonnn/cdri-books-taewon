import SearchSection from '@/components/search/SearchSection';
import SearchBar from '@/components/search/SearchBar';
import SearchResult from '@/components/search/SearchResult';

export default function SearchPage() {
  return (
    <div className="px-9">
      {/* 검색 */}
      <SearchSection className="mt-26">
        <SearchBar />
      </SearchSection>

      {/* 결과 */}
      <SearchResult />
    </div>
  );
}
