import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  const location = useLocation();

  return (
    <div>
      <header className="h-20 flex items-center px-40">
        {/* 전체 폭 + 가운데 정렬 컨테이너 */}
        <div className="w-full max-w-480 mx-auto flex items-center">
          {/* 왼쪽 로고 */}
          <Link to="/" className="text-2xl font-bold">
            CERTICOS BOOKS
          </Link>

          <div className="flex-1 flex justify-center">
            <nav className="flex gap-14 text-xl">
              <Link
                to="/"
                className={`pb-0.5 border-b transition-colors ${
                  location.pathname === '/' ? 'border-primary text-primary' : 'border-transparent text-black'
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

      <div className="max-w-5xl mx-auto ">
        <Outlet />
      </div>
    </div>
  );
}
