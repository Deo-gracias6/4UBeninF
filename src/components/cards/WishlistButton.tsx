import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist, WishlistItem } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  item: WishlistItem;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WishlistButton({ item, className, size = "md" }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(item.id);

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(item);
      }}
      className={cn(
        "rounded-full flex items-center justify-center transition-all",
        isWishlisted
          ? "bg-red-500 text-white"
          : "bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-red-500",
        sizeClasses[size],
        className
      )}
      aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        className={cn(
          iconSizes[size],
          isWishlisted && "fill-current"
        )}
      />
    </motion.button>
  );
}
