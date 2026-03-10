import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  MapPin, Calendar, ArrowRight, Compass, TreePine, Mountain,
  Waves, Camera, Utensils, Palette, Clock, Users, ShoppingCart, Check, Eye, Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/home/HeroCarousel";
import { RecommendedSection } from "@/components/recommendations/RecommendedSection";
import { OrganizedTripsSection } from "@/components/home/OrganizedTripsSection";
import { useCart } from "@/contexts/CartContext";

// ✅ Imports par défaut (sans accolades pour les services)
import destinationService, { Destination } from "@/services/destinationService";
import experienceService, { Experience } from "@/services/experienceService";
import festivalService, { Festival } from "@/services/festivalService";
import categoryService from "@/services/categoryService";
// Fallback images
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import cotonouCity from "@/assets/cotonou-city.jpg";

export default function Index() {
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      // Charger destinations et festivals normalement
      const [destDataRaw, festDataRaw] = await Promise.all([
        destinationService.getAll({ language: "fr" }),
        festivalService.getAll({ language: "fr" })
      ]);

      setDestinations((destDataRaw as Destination[]).slice(0, 3));
      setFestivals((festDataRaw as Festival[]).slice(0, 4));

      // ✅ Charger les expériences via les catégories (comme ExperiencesPage)
      const catData = await categoryService.getAll({ language: 'fr' });
      console.log('📂 Catégories:', catData);

      const allExps: any[] = [];

      for (const category of catData) {
        try {
          const categoryDetails = await categoryService.getBySlug(category.slug, 100);
          const exps = categoryDetails.experiences || [];
          
          const expsWithCategory = exps.map((exp: any) => ({
            ...exp,
            categoryId: category.id,
            categoryName: category.name,
            categoryColor: category.color,
          }));
          
          allExps.push(...expsWithCategory);
          console.log(`✅ ${category.name}: ${exps.length} expériences`);
        } catch (error) {
          console.warn(`⚠️ Pas d'expériences pour ${category.name}`);
        }
      }

      console.log('🎭 Total expériences:', allExps.length);
      setExperiences(allExps.slice(0, 4));

      console.log("✅ Destinations:", destDataRaw);
      console.log("✅ Festivals:", festDataRaw);

    } catch (error) {
      console.error("❌ Erreur chargement Index:", error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);  


  const handleAddExperience = (exp: Experience) => {
    const price = parseFloat(exp.price) || 0;
    addItem({
      id: exp.id,
      type: "experience",
      name: exp.name,
      price: price,
      image: exp.mainImage || undefined,
    });
  };

  const handleAddFestival = (festival: Festival) => {
    const price = parseFloat(festival.price) || 0;
    const formattedDate = new Date(festival.start_date).toLocaleDateString('fr-FR', {
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <HeroCarousel />

      {/* ===== DESTINATIONS ===== */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Destinations
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Régions du <span className="text-primary">Bénin</span>
              </h2>
            </div>
            <Link to="/destinations" className="mt-6 md:mt-0">
              <Button variant="outline" className="gap-2">
                Toutes les destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {destinations.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Aucune destination disponible.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {destinations.map((dest, idx) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="group"
                >
                  <Link to={`/destinations/${dest.slug}`}>
                    <div className="relative h-[420px] rounded-3xl overflow-hidden card-premium">
                      <img
                        src={dest.banner_image || cotonouCity}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-sm font-medium">
                          {dest.region}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl font-bold text-white mb-2">{dest.name}</h3>
                        <p className="text-white/80 text-sm mb-4 line-clamp-2">{dest.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== EXPERIENCES ===== */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-dark text-sm font-medium mb-4">
                Expériences
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Expériences à <span className="text-primary">vivre</span>
              </h2>
            </div>
            <Link to="/experiences" className="mt-6 md:mt-0">
              <Button variant="outline" className="gap-2">
                Toutes les expériences
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {experiences.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Aucune expérience disponible.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {experiences.map((exp, idx) => {
                const price = parseFloat(exp.price) || 0;
                // ✅ camelCase : durationMinutes, maxParticipants, mainImage
                const hours = Math.floor((exp.durationMinutes || 0) / 60);
                const mins = (exp.durationMinutes || 0) % 60;
                const durationText = hours > 0
                  ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}`
                  : `${mins}min`;

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.mainImage || festivalVodoun}
                        alt={exp.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {exp.destination && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            {exp.destination.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-base font-semibold mb-2 line-clamp-2">
                        {exp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {durationText}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {exp.maxParticipants} max
                        </span>
                      </div>
                      <div className="font-bold text-primary mb-3">
                        {price.toLocaleString()} FCFA
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/experiences/${exp.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <Eye className="w-3 h-3" />
                            Détails
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant={isInCart(exp.id) ? "outline" : "default"}
                          className="flex-1 gap-1 text-xs"
                          onClick={() => handleAddExperience(exp)}
                        >
                          {isInCart(exp.id) ? (
                            <><Check className="w-3 h-3" /> Ajouté</>
                          ) : (
                            <><ShoppingCart className="w-3 h-3" /> Ajouter</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== FESTIVALS ===== */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                Festivals
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Événements <span className="text-primary">culturels</span>
              </h2>
            </div>
            <Link to="/festivals" className="mt-6 md:mt-0">
              <Button variant="outline" className="gap-2">
                Tous les festivals
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {festivals.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Aucun festival disponible.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {festivals.map((festival, idx) => {
                const price = parseFloat(festival.price) || 0;
                const startDate = new Date(festival.start_date);
                const endDate = new Date(festival.end_date);
                const formattedDate = startDate.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long'
                });
                const durationDays = Math.ceil(
                  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                ) + 1;

                return (
                  <motion.div
                    key={festival.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={festival.main_image || festivalVodoun}
                        alt={festival.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1 text-white text-xs mb-1">
                          <Calendar className="w-3 h-3" />
                          {formattedDate} • {durationDays}j
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          Cotonou
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-base font-semibold mb-2 line-clamp-2">
                        {festival.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {festival.description}
                      </p>
                      <div className="font-bold text-primary mb-3">
                        {price.toLocaleString()} FCFA
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/festivals/${festival.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <Eye className="w-3 h-3" />
                            Détails
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant={isInCart(festival.id.toString()) ? "outline" : "default"}
                          className="flex-1 gap-1 text-xs"
                          onClick={() => handleAddFestival(festival)}
                        >
                          {isInCart(festival.id.toString()) ? (
                            <><Check className="w-3 h-3" /> Ajouté</>
                          ) : (
                            <><ShoppingCart className="w-3 h-3" /> Ajouter</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Organized Trips */}
      <OrganizedTripsSection />

      {/* Recommended */}
      <RecommendedSection showOnHomepage />
    </main>
  );
}
