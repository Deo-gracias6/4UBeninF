import api from './api';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  description: string;
  region: string;
  banner_image: string | null;
  is_popular: boolean;
  is_active: boolean;
  latitude: number;
  longitude: number;
  highlights: string;
}

const destinationService = {
  /**
   * Récupérer toutes les destinations
   */
  getAll: async (params?: {
    language?: string;
    popular?: boolean;
    region?: string;
  }): Promise<Destination[]> => {
    const response = await api.get('/destinations', { params });

    console.log('📡 Réponse API destinations:', response.data);

    const data = response.data.data || response.data;

    // Le backend retourne { destinations: [...], pagination: {...} }
    if (data && Array.isArray(data.destinations)) {
      return data.destinations;
    }

    // Ou directement un tableau
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  },

  /**
   * Récupérer une destination par slug
   */
  getBySlug: async (slug: string, language?: string): Promise<Destination> => {
    const response = await api.get(`/destinations/${slug}`, {
      params: { language }
    });
    return response.data.data || response.data;
  },
};

// ✅ Export nommé ET par défaut
export { destinationService };
export default destinationService;