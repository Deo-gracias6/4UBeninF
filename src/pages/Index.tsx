import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Flame,
  TreePine,
  Waves,
  Landmark,
  Mountain,
  Palette,
  Utensils,
  Compass,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBenin from "@/assets/hero-benin.jpg";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import cotonouCity from "@/assets/cotonou-city.jpg";

// Régions du Bénin
const regions = [
  {
    name: "Sud du Bénin",
    image: cotonouCity,
    cities: ["Cotonou", "Porto-Novo", "Ouidah", "Grand-Popo"],
    description: "Côte atlantique, histoire et vie urbaine",
    color: "from-primary to-primary-dark",
  },
  {
    name: "Centre du Bénin",
    image: ouidahDoor,
    cities: ["Abomey", "Bohicon", "Dassa-Zoumé"],
    description: "Palais royaux, collines et spiritualité",
    color: "from-accent to-accent-dark",
  },
  {
    name: "Nord du Bénin",
    image: pendjariPark,
    cities: ["Natitingou", "Parakou", "Tanguiéta"],
    description: "Safari, montagnes et traditions Somba",
    color: "from-nature to-nature/80",
  },
];

// Expériences à vivre
const experiences = [
  {
    title: "Cérémonie Vodoun",
    category: "Culture & Traditions",
    icon: Palette,
    image: festivalVodoun,
    price: 45000,
    duration: "4h",
    intensity: "Modéré",
  },
  {
    title: "Atelier cuisine locale",
    category: "Gastronomie",
    icon: Utensils,
    image: ganvieVillage,
    price: 35000,
    duration: "3h",
    intensity: "Facile",
  },
  {
    title: "Safari Pendjari",
    category: "Nature & Aventure",
    icon: TreePine,
    image: pendjariPark,
    price: 120000,
    duration: "2 jours",
    intensity: "Intense",
  },
  {
    title: "Artisanat bronze",
    category: "Artisanat",
    icon: Compass,
    image: ouidahDoor,
    price: 40000,
    duration: "5h",
    intensity: "Modéré",
  },
];

// Activités populaires
const activities = [
  {
    title: "Parcs nationaux",
    icon: TreePine,
    image: pendjariPark,
    description: "Safari et faune sauvage africaine",
  },
  {
    title: "Plages",
    icon: Waves,
    image: cotonouCity,
    description: "Côte atlantique et lagunes",
  },
  {
    title: "Sites historiques",
    icon: Landmark,
    image: ouidahDoor,
    description: "Route des Esclaves, Palais Royaux",
  },
  {
    title: "Randonnées",
    icon: Mountain,
    image: pendjariPark,
    description: "Cascades et montagnes de l'Atacora",
  },
  {
    title: "Villages lacustres",
    icon: Compass,
    image: ganvieVillage,
    description: "Ganvié, la Venise de l'Afrique",
  },
  {
    title: "Découvertes culturelles",
    icon: Palette,
    image: festivalVodoun,
    description: "Vodoun, masques Gélédé, traditions",
  },
];

// Festivals à venir
const upcomingFestivals = [
  {
    name: "Festival du Vodoun",
    date: "10 Janvier",
    city: "Ouidah",
    image: festivalVodoun,
  },
  {
    name: "Festival Gélédé",
    date: "Mars",
    city: "Kétou",
    image: festivalVodoun,
  },
  {
    name: "FinAB",
    date: "Avril",
    city: "Cotonou",
    image: festivalVodoun,
  },
  {
    name: "WeLovEya",
    date: "Août",
    city: "Grand-Popo",
    image: festivalVodoun,
  },
];

export default function Index() {
  return (
    <main className="overflow-hidden">
      {/* 1️⃣ Hero Section - Immersive */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroBenin}
            alt="Bénin paysage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/40 to-primary/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Explore le{" "}
              <span className="text-gradient-gold">Bénin</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 mb-4 font-light"
            >
              Vis des expériences uniques.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-10"
            >
              Crée ton voyage sur mesure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/destinations">
                <Button variant="outline-light" size="xl" className="w-full sm:w-auto gap-2">
                  <MapPin className="w-5 h-5" />
                  Découvrir les destinations
                </Button>
              </Link>
              <Link to="/moteur">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Créer mon voyage
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
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

      {/* 2️⃣ Destinations du Bénin - Par régions */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Où aller ?
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-4">
              Destinations du Bénin
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Du littoral atlantique aux savanes du nord, chaque région offre une expérience unique.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden h-96 cursor-pointer"
              >
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${region.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {region.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{region.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {region.cities.map((city, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm text-white"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/destinations">
              <Button variant="default" size="lg" className="gap-2">
                Voir toutes les destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Expériences à vivre */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Que vivre ?
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-4">
              Expériences à vivre
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Culture, artisanat, gastronomie, nature... Composez votre aventure béninoise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all border border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {exp.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <exp.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold">
                      {exp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {exp.intensity}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {exp.price.toLocaleString()} FCFA
                    </span>
                    <Button variant="gold" size="sm" className="gap-1">
                      <Plus className="w-4 h-4" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/experiences">
              <Button variant="outline" size="lg" className="gap-2">
                Voir toutes les expériences
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ Que faire au Bénin */}
      <section className="py-24 bg-secondary pattern-african">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Activités
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-4">
              Que faire au Bénin ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden h-52 cursor-pointer"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Festivals & Événements */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={festivalVodoun}
            alt="Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm mb-4">
              <Calendar className="w-4 h-4" />
              Événements culturels
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Festivals & Événements
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Synchronisez votre voyage avec les moments forts de la culture béninoise.
            </p>
          </motion.div>

          {/* Mini calendrier */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {upcomingFestivals.map((festival, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-white text-center cursor-pointer hover:bg-white/20 transition-all"
              >
                <div className="text-accent font-bold text-lg mb-1">
                  {festival.date}
                </div>
                <h4 className="font-semibold text-sm mb-1">{festival.name}</h4>
                <div className="flex items-center justify-center gap-1 text-white/60 text-xs">
                  <MapPin className="w-3 h-3" />
                  {festival.city}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/festivals">
              <Button variant="gold" size="xl" className="gap-2">
                Voir le calendrier complet
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6️⃣ Moteur Intelligent - MISE EN AVANT */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-8"
            >
              <Sparkles className="w-10 h-10 text-accent" />
            </motion.div>

            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Dis-nous ce que tu aimes,
              <span className="text-gradient-gold block mt-2">on crée ton voyage</span>
            </h2>

            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Notre moteur intelligent analyse tes préférences et génère un itinéraire 
              personnalisé avec les meilleures expériences du Bénin.
            </p>

            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-3 text-lg px-10 py-6">
                <Sparkles className="w-6 h-6" />
                Créer mon itinéraire personnalisé
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>

            {/* Decorative elements */}
            <div className="flex justify-center gap-8 mt-12">
              {["Budget flexible", "Sur mesure", "Tout compris"].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <div className="w-3 h-3 rounded-full bg-accent mx-auto mb-2" />
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
