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
  time?: string;
  duration?: string;
  days: number;
  category?: string;
  image?: string;
  images?: string[];
  meeting_point?: string;
  program?: Array<{ time: string; activity: string }>;
  activities?: string[];
  includes?: string[];
  is_active: boolean;
  created_at: string;
}

// Valeurs par défaut pour les champs manquants
const defaultOutingValues = (outing: any): Outing => ({
  ...outing,
  is_active: outing.is_active ?? true,
  category: outing.category || 'général',
  duration: outing.duration || (outing.days ? `${outing.days} jour(s)` : 'Durée non spécifiée'),
  image: outing.image || '/images/default-outing.jpg',
  time: outing.time || '',
  images: outing.images || [],
  meeting_point: outing.meeting_point || 'À définir',
  program: outing.program || [],
  activities: outing.activities || [],
  includes: outing.includes || [],
});

const outingsService = {
  /**
   * Récupérer toutes les sorties actives
   */
  getAll: async (): Promise<Outing[]> => {
    const response = await api.get('/outings');
    console.log('📡 Réponse API sorties:', response.data);

    const data = response.data.data || response.data;

    if (Array.isArray(data)) {
      return data
        .map(defaultOutingValues)
        .filter((outing) => outing.is_active);
    }

    return [];
  },

  /**
   * Récupérer une sortie par ID
   */
  getById: async (id: string): Promise<Outing> => {
    const response = await api.get(`/outings/${id}`);
    const outing = response.data.data || response.data;
    return defaultOutingValues(outing);
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