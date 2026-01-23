import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar,
  Check,
  Info,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { festivals } from "@/data/festivalsData";
import { FestivalPackModal, FestivalPack } from "@/components/festivals/FestivalPackModal";

export default function FestivalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const festival = festivals.find((f) => f.id === id);

  if (!festival) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Festival non trouvé</h1>
          <Link to="/festivals">
            <Button variant="outline">Retour aux festivals</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleSelectPack = (festivalData: typeof festival, pack: FestivalPack) => {
    addItem({
      id: `${festivalData.id}-${pack.type}`,
      type: "festival",
      name: festivalData.name,
      price: pack.price,
      image: festivalData.image,
      dates: festivalData.dates,
      city: festivalData.city,
      duration: festivalData.duration,
      packType: pack.type,
      packName: pack.name,
      packFeatures: pack.features,
    });
  };

  const hasPackInCart = 
    isInCart(`${festival.id}-standard`) ||
    isInCart(`${festival.id}-premium`) ||
    isInCart(`${festival.id}-vip`);

  return (
    <main className="pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {festival.highlights.map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  {highlight}
                </Badge>
              ))}
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              {festival.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {festival.city}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {festival.dates}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {festival.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-4">Présentation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {festival.fullDescription}
                </p>
              </motion.div>

              {/* Cultural Context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-secondary p-6 rounded-2xl"
              >
                <h2 className="font-serif text-2xl font-bold mb-4">Contexte historique & culturel</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {festival.culturalContext}
                </p>
              </motion.div>

              {/* Program */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Programme</h2>
                <div className="space-y-6">
                  {festival.program.map((day, dayIdx) => (
                    <div key={dayIdx} className="bg-card border border-border rounded-2xl p-6">
                      <h3 className="font-semibold text-lg text-primary mb-4">{day.day}</h3>
                      <ul className="space-y-3">
                        {day.events.map((event, eventIdx) => (
                          <li key={eventIdx} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Practical Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Informations pratiques</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted p-5 rounded-xl">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      Meilleur moment
                    </h4>
                    <p className="text-sm text-muted-foreground">{festival.practicalInfo.bestTime}</p>
                  </div>
                  
                  <div className="bg-muted p-5 rounded-xl">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      Tenue vestimentaire
                    </h4>
                    <p className="text-sm text-muted-foreground">{festival.practicalInfo.dresscode}</p>
                  </div>

                  <div className="bg-muted p-5 rounded-xl">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      Accessibilité
                    </h4>
                    <p className="text-sm text-muted-foreground">{festival.practicalInfo.accessibility}</p>
                  </div>

                  <div className="bg-muted p-5 rounded-xl">
                    <h4 className="font-medium mb-3">À apporter</h4>
                    <ul className="space-y-1">
                      {festival.practicalInfo.whatToBring.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3 h-3 text-nature" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-elegant"
              >
                <div className="text-center mb-6">
                  <span className="text-sm text-muted-foreground">À partir de</span>
                  <div className="text-3xl font-bold text-primary">
                    75 000 FCFA
                  </div>
                  <span className="text-sm text-muted-foreground">Pack Standard</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Date
                    </span>
                    <span className="font-medium">{festival.dates}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Lieu
                    </span>
                    <span className="font-medium">{festival.city}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Durée
                    </span>
                    <span className="font-medium">{festival.duration}</span>
                  </div>
                </div>

                <div className="bg-accent/10 p-4 rounded-xl mb-6">
                  <h4 className="font-medium text-sm mb-2">3 packs disponibles :</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Standard</strong> – Essentiel</li>
                    <li>• <strong>Premium</strong> – Confort +</li>
                    <li>• <strong>VIP</strong> – Expérience exclusive</li>
                  </ul>
                </div>

                <Button
                  variant={hasPackInCart ? "outline" : "gold"}
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => setIsModalOpen(true)}
                  disabled={hasPackInCart}
                >
                  {hasPackInCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Pack dans le panier
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Choisir mon pack
                    </>
                  )}
                </Button>

                {hasPackInCart && (
                  <Link to="/panier" className="block mt-3">
                    <Button variant="default" size="lg" className="w-full">
                      Voir le panier
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Pack Modal */}
      <FestivalPackModal
        festival={festival}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPack={handleSelectPack}
      />
    </main>
  );
}
