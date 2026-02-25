import api from './api';

export interface Outing {
  id: string;
  name: string;
  description: string;
  price: number;
  max_participants: number;
  remaining_places: number;
  location: string;
  date: string;
  time: string;
  duration: string;
  days: number;
  category: string;
  image: string;
  images?: string[];
  meeting_point: string;
  program: Array<{ time: string; activity: string }>;
  activities: string[];
  includes: string[];
  is_active: boolean;
  created_at: string;
}

const outingsService = {
  /**
   * Récupérer toutes les sorties actives
   */
  getAll: async (): Promise<Outing[]> => {
    const response = await api.get('/outings');
    console.log('📡 Réponse API sorties:', response.data);

    const data = response.data.data || response.data;

    if (Array.isArray(data)) {
      return data.filter((outing: Outing) => outing.is_active);
    }

    return [];
  },

  /**
   * Récupérer une sortie par ID
   */
  getById: async (id: string): Promise<Outing> => {
    const response = await api.get(`/outings/${id}`);
    return response.data.data || response.data;
  },

  /**
   * Vérifier la disponibilité
   */
  checkAvailability: async (outingId: string, participants: number): Promise<{
    available: boolean;
    remainingPlaces: number;
    message?: string;
  }> => {
    const response = await api.post('/bookings/check-availability', {
      booking_type: 'outing',
      item_id: outingId,
      start_date: new Date().toISOString().split('T')[0],
      participants
    });

    return response.data.data || response.data;
  },

  /**
   * Réserver une sortie
   */
  book: async (outingId: string, participants: number, notes?: string): Promise<any> => {
    const outing = await outingsService.getById(outingId);
    
    const response = await api.post('/bookings', {
      booking_type: 'outing',
      item_id: outingId,
      start_date: outing.date,
      participants,
      notes
    });

    return response.data.data || response.data;
  }
};

export { outingsService };
export default outingsService;