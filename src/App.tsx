import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import WishListPage from './pages/WishListPage';
import AppLayout from './layout/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <SearchPage /> },
      { path: '/result', element: <SearchResultPage /> },
      { path: '/wishlist', element: <WishListPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
