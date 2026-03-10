import api from './api';

export interface FestivalPack {
  id: string;
  nom: string;
  description: string;
  prix: number;
  festival_id: string;
  dates?: string;
  lieu?: string;
  nombre_places?: number;
  statut: string;
  accommodation?: string;
  experiences?: string[];
  created_at: string;
  updated_at: string;
}

const festivalsPackService = {
  /**
   * Récupérer tous les packs de festivals
   */
  getAll: async (): Promise<FestivalPack[]> => {
    const response = await api.get('/festivals-packs');
    console.log('📦 Réponse API packs festivals:', response.data);
    
    const data = response.data;
    
    if (Array.isArray(data)) {
      return data.filter((pack: FestivalPack) => pack.statut === 'actif');
    }
    
    return [];
  },

  /**
   * Récupérer un pack par ID
   */
  getById: async (id: string): Promise<FestivalPack> => {
    const response = await api.get(`/festivals-packs/${id}`);
    return response.data;
  }
};

export { festivalsPackService };
export default festivalsPackService;