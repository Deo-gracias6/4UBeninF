import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import api from '../services/api';

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
  login: (email: string, password: string) => Promise<{ user: UserProfile }>;
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
  const [loading, setLoading] = useState(true); // True au départ

  //  Charger l'utilisateur au montage du composant
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      console.log(' Token au chargement:', token ? 'Présent' : 'Absent');
      
      if (!token) {
        console.log(' Pas de token, utilisateur non connecté');
        setLoading(false);
        return;
      }

      try {
        console.log('🔄 Chargement du profil utilisateur...');
        const response = await api.get('/auth/check-admin');
        console.log('✅ Profil utilisateur chargé:', response.data);

        const userData = response.data.data?.user || response.data.data || response.data;

        const userProfile: UserProfile = {
          id: userData.id,
          email: userData.email,
          nom: userData.nom,
          last_name: userData.last_name || '',
          phone: userData.phone,
          country: userData.country,
          avatar: userData.avatar,
          preferred_language: userData.preferred_language || 'fr',
          role: userData.role || 'user',
          created_at: userData.created_at || new Date().toISOString(),
        };
        
        setUser(userProfile);
        console.log(' Utilisateur connecté:', userProfile.email);
        
      } catch (error: any) {
        console.error(' Erreur chargement utilisateur:', error.message);
        // Token invalide ou expiré, on nettoie
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<{ user: UserProfile }> => {
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
        role: response.data.user.role || 'user',
        created_at: response.data.user.created_at || new Date().toISOString(),
      };
      
      setUser(userProfile);
      console.log('✅ Connexion réussie:', userProfile.email);
      
      // ✅ Retourner les données utilisateur
      return { user: userProfile };
      
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
    } catch (error) {
      console.error('Erreur lors du logout:', error);
    } finally {
      setUser(null);
      console.log('✅ Déconnexion réussie');
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    if (user) {
      setUser({ ...user, ...data });
      return true;
    }
    return false;
  };

  // ✅ Afficher un loader pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

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
