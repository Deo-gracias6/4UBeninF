import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  Sparkles,
  Loader2,
  MapPin,
  Eye,
  X,
  Users,
  Star,
  Gift,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useToast } from "@/hooks/use-toast";
import festivalService, { Festival } from "@/services/festivalService";
import api from "@/services/api";

// Images de fallback
import festivalVodoun from "@/assets/festival-vodoun.jpg";

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

interface FestivalPack {
  id: string;
  nom: string;
  description: string;
  prix: number;
  festival_id: string;
  dates?: string;
  lieu?: string;
  nombre_places?: number;
  statut: string;
  accommodation?: string;
  experiences?: string[];
}

export default function FestivalsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modale des packs
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [festivalPacks, setFestivalPacks] = useState<FestivalPack[]>([]);
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [reservedPacks, setReservedPacks] = useState<Set<string>>(new Set());
  
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
  const filteredFestivals = festivals.filter((f) => {
    if (selectedMonth !== null) {
      const festivalMonth = new Date(f.start_date).getMonth();
      if (festivalMonth !== selectedMonth) {
        return false;
      }
    }
    return true;
  });

  // Grouper festivals par mois pour le calendrier
  const festivalsByMonth = months.map((month, idx) => ({
    month,
    count: festivals.filter((f) => new Date(f.start_date).getMonth() === idx).length,
  }));

  // Ouvrir la modale et charger les packs
  const handleViewPacks = async (festival: Festival) => {
    setSelectedFestival(festival);
    setLoadingPacks(true);
    
    try {
      const response = await api.get(`/festivals-packs/festival/${festival.id}`);
      const packs = response.data || [];
      console.log('📦 Packs du festival:', packs);
      setFestivalPacks(packs);
    } catch (error) {
      console.error('❌ Erreur chargement packs:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les packs disponibles.",
        variant: "destructive",
      });
    } finally {
      setLoadingPacks(false);
    }
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setSelectedFestival(null);
    setFestivalPacks([]);
  };

  // Réserver un pack
  const handleReservePack = async (pack: FestivalPack) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver.",
        variant: "destructive",
      });
      navigate('/connexion');
      return;
    }

    try {
      const response = await api.post('/bookings', {
        booking_type: 'festival_pack',
        item_id: pack.id,
        start_date: pack.dates || selectedFestival?.start_date || new Date().toISOString().split('T')[0],
        participants: 1,
        notes: ''
      });

      const booking = response.data.data?.booking || response.data.booking || response.data;

      setReservedPacks(prev => new Set(prev).add(pack.id));

      toast({
        title: "Réservation enregistrée",
        description: "Vous allez être redirigé vers le paiement.",
      });

      handleCloseModal();
      navigate(`/paiement/${booking.id}`);

    } catch (error: any) {
      console.error('Erreur réservation:', error);
      toast({
        title: "Échec de la réservation",
        description: error.response?.data?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  // Déterminer le niveau du pack
  const getPackLevel = (nom: string): { label: string; color: string; icon: React.ReactNode } => {
    const lowerName = nom.toLowerCase();
    
    if (lowerName.includes('vip') || lowerName.includes('luxe') || lowerName.includes('prestige')) {
      return {
        label: 'VIP',
        color: 'bg-gradient-to-r from-yellow-500 to-amber-600',
        icon: <Star className="w-4 h-4" />
      };
    }
    
    if (lowerName.includes('premium') || lowerName.includes('confort') || lowerName.includes('plus')) {
      return {
        label: 'Premium',
        color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
        icon: <Sparkles className="w-4 h-4" />
      };
    }
    
    return {
      label: 'Standard',
      color: 'bg-gradient-to-r from-primary to-accent',
      icon: <Gift className="w-4 h-4" />
    };
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
              Découvrez nos festivals et choisissez votre pack : Standard, Premium ou VIP
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
              <Button
                variant="ghost"
                onClick={() => setSelectedMonth(null)}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Tous les festivals
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
              
              const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              
              return (
                <motion.div
                  key={festival.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all"
                >
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

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {festival.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-primary">
                        À partir de {price.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/festivals/${festival.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Eye className="w-4 h-4" />
                          Détails
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1 gap-1"
                        onClick={() => handleViewPacks(festival)}
                      >
                        <Gift className="w-4 h-4" />
                        Voir les packs
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

      {/* Modale Packs */}
      <AnimatePresence>
        {selectedFestival && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="font-serif text-2xl font-bold">{selectedFestival.name}</h2>
                  <p className="text-muted-foreground">Choisissez votre pack</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                {loadingPacks ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  </div>
                ) : festivalPacks.length === 0 ? (
                  <div className="text-center py-16">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-serif text-xl font-bold mb-2">Aucun pack disponible</h3>
                    <p className="text-muted-foreground">
                      Les packs pour ce festival seront bientôt disponibles.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {festivalPacks.map((pack) => {
                      const level = getPackLevel(pack.nom);
                      const price = parseFloat(pack.prix?.toString() || '0');
                      const isReserved = reservedPacks.has(pack.id);

                      return (
                        <div
                          key={pack.id}
                          className="bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary/30 transition-all"
                        >
                          {/* Header */}
                          <div className={`${level.color} p-4 text-white`}>
                            <Badge className="bg-white/20 text-white border-0 gap-1 mb-2">
                              {level.icon}
                              {level.label}
                            </Badge>
                            <h3 className="font-serif text-xl font-bold">
                              {pack.nom}
                            </h3>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                              {pack.description || 'Pack festival tout inclus'}
                            </p>

                            {/* Infos */}
                            <div className="space-y-2 mb-4">
                              {pack.lieu && (
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  {pack.lieu}
                                </div>
                              )}
                              {pack.nombre_places && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  {pack.nombre_places} places disponibles
                                </div>
                              )}
                              {pack.accommodation && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-nature" />
                                  Hébergement inclus
                                </div>
                              )}
                            </div>

                            {/* Price */}
                            <div className="mb-4 pb-4 border-t pt-4">
                              <div className="text-2xl font-bold text-primary">
                                {price.toLocaleString()} FCFA
                              </div>
                              <div className="text-xs text-muted-foreground">par personne</div>
                            </div>

                            {/* Button */}
                            <Button
                              size="lg"
                              variant={isReserved ? "outline" : "default"}
                              className="w-full"
                              onClick={() => handleReservePack(pack)}
                              disabled={isReserved}
                            >
                              {isReserved ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Réservé
                                </>
                              ) : (
                                'Réserver'
                              )}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
