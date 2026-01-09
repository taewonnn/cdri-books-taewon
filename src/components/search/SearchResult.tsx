import Empty from '../common/Empty';

export default function SearchResult() {
  return (
    <div className="mt-6">
      <p className="text-base mb-30 text-primary">
        도서 검색 결과 총 <span className="text-blue">0</span>건
      </p>
      <div className="flex justify-center items-center mt-32">
        <Empty />
      </div>
    </div>
  );
}
