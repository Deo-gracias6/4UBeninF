import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Palette, Utensils, TreePine, Sparkles, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const categories = [
  { id: "all", label: "Toutes", icon: Sparkles },
  { id: "culture", label: "Culture & Traditions", icon: Palette },
  { id: "gastro", label: "Gastronomie", icon: Utensils },
  { id: "nature", label: "Nature & Aventure", icon: TreePine },
];

const experiences = [
  {
    id: "exp-1",
    title: "Cérémonie Vodoun authentique",
    category: "culture",
    categoryLabel: "Culture",
    image: festivalVodoun,
    price: 45000,
    duration: "4 heures",
    days: 1,
    rating: 4.9,
    available: true,
    description: "Assistez à une cérémonie vodoun avec un prêtre local.",
  },
  {
    id: "exp-2",
    title: "Cours de cuisine béninoise",
    category: "gastro",
    categoryLabel: "Gastronomie",
    image: ganvieVillage,
    price: 35000,
    duration: "3 heures",
    days: 1,
    rating: 4.8,
    available: true,
    description: "Apprenez à préparer le fameux 'Amiwo' et autres plats locaux.",
  },
  {
    id: "exp-3",
    title: "Safari photo à Pendjari",
    category: "nature",
    categoryLabel: "Nature",
    image: pendjariPark,
    price: 120000,
    duration: "8 heures",
    days: 2,
    rating: 5.0,
    available: true,
    description: "Partez à la rencontre des lions et éléphants d'Afrique.",
  },
  {
    id: "exp-4",
    title: "Atelier bronze d'Abomey",
    category: "culture",
    categoryLabel: "Artisanat",
    image: ouidahDoor,
    price: 40000,
    duration: "5 heures",
    days: 1,
    rating: 4.7,
    available: true,
    description: "Créez votre propre sculpture avec les maîtres artisans.",
  },
  {
    id: "exp-5",
    title: "Dégustation de Sodabi",
    category: "gastro",
    categoryLabel: "Gastronomie",
    image: ganvieVillage,
    price: 25000,
    duration: "2 heures",
    days: 1,
    rating: 4.6,
    available: true,
    description: "Découvrez l'alcool traditionnel du Bénin et ses secrets.",
  },
  {
    id: "exp-6",
    title: "Randonnée cascades Tanougou",
    category: "nature",
    categoryLabel: "Nature",
    image: pendjariPark,
    price: 55000,
    duration: "6 heures",
    days: 1,
    rating: 4.8,
    available: false,
    description: "Trek vers les magnifiques chutes d'eau de l'Atacora.",
  },
  {
    id: "exp-7",
    title: "Initiation aux Gélédé",
    category: "culture",
    categoryLabel: "Culture",
    image: festivalVodoun,
    price: 50000,
    duration: "4 heures",
    days: 1,
    rating: 4.9,
    available: true,
    description: "Découvrez l'art des masques Gélédé, patrimoine UNESCO.",
  },
  {
    id: "exp-8",
    title: "Pêche à Ganvié",
    category: "nature",
    categoryLabel: "Nature",
    image: ganvieVillage,
    price: 30000,
    duration: "3 heures",
    days: 1,
    rating: 4.5,
    available: true,
    description: "Pêchez avec les habitants du village lacustre.",
  },
];

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addItem, isInCart, totalPrice, itemCount } = useCart();

  const filteredExperiences = selectedCategory === "all"
    ? experiences
    : experiences.filter((exp) => exp.category === selectedCategory);

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

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
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
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ExperienceCard
                  image={exp.image}
                  title={exp.title}
                  category={exp.categoryLabel}
                  price={exp.price}
                  duration={exp.duration}
                  days={exp.days}
                  rating={exp.rating}
                  available={exp.available}
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
