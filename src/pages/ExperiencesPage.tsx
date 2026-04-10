import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Utensils, 
  TreePine, 
  Sparkles, 
  Loader2,
  Eye,
  Clock,
  Users,
  Compass,
  Zap,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import experienceService, { Experience } from "@/services/experienceService";
import categoryService, { ExperienceCategory } from "@/services/categoryService";

// Images de fallback
import festivalVodoun from "@/assets/festival-vodoun.jpg";

// Map des icônes
const iconMap: Record<string, any> = {
  utensils: Utensils,
  landmark: Palette,
  compass: Compass,
  bolt: Zap,
  leaf: TreePine,
};

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
  const [categories, setCategories] = useState<ExperienceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Charger TOUTES les expériences directement
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);

        // Charger les catégories ET les expériences en parallèle
        const [catData, expData] = await Promise.all([
          categoryService.getAll({ language: 'fr' }),
          experienceService.getAll({ language: 'fr' }) // ← Charge TOUTES les expériences
        ]);

        console.log('📂 Catégories chargées:', catData);
        console.log('🎭 Expériences chargées:', expData);

        setCategories(catData);
        setAllExperiences(expData);

      } catch (error) {
        console.error('❌ Erreur chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Filtrer les expériences selon la catégorie sélectionnée
  const filteredExperiences = selectedCategory
    ? allExperiences.filter((exp: any) => exp.category?.id === selectedCategory)
    : allExperiences;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

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
            className="flex flex-wrap justify-center items-center gap-3"
          >
            {/* Bouton "Toutes" */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-purple"
                  : "bg-card hover:bg-muted"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Toutes ({allExperiences.length})
            </button>

            {/* Catégories depuis la DB */}
            {categories.map((cat) => {
              const IconComponent = iconMap[cat.icon] || Sparkles;
              const count = allExperiences.filter((exp: any) => exp.category?.id === cat.id).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-purple"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {cat.name} ({count})
                </button>
              );
            })}
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
            {filteredExperiences.map((exp: any, idx) => {
              const price = parseFloat(exp.price) || 0;
              const category = exp.category || categories.find(c => c.id === exp.categoryId);
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={exp.mainImage || festivalVodoun}
                      alt={exp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: category?.color || '#4ECDC4' }}
                      >
                        {category?.name || 'Expérience'}
                      </span>
                    </div>
                    {exp.destination && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
                          {exp.destination.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold mb-3 line-clamp-2">
                      {exp.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {exp.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor(exp.durationMinutes / 60)}h
                        {exp.durationMinutes % 60 > 0 ? ` ${exp.durationMinutes % 60}min` : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {exp.maxParticipants} max
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        {price.toLocaleString()} FCFA
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <Link to={`/experiences/${exp.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Eye className="w-4 h-4" />
                          Détails
                        </Button>
                      </Link>
                      <Link to={`/experiences/${exp.slug}`} className="flex-1">
                        <Button size="sm" variant="default" className="w-full gap-1">
                          <Calendar className="w-4 h-4" />
                          Réserver
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredExperiences.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-serif text-xl font-semibold mb-2">Aucune expérience trouvée</h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory 
                  ? "Aucune expérience disponible dans cette catégorie pour le moment."
                  : "Aucune expérience disponible pour le moment."}
              </p>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                >
                  Voir toutes les expériences
                </Button>
              )}
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
    </main>
  );
}
