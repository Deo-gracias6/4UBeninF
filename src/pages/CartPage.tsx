import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, ShoppingBag, Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useToast } from "@/hooks/use-toast";

const typeLabels: Record<string, string> = {
  experience: "Expérience",
  festival: "Festival",
  discovery: "Découverte",
  activity: "Activité",
};

const typeColors: Record<string, string> = {
  experience: "bg-primary",
  festival: "bg-accent",
  discovery: "bg-nature",
  activity: "bg-secondary text-foreground",
};

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour procéder au paiement.",
        variant: "destructive",
      });
      navigate("/connexion", { state: { returnTo: "/panier" } });
      return;
    }

    // Navigate to payment page
    navigate("/paiement");
  };

  if (items.length === 0) {
    return (
      <main className="pt-20 min-h-screen bg-secondary">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Explorez nos expériences, festivals et découvertes pour composer votre voyage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/experiences">
                <Button variant="default" className="gap-2 w-full sm:w-auto">
                  <ShoppingBag className="w-4 h-4" />
                  Voir les expériences
                </Button>
              </Link>
              <Link to="/festivals">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Calendar className="w-4 h-4" />
                  Voir les festivals
                </Button>
              </Link>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Voyage personnalisé ?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Notre moteur intelligent crée un itinéraire sur mesure selon vos envies.
              </p>
              <Link to="/moteur">
                <Button variant="hero" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Créer mon voyage
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-secondary">
      {/* Header */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="w-4 h-4" /> Continuer vos achats
              </Link>
              <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary" />
                Mon panier
              </h1>
            </div>
            <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Vider le panier
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <CartItemCard key={item.id} item={item} onRemove={removeItem} index={idx} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl p-6 shadow-elegant sticky top-24"
              >
                <h2 className="font-serif text-xl font-bold mb-6">Récapitulatif</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {items.length} article{items.length > 1 ? "s" : ""}
                    </span>
                    <span>{totalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de service</span>
                    <span>{Math.round(totalPrice * 0.05).toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {Math.round(totalPrice * 1.05).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  variant="hero"
                  size="xl"
                  className="w-full gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Procéder au paiement
                </Button>

                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Vous devrez vous connecter pour finaliser votre achat
                  </p>
                )}

                <div className="mt-8 p-4 rounded-xl bg-secondary">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="font-medium text-sm">Voyage complet ?</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Créez un itinéraire personnalisé avec notre moteur intelligent.
                  </p>
                  <Link to="/moteur">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Sparkles className="w-3 h-3" />
                      Créer mon voyage
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CartItemCard({
  item,
  onRemove,
  index,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  index: number;
}) {
  const packBadgeColors = {
    standard: "bg-slate-500",
    premium: "bg-accent",
    vip: "bg-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-2xl p-4 shadow-elegant flex gap-4"
    >
      {item.image && (
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                  typeColors[item.type]
                }`}
              >
                {typeLabels[item.type]}
              </span>
              {item.packType && item.packName && (
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                    packBadgeColors[item.packType]
                  }`}
                >
                  Pack {item.packName}
                </span>
              )}
            </div>
            <h3 className="font-semibold line-clamp-1">{item.name}</h3>
            {item.type === "festival" && item.city && item.dates && (
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {item.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.dates}
                </span>
              </div>
            )}
            {item.packFeatures && item.packFeatures.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Inclus : </span>
                {item.packFeatures.slice(0, 3).join(" • ")}
                {item.packFeatures.length > 3 && ` +${item.packFeatures.length - 3}`}
              </div>
            )}
            {item.duration && !item.packType && (
              <p className="text-sm text-muted-foreground mt-1">{item.duration}</p>
            )}
          </div>
          <span className="font-bold text-primary whitespace-nowrap">
            {item.price.toLocaleString()} FCFA
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
