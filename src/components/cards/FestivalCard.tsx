import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles, Check, Ticket, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FestivalCardProps {
  image: string;
  name: string;
  dates: string;
  city: string;
  duration: string;
  onChoosePack?: () => void;
  hasPackInCart?: boolean;
}

export function FestivalCard({
  image,
  name,
  dates,
  city,
  duration,
  onChoosePack,
  hasPackInCart = false,
}: FestivalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-xl font-semibold text-white mb-2">
            {name}
          </h3>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {dates}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {city}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          {/* Pack icons preview */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center" title="Standard">
              <Ticket className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center" title="Premium">
              <Star className="w-3 h-3 text-accent" />
            </div>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center" title="VIP">
              <Crown className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="text-xs text-muted-foreground">À partir de</span>
          <div className="text-lg font-bold text-primary">75 000 FCFA</div>
        </div>

        {hasPackInCart ? (
          <Button variant="outline" className="w-full gap-2 text-nature border-nature" disabled>
            <Check className="w-4 h-4" />
            Pack dans le panier
          </Button>
        ) : (
          <Button onClick={onChoosePack} variant="hero" className="w-full gap-2">
            <Sparkles className="w-4 h-4" />
            Choisir mon pack
          </Button>
        )}
      </div>
    </motion.div>
  );
}
