import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Search, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import outingsService, { Outing } from '@/services/outingsService';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function OrganizedTripsPage() {
  const [outings, setOutings] = useState<Outing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  useEffect(() => {
    const loadOutings = async () => {
      try {
        setLoading(true);
        const data = await outingsService.getAll();
        console.log('🚌 Sorties chargées:', data);
        setOutings(data);
      } catch (error) {
        console.error('❌ Erreur chargement sorties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOutings();
  }, []);

  // Filtrage
  const filteredOutings = outings.filter((outing) => {
    const matchesSearch =
      outing.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outing.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || outing.category === categoryFilter;
    
    const matchesDuration =
      durationFilter === 'all' ||
      (durationFilter === '1' && outing.days === 1) ||
      (durationFilter === '2-3' && outing.days >= 2 && outing.days <= 3) ||
      (durationFilter === '4+' && outing.days >= 4);

    return matchesSearch && matchesCategory && matchesDuration;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'journée': return 'Journée découverte';
      case 'tournée': return 'Tournée touristique';
      case 'immersion': return 'Immersion culturelle';
      case 'général': return 'Sortie générale';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'journée': return 'bg-primary';
      case 'tournée': return 'bg-accent';
      case 'immersion': return 'bg-culture';
      case 'général': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Voyages en groupe
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Sorties Organisées
            </h1>
            <p className="text-lg text-muted-foreground">
              Rejoignez nos sorties touristiques en groupe à dates fixes. 
              Découvrez le Bénin authentique avec des guides experts et d'autres passionnés de voyage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une sortie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de sortie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="journée">Journée découverte</SelectItem>
                  <SelectItem value="tournée">Tournée touristique</SelectItem>
                  <SelectItem value="immersion">Immersion culturelle</SelectItem>
                  <SelectItem value="général">Sortie générale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes durées</SelectItem>
                  <SelectItem value="1">1 jour</SelectItem>
                  <SelectItem value="2-3">2-3 jours</SelectItem>
                  <SelectItem value="4+">4 jours et +</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredOutings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune sortie ne correspond à vos critères.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOutings.map((outing, index) => {
                const isFullyBooked = outing.remaining_places <= 0;
                const isFewPlaces = outing.remaining_places > 0 && outing.remaining_places <= 5;

                return (
                  <motion.div
                    key={outing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 border border-border"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={outing.image}
                        alt={outing.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(outing.category)}`}>
                          {getCategoryLabel(outing.category)}
                        </span>
                      </div>

                      {/* Availability Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
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

                      {/* Date Overlay */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          {format(parseISO(outing.date), 'dd MMMM yyyy', { locale: fr })}
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
                          <Clock className="w-4 h-4" />
                          {outing.duration}
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
                          <Button 
                            variant={isFullyBooked ? "outline" : "default"}
                            size="sm"
                          >
                            {isFullyBooked ? 'Voir détails' : 'Réserver'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}