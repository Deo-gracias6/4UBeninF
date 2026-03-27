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

  getById: async (id: string): Promise<Festival> => {
    const response = await api.get(`/festivals/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string, language?: string): Promise<Festival> => {
    const response = await api.get(`/festivals/${slug}`, {
      params: { language }
    });
    return response.data.data;
  },

  create: async (data: {
    destination_id: string;
    slug: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    price: number;
    main_image?: string;
    is_active?: boolean;
  }): Promise<Festival> => {
    const response = await api.post('/festivals', data);
    return response.data;
  },

  update: async (id: string, data: Partial<{
    destination_id: string;
    slug: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    main_image: string;
    is_active: boolean;
  }>): Promise<Festival> => {
    const response = await api.put(`/festivals/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/festivals/${id}`);
  },
};



export { festivalService };
export default festivalService;