import { Navigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export function AdminLayout() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <AdminSidebar />
      <main className="ml-64 p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
