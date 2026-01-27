import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  Calendar,
  Settings,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Bus,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Utilisateurs', icon: Users },
  { path: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { path: '/admin/experiences', label: 'Expériences', icon: Sparkles },
  { path: '/admin/festivals', label: 'Festivals', icon: Calendar },
  { path: '/admin/trips', label: 'Sorties organisées', icon: Bus },
  { path: '/admin/engine', label: 'Moteur IA', icon: Settings },
  { path: '/admin/reservations', label: 'Réservations', icon: CreditCard },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAdminAuth();

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-foreground text-background transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-background/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0">
            <span className="text-white font-bold">4U</span>
          </div>
          {!collapsed && (
            <div>
              <div className="font-serif font-semibold">4UBENIN</div>
              <div className="text-xs text-background/60">Admin Panel</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-background/70 hover:bg-background/10 hover:text-background'
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-background/10">
        {!collapsed && user && (
          <div className="mb-3 px-3">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-background/60">{user.email}</div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={logout}
          className={`w-full justify-start text-background/70 hover:text-background hover:bg-background/10 ${
            collapsed ? 'px-3' : ''
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="ml-3">Déconnexion</span>}
        </Button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
