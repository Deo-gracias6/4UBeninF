import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import cotonouCity from "@/assets/cotonou-city.jpg";

const regions = ["Toutes", "Littoral", "Atlantique", "Atacora", "Ouémé", "Zou", "Mono"];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Toutes");

  //  Charger depuis backend
  useEffect(() => {
  fetch("http://localhost:5000/api/destinations")
    .then(res => res.json())
    .then(result => {
      console.log("API:", result);

      if (result.success) {
        setDestinations(result.data.destinations);
      } else {
        console.error("API error:", result);
      }

      setLoading(false);
    })
    .catch(err => {
      console.error("Erreur chargement destinations:", err);
      setLoading(false);
    });
}, []);

  // 🔥 Filtrage
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name?.toLowerCase().includes(search.toLowerCase()) ||
      dest.description?.toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      selectedRegion === "Toutes" || dest.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return <div className="text-center py-20">Chargement des destinations...</div>;
  }

  return (
    <main className="pt-20">
      {/* HERO */}
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

          {/* SEARCH + FILTER */}
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

      {/* GRID */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune destination trouvée.
              </p>
            </div>
          ) : (
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
                      src={dest.bannerImage || cotonouCity}
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
                <Link to={`/destinations/${dest.slug}`}>
                  <Button className="w-full gap-2">
                    Découvrir
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
