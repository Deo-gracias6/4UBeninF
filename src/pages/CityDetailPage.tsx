import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCityById } from "@/data/beninCities";

export default function CityDetailPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId || "");

  if (!city) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ville non trouvée</h1>
          <Link to="/decouvrir">
            <Button>Retour aux villes</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/decouvrir" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
              {city.name}
            </motion.h1>
            <div className="flex items-center gap-4 text-white/80">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {city.department}</span>
              <span className="px-2 py-1 rounded-full bg-primary/80 text-xs">{city.region}</span>
              <span><Users className="w-4 h-4 inline mr-1" />{city.population.toLocaleString()} hab.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-2xl p-6 shadow-elegant">
                <h2 className="font-serif text-2xl font-bold mb-4">À propos</h2>
                <p className="text-muted-foreground">{city.fullDescription}</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-elegant">
                <h2 className="font-serif text-2xl font-bold mb-4">Histoire</h2>
                <p className="text-muted-foreground">{city.history}</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-elegant">
                <h2 className="font-serif text-2xl font-bold mb-4">Culture</h2>
                <p className="text-muted-foreground">{city.culture}</p>
              </div>

              {/* Activities */}
              {city.activities.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">Activités</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {city.activities.map((activity, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-secondary">
                        <h3 className="font-semibold mb-1">{activity.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">{activity.type}</span>
                          <span><Clock className="w-3 h-3 inline mr-1" />{activity.duration}</span>
                          <span className="font-medium text-accent">{activity.price.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences */}
              {city.experiences.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">Expériences</h2>
                  <div className="space-y-4">
                    {city.experiences.map((exp, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-secondary flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{exp.name}</h3>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                        <span className="font-bold text-accent">{exp.price.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Festivals */}
              {city.festivals.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h2 className="font-serif text-2xl font-bold mb-4">Festivals</h2>
                  <div className="space-y-4">
                    {city.festivals.map((festival, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="font-semibold">{festival.name}</span>
                          <span className="text-sm text-accent">{festival.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{festival.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-elegant sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-4">Points forts</h3>
                <ul className="space-y-2 mb-6">
                  {city.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-accent" /> {h}
                    </li>
                  ))}
                </ul>
                <Link to="/moteur">
                  <Button className="w-full" size="lg">Planifier ma visite</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
