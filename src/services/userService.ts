import api from './api';

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

export interface UpdateProfileData {
  nom?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  avatar?: string;
  preferred_language?: string;
}

export const userService = {
  /**
   * Récupérer le profil de l'utilisateur connecté
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/profile');
    return response.data.data;
  },

  /**
   * Mettre à jour le profil
   */
  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.put('/users/profile', data);
    return response.data.data;
  },

  /**
   * Récupérer les voyages de l'utilisateur
   */
  getTrips: async () => {
    const response = await api.get('/trips');
    return response.data.data;
  },
};