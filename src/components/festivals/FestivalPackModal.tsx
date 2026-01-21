import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Ticket, Car, Hotel, Star, Crown, Sparkles, 
  Check, Users, Clock, MapPin, Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type PackType = "standard" | "premium" | "vip";

export interface FestivalPack {
  type: PackType;
  name: string;
  price: number;
  features: string[];
  highlight?: boolean;
}

interface Festival {
  id: string;
  name: string;
  dates: string;
  city: string;
  image: string;
  duration: string;
  description: string;
}

interface FestivalPackModalProps {
  festival: Festival | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPack: (festival: Festival, pack: FestivalPack) => void;
}

const packs: FestivalPack[] = [
  {
    type: "standard",
    name: "Standard",
    price: 75000,
    features: [
      "Ticket d'accès au festival",
      "Transport aller/retour",
      "Hébergement standard",
      "Petit-déjeuner inclus",
    ],
  },
  {
    type: "premium",
    name: "Premium",
    price: 150000,
    features: [
      "Ticket d'accès au festival",
      "Transport aller/retour confort",
      "Hébergement premium 3★",
      "Petit-déjeuner & déjeuner inclus",
      "Guide accompagnateur",
      "Assistance 24h/24",
    ],
    highlight: true,
  },
  {
    type: "vip",
    name: "VIP",
    price: 300000,
    features: [
      "Ticket d'accès prioritaire au festival",
      "Transport privé aller/retour",
      "Hébergement VIP 5★",
      "Pension complète gastronomique",
      "Guide personnel dédié",
      "Accès backstage exclusif",
      "Cadeau souvenir premium",
      "Conciergerie 24h/24",
    ],
  },
];

const packIcons = {
  standard: Ticket,
  premium: Star,
  vip: Crown,
};

const packColors = {
  standard: "from-slate-500 to-slate-600",
  premium: "from-accent to-amber-500",
  vip: "from-primary to-purple-600",
};

const packBorderColors = {
  standard: "border-slate-300",
  premium: "border-accent ring-2 ring-accent/20",
  vip: "border-primary ring-2 ring-primary/20",
};

export function FestivalPackModal({ 
  festival, 
  isOpen, 
  onClose, 
  onSelectPack 
}: FestivalPackModalProps) {
  const [selectedPack, setSelectedPack] = useState<PackType>("premium");

  if (!festival) return null;

  const handleConfirm = () => {
    const pack = packs.find(p => p.type === selectedPack);
    if (pack) {
      onSelectPack(festival, pack);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-background">
        {/* Header with festival image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={festival.image}
            alt={festival.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="font-serif text-2xl font-bold mb-2">{festival.name}</h2>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {festival.dates}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {festival.city}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {festival.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center font-serif text-xl">
              Choisissez votre pack
            </DialogTitle>
            <p className="text-center text-muted-foreground text-sm mt-2">
              Tous les packs incluent l'accès au festival et le transport
            </p>
          </DialogHeader>

          {/* Pack selection grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {packs.map((pack) => {
              const Icon = packIcons[pack.type];
              const isSelected = selectedPack === pack.type;
              
              return (
                <motion.div
                  key={pack.type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPack(pack.type)}
                  className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
                    isSelected 
                      ? packBorderColors[pack.type] + " bg-muted/50" 
                      : "border-border hover:border-muted-foreground/30"
                  } ${pack.highlight ? "md:-mt-2 md:mb-2" : ""}`}
                >
                  {pack.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        Populaire
                      </span>
                    </div>
                  )}

                  {/* Pack header */}
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${packColors[pack.type]} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold">{pack.name}</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-primary">
                        {pack.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground"> FCFA</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          pack.type === "vip" ? "text-primary" : 
                          pack.type === "premium" ? "text-accent" : "text-muted-foreground"
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* What's included summary */}
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Ce qui est inclus dans tous les packs
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-primary" />
                <span>Accès festival</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                <span>Transport A/R</span>
              </div>
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-primary" />
                <span>Hébergement</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              variant="hero" 
              onClick={handleConfirm} 
              className="flex-1 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { packs };
