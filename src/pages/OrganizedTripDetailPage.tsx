import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Users, Star, Check, 
  ArrowLeft, Share2, AlertTriangle, Minus, Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { organizedTrips } from '@/data/organizedTripsData';
import { useCart } from '@/contexts/CartContext';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { WishlistButton } from '@/components/cards/WishlistButton';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function OrganizedTripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { user } = useUserAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const trip = organizedTrips.find((t) => t.id === id);

  if (!trip) {
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

  const isFullyBooked = trip.availablePlaces === 0;
  const alreadyInCart = isInCart(`${trip.id}-trip`);

  const handleReservation = () => {
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

    if (quantity > trip.availablePlaces) {
      toast({
        title: "Nombre de places insuffisant",
        description: `Il ne reste que ${trip.availablePlaces} places disponibles.`,
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: `${trip.id}-trip`,
      type: 'discovery',
      name: `${trip.title} (${quantity} place${quantity > 1 ? 's' : ''})`,
      price: trip.price * quantity,
      image: trip.image,
      dates: format(parseISO(trip.date), 'dd MMMM yyyy', { locale: fr }),
      city: trip.city,
      duration: trip.duration,
    });

    navigate('/panier');
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'journée': return 'Journée découverte';
      case 'tournée': return 'Tournée touristique';
      case 'immersion': return 'Immersion culturelle';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/sorties')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux sorties
        </Button>
      </div>

      {/* Header */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              {getCategoryLabel(trip.category)}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {trip.city}, {trip.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-medium text-foreground">{trip.rating}</span>
                <span>({trip.reviewCount} avis)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WishlistButton
              item={{
                id: trip.id,
                type: 'trip',
                name: trip.title,
                image: trip.image,
                price: trip.price,
                location: trip.city,
              }}
            />
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={trip.images} title={trip.title} />
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">À propos de cette sortie</h2>
              <p className="text-muted-foreground leading-relaxed">
                {trip.description}
              </p>
            </div>

            <Separator />

            {/* Program */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Programme détaillé</h2>
              <div className="space-y-4">
                {trip.program.map((item, index) => (
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

            {/* Activities */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Activités incluses</h2>
              <div className="flex flex-wrap gap-2">
                {trip.activities.map((activity, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* What's Included */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Ce qui est inclus</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {trip.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-nature shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-elegant">
              {/* Urgency Banner */}
              {!isFullyBooked && trip.availablePlaces <= 5 && (
                <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground rounded-lg p-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">
                    Plus que {trip.availablePlaces} places disponibles !
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

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">
                  {trip.price.toLocaleString()} FCFA
                </span>
                <span className="text-muted-foreground"> / personne</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="text-sm font-semibold">
                    {format(parseISO(trip.date), 'dd MMM yyyy', { locale: fr })}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Heure</div>
                  <div className="text-sm font-semibold">{trip.time}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Durée</div>
                  <div className="text-sm font-semibold">{trip.duration}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xs text-muted-foreground">Places</div>
                  <div className="text-sm font-semibold">
                    {isFullyBooked ? 'Complet' : `${trip.availablePlaces}/${trip.totalPlaces}`}
                  </div>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="mb-6 p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  Point de rendez-vous
                </div>
                <p className="text-sm text-muted-foreground">{trip.meetingPoint}</p>
              </div>

              {/* Quantity Selector */}
              {!isFullyBooked && !alreadyInCart && (
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
                      onClick={() => setQuantity(Math.min(trip.availablePlaces, quantity + 1))}
                      disabled={quantity >= trip.availablePlaces}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right mt-2 text-sm text-muted-foreground">
                    Total: <span className="font-semibold text-foreground">{(trip.price * quantity).toLocaleString()} FCFA</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {alreadyInCart ? (
                <Button disabled className="w-full gap-2" size="lg">
                  <Check className="w-5 h-5" />
                  Déjà dans le panier
                </Button>
              ) : (
                <Button
                  onClick={handleReservation}
                  disabled={isFullyBooked}
                  className="w-full gap-2"
                  size="lg"
                  variant={isFullyBooked ? "outline" : "default"}
                >
                  {isFullyBooked ? 'Sortie complète' : 'Réserver ma place'}
                </Button>
              )}

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
