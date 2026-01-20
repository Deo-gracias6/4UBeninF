import { motion } from "framer-motion";
import { Clock, Users, Star, Plus, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperienceCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  days: number;
  rating: number;
  available: boolean;
  onAdd?: () => void;
  inCart?: boolean;
}

export function ExperienceCard({
  image,
  title,
  category,
  price,
  duration,
  days,
  rating,
  available,
  onAdd,
  inCart = false,
}: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 border border-border"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <Star className="w-3 h-3 fill-accent text-accent" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {days} jour{days > 1 ? "s" : ""}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {price.toLocaleString()} FCFA
            </span>
            {!available && (
              <span className="ml-2 text-xs text-destructive">Complet</span>
            )}
          </div>
          {inCart ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="gap-1 text-nature border-nature"
            >
              <Check className="w-4 h-4" />
              Ajouté
            </Button>
          ) : (
            <Button
              onClick={onAdd}
              variant="gold"
              size="sm"
              disabled={!available}
              className="gap-1"
            >
              <ShoppingCart className="w-4 h-4" />
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
