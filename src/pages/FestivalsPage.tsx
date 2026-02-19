import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  Sparkles, 
  ShoppingCart, 
  Check,
  Loader2,
  MapPin,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import festivalService, { Festival } from "@/services/festivalService";

// Images de fallback
import festivalVodoun from "@/assets/festival-vodoun.jpg";


const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export default function FestivalsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addItem, isInCart, totalPrice, itemCount } = useCart();

  // Charger les festivals
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await festivalService.getAll({ language: 'fr' });
        console.log('🎉 Festivals chargés:', data);
        setFestivals(data);
      } catch (error) {
        console.error('❌ Erreur chargement festivals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les festivals
  const filteredFestivals = useMemo(() => {
    return festivals.filter((f) => {
      // Filtre par mois
      if (selectedMonth !== null) {
        const festivalMonth = new Date(f.start_date).getMonth();
        if (festivalMonth !== selectedMonth) {
          return false;
        }
      }

      return true;
    });
  }, [selectedMonth, festivals]);

  // Grouper festivals par mois pour le calendrier
  const festivalsByMonth = months.map((month, idx) => ({
    month,
    count: festivals.filter((f) => new Date(f.start_date).getMonth() === idx).length,
  }));

  const handleAddToCart = (festival: Festival) => {
    const price = parseFloat(festival.price) || 0;
    const startDate = new Date(festival.start_date);
    const formattedDate = startDate.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long' 
    });

    addItem({
      id: festival.id.toString(),
      type: "festival",
      name: festival.name,
      price: price,
      image: festival.main_image || undefined,
      dates: formattedDate,
      city: "Cotonou",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={festivals[0]?.main_image || festivalVodoun}
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
            <div className="flex justify-center mt-6">
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
            </div>
          )}
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
            {filteredFestivals.map((festival, idx) => {
              const price = parseFloat(festival.price) || 0;
              const startDate = new Date(festival.start_date);
              const endDate = new Date(festival.end_date);
              const formattedDate = startDate.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long' 
              });
              
              // Calculer la durée
              const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              
              return (
                <motion.div
                  key={festival.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={festival.main_image || festivalVodoun}
                      alt={festival.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 text-accent text-sm mb-2">
                        <CalendarIcon className="w-4 h-4" />
                        {formattedDate}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white mb-1 line-clamp-2">
                        {festival.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-white/70 text-sm">
                          <MapPin className="w-4 h-4" />
                          Cotonou
                        </div>
                        <span className="text-accent font-semibold text-sm">
                          {durationDays} jour{durationDays > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {festival.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-primary">
                        {price.toLocaleString()} FCFA
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <Link to={`/festivals/${festival.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Eye className="w-4 h-4" />
                          Détails
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant={isInCart(festival.id.toString()) ? "outline" : "gold"}
                        className="flex-1 gap-1"
                        onClick={() => handleAddToCart(festival)}
                      >
                        {isInCart(festival.id.toString()) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Ajouté
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-serif text-xl font-semibold mb-2">Aucun festival trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de sélectionner un autre mois.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedMonth(null)}
              >
                Voir tous les festivals
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

      {/* Floating Cart */}
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Link to="/panier">
            <div className="flex items-center gap-4 px-6 py-4 bg-foreground text-background rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform">
              <div>
                <div className="text-sm opacity-80">{itemCount} article{itemCount > 1 ? "s" : ""}</div>
                <div className="font-semibold">{totalPrice.toLocaleString()} FCFA</div>
              </div>
              <Button variant="gold" size="lg" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Voir le panier
              </Button>
            </div>
          </Link>
        </motion.div>
      )}
    </main>
  );
}
