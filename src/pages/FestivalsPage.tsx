import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, ChevronLeft, Sparkles, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FestivalCard } from "@/components/cards/FestivalCard";
import { FestivalPackModal, FestivalPack, packs } from "@/components/festivals/FestivalPackModal";
import { AdvancedFilters, FilterState } from "@/components/filters/AdvancedFilters";
import { festivals } from "@/data/festivalsData";
import { useCart } from "@/contexts/CartContext";

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

type Festival = typeof festivals[0];

export default function FestivalsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    budgets: [],
    durations: [],
    types: [],
    priceRange: [0, 500000],
  });
  const { addItem, isInCart, totalPrice, itemCount } = useCart();

  const filteredFestivals = useMemo(() => {
    return festivals.filter((f) => {
      // Month filter
      if (selectedMonth !== null && f.month !== selectedMonth) {
        return false;
      }

      // Duration filter
      if (filters.durations.length > 0) {
        const daysMatch = f.duration.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0]) : 1;
        
        const is1Day = days === 1;
        const is2to3Days = days >= 2 && days <= 3;
        const is1Week = days >= 7;

        const matchesDuration =
          (filters.durations.includes("1-day") && is1Day) ||
          (filters.durations.includes("2-3-days") && is2to3Days) ||
          (filters.durations.includes("1-week") && is1Week);

        if (!matchesDuration) return false;
      }

      return true;
    });
  }, [selectedMonth, filters]);

  const handleOpenPackModal = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const handleSelectPack = (festival: Festival, pack: FestivalPack) => {
    addItem({
      id: `${festival.id}-${pack.type}`,
      type: "festival",
      name: festival.name,
      price: pack.price,
      image: festival.image,
      dates: festival.dates,
      city: festival.city,
      duration: festival.duration,
      packType: pack.type,
      packName: pack.name,
      packFeatures: pack.features,
    });
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
            src={festivals[0]?.image}
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

          <div className="flex justify-center gap-4 mt-6">
            {selectedMonth !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedMonth(null)}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Tous les festivals
                </Button>
              </motion.div>
            )}
            
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={500000}
              showTypes={false}
              showDurations={true}
            />
          </div>
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <div className="mb-6 text-muted-foreground">
            {filteredFestivals.length} festival{filteredFestivals.length > 1 ? "s" : ""} trouvé{filteredFestivals.length > 1 ? "s" : ""}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFestivals.map((festival, idx) => (
              <motion.div
                key={festival.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <FestivalCard
                  id={festival.id}
                  image={festival.image}
                  name={festival.name}
                  dates={festival.dates}
                  city={festival.city}
                  duration={festival.duration}
                  rating={festival.rating}
                  onChoosePack={() => handleOpenPackModal(festival)}
                  hasPackInCart={
                    isInCart(`${festival.id}-standard`) ||
                    isInCart(`${festival.id}-premium`) ||
                    isInCart(`${festival.id}-vip`)
                  }
                />
                <p className="text-muted-foreground text-sm mt-3 px-1">
                  {festival.description}
                </p>
              </motion.div>
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-serif text-xl font-semibold mb-2">Aucun festival trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez d'ajuster vos filtres pour voir plus de résultats.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedMonth(null);
                  setFilters({
                    budgets: [],
                    durations: [],
                    types: [],
                    priceRange: [0, 500000],
                  });
                }}
              >
                Réinitialiser les filtres
              </Button>
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
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Planifiez autour des festivals
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Notre moteur intelligent intègre automatiquement les festivals 
              dans votre itinéraire personnalisé.
            </p>
            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Créer mon voyage
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Festival Pack Modal */}
      <FestivalPackModal
        festival={selectedFestival}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPack={handleSelectPack}
      />
    </main>
  );
}
