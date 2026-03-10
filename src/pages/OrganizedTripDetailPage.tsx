import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Users, Star, Check, 
  ArrowLeft, Share2, AlertTriangle, Minus, Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import outingsService, { Outing } from '@/services/outingsService';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { WishlistButton } from '@/components/cards/WishlistButton';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { TripReminderBanner } from '@/components/notifications/TripReminderBanner';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

export default function OrganizedTripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { scheduleRemindersForTrip } = useNotifications();
  const { toast } = useToast();
  const [outing, setOuting] = useState<Outing | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadOuting = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await outingsService.getById(id);
        setOuting(data);
      } catch (error) {
        console.error('Erreur chargement sortie:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la sortie.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadOuting();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!outing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sortie non trouvée</h1>
          <Button onClick={() => navigate('/sorties')}>
            Retour aux sorties
          </Button>
        </div>
      </div>
    );
  }

  const isFullyBooked = outing.remaining_places <= 0;

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

  const handleReservation = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver une place.",
        variant: "destructive",
      });
      navigate('/connexion');
      return;
    }

    if (isFullyBooked) {
      toast({
        title: "Sortie complète",
        description: "Cette sortie n'a plus de places disponibles.",
        variant: "destructive",
      });
      return;
    }

    if (quantity > outing.remaining_places) {
      toast({
        title: "Nombre de places insuffisant",
        description: `Il ne reste que ${outing.remaining_places} places disponibles.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Création de la réservation via l'API
      const response = await api.post('/bookings', {
        booking_type: 'outing',
        item_id: outing.id,
        start_date: outing.date,
        participants: quantity,
        notes: ''
      });

      const booking = response.data.data || response.data;

      toast({
        title: "Réservation enregistrée",
        description: "Votre réservation a été créée. Vous allez être redirigé vers le paiement.",
      });

      // Programmer les rappels (par exemple 24h avant)
      scheduleRemindersForTrip(outing.id);

      // Rediriger vers la page de paiement ou la liste des réservations
      navigate(`/paiement/${booking.id}`); // ou `/mes-reservations`

    } catch (error: any) {
      console.error('Erreur réservation:', error);
      toast({
        title: "Échec de la réservation",
        description: error.response?.data?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  // Construire le tableau d'images pour la galerie
  const images = outing.images?.length ? outing.images : [outing.image].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate('/sorties')} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour aux sorties
        </Button>
      </div>

      {/* Header */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <Badge className={`mb-3 text-white ${getCategoryColor(outing.category)}`}>
              {getCategoryLabel(outing.category)}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              {outing.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {outing.location}
              </div>
              {/* Note : les avis ne sont pas encore disponibles via l'API */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WishlistButton
              item={{
                id: outing.id,
                type: 'trip',
                name: outing.name,
                image: outing.image || '/images/default-outing.jpg',
                price: outing.price,
                location: outing.location,
              }}
            />
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Galerie d'images */}
        <ImageGallery images={images as string[]} title={outing.name} />
      </section>

      {/* Contenu principal */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne de gauche (détails) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bannière de rappel (si déjà réservé ? à améliorer plus tard) */}
            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">À propos de cette sortie</h2>
              <p className="text-muted-foreground leading-relaxed">
                {outing.description}
              </p>
            </div>

            <Separator />

            {/* Programme détaillé */}
            {outing.program && outing.program.length > 0 && (
              <>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Programme détaillé</h2>
                  <div className="space-y-4">
                    {outing.program.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="shrink-0 w-24 font-semibold text-primary">
                          {item.time}
                        </div>
                        <div className="text-foreground">{item.activity}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Activités incluses */}
            {outing.activities && outing.activities.length > 0 && (
              <>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-4">Activités incluses</h2>
                  <div className="flex flex-wrap gap-2">
                    {outing.activities.map((activity, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Ce qui est inclus */}
            {outing.includes && outing.includes.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Ce qui est inclus</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {outing.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-5 h-5 text-nature shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne de droite (carte de réservation) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-elegant">
              {/* Bannière d'urgence */}
              {!isFullyBooked && outing.remaining_places <= 5 && (
                <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground rounded-lg p-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">
                    Plus que {outing.remaining_places} places disponibles !
                  </span>
                </div>
              )}

              {isFullyBooked && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg p-3 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Cette sortie est complète
                  </span>
                </div>
              )}

              {/* Prix */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">
                  {outing.price.toLocaleString()} FCFA
                </span>
                <span className="text-muted-foreground"> / personne</span>
              </div>

              {/* Grille d'informations */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="text-sm font-semibold">
                    {format(parseISO(outing.date), 'dd MMM yyyy', { locale: fr })}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Heure</div>
                  <div className="text-sm font-semibold">{outing.time || 'Non précisée'}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Durée</div>
                  <div className="text-sm font-semibold">{outing.duration}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Places</div>
                  <div className="text-sm font-semibold">
                    {isFullyBooked ? 'Complet' : `${outing.remaining_places}/${outing.max_participants}`}
                  </div>
                </div>
              </div>

              {/* Point de rendez-vous */}
              {outing.meeting_point && (
                <div className="mb-6 p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    Point de rendez-vous
                  </div>
                  <p className="text-sm text-muted-foreground">{outing.meeting_point}</p>
                </div>
              )}

              {/* Sélecteur de quantité */}
              {!isFullyBooked && (
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Nombre de places</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(outing.remaining_places, quantity + 1))}
                      disabled={quantity >= outing.remaining_places}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right mt-2 text-sm text-muted-foreground">
                    Total: <span className="font-semibold text-foreground">
                      {(outing.price * quantity).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              )}

              {/* Bouton d'action */}
              <Button
                onClick={handleReservation}
                disabled={isFullyBooked}
                className="w-full gap-2"
                size="lg"
                variant={isFullyBooked ? "outline" : "default"}
              >
                {isFullyBooked ? 'Sortie complète' : 'Réserver ma place'}
              </Button>

              {!user && !isFullyBooked && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Connexion requise pour réserver
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}