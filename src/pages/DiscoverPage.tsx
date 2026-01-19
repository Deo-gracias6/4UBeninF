import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { beninCities, departments, regions } from "@/data/beninCities";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const filteredCities = useMemo(() => {
    return beninCities.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      const matchesDept = !selectedDepartment || city.department === selectedDepartment;
      return matchesSearch && matchesRegion && matchesDept;
    });
  }, [search, selectedRegion, selectedDepartment]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Découvrir le Bénin
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Explorez les 77 communes du Bénin, de la côte atlantique aux savanes du nord
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une ville..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white text-foreground"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white text-foreground"
                >
                  <option value="">Tous les départements</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 text-center">
            <div><div className="text-3xl font-bold text-primary">77</div><div className="text-sm text-muted-foreground">Communes</div></div>
            <div><div className="text-3xl font-bold text-primary">12</div><div className="text-sm text-muted-foreground">Départements</div></div>
            <div><div className="text-3xl font-bold text-primary">3</div><div className="text-sm text-muted-foreground">Régions</div></div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold">
              {filteredCities.length} ville{filteredCities.length > 1 ? 's' : ''} trouvée{filteredCities.length > 1 ? 's' : ''}
            </h2>
            {(search || selectedRegion || selectedDepartment) && (
              <Button variant="outline" size="sm" onClick={() => { setSearch(""); setSelectedRegion(""); setSelectedDepartment(""); }}>
                <Filter className="w-4 h-4 mr-2" /> Réinitialiser
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((city, idx) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">{city.region}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-serif text-lg font-semibold text-white">{city.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" /> {city.department}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{city.shortDescription}</p>
                  <Link to={`/decouvrir/${city.id}`}>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Aucune ville ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
