import Img from './Img';
import book from '@/assets/book.svg';

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Img src={book} alt="empty book" width={80} height={80} />
      <p className="text-base font-medium text-secondary">검색된 결과가 없습니다.</p>
    </div>
  );
}
