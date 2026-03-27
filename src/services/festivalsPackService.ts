import api from './api';

export interface FestivalPack {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  festival_id: string;
  dates: string[];
  lieu: string;
  nombre_places: number;
  statut: string;
  accommodation: string;
  experiences?: number[];
  averageRating?: number;
  totalRatings?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFestivalPackData {
  nom: string;
  description?: string;
  prix: number;
  festival_id: string;
  dates: string[];
  lieu: string;
  nombre_places: number;
  statut: string;
  accommodation: string;
  experiences?: number[];
}

const festivalsPackService = {
  getAll: async (): Promise<FestivalPack[]> => {
    const response = await api.get('/festivals-packs');
    const data = response.data;
    return Array.isArray(data) ? data : [];
  },

  getByFestivalId: async (festivalId: string): Promise<FestivalPack[]> => {
    const response = await api.get(`/festivals-packs/festival/${festivalId}`);
    const data = response.data;
    return Array.isArray(data) ? data : [];
  },

  getById: async (id: string): Promise<FestivalPack> => {
    const response = await api.get(`/festivals-packs/${id}`);
    return response.data;
  },

  create: async (data: CreateFestivalPackData): Promise<FestivalPack> => {
    const response = await api.post('/festivals-packs', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateFestivalPackData>): Promise<FestivalPack> => {
    const response = await api.put(`/festivals-packs/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/festivals-packs/${id}`);
  },
};

export { festivalsPackService };
export default festivalsPackService;
