import { useEffect, useRef, useState } from 'react';

type SearchBarProps = {
  initialValue?: string;
  onSubmit: (query: string) => void;
};

type HistoryItem = { id: string; keyword: string };

export default function SearchBar({ initialValue = '', onSubmit }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [history] = useState<HistoryItem[]>([
    { id: '1', keyword: '노르웨이 숲' },
    { id: '2', keyword: '무라카미 하루키' },
  ]);
  const [open] = useState(true);

  const outsideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const submit = () => {
    const query = value.trim();
    if (!query) return;

    onSubmit(query);
  };

  return (
    <div className="relative flex items-center gap-4" ref={outsideRef}>
      <div className="flex-1">
        <div className="rounded-3xl bg-lightGray px-4 space-y-4">
          {/* 입력 행 */}
          <div className="flex items-center h-12">
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

          {/* 최근검색어 리스트 */}
          {open && history.length > 0 && (
            <ul className="space-y-3 px-9 last:pb-2">
              {history.map(item => (
                <li key={item.id} className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-gray-700 hover:underline text-left"
                    onClick={() => {
                      setValue(item.keyword);
                    }}
                  >
                    {item.keyword}
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 grid place-items-center rounded-md"
                    aria-label="검색기록 삭제"
                    onClick={() => {}}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 상세검색 버튼 */}
      <button type="button" className="h-12 px-4 rounded-lg border text-sm">
        상세검색
      </button>
    </div>
  );
}
