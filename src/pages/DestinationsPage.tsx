import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import cotonouCity from "@/assets/cotonou-city.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";

const destinations = [
  {
    id: 1,
    name: "Cotonou",
    region: "Littoral",
    image: cotonouCity,
    description: "La vibrante capitale économique du Bénin. Marchés colorés, plages et vie nocturne.",
    pricePerDay: 45000,
    recommendedDays: 2,
    highlights: ["Marché Dantokpa", "Fondation Zinsou", "Plage de Fidjrossè"],
  },
  {
    id: 2,
    name: "Ganvié",
    region: "Atlantique",
    image: ganvieVillage,
    description: "La Venise de l'Afrique. Village lacustre unique au monde avec ses maisons sur pilotis.",
    pricePerDay: 35000,
    recommendedDays: 1,
    highlights: ["Marché flottant", "Artisanat local", "Pêche traditionnelle"],
  },
  {
    id: 3,
    name: "Parc de la Pendjari",
    region: "Atacora",
    image: pendjariPark,
    description: "Safari exceptionnel au cœur de l'Afrique de l'Ouest. Lions, éléphants et paysages grandioses.",
    pricePerDay: 85000,
    recommendedDays: 3,
    highlights: ["Safari 4x4", "Cascades de Tanougou", "Nuit en lodge"],
  },
  {
    id: 4,
    name: "Ouidah",
    region: "Atlantique",
    image: ouidahDoor,
    description: "Ville historique et spirituelle. Berceau du vodoun et mémoire de la traite négrière.",
    pricePerDay: 30000,
    recommendedDays: 1,
    highlights: ["Route des Esclaves", "Temple des Pythons", "Porte du Non-Retour"],
  },
  {
    id: 5,
    name: "Porto-Novo",
    region: "Ouémé",
    image: cotonouCity,
    description: "Capitale administrative aux influences afro-brésiliennes. Architecture coloniale unique.",
    pricePerDay: 35000,
    recommendedDays: 2,
    highlights: ["Musée da Silva", "Palais du Roi", "Jardin des Plantes"],
  },
  {
    id: 6,
    name: "Abomey",
    region: "Zou",
    image: ouidahDoor,
    description: "Ancienne capitale du puissant royaume du Dahomey. Palais royaux classés UNESCO.",
    pricePerDay: 40000,
    recommendedDays: 2,
    highlights: ["Palais Royaux", "Musée Historique", "Artisanat Bronze"],
  },
  {
    id: 7,
    name: "Grand-Popo",
    region: "Mono",
    image: ganvieVillage,
    description: "Station balnéaire paisible. Plages préservées et lagunes mystérieuses.",
    pricePerDay: 40000,
    recommendedDays: 2,
    highlights: ["Plage de Grand-Popo", "Bouche du Roy", "Écolodges"],
  },
  {
    id: 8,
    name: "Natitingou",
    region: "Atacora",
    image: pendjariPark,
    description: "Porte d'entrée du parc Pendjari. Montagnes de l'Atacora et villages Somba.",
    pricePerDay: 50000,
    recommendedDays: 2,
    highlights: ["Tatas Somba", "Chutes de Kota", "Artisanat Otammari"],
  },
];

const regions = ["Toutes", "Littoral", "Atlantique", "Atacora", "Ouémé", "Zou", "Mono"];

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Toutes");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.description.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === "Toutes" || dest.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

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
              Explorez
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 mb-6">
              Destinations & <span className="text-gradient">Villes</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Du littoral aux savanes du nord, découvrez les perles cachées du Bénin.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-2xl shadow-elegant">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une destination..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-12 bg-secondary border-0"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedRegion === region
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-muted"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white/80 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      {dest.region}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-primary">
                        {dest.pricePerDay.toLocaleString()} FCFA
                      </span>
                      <span className="text-muted-foreground text-sm">/jour</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {dest.recommendedDays} jour{dest.recommendedDays > 1 ? "s" : ""}
                    </div>
                  </div>

                  <Link to={`/decouvrir/${dest.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-")}`}>
                    <Button className="w-full gap-2">
                      Découvrir
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune destination trouvée pour votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
