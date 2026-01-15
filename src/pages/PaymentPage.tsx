import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import cotonouCity from "@/assets/cotonou-city.jpg";

const mockOrder = {
  experiences: [
    { name: "Circuit 7 jours - Découverte du Bénin", price: 350000 },
    { name: "Safari Pendjari (2 jours)", price: 120000 },
    { name: "Cérémonie Vodoun", price: 45000 },
    { name: "Cours de cuisine béninoise", price: 35000 },
  ],
  festivals: [
    { name: "Festival du Vodoun (3 jours)", price: 75000 },
  ],
  travelers: 2,
  days: 7,
  startDate: "15 Février 2025",
};

const subtotal = mockOrder.experiences.reduce((sum, e) => sum + e.price, 0) +
  mockOrder.festivals.reduce((sum, f) => sum + f.price, 0);
const fees = Math.round(subtotal * 0.03);
const total = subtotal + fees;

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast({
        title: "Paiement réussi !",
        description: "Votre voyage a été confirmé. Vous recevrez un email de confirmation.",
      });
    }, 2000);
  };

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
                <span className="font-mono font-semibold">4UB-2025-0001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Départ</span>
                <span className="font-semibold">{mockOrder.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant total</span>
                <span className="font-semibold text-primary">{total.toLocaleString()} FCFA</span>
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
            <Link to="/moteur" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ChevronLeft className="w-4 h-4" />
              Modifier l'itinéraire
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
                    src={cotonouCity}
                    alt="Voyage"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold">Découverte du Bénin</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {mockOrder.days} jours
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mockOrder.travelers} pers.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experiences */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-sm text-muted-foreground">Expériences</h4>
                  {mockOrder.experiences.map((exp, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="line-clamp-1 flex-1 mr-4">{exp.name}</span>
                      <span className="font-medium shrink-0">{exp.price.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>

                {/* Festivals */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-sm text-muted-foreground">Festivals</h4>
                  {mockOrder.festivals.map((fest, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{fest.name}</span>
                      <span className="font-medium">{fest.price.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de service</span>
                    <span>{fees.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span className="text-primary">{total.toLocaleString()} FCFA</span>
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
                      Payer {total.toLocaleString()} FCFA
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
