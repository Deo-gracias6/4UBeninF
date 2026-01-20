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
  const { user, logout, unreadNotificationsCount } = useUserAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`gap-2 ${
            isScrolled
              ? 'text-foreground hover:bg-secondary'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
          <ChevronDown className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 border-b border-border">
          <p className="font-medium">{user.name}</p>
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
            {unreadNotificationsCount > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                {unreadNotificationsCount}
              </span>
            )}
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
