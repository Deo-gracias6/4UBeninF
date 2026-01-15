import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Landmark, Palette, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";

const sections = [
  {
    id: "parcs",
    icon: TreePine,
    title: "Parcs nationaux",
    description: "Explorez la faune sauvage africaine dans des réserves naturelles préservées",
    items: [
      {
        name: "Parc National de la Pendjari",
        image: pendjariPark,
        description: "L'un des derniers refuges de faune sauvage en Afrique de l'Ouest. Lions, éléphants, buffles et antilopes.",
        price: 85000,
        duration: "3 jours",
        level: "Aventure",
      },
      {
        name: "Parc National du W",
        image: pendjariPark,
        description: "Parc transfrontalier UNESCO, habitat unique de guépards et d'espèces rares.",
        price: 95000,
        duration: "4 jours",
        level: "Aventure",
      },
    ],
  },
  {
    id: "sites",
    icon: Landmark,
    title: "Sites historiques",
    description: "Plongez dans l'histoire riche et complexe du Bénin",
    items: [
      {
        name: "Route des Esclaves - Ouidah",
        image: ouidahDoor,
        description: "Parcours mémoriel de 4km jusqu'à la Porte du Non-Retour. Un témoignage poignant de l'histoire.",
        price: 25000,
        duration: "4 heures",
        level: "Culturel",
      },
      {
        name: "Palais Royaux d'Abomey",
        image: ouidahDoor,
        description: "Classés au patrimoine mondial UNESCO, ces palais témoignent de la puissance du royaume du Dahomey.",
        price: 30000,
        duration: "5 heures",
        level: "Culturel",
      },
    ],
  },
  {
    id: "culture",
    icon: Palette,
    title: "Découvertes culturelles",
    description: "Immergez-vous dans les traditions vivantes du Bénin",
    items: [
      {
        name: "Village lacustre de Ganvié",
        image: ganvieVillage,
        description: "Surnommée la Venise de l'Afrique, cette cité sur pilotis abrite 30 000 habitants.",
        price: 35000,
        duration: "1 jour",
        level: "Découverte",
      },
      {
        name: "Temple des Pythons",
        image: festivalVodoun,
        description: "Sanctuaire sacré vodoun où vivent des dizaines de pythons royaux vénérés.",
        price: 15000,
        duration: "2 heures",
        level: "Spirituel",
      },
    ],
  },
];

export default function DiscoverPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Patrimoine & Culture
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
              Découvrir le <span className="text-gradient">Bénin</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Des réserves naturelles aux sites historiques, en passant par les traditions 
              vivantes du vodoun, le Bénin offre une richesse culturelle incomparable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Country Overview */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Un pays aux mille visages
              </h2>
              <p className="text-muted-foreground mb-4">
                Le Bénin, berceau du vodoun et terre des anciens royaumes du Dahomey, 
                est une destination d'exception en Afrique de l'Ouest.
              </p>
              <p className="text-muted-foreground mb-6">
                De sa côte atlantique à ses savanes du nord, des cités lacustres aux 
                palais royaux, chaque région raconte une histoire unique.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Superficie", value: "114 763 km²" },
                  { label: "Population", value: "13 millions" },
                  { label: "Capitale", value: "Porto-Novo" },
                  { label: "Langue", value: "Français" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-card">
                    <div className="text-muted-foreground text-sm">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src={ganvieVillage}
                  alt="Ganvié"
                  className="rounded-2xl h-48 w-full object-cover"
                />
                <img
                  src={pendjariPark}
                  alt="Pendjari"
                  className="rounded-2xl h-64 w-full object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={ouidahDoor}
                  alt="Ouidah"
                  className="rounded-2xl h-64 w-full object-cover"
                />
                <img
                  src={festivalVodoun}
                  alt="Festival"
                  className="rounded-2xl h-48 w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 ${sectionIdx % 2 === 1 ? "bg-secondary" : ""}`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center">
                <section.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                  {section.title}
                </h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        {item.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          {item.duration}
                        </span>
                        <span className="font-semibold text-primary">
                          {item.price.toLocaleString()} FCFA
                        </span>
                      </div>
                      <Link to="/moteur">
                        <Button size="sm" className="gap-1">
                          Ajouter
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à explorer ?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Utilisez notre moteur intelligent pour créer votre itinéraire 
              personnalisé incluant ces merveilles.
            </p>
            <Link to="/moteur">
              <Button variant="gold" size="xl" className="gap-2">
                Créer mon voyage
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
