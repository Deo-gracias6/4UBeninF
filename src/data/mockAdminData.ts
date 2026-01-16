// Mock data for admin dashboard

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  pricePerDay: number;
  recommendedDays: number;
  type: 'ville' | 'parc' | 'site' | 'region';
  status: 'active' | 'inactive';
}

export interface Experience {
  id: string;
  title: string;
  category: 'culture' | 'artisanat' | 'gastronomie' | 'nature';
  description: string;
  image: string;
  price: number;
  duration: string;
  days: number;
  available: boolean;
  intensity: 'facile' | 'modéré' | 'intense';
}

export interface Festival {
  id: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  destinations: string[];
  experiences: string[];
  startDate: string;
  endDate: string;
  travelers: number;
  totalPrice: number;
  status: 'paid' | 'pending' | 'cancelled';
  createdAt: string;
}

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Cotonou',
    region: 'Littoral',
    description: 'La vibrante capitale économique du Bénin',
    image: '/placeholder.svg',
    pricePerDay: 45000,
    recommendedDays: 2,
    type: 'ville',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ganvié',
    region: 'Atlantique',
    description: 'La Venise de l\'Afrique sur pilotis',
    image: '/placeholder.svg',
    pricePerDay: 35000,
    recommendedDays: 1,
    type: 'site',
    status: 'active',
  },
  {
    id: '3',
    name: 'Parc de la Pendjari',
    region: 'Atacora',
    description: 'Safari au cœur de l\'Afrique de l\'Ouest',
    image: '/placeholder.svg',
    pricePerDay: 85000,
    recommendedDays: 3,
    type: 'parc',
    status: 'active',
  },
  {
    id: '4',
    name: 'Ouidah',
    region: 'Atlantique',
    description: 'Ville historique et spirituelle',
    image: '/placeholder.svg',
    pricePerDay: 30000,
    recommendedDays: 1,
    type: 'ville',
    status: 'active',
  },
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Cérémonie Vodoun authentique',
    category: 'culture',
    description: 'Assistez à une cérémonie vodoun avec un prêtre local',
    image: '/placeholder.svg',
    price: 45000,
    duration: '4 heures',
    days: 1,
    available: true,
    intensity: 'modéré',
  },
  {
    id: '2',
    title: 'Cours de cuisine béninoise',
    category: 'gastronomie',
    description: 'Apprenez à préparer le fameux Amiwo',
    image: '/placeholder.svg',
    price: 35000,
    duration: '3 heures',
    days: 1,
    available: true,
    intensity: 'facile',
  },
  {
    id: '3',
    title: 'Safari photo à Pendjari',
    category: 'nature',
    description: 'Partez à la rencontre des lions et éléphants',
    image: '/placeholder.svg',
    price: 120000,
    duration: '8 heures',
    days: 2,
    available: true,
    intensity: 'intense',
  },
  {
    id: '4',
    title: 'Atelier bronze d\'Abomey',
    category: 'artisanat',
    description: 'Créez votre propre sculpture avec les maîtres artisans',
    image: '/placeholder.svg',
    price: 40000,
    duration: '5 heures',
    days: 1,
    available: false,
    intensity: 'modéré',
  },
];

export const mockFestivals: Festival[] = [
  {
    id: '1',
    name: 'Festival du Vodoun',
    city: 'Ouidah',
    startDate: '2025-01-10',
    endDate: '2025-01-12',
    price: 75000,
    duration: '3 jours',
    description: 'La plus grande célébration du vodoun au monde',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Festival des Masques Gélédé',
    city: 'Kétou',
    startDate: '2025-03-15',
    endDate: '2025-03-16',
    price: 55000,
    duration: '2 jours',
    description: 'Patrimoine immatériel UNESCO',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'FinAB',
    city: 'Cotonou',
    startDate: '2025-04-20',
    endDate: '2025-04-24',
    price: 45000,
    duration: '5 jours',
    description: 'Festival International des Arts du Bénin',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
];

export const mockReservations: Reservation[] = [
  {
    id: 'RES-001',
    clientName: 'Jean Dupont',
    clientEmail: 'jean.dupont@email.com',
    destinations: ['Cotonou', 'Ganvié', 'Ouidah'],
    experiences: ['Cérémonie Vodoun', 'Cours de cuisine'],
    startDate: '2025-02-15',
    endDate: '2025-02-22',
    travelers: 2,
    totalPrice: 625000,
    status: 'paid',
    createdAt: '2025-01-10',
  },
  {
    id: 'RES-002',
    clientName: 'Marie Martin',
    clientEmail: 'marie.martin@email.com',
    destinations: ['Pendjari', 'Natitingou'],
    experiences: ['Safari photo'],
    startDate: '2025-03-01',
    endDate: '2025-03-05',
    travelers: 4,
    totalPrice: 980000,
    status: 'pending',
    createdAt: '2025-01-12',
  },
  {
    id: 'RES-003',
    clientName: 'Paul Adjovi',
    clientEmail: 'paul.adjovi@email.com',
    destinations: ['Ouidah', 'Grand-Popo'],
    experiences: ['Festival Vodoun'],
    startDate: '2025-01-10',
    endDate: '2025-01-14',
    travelers: 1,
    totalPrice: 350000,
    status: 'paid',
    createdAt: '2025-01-05',
  },
];

export const mockEngineSettings = {
  budgets: {
    min: 100000,
    max: 2000000,
    step: 50000,
  },
  durations: {
    min: 2,
    max: 14,
  },
  travelTypes: ['solo', 'couple', 'famille', 'amis', 'affaires'],
  interests: ['culture', 'nature', 'plage', 'aventure', 'gastronomie', 'art'],
  rules: [
    { id: '1', name: 'Budget prioritaire', enabled: true },
    { id: '2', name: 'Festivals automatiques', enabled: true },
    { id: '3', name: 'Optimisation trajets', enabled: true },
    { id: '4', name: 'Expériences locales', enabled: false },
  ],
};

export const mockStats = {
  destinations: 12,
  experiences: 24,
  upcomingFestivals: 6,
  totalReservations: 156,
  pendingReservations: 23,
  revenue: 48500000,
  visitors: 1250,
};
