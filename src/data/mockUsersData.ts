// Mock data for admin user management

export interface UserReservation {
  id: string;
  type: 'experience' | 'festival' | 'discovery' | 'smart-trip';
  name: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  purchasePath: 'direct' | 'smart-engine';
  cities: string[];
  activities: string[];
  experiences: string[];
  packType?: 'standard' | 'premium' | 'vip';
}

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  registrationDate: string;
  status: 'active' | 'disabled';
  avatar?: string;
  totalSpent: number;
  reservationsCount: number;
  lastActivity: string;
  preferredCategories: string[];
  reservations: UserReservation[];
}

export const mockUsers: MockUser[] = [
  {
    id: 'USR-001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+229 97 12 34 56',
    registrationDate: '2024-08-15',
    status: 'active',
    totalSpent: 1250000,
    reservationsCount: 5,
    lastActivity: '2025-01-18',
    preferredCategories: ['culture', 'nature', 'gastronomie'],
    reservations: [
      {
        id: 'RES-101',
        type: 'smart-trip',
        name: 'Voyage personnalisé - Découverte du Bénin',
        date: '2025-02-15',
        amount: 625000,
        status: 'confirmed',
        purchasePath: 'smart-engine',
        cities: ['Cotonou', 'Ganvié', 'Ouidah', 'Grand-Popo'],
        activities: ['Visite du marché Dantokpa', 'Balade en pirogue', 'Route des Esclaves'],
        experiences: ['Cérémonie Vodoun', 'Cours de cuisine béninoise'],
      },
      {
        id: 'RES-102',
        type: 'festival',
        name: 'Festival du Vodoun',
        date: '2025-01-10',
        amount: 185000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Ouidah'],
        activities: [],
        experiences: [],
        packType: 'premium',
      },
      {
        id: 'RES-103',
        type: 'experience',
        name: 'Safari photo à Pendjari',
        date: '2024-11-20',
        amount: 120000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Pendjari'],
        activities: ['Safari en 4x4'],
        experiences: ['Safari photo'],
      },
      {
        id: 'RES-104',
        type: 'discovery',
        name: 'Découverte de Ganvié',
        date: '2024-10-05',
        amount: 45000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Ganvié'],
        activities: ['Visite du village lacustre'],
        experiences: [],
      },
      {
        id: 'RES-105',
        type: 'experience',
        name: 'Atelier bronze d\'Abomey',
        date: '2024-09-15',
        amount: 40000,
        status: 'cancelled',
        purchasePath: 'direct',
        cities: ['Abomey'],
        activities: [],
        experiences: ['Atelier artisanat'],
      },
    ],
  },
  {
    id: 'USR-002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 12 34 56 78',
    registrationDate: '2024-10-22',
    status: 'active',
    totalSpent: 980000,
    reservationsCount: 3,
    lastActivity: '2025-01-20',
    preferredCategories: ['nature', 'aventure'],
    reservations: [
      {
        id: 'RES-201',
        type: 'smart-trip',
        name: 'Aventure au Nord Bénin',
        date: '2025-03-01',
        amount: 850000,
        status: 'pending',
        purchasePath: 'smart-engine',
        cities: ['Pendjari', 'Natitingou', 'Tanougou'],
        activities: ['Safari', 'Randonnée', 'Cascades'],
        experiences: ['Safari photo à Pendjari', 'Visite des Tata Somba'],
      },
      {
        id: 'RES-202',
        type: 'experience',
        name: 'Randonnée aux cascades de Tanougou',
        date: '2024-12-10',
        amount: 65000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Tanougou'],
        activities: ['Randonnée'],
        experiences: [],
      },
      {
        id: 'RES-203',
        type: 'festival',
        name: 'Festival des Masques Gélédé',
        date: '2025-03-15',
        amount: 65000,
        status: 'pending',
        purchasePath: 'direct',
        cities: ['Kétou'],
        activities: [],
        experiences: [],
        packType: 'standard',
      },
    ],
  },
  {
    id: 'USR-003',
    firstName: 'Paul',
    lastName: 'Adjovi',
    email: 'paul.adjovi@email.com',
    phone: '+229 66 78 90 12',
    registrationDate: '2024-06-10',
    status: 'active',
    totalSpent: 350000,
    reservationsCount: 2,
    lastActivity: '2025-01-14',
    preferredCategories: ['culture', 'spiritualité'],
    reservations: [
      {
        id: 'RES-301',
        type: 'festival',
        name: 'Festival du Vodoun',
        date: '2025-01-10',
        amount: 275000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Ouidah'],
        activities: ['Cérémonie d\'ouverture', 'Défilé traditionnel'],
        experiences: [],
        packType: 'vip',
      },
      {
        id: 'RES-302',
        type: 'experience',
        name: 'Cérémonie Vodoun authentique',
        date: '2024-08-20',
        amount: 45000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Ouidah'],
        activities: [],
        experiences: ['Cérémonie Vodoun'],
      },
    ],
  },
  {
    id: 'USR-004',
    firstName: 'Sophie',
    lastName: 'Koné',
    email: 'sophie.kone@email.com',
    registrationDate: '2024-12-01',
    status: 'disabled',
    totalSpent: 0,
    reservationsCount: 0,
    lastActivity: '2024-12-15',
    preferredCategories: [],
    reservations: [],
  },
  {
    id: 'USR-005',
    firstName: 'Thomas',
    lastName: 'Mensah',
    email: 'thomas.mensah@email.com',
    phone: '+229 95 45 67 89',
    registrationDate: '2024-09-05',
    status: 'active',
    totalSpent: 520000,
    reservationsCount: 4,
    lastActivity: '2025-01-19',
    preferredCategories: ['gastronomie', 'artisanat', 'culture'],
    reservations: [
      {
        id: 'RES-501',
        type: 'experience',
        name: 'Cours de cuisine béninoise',
        date: '2025-01-25',
        amount: 35000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Cotonou'],
        activities: [],
        experiences: ['Cours de cuisine'],
      },
      {
        id: 'RES-502',
        type: 'discovery',
        name: 'Cotonou authentique',
        date: '2024-11-10',
        amount: 85000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Cotonou'],
        activities: ['Marché Dantokpa', 'Place de l\'Amazone', 'Fidjrossè'],
        experiences: [],
      },
      {
        id: 'RES-503',
        type: 'smart-trip',
        name: 'Circuit Culture & Artisanat',
        date: '2024-10-15',
        amount: 350000,
        status: 'confirmed',
        purchasePath: 'smart-engine',
        cities: ['Abomey', 'Porto-Novo', 'Cotonou'],
        activities: ['Palais royaux', 'Musée ethnographique', 'Quartier artisanal'],
        experiences: ['Atelier bronze', 'Cours de cuisine'],
      },
      {
        id: 'RES-504',
        type: 'experience',
        name: 'Atelier bronze d\'Abomey',
        date: '2024-09-28',
        amount: 40000,
        status: 'confirmed',
        purchasePath: 'direct',
        cities: ['Abomey'],
        activities: [],
        experiences: ['Atelier artisanat'],
      },
    ],
  },
  {
    id: 'USR-006',
    firstName: 'Aminata',
    lastName: 'Diallo',
    email: 'aminata.diallo@email.com',
    phone: '+221 77 123 45 67',
    registrationDate: '2024-11-18',
    status: 'active',
    totalSpent: 185000,
    reservationsCount: 1,
    lastActivity: '2025-01-16',
    preferredCategories: ['plage', 'détente'],
    reservations: [
      {
        id: 'RES-601',
        type: 'smart-trip',
        name: 'Escapade balnéaire',
        date: '2025-02-20',
        amount: 185000,
        status: 'pending',
        purchasePath: 'smart-engine',
        cities: ['Grand-Popo', 'Ouidah'],
        activities: ['Plage', 'Route des Esclaves'],
        experiences: [],
      },
    ],
  },
];

// Statistics for user management
export const userStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === 'active').length,
  disabledUsers: mockUsers.filter(u => u.status === 'disabled').length,
  totalRevenue: mockUsers.reduce((acc, u) => acc + u.totalSpent, 0),
  averageSpent: Math.round(mockUsers.reduce((acc, u) => acc + u.totalSpent, 0) / mockUsers.filter(u => u.totalSpent > 0).length),
};
