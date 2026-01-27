export interface OrganizedTrip {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  city: string;
  location: string;
  meetingPoint: string;
  date: string;
  time: string;
  duration: string;
  durationDays: number;
  price: number;
  totalPlaces: number;
  availablePlaces: number;
  program: {
    time: string;
    activity: string;
  }[];
  activities: string[];
  includes: string[];
  rating: number;
  reviewCount: number;
  category: 'journée' | 'tournée' | 'immersion';
}

export const organizedTrips: OrganizedTrip[] = [
  {
    id: 'trip-gogotinkpon',
    title: 'Immersion à Gogotinkpon',
    description: "Découvrez le village de Gogotinkpon, berceau de traditions ancestrales. Cette immersion culturelle unique vous plonge au cœur de la vie quotidienne béninoise, entre artisanat local, cuisine traditionnelle et rencontres authentiques avec les habitants.",
    shortDescription: "Une journée d'immersion culturelle au cœur du Bénin authentique.",
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    city: 'Gogotinkpon',
    location: 'Département du Zou',
    meetingPoint: 'Parking du Marché Dantokpa, Cotonou',
    date: '2025-02-15',
    time: '07:00',
    duration: '1 jour',
    durationDays: 1,
    price: 35000,
    totalPlaces: 20,
    availablePlaces: 8,
    program: [
      { time: '07:00', activity: 'Départ de Cotonou' },
      { time: '09:30', activity: 'Arrivée et accueil par le chef du village' },
      { time: '10:00', activity: 'Visite du village et rencontre avec les artisans' },
      { time: '12:30', activity: 'Déjeuner traditionnel chez l\'habitant' },
      { time: '14:00', activity: 'Atelier de fabrication de poterie' },
      { time: '16:00', activity: 'Cérémonie de clôture et échanges' },
      { time: '17:00', activity: 'Retour vers Cotonou' },
    ],
    activities: ['Visite culturelle', 'Atelier artisanat', 'Repas traditionnel', 'Rencontre avec les habitants'],
    includes: ['Transport aller-retour', 'Déjeuner', 'Guide local', 'Entrées et activités'],
    rating: 4.9,
    reviewCount: 47,
    category: 'immersion',
  },
  {
    id: 'trip-ouidah-discovery',
    title: 'Journée découverte à Ouidah',
    description: "Explorez Ouidah, ville historique et spirituelle du Bénin. De la Route des Esclaves au Temple des Pythons, en passant par la Porte du Non-Retour, cette journée vous révèle l'histoire poignante et la richesse culturelle de cette cité emblématique.",
    shortDescription: "Sur les traces de l'histoire à Ouidah, entre mémoire et spiritualité.",
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    city: 'Ouidah',
    location: 'Département de l\'Atlantique',
    meetingPoint: 'Place de l\'Étoile Rouge, Cotonou',
    date: '2025-02-22',
    time: '08:00',
    duration: '1 jour',
    durationDays: 1,
    price: 45000,
    totalPlaces: 25,
    availablePlaces: 12,
    program: [
      { time: '08:00', activity: 'Départ de Cotonou' },
      { time: '09:00', activity: 'Visite du Temple des Pythons' },
      { time: '10:30', activity: 'Parcours de la Route des Esclaves' },
      { time: '12:00', activity: 'La Porte du Non-Retour sur la plage' },
      { time: '13:00', activity: 'Déjeuner dans un restaurant local' },
      { time: '14:30', activity: 'Visite du Musée d\'Histoire de Ouidah' },
      { time: '16:00', activity: 'Forêt Sacrée de Kpassè' },
      { time: '17:30', activity: 'Retour vers Cotonou' },
    ],
    activities: ['Visite historique', 'Temple des Pythons', 'Route des Esclaves', 'Musée', 'Forêt Sacrée'],
    includes: ['Transport climatisé', 'Déjeuner', 'Guide certifié', 'Toutes les entrées'],
    rating: 4.8,
    reviewCount: 89,
    category: 'journée',
  },
  {
    id: 'trip-cotonou-porto-novo',
    title: 'Tournée Cotonou – Porto-Novo',
    description: "Un week-end pour découvrir les deux capitales du Bénin. De la vibrante Cotonou économique à la paisible Porto-Novo administrative, explorez les contrastes fascinants du pays à travers marchés, musées, architecture coloniale et vie locale.",
    shortDescription: "Deux jours pour explorer les deux capitales du Bénin.",
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    city: 'Cotonou & Porto-Novo',
    location: 'Littoral & Ouémé',
    meetingPoint: 'Hôtel du Lac, Cotonou',
    date: '2025-03-01',
    time: '09:00',
    duration: '2 jours',
    durationDays: 2,
    price: 95000,
    totalPlaces: 15,
    availablePlaces: 3,
    program: [
      { time: 'Jour 1 - 09:00', activity: 'Visite du Marché Dantokpa' },
      { time: 'Jour 1 - 11:00', activity: 'Fondation Zinsou - Art contemporain' },
      { time: 'Jour 1 - 13:00', activity: 'Déjeuner au bord de la lagune' },
      { time: 'Jour 1 - 15:00', activity: 'Quartier Ganhi et artisanat' },
      { time: 'Jour 1 - 18:00', activity: 'Installation à l\'hôtel Porto-Novo' },
      { time: 'Jour 2 - 09:00', activity: 'Musée Honmè - Palais royal' },
      { time: 'Jour 2 - 11:00', activity: 'Jardin des Plantes et de la Nature' },
      { time: 'Jour 2 - 13:00', activity: 'Déjeuner et temps libre' },
      { time: 'Jour 2 - 15:00', activity: 'Retour à Cotonou' },
    ],
    activities: ['Marchés locaux', 'Art contemporain', 'Musées', 'Architecture coloniale', 'Gastronomie'],
    includes: ['Transport', 'Hébergement 1 nuit', '2 déjeuners', 'Guide', 'Entrées musées'],
    rating: 4.7,
    reviewCount: 34,
    category: 'tournée',
  },
  {
    id: 'trip-ganvie',
    title: 'Excursion à Ganvié',
    description: "Naviguez vers Ganvié, la célèbre 'Venise de l'Afrique'. Ce village lacustre unique au monde vous dévoile un mode de vie extraordinaire où tout se fait sur l'eau : habitat, commerce, école, et même le marché flottant.",
    shortDescription: "Découvrez la Venise de l'Afrique, village lacustre unique au monde.",
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    city: 'Ganvié',
    location: 'Lac Nokoué',
    meetingPoint: 'Embarcadère d\'Abomey-Calavi',
    date: '2025-02-08',
    time: '08:30',
    duration: '1 jour',
    durationDays: 1,
    price: 40000,
    totalPlaces: 12,
    availablePlaces: 0,
    program: [
      { time: '08:30', activity: 'Accueil à l\'embarcadère' },
      { time: '09:00', activity: 'Départ en pirogue motorisée' },
      { time: '09:45', activity: 'Arrivée à Ganvié - visite guidée' },
      { time: '11:00', activity: 'Découverte du marché flottant' },
      { time: '12:30', activity: 'Déjeuner de poisson frais sur pilotis' },
      { time: '14:00', activity: 'Rencontre avec les pêcheurs' },
      { time: '15:30', activity: 'Temps libre et baignade' },
      { time: '16:30', activity: 'Retour à l\'embarcadère' },
    ],
    activities: ['Navigation en pirogue', 'Marché flottant', 'Pêche traditionnelle', 'Déjeuner sur l\'eau'],
    includes: ['Pirogue aller-retour', 'Déjeuner', 'Guide local', 'Gilet de sauvetage'],
    rating: 4.9,
    reviewCount: 112,
    category: 'journée',
  },
  {
    id: 'trip-pendjari-safari',
    title: 'Safari au Parc Pendjari',
    description: "Partez pour une aventure inoubliable au cœur du Parc National de la Pendjari, l'un des derniers sanctuaires de la faune sauvage en Afrique de l'Ouest. Lions, éléphants, buffles et des centaines d'espèces d'oiseaux vous attendent.",
    shortDescription: "3 jours de safari au cœur de la savane africaine.",
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    city: 'Tanguiéta',
    location: 'Parc National de la Pendjari',
    meetingPoint: 'Aéroport de Cotonou (transfert inclus)',
    date: '2025-03-15',
    time: '06:00',
    duration: '3 jours',
    durationDays: 3,
    price: 285000,
    totalPlaces: 8,
    availablePlaces: 5,
    program: [
      { time: 'Jour 1 - 06:00', activity: 'Départ Cotonou - Route vers le Nord' },
      { time: 'Jour 1 - 14:00', activity: 'Arrivée au lodge - Installation' },
      { time: 'Jour 1 - 16:00', activity: 'Premier safari en fin de journée' },
      { time: 'Jour 2 - 05:30', activity: 'Safari à l\'aube (observation des lions)' },
      { time: 'Jour 2 - 12:00', activity: 'Repos et déjeuner au lodge' },
      { time: 'Jour 2 - 15:30', activity: 'Safari de l\'après-midi' },
      { time: 'Jour 3 - 06:00', activity: 'Dernier safari matinal' },
      { time: 'Jour 3 - 10:00', activity: 'Retour vers Cotonou' },
    ],
    activities: ['Safari 4x4', 'Observation faune', 'Photographie', 'Nuits en lodge'],
    includes: ['Transport aller-retour', '2 nuits en lodge', 'Pension complète', 'Safaris guidés', 'Entrée parc'],
    rating: 5.0,
    reviewCount: 28,
    category: 'tournée',
  },
];
