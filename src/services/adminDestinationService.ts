import api from './api';

export interface AdminDestination {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string;
  latitude: number | null;
  longitude: number | null;
  bannerImage: string | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDestinationData {
  name: string;
  region: string;
  description?: string;
  highlights?: string; // JSON array stocké en string : '["point1","point2"]'
  latitude?: number | null;
  longitude?: number | null;
  banner_image?: string;
  is_popular?: boolean;
  is_active?: boolean;
}

const adminDestinationService = {
  getAll: async (page = 1, limit = 20): Promise<{ destinations: AdminDestination[]; total: number; totalPages: number }> => {
    const response = await api.get('/admin/destinations', { params: { page, limit } });
    const data = response.data.data;
    return {
      destinations: data.destinations,
      total: data.pagination.totalItems,
      totalPages: data.pagination.totalPages,
    };
  },

  create: async (data: CreateDestinationData): Promise<void> => {
    await api.post('/admin/destinations', data);
  },

  update: async (id: string, data: Partial<CreateDestinationData>): Promise<void> => {
    await api.put(`/admin/destinations/${id}`, data);
  },

  delete: async (id: string, permanent = false): Promise<void> => {
    await api.delete(`/admin/destinations/${id}`, { params: { permanent } });
  },

  toggleActive: async (id: string, isActive: boolean): Promise<void> => {
    await api.put(`/admin/destinations/${id}`, { is_active: isActive });
  },
};

export default adminDestinationService;
