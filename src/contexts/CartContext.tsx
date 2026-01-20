import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays, parse } from "date-fns";
import { fr } from "date-fns/locale";

export type CartItemType = "experience" | "festival" | "discovery" | "activity";

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  price: number;
  image?: string;
  // Festival-specific fields
  dates?: string;
  city?: string;
  duration?: string;
  // Experience-specific fields
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addItem = (item: CartItem) => {
    if (items.find((i) => i.id === item.id)) {
      toast({
        title: "Déjà dans le panier",
        description: `${item.name} est déjà dans votre panier.`,
        variant: "destructive",
      });
      return;
    }

    setItems((prev) => [...prev, item]);

    // Special notification for festivals
    if (item.type === "festival" && item.dates && item.city) {
      const daysRemaining = calculateDaysRemaining(item.dates);
      toast({
        title: "🎉 Festival ajouté au panier !",
        description: `${item.name} - ${item.city}\n📅 ${item.dates}\n⏳ ${daysRemaining > 0 ? `Dans ${daysRemaining} jours` : "Bientôt !"}`,
      });
    } else {
      toast({
        title: "Ajouté au panier !",
        description: `${item.name} a été ajouté à votre panier.`,
      });
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({
      title: "Retiré du panier",
      description: "L'article a été retiré de votre panier.",
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string) => items.some((i) => i.id === id);

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Helper function to calculate days remaining until festival
function calculateDaysRemaining(dateString: string): number {
  const currentYear = new Date().getFullYear();
  const months: { [key: string]: number } = {
    "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
    "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
  };

  // Try to extract month from the date string
  const lowerDate = dateString.toLowerCase();
  for (const [monthName, monthIndex] of Object.entries(months)) {
    if (lowerDate.includes(monthName)) {
      // Extract day if present
      const dayMatch = dateString.match(/(\d+)/);
      const day = dayMatch ? parseInt(dayMatch[1]) : 1;
      
      let festivalDate = new Date(currentYear, monthIndex, day);
      const today = new Date();
      
      // If the date has passed this year, use next year
      if (festivalDate < today) {
        festivalDate = new Date(currentYear + 1, monthIndex, day);
      }
      
      return differenceInDays(festivalDate, today);
    }
  }
  
  return 0;
}
