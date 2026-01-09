export default function BookListItemSkeleton() {
  return (
    <li className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4 px-4 py-4 h-[100px]">
        {/* 썸네일 */}
        <div className="w-[72px] h-[72px] bg-gray-200 rounded animate-pulse shrink-0" />

        {/* 책 정보 */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* 제목 */}
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
          {/* 저자 */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>

        {/* 가격 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
        </div>

        {/* 구매 버튼 */}
        <div className="h-12 w-24 bg-gray-200 rounded-md animate-pulse shrink-0" />

        {/* 상세보기 버튼 */}
        <div className="h-12 w-24 bg-gray-200 rounded-md animate-pulse shrink-0" />
      </div>
    </li>
  );
}
