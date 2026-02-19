import api from './api';

/**
 * Type pour une expérience (format liste - camelCase du backend)
 */
export interface Experience {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  durationMinutes: number; // ⚠️ Backend retourne camelCase
  maxParticipants: number;
  mainImage: string | null;
  latitude: string;
  longitude: string;
  destination: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

/**
 * Type pour le détail d'une expérience (format détail - camelCase du backend)
 */
export interface ExperienceDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  included: string;
  price: number | string; // Peut être string ou number selon le backend
  durationMinutes: number; // ⚠️ Backend retourne camelCase
  maxParticipants: number;
  mainImage: string | null;
  latitude: number | string;
  longitude: number | string;
  createdAt: string;
  destination: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

const experienceService = {
  /**
   * Récupérer toutes les expériences
   */
  getAll: async (params?: { 
    language?: string;
    destination_id?: string;
    category_id?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    limit?: number;
  }): Promise<Experience[]> => {
    const response = await api.get('/experiences', { params });

    console.log('📡 Réponse API experiences:', response.data);

    const data = response.data.data || response.data;

    if (data && Array.isArray(data.experiences)) {
      return data.experiences;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  },

  /**
   * Récupérer une expérience par slug
   */
  getBySlug: async (slug: string, language?: string): Promise<ExperienceDetail> => {
    console.log('🔍 Chargement expérience:', slug);
    
    try {
      const response = await api.get(`/experiences/${slug}`, {
        params: { language }
      });
      
      console.log('✅ Réponse complète API détail:', response);
      console.log('✅ response.data:', response.data);
      
      // Le backend retourne { success: true, data: {...} }
      if (response.data.success && response.data.data) {
        console.log('✅ Retourne response.data.data:', response.data.data);
        return response.data.data;
      }
      
      if (response.data.data) {
        console.log('✅ Retourne response.data.data (sans success):', response.data.data);
        return response.data.data;
      }
      
      console.log('✅ Retourne response.data directement:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur getBySlug:', error);
      console.error('❌ error.response:', error.response);
      console.error('❌ error.response.data:', error.response?.data);
      throw error;
    }
  },
};

export { experienceService };
export default experienceService;