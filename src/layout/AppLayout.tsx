import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 flex items-center px-4 sm:px-6 lg:px-10">
        {/* 전체 폭 + 가운데 정렬 컨테이너 */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          {/* 왼쪽 로고 */}
          <Link to="/" className="text-xl sm:text-2xl font-bold">
            CERTICOS BOOKS
          </Link>

          <div className="w-full sm:flex-1 flex justify-start sm:justify-center">
            <nav className="flex gap-6 sm:gap-10 lg:gap-14 text-base sm:text-lg">
              <Link
                to="/"
                className={`pb-0.5 border-b transition-colors ${
                  location.pathname === '/' || location.pathname.startsWith('/search')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-black'
                }`}
              >
                도서 검색
              </Link>
              <Link
                to="/wishlist"
                className={`pb-0.5 border-b transition-colors ${
                  location.pathname === '/wishlist' ? 'border-primary text-primary' : 'border-transparent text-black'
                }`}
              >
                내가 찜한 책
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <Outlet />
      </div>
    </div>
  );
}
