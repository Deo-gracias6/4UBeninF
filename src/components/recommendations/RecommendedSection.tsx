import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Clock, Star, ShoppingCart, Check, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { experiences } from "@/data/experiencesData";
import { festivals } from "@/data/festivalsData";
import { WishlistButton } from "@/components/cards/WishlistButton";

interface RecommendedSectionProps {
  title?: string;
  subtitle?: string;
  showOnHomepage?: boolean;
}

export function RecommendedSection({
  title = "Recommandé pour vous",
  subtitle = "Basé sur vos intérêts et vos recherches",
  showOnHomepage = false,
}: RecommendedSectionProps) {
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { isInWishlist } = useWishlist();

  // Mock "smart" recommendations - in real app, this would be based on user behavior
  const recommendedExperiences = experiences.slice(0, 3);
  const recommendedFestivals = festivals.slice(0, 2);

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    type: "experience" | "festival";
  }) => {
    addItem({
      id: item.id,
      type: item.type,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    navigate("/panier");
  };

  return (
    <section className={`py-16 ${showOnHomepage ? "bg-secondary" : ""}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Recommandations IA
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </motion.div>

        {/* Recommended Experiences */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
            Expériences pour vous
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {exp.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-semibold">{exp.rating}</span>
                    </div>
                    <WishlistButton
                      item={{
                        id: exp.id,
                        type: "experience",
                        name: exp.title,
                        image: exp.image,
                        price: exp.price,
                        rating: exp.rating,
                      }}
                      size="sm"
                    />
                  </div>
                  {/* Recommendation badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/90 text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Pour vous
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold mb-2 line-clamp-1">
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">
                      {exp.price.toLocaleString()} FCFA
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/experiences/${exp.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Eye className="w-4 h-4" />
                        Détails
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant={isInCart(exp.id) ? "outline" : "gold"}
                      className="flex-1 gap-1"
                      onClick={() =>
                        handleAddToCart({
                          id: exp.id,
                          name: exp.title,
                          price: exp.price,
                          image: exp.image,
                          type: "experience",
                        })
                      }
                    >
                      {isInCart(exp.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Ajouté
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Ajouter
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended Festivals */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </span>
            Festivals à ne pas manquer
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendedFestivals.map((fest, idx) => (
              <motion.div
                key={fest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                <div className="absolute top-3 right-3">
                  <WishlistButton
                    item={{
                      id: fest.id,
                      type: "festival",
                      name: fest.name,
                      image: fest.image,
                      location: fest.city,
                    }}
                    size="sm"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/90 text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Recommandé
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-white mb-2">
                    {fest.name}
                  </h4>
                  <p className="text-white/80 text-sm mb-3">
                    {fest.dates} • {fest.city}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/festivals/${fest.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
                      >
                        <Eye className="w-4 h-4" />
                        Détails
                      </Button>
                    </Link>
                    <Link to={`/festivals/${fest.id}`} className="flex-1">
                      <Button variant="gold" size="sm" className="w-full gap-1">
                        <Sparkles className="w-4 h-4" />
                        Packs
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
