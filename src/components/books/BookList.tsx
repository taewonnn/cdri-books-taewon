import type { Book } from '@/types/book';
import Empty from '../common/Empty';
import BookListItem from './BookListItem';
import BookListItemSkeleton from './BookListSkeleton';

type BookListProps = {
  books: Book[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  nextSkeletonCount: number;
};

export default function BookList({ books, isLoading, isFetchingNextPage, nextSkeletonCount }: BookListProps) {
  if (isLoading) {
    return (
      <ul className="w-full max-w-240 bg-white overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <BookListItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (!books || books.length === 0) return <Empty />;

  return (
    <ul className="w-full max-w-240 bg-white overflow-hidden">
      {books.map(book => (
        <BookListItem key={book.isbn || book.url} book={book} />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: nextSkeletonCount }).map((_, index) => (
          <BookListItemSkeleton key={`next-skeleton-${index}`} />
        ))}
    </ul>
  );
}
