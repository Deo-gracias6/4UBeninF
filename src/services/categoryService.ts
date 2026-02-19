import api from './api';

export interface ExperienceCategory {    
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string | null;
}

const categoryService = {
  /**
   * Récupérer toutes les catégories
   */
  getAll: async (params?: {
    language?: string;
  }): Promise<ExperienceCategory[]> => {
    const response = await api.get('/categories', { params });
    
    const data = response.data.data || response.data;
    
    // ✅ Ton backend retourne { categories: [...] }
    if (data && Array.isArray(data.categories)) {
      return data.categories;
    }
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  },

  /**
   * Récupérer une catégorie par slug avec ses expériences
   */
  getBySlug: async (slug: string, limit?: number) => {
    const response = await api.get(`/categories/${slug}`, {
      params: { limit: limit?.toString() }
    });
    return response.data.data;
  },
};

// ✅ AJOUTE CES DEUX LIGNES
export { categoryService };
export default categoryService;