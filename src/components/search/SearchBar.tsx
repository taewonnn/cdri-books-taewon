import useSearchHistory from '@/hooks/useSearchHistory';
import { useEffect, useRef, useState } from 'react';
import DetailSearch from './DetailSearch';
import type { DetailField } from '@/types/book';
import type { BookSearchOptions } from '@/api/books';

type SearchBarProps = {
  initialValue?: string;
  onSubmit: (params: { query: string; target?: BookSearchOptions['target'] }) => void;
};

const targetByField: Record<DetailField, BookSearchOptions['target']> = {
  title: 'title',
  author: 'person',
  publisher: 'publisher',
};

export default function SearchBar({ initialValue = '', onSubmit }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const { history, add, remove, clear } = useSearchHistory(); // 검색 기록
  const [historyOpen, setHistoryOpen] = useState(false); // 검색기록 팝업 열림 여부

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailField, setDetailField] = useState<DetailField>('title');
  const [detailKeyword, setDetailKeyword] = useState('');

  const outsideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = outsideRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setHistoryOpen(false);
        setDetailOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  /** 검색 실행 */
  const handleSubmit = (q?: string) => {
    const query = (q ?? value).trim();
    if (!query) return;

    onSubmit({ query });
    add(query); // 검색 기록 저장
    setHistoryOpen(false); // 검색창 닫기
  };

  // 상세검색
  const submitDetail = () => {
    const query = detailKeyword.trim();
    if (!query) return;

    onSubmit({ query, target: targetByField[detailField] });
    setDetailOpen(false);
  };

  const isHistoryOpen = historyOpen && history.length > 0;

  return (
    <div className="relative flex items-center gap-4" ref={outsideRef}>
      <div className="flex-1">
        <div className="relative">
          <div
            className={['bg-lightGray px-4', isHistoryOpen ? 'rounded-t-3xl rounded-b-none' : 'rounded-3xl'].join(' ')}
          >
            <div className="flex items-center h-12">
              <span className="mr-3 text-gray-500 select-none">🔍</span>
              <input
                className="w-full bg-transparent outline-none text-sm"
                placeholder="검색어를 입력하세요"
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => {
                  setHistoryOpen(true);
                  setDetailOpen(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSubmit();
                  if (e.key === 'Escape') setHistoryOpen(false);
                }}
              />
            </div>
          </div>

          {/* history list */}
          {isHistoryOpen && (
            <div className="absolute left-0 right-0 top-full z-20">
              <div className="bg-lightGray rounded-b-3xl px-4 pb-4">
                <ul className="space-y-3 px-9 pt-2">
                  {history.map(keyword => (
                    <li key={keyword} className="flex items-center justify-between">
                      <button
                        type="button"
                        className="text-sm text-gray-700 hover:underline text-left"
                        onClick={() => {
                          setValue(keyword);
                          handleSubmit(keyword);
                        }}
                      >
                        {keyword}
                      </button>

                      <button
                        type="button"
                        className="w-7 h-7 grid place-items-center rounded-md"
                        aria-label="검색기록 삭제"
                        onClick={() => remove(keyword)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}

                  <li className="pt-2">
                    <button type="button" className="text-xs text-gray-500" onClick={clear}>
                      전체삭제
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <button type="button" className="h-12 px-4 rounded-lg border text-sm" onClick={() => setDetailOpen(v => !v)}>
        상세검색
      </button>
      {/* 상세검색 팝업 */}
      <DetailSearch
        open={detailOpen}
        field={detailField}
        keyword={detailKeyword}
        onChangeField={setDetailField}
        onChangeKeyword={setDetailKeyword}
        onClose={() => setDetailOpen(false)}
        onSearch={submitDetail}
      />
    </div>
  );
}
