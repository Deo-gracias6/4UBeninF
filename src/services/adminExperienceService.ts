import api from './api';

/**
 * Interface pour une expérience (admin)
 */
export interface AdminExperience {
  id: string;
  slug: string;
  name: string;
  description: string;
  included: string;
  price: number;
  durationMinutes: number;
  maxParticipants: number;
  mainImage: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  destination: {
    id: string;
    slug: string;
    name: string;
  } | null;
  category?: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

/**
 * Interface pour créer/modifier une expérience
 */
export interface ExperienceFormData {
  name: string;
  description: string;
  included: string;
  destination_id: string;
  category_id?: string;
  price: number;
  duration_minutes: number;
  max_participants: number;
  main_image?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

/**
 * Service admin pour les expériences
 */
const adminExperienceService = {
  /**
   * Récupérer toutes les expériences (admin)
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    active?: boolean;
    destination_id?: string;
  }): Promise<{ experiences: AdminExperience[]; pagination: any }> => {
    const response = await api.get('/admin/experiences', { params });
    return response.data.data || response.data;
  },

  /**
   * Créer une expérience
   */
  create: async (data: ExperienceFormData): Promise<{ id: string; slug: string; message: string }> => {
    const response = await api.post('/admin/experiences', data);
    return response.data.data || response.data;
  },

  /**
   * Modifier une expérience
   */
  update: async (id: string, data: Partial<ExperienceFormData>): Promise<{ message: string }> => {
    const response = await api.put(`/admin/experiences/${id}`, data);
    return response.data.data || response.data;
  },

  /**
   * Supprimer une expérience (soft delete par défaut)
   */
  delete: async (id: string, permanent = false): Promise<{ message: string }> => {
    const response = await api.delete(`/admin/experiences/${id}`, {
      params: { permanent }
    });
    return response.data.data || response.data;
  },

  /**
   * Activer/désactiver une expérience
   */
  toggleActive: async (id: string, isActive: boolean): Promise<{ message: string }> => {
    const response = await api.put(`/admin/experiences/${id}`, { is_active: isActive });
    return response.data.data || response.data;
  },
};

export default adminExperienceService;