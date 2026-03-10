import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Calendar,
  Loader2,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useToast } from "@/hooks/use-toast";
import experienceService, { ExperienceDetail } from "@/services/experienceService";
import api from "@/services/api";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";

// Images de fallback
import festivalVodoun from "@/assets/festival-vodoun.jpg";

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { toast } = useToast();
  
  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // États pour la réservation
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [participants, setParticipants] = useState(1);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const loadExperience = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        console.log('🎭 Chargement expérience avec slug:', slug);
        const data = await experienceService.getBySlug(slug);
        console.log('✅ Expérience chargée:', data);
        setExperience(data);
        
        // Initialiser la date par défaut (demain)
        setSelectedDate(addDays(new Date(), 1));
      } catch (err: any) {
        console.error('❌ Erreur chargement expérience:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [slug]);

  const handleReservation = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver.",
        variant: "destructive",
      });
      navigate('/connexion');
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Date manquante",
        description: "Veuillez sélectionner une date.",
        variant: "destructive",
      });
      return;
    }

    if (!experience) return;

    try {
      setIsReserving(true);

      // Créer la réservation
      const response = await api.post('/bookings', {
        booking_type: 'experience',
        item_id: experience.id,
        start_date: format(selectedDate, 'yyyy-MM-dd'),
        participants: participants,
        notes: ''
      });

      const booking = response.data.data?.booking || response.data.booking || response.data;

      toast({
  title: "Réservation enregistrée",
  description: "Votre réservation a été créée avec succès. Vous avez 24h pour payer.",
});

// Rediriger vers mes réservations
navigate('/mes-reservations');

    } catch (error: any) {
      console.error('❌ Erreur réservation:', error);
      toast({
        title: "Échec de la réservation",
        description: error.response?.data?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsReserving(false);
    }
  };

  // Générer les 30 prochains jours pour le sélecteur
  const availableDates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i + 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Expérience non trouvée</h1>
          <p className="text-muted-foreground mb-4">
            L'expérience "{slug}" n'existe pas ou n'est pas active.
          </p>
          <Link to="/experiences">
            <Button variant="outline">Retour aux expériences</Button>
          </Link>
        </div>
      </main>
    );
  }

  const price = typeof experience.price === 'string' 
    ? parseFloat(experience.price) 
    : experience.price;
    
  const hours = Math.floor(experience.durationMinutes / 60);
  const minutes = experience.durationMinutes % 60;
  const durationText = hours > 0 
    ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`
    : `${minutes}min`;

  return (
    <main className="pt-20">
      {/* Header with Back Button */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          
          {experience.destination && (
            <Badge variant="outline" className="mb-3">
              <MapPin className="w-3 h-3 mr-1" />
              {experience.destination.name}
            </Badge>
          )}
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {experience.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {durationText}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Max {experience.maxParticipants} personnes
            </span>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elegant">
            <img
              src={experience.mainImage || festivalVodoun}
              alt={experience.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-4">À propos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {experience.description}
                </p>
              </motion.div>

              {/* Ce qui est inclus */}
              {experience.included && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-nature/5 p-6 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-nature" />
                    Ce qui est inclus
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {experience.included}
                  </p>
                </motion.div>
              )}

              {/* Localisation */}
              {experience.latitude && experience.longitude && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-secondary p-6 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Localisation
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Latitude: {parseFloat(experience.latitude.toString()).toFixed(4)}</p>
                    <p>Longitude: {parseFloat(experience.longitude.toString()).toFixed(4)}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-elegant"
              >
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {price.toLocaleString()} FCFA
                  </span>
                  <span className="text-muted-foreground"> / personne</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Durée
                    </span>
                    <span className="font-medium">{durationText}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Groupe max
                    </span>
                    <span className="font-medium">{experience.maxParticipants} pers.</span>
                  </div>
                </div>

                {/* Sélecteur de date */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Choisir une date</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  >
                    {availableDates.map((date) => (
                      <option key={date.toISOString()} value={format(date, 'yyyy-MM-dd')}>
                        {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sélecteur de participants */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Nombre de participants</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      disabled={participants <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{participants}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setParticipants(Math.min(experience.maxParticipants, participants + 1))}
                      disabled={participants >= experience.maxParticipants}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right mt-2 text-sm text-muted-foreground">
                    Total: <span className="font-semibold text-foreground">
                      {(price * participants).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                {/* Bouton Réserver */}
                <Button
                  variant="default"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleReservation}
                  disabled={isReserving}
                >
                  {isReserving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Réservation...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Réserver
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Connexion requise pour réserver
                  </p>
                )}

                {experience.destination && experience.destination.slug && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link to={`/destinations/${experience.destination.slug}`}>
                      <Button variant="ghost" size="sm" className="w-full gap-2">
                        <MapPin className="w-4 h-4" />
                        Découvrir {experience.destination.name}
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
