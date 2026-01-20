import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Trip {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  budget: 'economique' | 'premium' | 'vip';
  destinations: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'reminder';
  read: boolean;
  createdAt: Date;
}

interface UserAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  trips: Trip[];
  notifications: Notification[];
  unreadNotificationsCount: number;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// Mock data for trips
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Découverte du Bénin',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    budget: 'premium',
    destinations: ['Cotonou', 'Ouidah', 'Ganvié', 'Abomey'],
    status: 'completed',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    title: 'Safari au Pendjari',
    startDate: new Date('2024-06-10'),
    endDate: new Date('2024-06-17'),
    budget: 'vip',
    destinations: ['Natitingou', 'Pendjari', 'Tanguiéta'],
    status: 'upcoming',
    createdAt: new Date('2024-05-01'),
  },
];

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Voyage généré avec succès',
    message: 'Votre itinéraire "Safari au Pendjari" a été créé. Consultez-le dans votre profil.',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: '2',
    title: 'Rappel de voyage',
    message: 'Votre voyage au Pendjari commence dans 5 jours. Préparez vos bagages !',
    type: 'reminder',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    title: 'Festival Vodoun approche',
    message: 'Le festival Vodoun de Ouidah aura lieu le 10 janvier. Réservez dès maintenant !',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '4',
    title: 'Mise à jour de votre itinéraire',
    message: 'De nouvelles activités ont été ajoutées à votre voyage "Découverte du Bénin".',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('4ubenin_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt),
        });
        setTrips(mockTrips);
        setNotifications(mockNotifications);
      } catch (e) {
        localStorage.removeItem('4ubenin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (email && password.length >= 6) {
      const newUser: User = {
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        email,
        createdAt: new Date(),
      };
      setUser(newUser);
      setTrips(mockTrips);
      setNotifications(mockNotifications);
      localStorage.setItem('4ubenin_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        createdAt: new Date(),
      };
      setUser(newUser);
      setTrips([]);
      setNotifications([
        {
          id: crypto.randomUUID(),
          title: 'Bienvenue sur 4UBENIN !',
          message: 'Votre compte a été créé avec succès. Commencez à explorer le Bénin !',
          type: 'success',
          read: false,
          createdAt: new Date(),
        },
      ]);
      localStorage.setItem('4ubenin_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setTrips([]);
    setNotifications([]);
    localStorage.removeItem('4ubenin_user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('4ubenin_user', JSON.stringify(updatedUser));
    return true;
  };

  const addTrip = (tripData: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTrips((prev) => [newTrip, ...prev]);

    // Add notification
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      title: 'Voyage généré avec succès',
      message: `Votre itinéraire "${tripData.title}" a été créé.`,
      type: 'success',
      read: false,
      createdAt: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        trips,
        notifications,
        unreadNotificationsCount,
        login,
        register,
        logout,
        updateProfile,
        addTrip,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
}
