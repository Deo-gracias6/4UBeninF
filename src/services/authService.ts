import api from './api';

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  nom: string;
  last_name: string;
  phone?: string;
  country?: string;
  avatar?: string;
  preferred_language?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  nom: string;
  last_name?: string;
  phone?: string;
  country?: string;
  avatar?: string;
  preferred_language?: string;
  role: string;
    created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    session?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Connexion d'un utilisateur
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    
    // Stockage des tokens
    if (response.data.data.session) {
      localStorage.setItem('accessToken', response.data.data.session.accessToken);
      localStorage.setItem('refreshToken', response.data.data.session.refreshToken);
    }
    
    return response.data;
  },

  /**
   * Déconnexion
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  /**
   * Demande de réinitialisation de mot de passe
   */
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * Réinitialisation du mot de passe
   */
  resetPassword: async (password: string): Promise<void> => {
    await api.post('/auth/reset-password', { password });
  },

  /**
   * Rafraîchissement du token
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data.data;
  }
};