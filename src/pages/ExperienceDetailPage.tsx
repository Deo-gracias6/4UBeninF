import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Star, 
  Users, 
  Check, 
  X, 
  ShoppingCart,
  Calendar,
  Mountain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { experiences } from "@/data/experiencesData";
import { ImageGallery } from "@/components/gallery/ImageGallery";

export default function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();

  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Expérience non trouvée</h1>
          <Link to="/experiences">
            <Button variant="outline">Retour aux expériences</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: experience.id,
      type: "experience",
      name: experience.title,
      price: experience.price,
      image: experience.image,
      category: experience.categoryLabel,
      duration: experience.duration,
    });
  };

  const inCart = isInCart(experience.id);

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
          
          <Badge variant="secondary" className="mb-3">
            {experience.categoryLabel}
          </Badge>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {experience.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              {experience.rating}/5
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {experience.groupSize}
            </span>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ImageGallery 
            images={experience.images} 
            title={experience.title}
          />
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
                <p className="text-muted-foreground leading-relaxed">
                  {experience.fullDescription}
                </p>
              </motion.div>

              {/* Cultural Context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-secondary p-6 rounded-2xl"
              >
                <h2 className="font-serif text-2xl font-bold mb-4">Contexte culturel</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {experience.culturalContext}
                </p>
              </motion.div>

              {/* Program Flow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Déroulement</h2>
                <div className="space-y-4">
                  {experience.programFlow.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <div className="pt-1">
                        <p className="text-foreground">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Includes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="bg-nature/5 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-nature" />
                    Inclus
                  </h3>
                  <ul className="space-y-2">
                    {experience.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-nature mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-destructive/5 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-destructive" />
                    Non inclus
                  </h3>
                  <ul className="space-y-2">
                    {experience.notIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
                    {experience.price.toLocaleString()} FCFA
                  </span>
                  <span className="text-muted-foreground"> / personne</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Durée
                    </span>
                    <span className="font-medium">{experience.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Mountain className="w-4 h-4" />
                      Difficulté
                    </span>
                    <span className="font-medium">{experience.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Groupe
                    </span>
                    <span className="font-medium">{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Disponibilité
                    </span>
                    <Badge variant={experience.available ? "default" : "secondary"}>
                      {experience.available ? "Disponible" : "Indisponible"}
                    </Badge>
                  </div>
                </div>

                {experience.available ? (
                  <Button
                    variant={inCart ? "outline" : "gold"}
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleAddToCart}
                    disabled={inCart}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Dans le panier
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Ajouter au panier
                      </>
                    )}
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" className="w-full" disabled>
                    Actuellement indisponible
                  </Button>
                )}

                {inCart && (
                  <Link to="/panier" className="block mt-3">
                    <Button variant="default" size="lg" className="w-full">
                      Voir le panier
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
