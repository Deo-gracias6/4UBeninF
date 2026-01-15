import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Calendar, Users, ArrowRight, Star, Compass, Palette, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBenin from "@/assets/hero-benin.jpg";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import cotonouCity from "@/assets/cotonou-city.jpg";

const destinations = [
  {
    name: "Cotonou",
    image: cotonouCity,
    description: "La vibrante capitale économique",
    pricePerDay: 45000,
    days: 2,
  },
  {
    name: "Ganvié",
    image: ganvieVillage,
    description: "La Venise de l'Afrique sur pilotis",
    pricePerDay: 35000,
    days: 1,
  },
  {
    name: "Pendjari",
    image: pendjariPark,
    description: "Safari au cœur de la nature sauvage",
    pricePerDay: 85000,
    days: 3,
  },
  {
    name: "Ouidah",
    image: ouidahDoor,
    description: "Sur les traces de l'histoire",
    pricePerDay: 30000,
    days: 1,
  },
];

const features = [
  {
    icon: Compass,
    title: "Itinéraires personnalisés",
    description: "Notre IA crée votre voyage idéal selon vos préférences",
  },
  {
    icon: Calendar,
    title: "Festivals intégrés",
    description: "Synchronisez votre voyage avec les événements culturels",
  },
  {
    icon: Palette,
    title: "Expériences locales",
    description: "Artisanat, gastronomie, traditions authentiques",
  },
  {
    icon: TreePine,
    title: "Nature préservée",
    description: "Parcs nationaux et réserves naturelles uniques",
  },
];

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "100+", label: "Expériences" },
  { value: "15+", label: "Festivals" },
  { value: "5000+", label: "Voyageurs satisfaits" },
];

export default function Index() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBenin}
            alt="Bénin paysage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/50 to-primary/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                Moteur Intelligent de Voyage
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Découvrez le{" "}
              <span className="text-gradient-gold">Bénin</span>
              <br />
              autrement
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Grâce à notre moteur intelligent de personnalisation touristique, 
              créez votre voyage sur mesure en quelques clics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/moteur">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Créer mon voyage
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/decouvrir">
                <Button variant="outline-light" size="xl" className="w-full sm:w-auto">
                  Explorer le Bénin
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary pattern-african">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Pourquoi 4UBENIN
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-4">
              Votre voyage, notre expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme intelligente qui comprend vos envies et crée 
              l'expérience parfaite au Bénin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-6 rounded-2xl shadow-elegant hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Moteur Intelligent Preview */}
      <section className="py-24 bg-gradient-to-br from-foreground via-primary-dark to-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Fonctionnalité phare
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Le Moteur Intelligent
                <span className="text-gradient-gold block">4UBENIN</span>
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Indiquez votre budget, vos dates, vos centres d'intérêt et laissez 
                notre algorithme intelligent créer votre itinéraire parfait. 
                Personnalisé. Optimisé. Inoubliable.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Génération d'itinéraire en temps réel",
                  "Prix transparents et tout compris",
                  "Intégration des festivals et événements",
                  "Planning jour par jour détaillé",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <Star className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/moteur">
                <Button variant="gold" size="xl" className="gap-2">
                  Essayer maintenant
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Mock Interface */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-nature/60" />
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <label className="text-white/60 text-xs mb-2 block">Budget total</label>
                    <div className="text-2xl font-bold">500,000 FCFA</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="text-white/60 text-xs mb-2 block">Durée</label>
                      <div className="text-lg font-semibold">7 jours</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="text-white/60 text-xs mb-2 block">Voyageurs</label>
                      <div className="text-lg font-semibold">2 adultes</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/20 border border-accent/30">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Itinéraire généré</span>
                    </div>
                    <div className="text-white/80 text-sm">
                      Cotonou → Ganvié → Ouidah → Pendjari → Grand-Popo
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 p-3 rounded-xl bg-accent shadow-gold"
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 p-3 rounded-xl bg-primary shadow-purple"
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Destinations populaires
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3">
                Explorez le Bénin
              </h2>
            </div>
            <Link to="/destinations">
              <Button variant="outline" className="mt-4 md:mt-0 gap-2">
                Voir toutes les destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">{dest.description}</p>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span>{dest.pricePerDay.toLocaleString()} FCFA/jour</span>
                    <span>{dest.days} jour{dest.days > 1 ? "s" : ""}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={festivalVodoun}
            alt="Festival Vodoun"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm mb-6">
              <Calendar className="w-4 h-4" />
              Festivals & Événements
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Vivez les festivals uniques du Bénin
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Du festival du Vodoun aux célébrations des masques Gélédé, 
              synchronisez votre voyage avec les moments forts de la culture béninoise.
            </p>
            <Link to="/festivals">
              <Button variant="gold" size="xl" className="gap-2">
                Découvrir les festivals
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-foreground relative overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-accent" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Prêt à vivre l'aventure béninoise ?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Créez votre voyage personnalisé en quelques minutes grâce 
              à notre moteur intelligent.
            </p>
            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Créer mon voyage maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
