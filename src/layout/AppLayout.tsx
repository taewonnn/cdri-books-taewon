import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div>
      {/* 헤더 */}
      <header></header>
      <Outlet />
    </div>
  );
}
