import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { organizedTrips } from '@/data/organizedTripsData';
import { WishlistButton } from '@/components/cards/WishlistButton';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function OrganizedTripsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  const filteredTrips = organizedTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || trip.category === categoryFilter;
    
    const matchesDuration =
      durationFilter === 'all' ||
      (durationFilter === '1' && trip.durationDays === 1) ||
      (durationFilter === '2-3' && trip.durationDays >= 2 && trip.durationDays <= 3) ||
      (durationFilter === '4+' && trip.durationDays >= 4);

    return matchesSearch && matchesCategory && matchesDuration;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'journée': return 'Journée découverte';
      case 'tournée': return 'Tournée touristique';
      case 'immersion': return 'Immersion culturelle';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'journée': return 'bg-primary';
      case 'tournée': return 'bg-accent';
      case 'immersion': return 'bg-culture';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
          {filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune sortie ne correspond à vos critères.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(trip.category)}`}>
                        {getCategoryLabel(trip.category)}
                      </span>
                    </div>

                    {/* Availability Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {trip.availablePlaces === 0 ? (
                        <Badge variant="destructive" className="font-semibold">
                          Complet
                        </Badge>
                      ) : trip.availablePlaces <= 5 ? (
                        <Badge className="bg-accent text-accent-foreground font-semibold animate-pulse">
                          {trip.availablePlaces} places restantes
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="font-medium">
                          {trip.availablePlaces} places
                        </Badge>
                      )}
                      <WishlistButton
                        item={{
                          id: trip.id,
                          type: 'trip',
                          name: trip.title,
                          image: trip.image,
                          price: trip.price,
                          location: trip.city,
                        }}
                        size="sm"
                      />
                    </div>

                    {/* Date Overlay */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {format(parseISO(trip.date), 'dd MMMM yyyy', { locale: fr })}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">
                      {trip.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {trip.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {trip.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {trip.totalPlaces} max
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-xl font-bold text-primary">
                          {trip.price.toLocaleString()} FCFA
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">/ pers.</span>
                      </div>
                      <Link to={`/sorties/${trip.id}`}>
                        <Button 
                          variant={trip.availablePlaces === 0 ? "outline" : "default"}
                          size="sm"
                        >
                          {trip.availablePlaces === 0 ? 'Voir détails' : 'Réserver'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
