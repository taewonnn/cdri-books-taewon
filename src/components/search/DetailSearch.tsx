import type { DetailField } from '@/types/book';
import { useEffect, useMemo, useRef, useState } from 'react';

type DetailSearchProps = {
  open: boolean;
  field: DetailField;
  keyword: string;
  onChangeField: (field: DetailField) => void;
  onChangeKeyword: (keyword: string) => void;
  onClose: () => void;
  onSearch: () => void;
};

const FIELD_LABEL: Record<DetailField, string> = {
  title: '제목',
  author: '저자명',
  publisher: '출판사',
};

export default function DetailSearch({
  open,
  field,
  keyword,
  onChangeField,
  onChangeKeyword,
  onClose,
  onSearch,
}: DetailSearchProps) {
  const [selectOpen, setSelectOpen] = useState(false);

  const selectWrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!selectOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = selectWrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setSelectOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [selectOpen]);

  const disabled = useMemo(() => keyword.trim().length === 0, [keyword]);

  if (!open) return null;

  return (
    <div
      className="
        absolute right-0 top-full mt-3 z-50
        max-w-90
      "
      onPointerDown={e => e.stopPropagation()}
    >
      <div className="bg-white rounded-lg p-6 [box-shadow:0px_4px_14px_6px_rgba(151,151,151,0.15)]">
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <button type="button" className="text-[#B1B8C0] mb-2 h-2.75" aria-label="상세검색 닫기" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div ref={selectWrapRef} className="relative w-25">
            <button
              type="button"
              className="w-full flex items-center justify-between border-b border-[#D2D6DA] py-2 text-sm font-bold text-primary"
              onClick={() => setSelectOpen(v => !v)}
            >
              {FIELD_LABEL[field]}
              <span className="text-[#B1B8C0]">▾</span>
            </button>

            {selectOpen && (
              <ul className="absolute left-0 mt-2 w-full bg-white overflow-hidden text-subtitle text-sm [box-shadow:0_0_4px_0_rgba(0,0,0,0.25)]">
                {(['title', 'author', 'publisher'] as DetailField[])
                  .filter(f => f !== field)
                  .map(f => (
                    <li key={f}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-lightGray"
                        onClick={() => {
                          onChangeField(f);
                          setSelectOpen(false);
                        }}
                      >
                        {FIELD_LABEL[f]}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* 검색어 입력 */}
          <input
            ref={inputRef}
            className="flex-1 border-b border-primary py-2 text-sm outline-none placeholder:text-[#8D94A0]"
            placeholder="검색어 입력"
            value={keyword}
            onChange={e => onChangeKeyword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') onSearch();
            }}
          />
        </div>

        {/* 검색 버튼 */}
        <button
          type="button"
          className="mt-4 w-full h-9 rounded-lg text-white font-medium bg-primary px-2.5 py-1.25 text-sm"
          disabled={disabled}
          onClick={onSearch}
        >
          검색하기
        </button>
      </div>
    </div>
  );
}
