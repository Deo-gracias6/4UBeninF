export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ItemReviews {
  itemId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

// Mock reviews data
export const mockReviews: Record<string, ItemReviews> = {
  "exp-1": {
    itemId: "exp-1",
    averageRating: 4.9,
    totalReviews: 47,
    reviews: [
      {
        id: "rev-1",
        userId: "user-1",
        userName: "Marie Dupont",
        rating: 5,
        comment: "Une expérience absolument magique ! Le prêtre vodoun était très accueillant et le guide a parfaitement expliqué chaque étape de la cérémonie. Je recommande vivement.",
        date: "2025-01-15",
        verified: true,
      },
      {
        id: "rev-2",
        userId: "user-2",
        userName: "Jean-Pierre Martin",
        rating: 5,
        comment: "Moment inoubliable. On ressent vraiment la spiritualité du lieu. Organisation parfaite.",
        date: "2025-01-10",
        verified: true,
      },
      {
        id: "rev-3",
        userId: "user-3",
        userName: "Sophie Bernard",
        rating: 4,
        comment: "Très belle découverte culturelle. Seul petit bémol : il faisait très chaud !",
        date: "2025-01-05",
        verified: true,
      },
    ],
  },
  "exp-2": {
    itemId: "exp-2",
    averageRating: 4.8,
    totalReviews: 32,
    reviews: [
      {
        id: "rev-4",
        userId: "user-4",
        userName: "Patrick Konan",
        rating: 5,
        comment: "Les plats préparés étaient délicieux ! La famille était adorable et nous a fait découvrir des recettes authentiques.",
        date: "2025-01-12",
        verified: true,
      },
      {
        id: "rev-5",
        userId: "user-5",
        userName: "Claire Mensah",
        rating: 5,
        comment: "J'ai enfin appris à faire l'Amiwo comme une vraie béninoise ! Merci pour cette belle expérience.",
        date: "2025-01-08",
        verified: true,
      },
    ],
  },
  "exp-3": {
    itemId: "exp-3",
    averageRating: 5.0,
    totalReviews: 28,
    reviews: [
      {
        id: "rev-6",
        userId: "user-6",
        userName: "Thomas Leclerc",
        rating: 5,
        comment: "Safari incroyable ! Nous avons vu des lions, des éléphants et des hippopotames. Le guide était passionné et très professionnel.",
        date: "2025-01-14",
        verified: true,
      },
      {
        id: "rev-7",
        userId: "user-7",
        userName: "Aïcha Diallo",
        rating: 5,
        comment: "Le lodge était magnifique et le safari à l'aube reste un moment magique. À faire absolument !",
        date: "2025-01-09",
        verified: true,
      },
    ],
  },
  "vodoun-fest": {
    itemId: "vodoun-fest",
    averageRating: 4.9,
    totalReviews: 156,
    reviews: [
      {
        id: "rev-8",
        userId: "user-8",
        userName: "François Ouidah",
        rating: 5,
        comment: "Le festival le plus authentique que j'ai jamais vécu. L'ambiance, les cérémonies, tout était parfait.",
        date: "2025-01-11",
        verified: true,
      },
      {
        id: "rev-9",
        userId: "user-9",
        userName: "Aminata Bello",
        rating: 5,
        comment: "Expérience culturelle unique au monde. Le pack VIP valait vraiment le coup !",
        date: "2025-01-10",
        verified: true,
      },
    ],
  },
  "gelede-fest": {
    itemId: "gelede-fest",
    averageRating: 4.7,
    totalReviews: 89,
    reviews: [
      {
        id: "rev-10",
        userId: "user-10",
        userName: "Eric Adjovi",
        rating: 5,
        comment: "Les masques Gélédé sont fascinants. Une tradition vivante et colorée !",
        date: "2025-01-06",
        verified: true,
      },
    ],
  },
};

// Helper function to get reviews for an item
export function getItemReviews(itemId: string): ItemReviews | null {
  return mockReviews[itemId] || null;
}

// Helper function to get average rating
export function getAverageRating(itemId: string): { rating: number; count: number } {
  const reviews = mockReviews[itemId];
  if (!reviews) {
    // Return default mock rating for items without explicit reviews
    return { rating: 4.5, count: Math.floor(Math.random() * 50) + 10 };
  }
  return { rating: reviews.averageRating, count: reviews.totalReviews };
}
