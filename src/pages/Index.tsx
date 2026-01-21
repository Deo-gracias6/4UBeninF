import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Star, 
  Compass, 
  TreePine, 
  Mountain,
  Waves,
  Camera,
  Utensils,
  Palette,
  Clock,
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/home/HeroCarousel";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import cotonouCity from "@/assets/cotonou-city.jpg";

const destinations = [
  {
    region: "Sud du Bénin",
    name: "Cotonou & Ouidah",
    image: cotonouCity,
    description: "Plages, marchés animés et spiritualité vodoun",
    highlights: ["Marchés", "Plages", "Culture"],
    priceFrom: 35000,
  },
  {
    region: "Centre du Bénin",
    name: "Abomey & Dassa",
    image: ouidahDoor,
    description: "Palais royaux UNESCO et collines sacrées",
    highlights: ["Histoire", "Patrimoine", "Spirituel"],
    priceFrom: 40000,
  },
  {
    region: "Nord du Bénin",
    name: "Pendjari & Atacora",
    image: pendjariPark,
    description: "Safari, cascades et paysages grandioses",
    highlights: ["Safari", "Nature", "Aventure"],
    priceFrom: 75000,
  },
];

const experiences = [
  {
    title: "Cérémonie Vodoun",
    category: "Culture",
    image: festivalVodoun,
    price: 45000,
    duration: "4h",
    intensity: "Modéré",
    icon: Palette,
  },
  {
    title: "Safari Pendjari",
    category: "Nature",
    image: pendjariPark,
    price: 120000,
    duration: "2 jours",
    intensity: "Aventure",
    icon: Camera,
  },
  {
    title: "Cuisine béninoise",
    category: "Gastronomie",
    image: ganvieVillage,
    price: 35000,
    duration: "3h",
    intensity: "Facile",
    icon: Utensils,
  },
  {
    title: "Village de Ganvié",
    category: "Découverte",
    image: ganvieVillage,
    price: 30000,
    duration: "5h",
    intensity: "Facile",
    icon: Compass,
  },
];

const activities = [
  { icon: TreePine, title: "Parcs nationaux", desc: "Safari et faune sauvage", image: pendjariPark },
  { icon: Waves, title: "Plages", desc: "Côte atlantique préservée", image: cotonouCity },
  { icon: Mountain, title: "Randonnées", desc: "Montagnes de l'Atacora", image: pendjariPark },
  { icon: Camera, title: "Sites historiques", desc: "Patrimoine UNESCO", image: ouidahDoor },
  { icon: Palette, title: "Culture vodoun", desc: "Traditions ancestrales", image: festivalVodoun },
  { icon: Utensils, title: "Gastronomie", desc: "Saveurs authentiques", image: ganvieVillage },
];

const festivals = [
  { name: "Festival du Vodoun", date: "10 Janvier", city: "Ouidah", image: festivalVodoun },
  { name: "Gélédé", date: "Mars", city: "Kétou", image: festivalVodoun },
  { name: "FinAB", date: "Avril", city: "Cotonou", image: cotonouCity },
  { name: "WeLovEya", date: "Août", city: "Grand-Popo", image: ganvieVillage },
];

export default function Index() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section - Full Immersive Carousel */}
      <HeroCarousel />

      {/* Destinations Section */}
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

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group"
              >
                <div className="relative h-[420px] rounded-3xl overflow-hidden card-premium">
                  <img
                    src={dest.image}
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
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">{dest.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {dest.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-1 rounded-full bg-white/20 text-white text-xs">
                            {h}
                          </span>
                        ))}
                      </div>
                      <span className="text-accent font-semibold">
                        dès {dest.priceFrom.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-dark text-sm font-medium mb-4">
              Expériences
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Expériences à <span className="text-primary">vivre</span>
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
                      {exp.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <exp.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold mb-3">
                    {exp.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exp.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-nature/10 text-nature text-xs">
                      {exp.intensity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {exp.price.toLocaleString()} FCFA
                    </span>
                    <Button size="sm" variant="gold" className="gap-1">
                      Ajouter
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/experiences">
              <Button variant="outline" size="lg" className="gap-2">
                Voir toutes les expériences
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What to do Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-nature/10 text-nature text-sm font-medium mb-4">
              Activités
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Que faire au <span className="text-nature">Bénin</span> ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{activity.title}</h3>
                  <p className="text-white/70 text-xs">{activity.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                Festivals
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Festivals & <span className="text-accent">Événements</span>
              </h2>
            </div>
            <Link to="/festivals" className="mt-6 md:mt-0">
              <Button variant="outline-light" className="gap-2">
                Calendrier complet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festivals.map((festival, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 text-accent text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {festival.date}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    {festival.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    {festival.city}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Moteur Intelligent CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 pattern-african opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-10 h-10 text-accent" />
            </motion.div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Dis-nous ce que tu aimes
            </h2>
            <p className="text-xl text-white/90 mb-10 font-light">
              Notre moteur intelligent crée ton itinéraire parfait en quelques clics.
            </p>

            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-3 text-lg px-10">
                <Sparkles className="w-6 h-6" />
                Créer mon itinéraire personnalisé
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>5000+ voyageurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span>4.9/5 satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
