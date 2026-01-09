import { useEffect, useState } from 'react';

type SearchBarProps = {
  initialValue?: string;
  onSubmit: (query: string) => void;
};
export default function SearchBar({ initialValue = '', onSubmit }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const submit = () => {
    const query = value.trim();
    if (!query) return;

    onSubmit(query);
  };

  return (
    <div className="relative flex items-center gap-4">
      {/* 입력 박스 */}
      <div className="flex-1">
        <div className="flex items-center h-12 rounded-full bg-gray-100 px-4">
          {/* 왼쪽 검색 아이콘 */}
          <span className="mr-3 text-gray-500 select-none">🔍</span>

          <input
            className="w-full bg-transparent outline-none text-sm"
            placeholder="검색어를 입력하세요"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submit();
            }}
          />
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
