import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Plane,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface UserMenuProps {
  isScrolled: boolean;
}

export function UserMenu({ isScrolled }: UserMenuProps) {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // ✅ Combine nom et last_name pour le nom complet
  const fullName = `${user.nom} ${user.last_name || ''}`.trim();
  const initials = user.nom?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`gap-2 relative ${
            isScrolled
              ? 'text-foreground hover:bg-secondary'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {initials}
            </span>
          </div>
          <span className="hidden md:inline">{user.nom}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 border-b border-border">
          <p className="font-medium">{fullName}</p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
        <DropdownMenuItem asChild>
          <Link to="/profil" className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil" className="flex items-center gap-2 cursor-pointer">
            <Plane className="w-4 h-4" />
            Mes voyages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/notifications" className="flex items-center gap-2 cursor-pointer">
            <Bell className="w-4 h-4" />
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}