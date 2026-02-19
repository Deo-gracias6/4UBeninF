import api from './api';

export interface Festival {
  id: number;
  slug: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  price: string;
  main_image: string;
  destination_id: string;
  is_active: boolean;
}

const festivalService = {
  /**
   * Récupérer tous les festivals
   */
  getAll: async (params?: {
    language?: string;
    destination_id?: number;
    upcoming?: boolean;
    year?: number;
  }): Promise<Festival[]> => {
    const response = await api.get('/festivals', { params });
    
    console.log('📡 Réponse API festivals:', response.data);
    
    const data = response.data.data || response.data;
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  },

  /**
   * Récupérer un festival par slug
   */
  getBySlug: async (slug: string, language?: string): Promise<Festival> => {
    const response = await api.get(`/festivals/${slug}`, {
      params: { language }
    });
    return response.data.data;
  },
};



export { festivalService };
export default festivalService;