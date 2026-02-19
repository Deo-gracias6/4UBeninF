import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin,
  Clock,
  Loader2,
  ShoppingCart,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import festivalService, { Festival } from "@/services/festivalService";

// Fallback image
import festivalVodoun from "@/assets/festival-vodoun.jpg";

export default function FestivalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();

  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        console.log('🎉 Chargement festival:', slug);

        // Charger tous les festivals et trouver par slug
        const allFestivals = await festivalService.getAll();
        console.log('🎉 Festivals:', allFestivals);

        const found = allFestivals.find((f) => f.slug === slug);
        console.log('✅ Festival trouvé:', found);

        if (!found) {
          setError(true);
          return;
        }

        setFestival(found);

      } catch (err: any) {
        console.error('❌ Erreur:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handleAddToCart = () => {
    if (!festival) return;

    const price = parseFloat(festival.price) || 0;
    const startDate = new Date(festival.start_date);
    const formattedDate = startDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    });

    addItem({
      id: festival.id.toString(),
      type: "festival",
      name: festival.name,
      price: price,
      image: festival.main_image || undefined,
      dates: formattedDate,
      city: "Cotonou",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !festival) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Festival non trouvé</h1>
          <p className="text-muted-foreground mb-4">
            Le festival "{slug}" n'existe pas.
          </p>
          <Link to="/festivals">
            <Button variant="outline">Retour aux festivals</Button>
          </Link>
        </div>
      </main>
    );
  }

  const price = parseFloat(festival.price) || 0;
  const startDate = new Date(festival.start_date);
  const endDate = new Date(festival.end_date);
  const formattedStartDate = startDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedEndDate = endDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const durationDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  const inCart = isInCart(festival.id.toString());

  return (
    <main className="pt-20">
      {/* Header */}
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

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              Festival
            </Badge>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {festival.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Cotonou
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedStartDate} → {formattedEndDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {durationDays} jour{durationDays > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elegant">
            <img
              src={festival.main_image || festivalVodoun}
              alt={festival.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          </div>
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
                <h2 className="font-serif text-2xl font-bold mb-4">Présentation</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {festival.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-elegant"
              >
                <div className="text-center mb-6">
                  <span className="text-sm text-muted-foreground">Prix d'entrée</span>
                  <div className="text-3xl font-bold text-primary">
                    {price.toLocaleString()} FCFA
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Début
                    </span>
                    <span className="font-medium text-sm">
                      {startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Fin
                    </span>
                    <span className="font-medium text-sm">
                      {endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Durée
                    </span>
                    <span className="font-medium">{durationDays} jours</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Lieu
                    </span>
                    <span className="font-medium">Cotonou</span>
                  </div>
                </div>

                <Button
                  variant={inCart ? "outline" : "gold"}
                  size="lg"
                  className="w-full gap-2 mb-3"
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

                {inCart && (
                  <Link to="/panier" className="block">
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
