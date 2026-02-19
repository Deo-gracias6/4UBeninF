import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft, 
  Sparkles, 
  ShoppingCart, 
  Check,
  Loader2,
  Eye,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import destinationService, { Destination } from "@/services/destinationService";
import experienceService, { Experience } from "@/services/experienceService";
import festivalService, { Festival } from "@/services/festivalService";

// Fallback image
import cotonouCity from "@/assets/cotonou-city.jpg";

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart, itemCount, totalPrice } = useCart();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        console.log('🗺️ Chargement destination:', slug);

        // Charger toutes les destinations et trouver par slug
        const allDestinations = await destinationService.getAll();
        console.log('📍 Destinations:', allDestinations);

        const found = allDestinations.find((d) => d.slug === slug);
        console.log('✅ Destination trouvée:', found);

        if (!found) {
          setError(true);
          return;
        }

        setDestination(found);

        // Charger les expériences de cette destination
        const allExperiences = await experienceService.getAll({ 
          destination_id: found.id 
        });
        console.log('🎭 Expériences:', allExperiences);
        setExperiences(allExperiences);

        // Charger les festivals de cette destination
        const allFestivals = await festivalService.getAll();
        // Filtrer par destination_id côté frontend car le backend ne le fait peut-être pas
        const destinationFestivals = allFestivals.filter(
          (f) => f.destination_id === found.id
        );
        console.log('🎉 Festivals:', destinationFestivals);
        setFestivals(destinationFestivals);

      } catch (err: any) {
        console.error('❌ Erreur:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handleAddExperience = (exp: Experience) => {
    const price = parseFloat(exp.price) || 0;
    addItem({
      id: exp.id,
      type: "experience",
      name: exp.name,
      price: price,
      image: exp.mainImage || undefined,
    });
  };

  const handleAddFestival = (festival: Festival) => {
    const price = parseFloat(festival.price) || 0;
    const formattedDate = new Date(festival.start_date).toLocaleDateString('fr-FR', {
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
      city: destination?.name || "Bénin",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination non trouvée</h1>
          <p className="text-muted-foreground mb-4">
            La destination "{slug}" n'existe pas.
          </p>
          <Link to="/destinations">
            <Button>Retour aux destinations</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src={destination.banner_image || cotonouCity} 
          alt={destination.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> 
              Retour
            </Button>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-2"
            >
              {destination.name}
            </motion.h1>
            <div className="flex items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> 
                {destination.region}
              </span>
              {destination.is_popular && (
                <span className="px-2 py-1 rounded-full bg-accent/80 text-xs">
                  Populaire
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant">
                <h2 className="font-serif text-2xl font-bold mb-4">À propos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {destination.description}
                </p>
              </div>

              {/* Highlights */}
              {destination.highlights && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">Points forts</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {destination.highlights}
                  </p>
                </div>
              )}

              {/* Expériences */}
              {experiences.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    Expériences à {destination.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {experiences.length} expérience{experiences.length > 1 ? 's' : ''} disponible{experiences.length > 1 ? 's' : ''}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {experiences.map((exp) => {
                      const price = parseFloat(exp.price) || 0;
                      const inCart = isInCart(exp.id);
                      const hours = Math.floor(exp.durationMinutes / 60);
                      const mins = exp.durationMinutes % 60;
                      const durationText = hours > 0 
                        ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}`
                        : `${mins}min`;

                      return (
                        <div 
                          key={exp.id} 
                          className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                          <h3 className="font-semibold mb-2 line-clamp-1">{exp.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {exp.description}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {durationText}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {exp.maxParticipants} max
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">
                              {price.toLocaleString()} FCFA
                            </span>
                            <div className="flex gap-2">
                              <Link to={`/experiences/${exp.slug}`}>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Eye className="w-3 h-3" />
                                  Voir
                                </Button>
                              </Link>
                              {inCart ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  disabled 
                                  className="gap-1 text-nature border-nature"
                                >
                                  <Check className="w-3 h-3" /> 
                                  Ajouté
                                </Button>
                              ) : (
                                <Button 
                                  variant="gold" 
                                  size="sm" 
                                  onClick={() => handleAddExperience(exp)} 
                                  className="gap-1"
                                >
                                  <ShoppingCart className="w-3 h-3" /> 
                                  Ajouter
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Festivals */}
              {festivals.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    Festivals à {destination.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {festivals.length} festival{festivals.length > 1 ? 's' : ''} disponible{festivals.length > 1 ? 's' : ''}
                  </p>
                  <div className="space-y-4">
                    {festivals.map((festival) => {
                      const price = parseFloat(festival.price) || 0;
                      const inCart = isInCart(festival.id.toString());
                      const startDate = new Date(festival.start_date);
                      const formattedDate = startDate.toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long'
                      });
                      
                      return (
                        <div key={festival.id} className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-accent" />
                                <span className="font-semibold">{festival.name}</span>
                                <span className="text-sm text-accent">{formattedDate}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{festival.description}</p>
                              <span className="text-sm font-bold text-primary">
                                {price.toLocaleString()} FCFA
                              </span>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Link to={`/festivals/${festival.slug}`}>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Eye className="w-3 h-3" />
                                  Voir
                                </Button>
                              </Link>
                              {inCart ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  disabled 
                                  className="gap-1 text-nature border-nature"
                                >
                                  <Check className="w-3 h-3" /> 
                                  Ajouté
                                </Button>
                              ) : (
                                <Button 
                                  variant="hero" 
                                  size="sm" 
                                  onClick={() => handleAddFestival(festival)} 
                                  className="gap-1"
                                >
                                  <ShoppingCart className="w-3 h-3" /> 
                                  Ajouter
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Aucune expérience ni festival */}
              {experiences.length === 0 && festivals.length === 0 && (
                <div className="bg-card rounded-2xl p-8 shadow-elegant text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Aucune activité pour le moment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Les expériences et festivals pour {destination.name} seront bientôt disponibles.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link to="/experiences">
                      <Button variant="outline">Voir les expériences</Button>
                    </Link>
                    <Link to="/festivals">
                      <Button variant="outline">Voir les festivals</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-elegant sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-4">Informations</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Région</p>
                      <p className="text-sm text-muted-foreground">{destination.region}</p>
                    </div>
                  </div>

                  {experiences.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Expériences</p>
                        <p className="text-sm text-muted-foreground">
                          {experiences.length} activité{experiences.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  {festivals.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Festivals</p>
                        <p className="text-sm text-muted-foreground">
                          {festivals.length} festival{festivals.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  {destination.latitude && destination.longitude && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Coordonnées</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.latitude.toFixed(4)}°N, {destination.longitude.toFixed(4)}°E
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/moteur">
                  <Button className="w-full gap-2" size="lg" variant="hero">
                    <Sparkles className="w-4 h-4" />
                    Planifier mon voyage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
                <div className="text-sm opacity-80">
                  {itemCount} article{itemCount > 1 ? "s" : ""}
                </div>
                <div className="font-semibold">
                  {totalPrice.toLocaleString()} FCFA
                </div>
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
