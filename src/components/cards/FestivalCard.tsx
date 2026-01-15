import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FestivalCardProps {
  image: string;
  name: string;
  dates: string;
  city: string;
  price: number;
  duration: string;
  onAdd?: () => void;
}

export function FestivalCard({
  image,
  name,
  dates,
  city,
  price,
  duration,
  onAdd,
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
          <span className="text-lg font-bold text-primary">
            {price.toLocaleString()} FCFA
          </span>
        </div>

        <Button onClick={onAdd} variant="hero" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Intégrer au voyage
        </Button>
      </div>
    </motion.div>
  );
}
