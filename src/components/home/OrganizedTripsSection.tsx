import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { organizedTrips } from '@/data/organizedTripsData';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function OrganizedTripsSection() {
  // Show only upcoming trips with available places (max 3)
  const upcomingTrips = organizedTrips
    .filter((trip) => trip.availablePlaces > 0)
    .slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'journée': return 'bg-primary';
      case 'tournée': return 'bg-accent';
      case 'immersion': return 'bg-culture';
      default: return 'bg-muted';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Voyages en groupe</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Sorties Organisées
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rejoignez nos excursions à dates fixes et découvrez le Bénin en groupe 
            avec des guides passionnés. Places limitées !
          </p>
        </motion.div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {upcomingTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(trip.category)}`}>
                    {trip.category === 'journée' ? 'Journée' : trip.category === 'tournée' ? 'Tournée' : 'Immersion'}
                  </span>
                </div>

                {/* Urgency Badge */}
                <div className="absolute top-3 right-3">
                  {trip.availablePlaces <= 5 ? (
                    <Badge className="bg-accent text-accent-foreground font-semibold animate-pulse">
                      {trip.availablePlaces} places !
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      {trip.availablePlaces} places
                    </Badge>
                  )}
                </div>

                {/* Date Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    {format(parseISO(trip.date), 'dd MMM', { locale: fr })}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-1">
                  {trip.title}
                </h3>

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
                    <span className="text-lg font-bold text-primary">
                      {trip.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">/ pers.</span>
                  </div>
                  <Link to={`/sorties/${trip.id}`}>
                    <Button size="sm" className="gap-1">
                      Réserver
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/sorties">
            <Button variant="outline" size="lg" className="gap-2">
              Voir toutes les sorties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
