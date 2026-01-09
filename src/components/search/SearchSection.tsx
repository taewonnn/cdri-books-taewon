type ISearchSection = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SearchSection({ title = '도서 검색', children, className = '' }: ISearchSection) {
  return (
    <section className={`max-w-142 ${className}`}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </section>
  );
}
