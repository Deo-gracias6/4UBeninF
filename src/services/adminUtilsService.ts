import api from './api';

export interface Destination {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  color?: string;
}

/**
 * Service pour récupérer destinations et catégories (pour les dropdowns admin)
 */
const adminUtilsService = {
  /**
   * Récupérer toutes les destinations (pour dropdown)
   */
  getDestinations: async (): Promise<Destination[]> => {
    const response = await api.get('/destinations');
    const data = response.data.data || response.data;
    
    if (Array.isArray(data.destinations)) {
      return data.destinations;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  },

  /**
   * Récupérer toutes les catégories (pour dropdown)
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    const data = response.data.data || response.data;
    
    if (Array.isArray(data.categories)) {
      return data.categories;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  },
};

export default adminUtilsService;