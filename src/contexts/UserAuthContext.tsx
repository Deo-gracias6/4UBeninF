import { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

export interface UserProfile {
  id: string;
  email: string;
  nom: string;
  last_name: string;
  phone?: string;
  country?: string;
  avatar?: string;
  preferred_language?: string;
  role: string;
  created_at: string;
}

export interface Trip {
  id: string;
  title: string;
  destinations: string[];
  startDate: Date;
  endDate: Date;
  budget: 'economique' | 'premium' | 'vip';
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface UpdateProfileData {
  nom?: string;
  last_name?: string;
  phone?: string;
  country?: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  trips: Trip[];
  loading: boolean;
  isAuthenticated: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [trips] = useState<Trip[]>([]);
  const [loading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login({ email, password });
      
      // Créer le profil utilisateur à partir de la réponse
      const userProfile: UserProfile = {
        id: response.data.user.id,
        email: response.data.user.email,
        nom: response.data.user.nom,
        last_name: response.data.user.last_name || '',
        phone: response.data.user.phone,
        country: response.data.user.country,
        avatar: response.data.user.avatar,
        preferred_language: response.data.user.preferred_language || 'fr',
        role: response.data.user.role,
        created_at: response.data.user.created_at || new Date().toISOString(),
      };
      
      setUser(userProfile);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de connexion';
      throw new Error(errorMessage);
    }
  };

  const register = async (registerData: any): Promise<void> => {
    try {
      await authService.register(registerData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    if (user) {
      setUser({ ...user, ...data });
      return true;
    }
    return false;
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        trips,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider');
  }
  return context;
};