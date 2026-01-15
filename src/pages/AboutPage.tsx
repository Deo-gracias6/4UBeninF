import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Heart, Globe, Users, TrendingUp, Award, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBenin from "@/assets/hero-benin.jpg";

const values = [
  {
    icon: Target,
    title: "Notre Vision",
    description: "Positionner le Bénin comme destination touristique incontournable en Afrique grâce à l'innovation technologique.",
  },
  {
    icon: Heart,
    title: "Notre Mission",
    description: "Démocratiser l'accès au tourisme béninois en offrant des expériences personnalisées et authentiques à chaque voyageur.",
  },
  {
    icon: Globe,
    title: "Portée Internationale",
    description: "Connecter le Bénin au monde en attirant des voyageurs de tous les continents curieux de découvrir nos richesses.",
  },
];

const impacts = [
  {
    icon: Users,
    value: "500+",
    label: "Emplois locaux créés",
    description: "Guides, artisans, hébergeurs",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Croissance économique",
    description: "Pour les communautés partenaires",
  },
  {
    icon: Award,
    value: "95%",
    label: "Satisfaction client",
    description: "Note moyenne des voyageurs",
  },
];

const team = [
  { name: "Directeur Général", role: "Vision & Stratégie" },
  { name: "Directrice Technologie", role: "Innovation & IA" },
  { name: "Directeur Partenariats", role: "Communautés locales" },
  { name: "Directrice Marketing", role: "Croissance & Communication" },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBenin}
            alt="Bénin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              À propos de nous
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Révolutionner le tourisme au <span className="text-gradient-gold">Bénin</span>
            </h1>
            <p className="text-white/80 text-lg">
              4UBENIN est le premier moteur intelligent de personnalisation touristique 
              dédié au Bénin. Une startup technologique au service du patrimoine africain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card shadow-elegant"
              >
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-purple">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Notre histoire
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">
                De l'idée à la réalité
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-center"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                4UBENIN est né d'un constat simple : le Bénin regorge de trésors 
                culturels, naturels et historiques, mais manque d'outils modernes 
                pour les mettre en valeur auprès du monde.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                En combinant l'intelligence artificielle avec une connaissance 
                profonde du terrain, nous avons créé une plateforme qui comprend 
                les envies de chaque voyageur et génère des itinéraires sur mesure, 
                tout en garantissant des retombées économiques directes pour les 
                communautés locales.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                Notre ambition ? Faire du Bénin la destination de référence 
                pour le tourisme culturel en Afrique de l'Ouest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Notre impact
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">
              Un projet à dimension humaine
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm"
              >
                <impact.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{impact.value}</div>
                <div className="font-semibold mb-2">{impact.label}</div>
                <div className="text-white/70 text-sm">{impact.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Partenaires
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">
              Ils nous font confiance
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              "Ministère du Tourisme",
              "ATBEF",
              "African Parks",
              "UNESCO Bénin",
            ].map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-24 rounded-xl bg-secondary flex items-center justify-center p-4"
              >
                <span className="font-semibold text-muted-foreground text-center">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Rejoignez l'aventure
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Que vous soyez investisseur, partenaire ou simplement curieux, 
              nous serions ravis d'échanger avec vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/moteur">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Essayer le moteur
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="gap-2">
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
