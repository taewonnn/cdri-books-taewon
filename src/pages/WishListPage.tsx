import BookList from '@/components/books/BookList';
import Empty from '@/components/common/Empty';
import { useWishListStore } from '@/components/stores/useWishListStore';

export default function WishListPage() {
  const wishedBooks = useWishListStore(s => s.items);
  const totalCount = wishedBooks.length;

  return (
    <div className="px-4 sm:px-6 md:px-9">
      <div className="mt-26 flex justify-center">
        <div className="w-full max-w-240">
          <h1 className="text-2xl font-bold text-primary">내가 찜한 책</h1>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-primary font-medium">찜한 책</span>
            <span className="text-secondary">
              총 <span className="text-blue font-semibold">{totalCount}</span>건
            </span>
          </div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-240">
          {totalCount === 0 ? (
            <div className="py-30 flex justify-center">
              <Empty message="찜한 책이 없습니다." />
            </div>
          ) : (
            <BookList books={wishedBooks} isLoading={false} isFetchingNextPage={false} nextSkeletonCount={0} />
          )}
        </div>
      </div>
    </div>
  );
}
