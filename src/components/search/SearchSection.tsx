type ISearchSection = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SearchSection({ title = '도서 검색', children, className = '' }: ISearchSection) {
  return (
    <section className={`w-full max-w-5xl ${className}`}>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">{title}</h1>
      {children}
    </section>
  );
}
