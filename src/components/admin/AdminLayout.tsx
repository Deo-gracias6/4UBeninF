import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-secondary">
      <AdminSidebar />
      <main className="ml-64 p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
