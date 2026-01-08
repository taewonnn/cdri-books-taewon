import { useRef } from 'react';

export default function SearchBar() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapRef} className="relative flex items-center gap-4">
      {/* 입력 박스 */}
      <div className="flex-1">
        <div className="flex items-center h-12 rounded-full bg-gray-100 px-4">
          {/* 왼쪽 검색 아이콘 */}
          <span className="mr-3 text-gray-500 select-none">🔍</span>

          <input className="w-full bg-transparent outline-none text-sm" placeholder="검색어를 입력하세요" />
        </div>

        {/* @todo 최근검색어 드롭다운 */}
      </div>

      {/* 상세검색 버튼 */}
      <button type="button" className="h-12 px-4 rounded-lg border text-sm">
        상세검색
      </button>
    </div>
  );
}
