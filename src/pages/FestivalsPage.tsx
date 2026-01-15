import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FestivalCard } from "@/components/cards/FestivalCard";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import { useToast } from "@/hooks/use-toast";

const festivals = [
  {
    id: 1,
    name: "Festival du Vodoun",
    dates: "10 Janvier",
    month: 0,
    city: "Ouidah",
    image: festivalVodoun,
    price: 75000,
    duration: "3 jours",
    description: "La plus grande célébration du vodoun au monde. Cérémonies, danses et rituels ancestraux.",
  },
  {
    id: 2,
    name: "Festival des Masques Gélédé",
    dates: "Mars",
    month: 2,
    city: "Kétou",
    image: festivalVodoun,
    price: 55000,
    duration: "2 jours",
    description: "Patrimoine immatériel UNESCO. Spectacle de masques et de danses traditionnelles.",
  },
  {
    id: 3,
    name: "FinAB - Festival International des Arts du Bénin",
    dates: "Avril",
    month: 3,
    city: "Cotonou",
    image: festivalVodoun,
    price: 45000,
    duration: "5 jours",
    description: "Le plus grand festival artistique du pays. Musique, danse, théâtre et arts visuels.",
  },
  {
    id: 4,
    name: "WeLovEya",
    dates: "Août",
    month: 7,
    city: "Grand-Popo",
    image: festivalVodoun,
    price: 60000,
    duration: "3 jours",
    description: "Festival de musique électronique sur la plage. Rencontre entre traditions et modernité.",
  },
  {
    id: 5,
    name: "Festival Quintessence",
    dates: "Décembre",
    month: 11,
    city: "Ouidah",
    image: festivalVodoun,
    price: 50000,
    duration: "4 jours",
    description: "Arts de la scène, théâtre et performances. Une vitrine de la créativité béninoise.",
  },
  {
    id: 6,
    name: "Fête des Religions Endogènes",
    dates: "Août",
    month: 7,
    city: "Covè",
    image: festivalVodoun,
    price: 40000,
    duration: "2 jours",
    description: "Célébration des traditions spirituelles locales avec cérémonies et rituels.",
  },
];

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export default function FestivalsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const { toast } = useToast();

  const filteredFestivals = selectedMonth !== null
    ? festivals.filter((f) => f.month === selectedMonth)
    : festivals;

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      toast({
        title: "Festival ajouté !",
        description: "Ce festival a été intégré à votre voyage.",
      });
    }
  };

  // Group festivals by month for calendar view
  const festivalsByMonth = months.map((month, idx) => ({
    month,
    count: festivals.filter((f) => f.month === idx).length,
  }));

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={festivalVodoun}
            alt="Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm mb-6">
              <CalendarIcon className="w-4 h-4" />
              Calendrier culturel
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Festivals & Événements
            </h1>
            <p className="text-white/80 text-lg">
              Synchronisez votre voyage avec les moments forts de la culture béninoise.
              Des cérémonies vodoun aux festivals de musique contemporaine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Calendrier des festivals
            </h2>
            <p className="text-muted-foreground">
              Cliquez sur un mois pour voir les festivals programmés
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
          >
            {festivalsByMonth.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMonth(selectedMonth === idx ? null : idx)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedMonth === idx
                    ? "bg-primary text-primary-foreground shadow-purple"
                    : item.count > 0
                    ? "bg-card hover:bg-muted border border-border"
                    : "bg-muted/50 opacity-50 cursor-not-allowed"
                }`}
                disabled={item.count === 0}
              >
                <div className="font-medium text-sm">{item.month.slice(0, 3)}</div>
                {item.count > 0 && (
                  <div className={`text-xs mt-1 ${
                    selectedMonth === idx ? "text-primary-foreground/80" : "text-accent"
                  }`}>
                    {item.count} festival{item.count > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            ))}
          </motion.div>

          {selectedMonth !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedMonth(null)}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Voir tous les festivals
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFestivals.map((festival, idx) => (
              <motion.div
                key={festival.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <FestivalCard
                  image={festival.image}
                  name={festival.name}
                  dates={festival.dates}
                  city={festival.city}
                  price={festival.price}
                  duration={festival.duration}
                  onAdd={() => addToCart(festival.id)}
                />
                <p className="text-muted-foreground text-sm mt-3 px-1">
                  {festival.description}
                </p>
              </motion.div>
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun festival ce mois-ci.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CalendarIcon className="w-12 h-12 mx-auto mb-6 text-accent" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Planifiez autour des festivals
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Notre moteur intelligent intègre automatiquement les festivals 
              dans votre itinéraire.
            </p>
            <Button variant="gold" size="xl" className="gap-2">
              Créer mon voyage
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
