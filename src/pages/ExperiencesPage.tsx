import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Palette, Utensils, TreePine, Sparkles, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { AdvancedFilters, FilterState } from "@/components/filters/AdvancedFilters";
import { experiences } from "@/data/experiencesData";
import { useCart } from "@/contexts/CartContext";
import { useState, useMemo } from "react";

const categories = [
  { id: "all", label: "Toutes", icon: Sparkles },
  { id: "culture", label: "Culture & Traditions", icon: Palette },
  { id: "gastro", label: "Gastronomie", icon: Utensils },
  { id: "nature", label: "Nature & Aventure", icon: TreePine },
];

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState<FilterState>({
    budgets: [],
    durations: [],
    types: [],
    priceRange: [0, 200000],
  });
  const { addItem, isInCart, totalPrice, itemCount } = useCart();

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      // Category filter
      if (selectedCategory !== "all" && exp.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (exp.price < filters.priceRange[0] || exp.price > filters.priceRange[1]) {
        return false;
      }

      // Budget filter
      if (filters.budgets.length > 0) {
        const isEconomique = exp.price < 50000;
        const isPremium = exp.price >= 50000 && exp.price <= 150000;
        const isVip = exp.price > 150000;

        const matchesBudget = 
          (filters.budgets.includes("economique") && isEconomique) ||
          (filters.budgets.includes("premium") && isPremium) ||
          (filters.budgets.includes("vip") && isVip);

        if (!matchesBudget) return false;
      }

      // Duration filter
      if (filters.durations.length > 0) {
        const is1Day = exp.days === 1;
        const is2to3Days = exp.days >= 2 && exp.days <= 3;
        const is1Week = exp.days >= 7;

        const matchesDuration =
          (filters.durations.includes("1-day") && is1Day) ||
          (filters.durations.includes("2-3-days") && is2to3Days) ||
          (filters.durations.includes("1-week") && is1Week);

        if (!matchesDuration) return false;
      }

      // Type filter
      if (filters.types.length > 0) {
        if (!filters.types.includes(exp.category)) return false;
      }

      return true;
    });
  }, [selectedCategory, filters]);

  const handleAddToCart = (exp: typeof experiences[0]) => {
    addItem({
      id: exp.id,
      type: "experience",
      name: exp.title,
      price: exp.price,
      image: exp.image,
      category: exp.categoryLabel,
      duration: exp.duration,
    });
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Marketplace
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
              Expériences <span className="text-gradient">locales</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Artisanat, gastronomie, nature, traditions... Composez votre voyage 
              avec des expériences authentiques.
            </p>
          </motion.div>

          {/* Categories & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-purple"
                    : "bg-card hover:bg-muted"
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </button>
            ))}
            
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={200000}
              showTypes={true}
              showDurations={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <div className="mb-6 text-muted-foreground">
            {filteredExperiences.length} expérience{filteredExperiences.length > 1 ? "s" : ""} trouvée{filteredExperiences.length > 1 ? "s" : ""}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ExperienceCard
                  id={exp.id}
                  image={exp.image}
                  title={exp.title}
                  category={exp.categoryLabel}
                  price={exp.price}
                  duration={exp.duration}
                  days={exp.days}
                  rating={exp.rating}
                  available={exp.available}
                  location={exp.location}
                  onAdd={() => handleAddToCart(exp)}
                  inCart={isInCart(exp.id)}
                />
                {isInCart(exp.id) && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-nature">
                    <Check className="w-4 h-4" />
                    Dans le panier
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredExperiences.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-serif text-xl font-semibold mb-2">Aucune expérience trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Essayez d'ajuster vos filtres pour voir plus de résultats.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setFilters({
                    budgets: [],
                    durations: [],
                    types: [],
                    priceRange: [0, 200000],
                  });
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Voyage sur mesure ?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Notre moteur intelligent crée un itinéraire personnalisé
              basé sur vos centres d'intérêt et votre budget.
            </p>
            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Créer mon voyage
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Cart */}
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Link to="/panier">
            <div className="flex items-center gap-4 px-6 py-4 bg-foreground text-background rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform">
              <div>
                <div className="text-sm opacity-80">{itemCount} article{itemCount > 1 ? "s" : ""}</div>
                <div className="font-semibold">{totalPrice.toLocaleString()} FCFA</div>
              </div>
              <Button variant="gold" size="lg" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Voir le panier
              </Button>
            </div>
          </Link>
        </motion.div>
      )}
    </main>
  );
}
