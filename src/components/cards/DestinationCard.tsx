import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  image: string;
  name: string;
  description: string;
  pricePerDay: number;
  recommendedDays: number;
  onClick?: () => void;
}

export function DestinationCard({
  image,
  name,
  description,
  pricePerDay,
  recommendedDays,
  onClick,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-xl font-semibold text-white mb-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            Bénin
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="font-semibold">{pricePerDay.toLocaleString()} FCFA</span>
            <span className="text-muted-foreground">/jour</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {recommendedDays} jours
          </div>
        </div>

        <Button onClick={onClick} variant="default" className="w-full">
          Découvrir
        </Button>
      </div>
    </motion.div>
  );
}
