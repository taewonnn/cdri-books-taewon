import SearchSection from '@/components/search/SearchSection';
import SearchBar from '@/components/search/SearchBar';
import { useNavigate } from 'react-router-dom';
import Empty from '@/components/common/Empty';

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="px-9">
      {/* 검색 */}
      <SearchSection className="mt-26">
        <SearchBar onSubmit={query => navigate(`/search?query=${encodeURIComponent(query)}`)} />
      </SearchSection>

      <div className="mt-6">
        <p className="text-base mb-30 text-primary">
          도서 검색 결과 총 <span className="text-blue">0</span>건
        </p>
        <div className="flex justify-center items-center mt-32">
          <Empty />
        </div>
      </div>
    </div>
  );
}
