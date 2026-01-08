import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import WishListPage from './pages/WishListPage';

const router = createBrowserRouter([
  { path: '/', element: <SearchPage /> },
  { path: '/result', element: <SearchResultPage /> },
  { path: '/wishlist', element: <WishListPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
