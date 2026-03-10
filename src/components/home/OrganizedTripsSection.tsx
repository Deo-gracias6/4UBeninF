import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import outingsService, { Outing } from '@/services/outingsService';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function OrganizedTripsSection() {
  const [outings, setOutings] = useState<Outing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOutings = async () => {
      try {
        const data = await outingsService.getAll();
        // On garde le même nombre que l'ancien design (par exemple 3)
        setOutings(data.slice(0, 3));
      } catch (error) {
        console.error('Erreur chargement sorties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOutings();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        </div>
      </section>
    );
  }

  if (outings.length === 0) {
    return null; // ou un message "Aucune sortie disponible"
  }

  // Fonctions pour les catégories (identiques à OrganizedTripsPage)
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'journée': return 'Journée découverte';
      case 'tournée': return 'Tournée touristique';
      case 'immersion': return 'Immersion culturelle';
      default: return 'Sortie générale';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'journée': return 'bg-primary';
      case 'tournée': return 'bg-accent';
      case 'immersion': return 'bg-culture';
      default: return 'bg-muted';
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* En-tête identique à l'ancien design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Sorties organisées
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Voyagez en <span className="text-primary">groupe</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Rejoignez nos sorties à dates fixes et découvrez le Bénin avec des guides experts.
            </p>
          </div>
          <Link to="/sorties" className="mt-6 md:mt-0">
            <Button variant="outline" className="gap-2">
              Toutes les sorties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Grille des cartes - exactement le même design que OrganizedTripsPage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outings.map((outing, idx) => {
            const isFullyBooked = outing.remaining_places <= 0;
            const isFewPlaces = outing.remaining_places > 0 && outing.remaining_places <= 5;

            return (
              <motion.div
                key={outing.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={outing.image || '/images/default-outing.jpg'}
                    alt={outing.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Badge catégorie */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(outing.category)}`}>
                      {getCategoryLabel(outing.category)}
                    </span>
                  </div>
                  {/* Badge disponibilité */}
                  <div className="absolute top-3 right-3">
                    {isFullyBooked ? (
                      <Badge variant="destructive" className="font-semibold">
                        Complet
                      </Badge>
                    ) : isFewPlaces ? (
                      <Badge className="bg-accent text-accent-foreground font-semibold animate-pulse">
                        {outing.remaining_places} places restantes
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="font-medium">
                        {outing.remaining_places} places
                      </Badge>
                    )}
                  </div>
                  {/* Date en overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {format(parseISO(outing.date), 'dd MMM yyyy', { locale: fr })}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">
                    {outing.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {outing.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {outing.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {outing.max_participants} max
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        {outing.price.toLocaleString()} FCFA
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">/ pers.</span>
                    </div>
                    <Link to={`/sorties/${outing.id}`}>
                      <Button size="sm" variant={isFullyBooked ? "outline" : "default"}>
                        {isFullyBooked ? 'Voir détails' : 'Réserver'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}