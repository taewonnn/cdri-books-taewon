import Img from './Img';
import book from '@/assets/book.svg';

export default function Empty({ message }: { message?: string }) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Img src={book} alt="empty book" width={80} height={80} />
      <p className="text-base font-medium text-secondary">{message}</p>
    </div>
  );
}
