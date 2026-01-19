import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  Star,
  ChevronLeft,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BudgetTier } from './BudgetSelector';
import InteractiveMap from './InteractiveMap';

export interface ItineraryDay {
  day: number;
  city: string;
  image: string;
  activities: { time: string; description: string }[];
}

interface ItineraryResultProps {
  itinerary: ItineraryDay[];
  budget: BudgetTier;
  arrivalDate: Date;
  numberOfDays: number;
  travelers: number;
  userName: string;
  onRestart: () => void;
}

export default function ItineraryResult({
  itinerary,
  budget,
  arrivalDate,
  numberOfDays,
  travelers,
  userName,
  onRestart,
}: ItineraryResultProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(1);

  const endDate = addDays(arrivalDate, numberOfDays - 1);
  const totalPrice = budget.basePrice * (numberOfDays / 7) * travelers;
  const pricePerPerson = Math.round(totalPrice / travelers);

  const mapCities = itinerary.map((day) => ({
    name: day.city,
    day: day.day,
    coordinates: { x: 0, y: 0 },
    activities: day.activities.map((a) => a.description),
  }));

  return (
    <div className="space-y-8">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 text-white shadow-purple"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-white/80 text-sm">Voyage {budget.label}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              {userName}, votre voyage au Bénin
            </h2>
            <p className="text-white/80">
              Itinéraire personnalisé de {numberOfDays} jours
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              Arrivée
            </div>
            <div className="font-bold">
              {format(arrivalDate, 'd MMM yyyy', { locale: fr })}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              Départ
            </div>
            <div className="font-bold">
              {format(endDate, 'd MMM yyyy', { locale: fr })}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Clock className="w-4 h-4" />
              Durée
            </div>
            <div className="font-bold">{numberOfDays} jours</div>
          </div>
          <div className="p-4 rounded-xl bg-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Users className="w-4 h-4" />
              Voyageurs
            </div>
            <div className="font-bold">{travelers} pers.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/20">
            <div className="text-white/60 text-sm mb-1">Budget estimé</div>
            <div className="text-xl font-bold text-accent">
              {totalPrice.toLocaleString()} FCFA
            </div>
            <div className="text-xs text-white/60">
              ~{pricePerPerson.toLocaleString()} FCFA/pers.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content: Itinerary + Map */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Day by Day Itinerary */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Planning jour par jour
          </h3>

          {itinerary.map((day, idx) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedDay(day.day)}
              className={`bg-card rounded-2xl overflow-hidden shadow-elegant cursor-pointer transition-all ${
                selectedDay === day.day ? 'ring-2 ring-primary' : 'hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-40 h-32 md:h-auto shrink-0">
                  <img
                    src={day.image}
                    alt={day.city}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent md:bg-gradient-to-t" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center font-bold text-white shadow-purple text-sm">
                      J{day.day}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">{day.city}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {format(addDays(arrivalDate, day.day - 1), 'EEE d MMM', {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {day.activities.map((activity, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-primary font-medium shrink-0">
                          {activity.time}
                        </span>
                        <span className="text-muted-foreground">
                          {activity.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <InteractiveMap
              cities={mapCities}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
        <Button onClick={onRestart} variant="outline" size="lg" className="gap-2">
          <ChevronLeft className="w-5 h-5" />
          Modifier mon voyage
        </Button>
        <Link to="/paiement">
          <Button variant="hero" size="xl" className="gap-2 w-full md:w-auto">
            Réserver maintenant
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
