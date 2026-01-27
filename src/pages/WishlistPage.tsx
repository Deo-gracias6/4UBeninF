import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem, isInCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item: typeof items[0]) => {
    if (item.price) {
      addItem({
        id: item.id,
        type: item.type as "experience" | "festival" | "activity" | "discovery",
        name: item.name,
        price: item.price,
        image: item.image,
      });
      toast.success("Ajouté au panier");
    }
  };

  const handleRemove = (id: string, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} retiré des favoris`);
  };

  const getDetailLink = (item: typeof items[0]) => {
    switch (item.type) {
      case "experience":
        return `/experiences/${item.id}`;
      case "festival":
        return `/festivals/${item.id}`;
      case "city":
        return `/decouvrir/${item.id}`;
      default:
        return "/";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "experience":
        return "Expérience";
      case "festival":
        return "Festival";
      case "city":
        return "Ville";
      case "activity":
        return "Activité";
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Ma Wishlist</h1>
              <p className="text-muted-foreground">
                {items.length} élément{items.length > 1 ? "s" : ""} sauvegardé
                {items.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3">
              Votre wishlist est vide
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explorez nos expériences, festivals et destinations pour commencer à créer votre liste de favoris.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/experiences">
                <Button variant="outline" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Expériences
                </Button>
              </Link>
              <Link to="/festivals">
                <Button variant="hero" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Festivals
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Heart className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-lg font-semibold text-white line-clamp-1">
                      {item.name}
                    </h3>
                    {item.location && (
                      <p className="text-white/80 text-sm">{item.location}</p>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {item.price && (
                    <div className="mb-4">
                      <span className="text-lg font-bold text-primary">
                        {item.price.toLocaleString()} FCFA
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link to={getDetailLink(item)} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Eye className="w-4 h-4" />
                        Détails
                      </Button>
                    </Link>
                    {item.price && (
                      <Button
                        size="sm"
                        variant={isInCart(item.id) ? "outline" : "gold"}
                        className="flex-1 gap-1"
                        onClick={() => handleAddToCart(item)}
                        disabled={isInCart(item.id)}
                      >
                        {isInCart(item.id) ? (
                          <>✓ Ajouté</>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
