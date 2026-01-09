import { useMemo, useState } from 'react';
import type { Book } from '@/types/book';
import Img from '../common/Img';
import likeFillIcon from '@/assets/like_fill.svg';
import likeLineIcon from '@/assets/like_line.svg';
import bookPlaceholder from '@/assets/book.svg';

export default function BookListItem({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  // authors 타입이 string | string[] 섞여있을 수 있어서 안전하게 텍스트로 통일
  const authorsText = useMemo(() => {
    if (!book.authors) return '';
    return Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  }, [book.authors]);

  // 할인 여부
  const hasSale = book.sale_price > 0 && book.sale_price !== book.price;

  return (
    <li className="border-b border-gray last:border-b-0">
      {/* 접힌 상태 */}
      {!open ? (
        <div className="h-25 pl-12 pr-12 flex items-center">
          {/* 썸네일 */}
          <div className="relative shrink-0 w-12 h-17 rounded overflow-hidden bg-lightGray">
            <Img
              src={book.thumbnail || bookPlaceholder}
              alt={book.title}
              width={48}
              height={68}
              className="w-full h-full object-cover"
            />

            {/* 좋아요 */}
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                setLiked(prev => !prev);
              }}
              className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center transition-transform"
              aria-label={liked ? '좋아요 취소' : '좋아요'}
            >
              <Img src={liked ? likeFillIcon : likeLineIcon} alt="like button" width={13} height={12} />
            </button>
          </div>

          {/* 제목/저자 */}
          <div className="min-w-0 flex-1 flex items-center gap-4 ml-12 mr-6">
            <h3 className="font-bold text-lg text-primary leading-tight truncate">{book.title}</h3>
            <p className="text-sm text-secondary shrink-0 font-medium">{authorsText}</p>
          </div>

          {/* 가격 */}
          <div className="shrink-0 mr-6">
            <p className="text-lg font-bold text-primary">
              {(book.sale_price > 0 ? book.sale_price : book.price).toLocaleString()}원
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {/* 구매하기 */}
            <a
              href={book.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-primary text-white text-base font-medium"
            >
              구매하기
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-lightGray text-secondary text-base font-medium"
              aria-expanded={open}
            >
              상세보기
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // 펼친 상태
        <div className="px-12 py-10 flex gap-10 bg-white">
          <div className="relative shrink-0 w-[210px] h-[280px] rounded overflow-hidden bg-lightGray">
            <Img
              src={book.thumbnail || bookPlaceholder}
              alt={book.title}
              width={210}
              height={280}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                setLiked(prev => !prev);
              }}
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
              aria-label={liked ? '좋아요 취소' : '좋아요'}
            >
              <Img src={liked ? likeFillIcon : likeLineIcon} alt="like button" width={20} height={17} />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            {/* 제목 + 저자 */}
            <div className="flex items-baseline gap-4">
              <h3 className="text-lg font-bold text-primary truncate">{book.title}</h3>
              <p className="text-sm text-subtitle font-medium shrink-0">{authorsText}</p>
            </div>

            {/* 책 소개 */}
            <div className="mt-4">
              <h4 className="text-sm font-bold text-primary mb-3">책 소개</h4>
              <p className="text-sm text-primary leading-relaxed whitespace-pre-line line-clamp-6">
                {book.contents || '책 소개 정보가 없습니다.'}
              </p>
            </div>
          </div>

          {/* 오른쪽 가격/버튼 영역 */}
          <div className="shrink-0 w-60 flex flex-col items-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-12 px-5 rounded-lg bg-lightGray text-secondary text-base font-medium"
              aria-expanded={open}
            >
              상세보기
              <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <div className="flex-1" />

            {/* 가격 표시 (원가/할인가) */}
            <div className="w-full text-right">
              {hasSale ? (
                <>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm text-subtitle">원가</span>
                    <span className="text-lg text-primary line-through">{book.price.toLocaleString()}원</span>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-sm text-subtitle font-medium">할인가</span>
                    <span className="text-lg font-bold text-primary">{book.sale_price.toLocaleString()}원</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-end gap-3">
                  <span className="text-sm text-secondary">가격</span>
                  <span className="text-2xl font-bold text-primary">{book.price.toLocaleString()}원</span>
                </div>
              )}
            </div>

            <a
              href={book.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center w-full h-14 rounded-xl bg-primary text-white text-base font-semibold hover:opacity-90 transition-opacity"
            >
              구매하기
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
