import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Check,
  Shield,
  Lock,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserAuth } from "@/contexts/UserAuthContext";
import api from "@/services/api";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import cotonouCity from "@/assets/cotonou-city.jpg";

interface Booking {
  id: string;
  booking_type: string;
  item_id: string;
  item?: {
    id: string;
    name: string;
    price: number;
    location?: string;
    duration?: string;
    image?: string;
  };
  start_date: string;
  end_date?: string;
  participants: number;
  unit_price: number;
  total_price: number;
  status: string;
  payment_status: string;
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { toast } = useToast();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Charger la réservation
  useEffect(() => {
    if (!id) return;

    const loadBooking = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/bookings/${id}`);
        const bookingData = response.data.data || response.data;
        setBooking(bookingData);
      } catch (error: any) {
        console.error("Erreur chargement réservation:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la réservation.",
          variant: "destructive",
        });
        navigate("/mes-reservations"); // Rediriger vers la liste des réservations
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id, navigate, toast]);

  const handlePayment = async () => {
    if (!booking) return;

    setIsProcessing(true);

    try {
      // Simuler un délai de paiement (remplacer par un vrai appel API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Appel API pour confirmer le paiement
      const response = await api.patch(`/bookings/${booking.id}`, {
        status: "confirmed",
        payment_status: "paid",
        paid_at: new Date().toISOString(),
        payment_method: paymentMethod,
      });

      if (response.data) {
        setIsComplete(true);
        toast({
          title: "Paiement réussi !",
          description: "Votre voyage a été confirmé. Vous recevrez un email de confirmation.",
        });
      }
    } catch (error: any) {
      console.error("Erreur paiement:", error);
      toast({
        title: "Échec du paiement",
        description: error.response?.data?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Vérifier que l'utilisateur est connecté et propriétaire de la réservation
  if (!user) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connexion requise</h1>
          <Button onClick={() => navigate("/connexion")}>Se connecter</Button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Réservation introuvable</h1>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </main>
    );
  }

  // Si déjà payé, rediriger
  if (booking.payment_status === "paid") {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Check className="w-16 h-16 text-nature mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Déjà payé</h1>
          <p className="text-muted-foreground mb-6">Cette réservation a déjà été réglée.</p>
          <Button onClick={() => navigate("/mes-reservations")}>Voir mes réservations</Button>
        </div>
      </main>
    );
  }
const defaultItem = {
  id: '',
  name: "Sortie",
  price: booking.unit_price,
  location: undefined,
  duration: undefined,
  image: undefined,
};

const item = booking.item ? { ...defaultItem, ...booking.item } : defaultItem;

  // Écran de confirmation
  if (isComplete) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-nature/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-nature" />
          </motion.div>

          <h1 className="font-serif text-3xl font-bold mb-4">
            Voyage confirmé !
          </h1>
          <p className="text-muted-foreground mb-8">
            Merci pour votre réservation. Vous allez recevoir un email de confirmation 
            avec tous les détails de votre voyage au Bénin.
          </p>

          <div className="bg-card rounded-2xl p-6 shadow-elegant mb-8">
            <div className="text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Référence</span>
                <span className="font-mono font-semibold">{booking.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Départ</span>
                <span className="font-semibold">
                  {format(parseISO(booking.start_date), 'dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant total</span>
                <span className="font-semibold text-primary">{booking.total_price.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          <Link to="/">
            <Button variant="hero" size="lg" className="gap-2">
              Retour à l'accueil
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 pt-8"
          >
            <Link to="/mes-reservations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ChevronLeft className="w-4 h-4" />
              Retour aux réservations
            </Link>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              Finaliser votre <span className="text-gradient">réservation</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <div className="bg-card rounded-2xl p-6 shadow-elegant sticky top-24">
                <h2 className="font-serif text-xl font-bold mb-6">Récapitulatif</h2>

                {/* Trip Info */}
                <div className="relative h-40 rounded-xl overflow-hidden mb-6">
                  <img
                    src={item.image || cotonouCity}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(parseISO(booking.start_date), 'dd MMM yyyy', { locale: fr })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {booking.participants} pers.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Détail */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">{booking.unit_price.toLocaleString()} FCFA</span>
                  </div>
                  {booking.booking_type === 'outing' && item.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{booking.total_price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de service</span>
                    <span>0 FCFA</span> {/* À ajuster si nécessaire */}
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span className="text-primary">{booking.total_price.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant">
                <h2 className="font-serif text-xl font-bold mb-6">Mode de paiement</h2>

                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mb-2 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">Carte bancaire</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("mobile")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "mobile"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Smartphone className={`w-8 h-8 mb-2 ${paymentMethod === "mobile" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">Mobile Money</span>
                  </button>
                </div>

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nom sur la carte</label>
                      <Input placeholder="Jean Dupont" className="h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Numéro de carte</label>
                      <Input placeholder="4242 4242 4242 4242" className="h-12" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Expiration</label>
                        <Input placeholder="MM/AA" className="h-12" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">CVV</label>
                        <Input placeholder="123" className="h-12" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Money Form */}
                {paymentMethod === "mobile" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Opérateur</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["MTN", "Moov", "Celtiis"].map((op) => (
                          <button
                            key={op}
                            className="p-3 rounded-xl border border-border hover:border-primary transition-all font-medium"
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Numéro de téléphone</label>
                      <Input placeholder="+229 XX XX XX XX" className="h-12" />
                    </div>
                  </div>
                )}

                {/* Security */}
                <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-secondary">
                  <Shield className="w-5 h-5 text-nature" />
                  <div className="text-sm">
                    <span className="font-medium">Paiement sécurisé</span>
                    <span className="text-muted-foreground"> - Vos données sont protégées</span>
                  </div>
                  <Lock className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>

                {/* Submit */}
                <Button
                  onClick={handlePayment}
                  variant="hero"
                  size="xl"
                  className="w-full mt-8 gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Payer {booking.total_price.toLocaleString()} FCFA
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-muted-foreground text-sm mt-4">
                  En confirmant, vous acceptez nos conditions générales de vente.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}