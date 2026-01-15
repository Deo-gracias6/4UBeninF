import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Users,
  Wallet,
  Heart,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  Star,
  Plane,
  Sun,
  Mountain,
  Landmark,
  TreePine,
  Palette,
  Utensils,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import cotonouCity from "@/assets/cotonou-city.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";

const interests = [
  { id: "culture", label: "Culture & Histoire", icon: Landmark },
  { id: "nature", label: "Nature & Safari", icon: TreePine },
  { id: "beach", label: "Plages & Détente", icon: Sun },
  { id: "adventure", label: "Aventure", icon: Mountain },
  { id: "gastro", label: "Gastronomie", icon: Utensils },
  { id: "art", label: "Art & Artisanat", icon: Palette },
];

const travelTypes = [
  { id: "solo", label: "Solo", icon: "🧑" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "family", label: "Famille", icon: "👨‍👩‍👧‍👦" },
  { id: "friends", label: "Amis", icon: "👥" },
  { id: "business", label: "Affaires", icon: "💼" },
];

interface ItineraryDay {
  day: number;
  city: string;
  activities: string[];
  image: string;
}

const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    city: "Cotonou",
    image: cotonouCity,
    activities: [
      "Arrivée à l'aéroport de Cotonou",
      "Installation à l'hôtel 4*",
      "Visite du Marché Dantokpa",
      "Dîner de bienvenue",
    ],
  },
  {
    day: 2,
    city: "Ganvié",
    image: ganvieVillage,
    activities: [
      "Excursion en pirogue à Ganvié",
      "Découverte du village lacustre",
      "Déjeuner chez l'habitant",
      "Retour et temps libre",
    ],
  },
  {
    day: 3,
    city: "Ouidah",
    image: ouidahDoor,
    activities: [
      "Route vers Ouidah",
      "Route des Esclaves",
      "Temple des Pythons",
      "Porte du Non-Retour",
    ],
  },
  {
    day: 4,
    city: "Grand-Popo",
    image: ganvieVillage,
    activities: [
      "Détente sur les plages",
      "Excursion à la Bouche du Roy",
      "Cours de cuisine locale",
      "Nuit en écolodge",
    ],
  },
  {
    day: 5,
    city: "Abomey",
    image: ouidahDoor,
    activities: [
      "Visite des Palais Royaux (UNESCO)",
      "Atelier bronze traditionnel",
      "Musée Historique d'Abomey",
      "Rencontre avec artisans locaux",
    ],
  },
  {
    day: 6,
    city: "Pendjari",
    image: pendjariPark,
    activities: [
      "Route vers le Nord (vol intérieur)",
      "Safari découverte au parc",
      "Observation faune sauvage",
      "Nuit en lodge safari",
    ],
  },
  {
    day: 7,
    city: "Pendjari / Cotonou",
    image: pendjariPark,
    activities: [
      "Safari au lever du soleil",
      "Cascades de Tanougou",
      "Vol retour vers Cotonou",
      "Départ ou extension",
    ],
  },
];

export default function EngineMoteurPage() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState([500000]);
  const [days, setDays] = useState([7]);
  const [travelers, setTravelers] = useState(2);
  const [travelType, setTravelType] = useState("couple");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["culture", "nature"]);
  const [startDate, setStartDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setItinerary(mockItinerary.slice(0, days[0]));
      setIsGenerating(false);
      setStep(4);
    }, 2500);
  };

  const totalPrice = budget[0];
  const pricePerDay = Math.round(totalPrice / days[0]);
  const pricePerPerson = Math.round(totalPrice / travelers);

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0 pattern-african opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-hero mb-6 shadow-purple"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Moteur <span className="text-gradient">Intelligent</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Créez votre voyage personnalisé en quelques étapes. Notre algorithme 
              intelligent génère l'itinéraire parfait selon vos envies.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Budget & Durée" },
                { num: 2, label: "Préférences" },
                { num: 3, label: "Génération" },
                { num: 4, label: "Itinéraire" },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        step >= s.num
                          ? "gradient-hero text-white shadow-purple"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground hidden md:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all ${
                        step > s.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Budget & Duration */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant"
                >
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
                    Définissez votre voyage
                  </h2>

                  <div className="space-y-10">
                    {/* Budget */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center gap-2 font-medium">
                          <Wallet className="w-5 h-5 text-primary" />
                          Budget total
                        </label>
                        <span className="text-2xl font-bold text-primary">
                          {budget[0].toLocaleString()} FCFA
                        </span>
                      </div>
                      <Slider
                        value={budget}
                        onValueChange={setBudget}
                        min={100000}
                        max={2000000}
                        step={50000}
                        className="py-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>100,000 FCFA</span>
                        <span>2,000,000 FCFA</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center gap-2 font-medium">
                          <Calendar className="w-5 h-5 text-primary" />
                          Nombre de jours
                        </label>
                        <span className="text-2xl font-bold text-primary">
                          {days[0]} jours
                        </span>
                      </div>
                      <Slider
                        value={days}
                        onValueChange={setDays}
                        min={2}
                        max={14}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>2 jours</span>
                        <span>14 jours</span>
                      </div>
                    </div>

                    {/* Travelers */}
                    <div>
                      <label className="flex items-center gap-2 font-medium mb-4">
                        <Users className="w-5 h-5 text-primary" />
                        Nombre de voyageurs
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        >
                          -
                        </Button>
                        <span className="text-3xl font-bold w-16 text-center">
                          {travelers}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setTravelers(Math.min(10, travelers + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="flex items-center gap-2 font-medium mb-4">
                        <Plane className="w-5 h-5 text-primary" />
                        Date de départ
                      </label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="h-12 text-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      variant="hero"
                      size="xl"
                      className="gap-2"
                    >
                      Continuer
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Preferences */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant"
                >
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
                    Vos préférences
                  </h2>

                  <div className="space-y-10">
                    {/* Travel Type */}
                    <div>
                      <label className="flex items-center gap-2 font-medium mb-4">
                        <Users className="w-5 h-5 text-primary" />
                        Type de voyage
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {travelTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setTravelType(type.id)}
                            className={`p-4 rounded-xl text-center transition-all ${
                              travelType === type.id
                                ? "bg-primary text-primary-foreground shadow-purple"
                                : "bg-secondary hover:bg-muted"
                            }`}
                          >
                            <span className="text-2xl block mb-1">{type.icon}</span>
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="flex items-center gap-2 font-medium mb-4">
                        <Heart className="w-5 h-5 text-primary" />
                        Centres d'intérêt (sélectionnez plusieurs)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {interests.map((interest) => (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                              selectedInterests.includes(interest.id)
                                ? "bg-primary text-primary-foreground shadow-purple"
                                : "bg-secondary hover:bg-muted"
                            }`}
                          >
                            <interest.icon className="w-6 h-6" />
                            <span className="font-medium">{interest.label}</span>
                            {selectedInterests.includes(interest.id) && (
                              <Check className="w-5 h-5 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button
                      onClick={() => setStep(1)}
                      variant="ghost"
                      size="lg"
                      className="gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Retour
                    </Button>
                    <Button
                      onClick={() => {
                        setStep(3);
                        generateItinerary();
                      }}
                      variant="hero"
                      size="xl"
                      className="gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Générer mon itinéraire
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Generating */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-3xl p-12 md:p-16 shadow-elegant text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-hero mb-8 shadow-purple"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Génération en cours...
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Notre intelligence artificielle crée votre itinéraire parfait
                  </p>

                  <div className="max-w-md mx-auto">
                    <div className="space-y-3">
                      {[
                        "Analyse de vos préférences",
                        "Sélection des destinations",
                        "Optimisation du parcours",
                        "Calcul des prix",
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.5 }}
                          className="flex items-center gap-3 text-left"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.5 + 0.3 }}
                            className="w-6 h-6 rounded-full bg-nature/20 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-nature" />
                          </motion.div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Itinerary */}
              {step === 4 && itinerary && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Summary Card */}
                  <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 text-white shadow-purple">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                          Votre voyage personnalisé
                        </h2>
                        <p className="text-white/80">
                          Itinéraire optimisé pour {days[0]} jours
                        </p>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Star className="w-8 h-8 text-accent" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-white/10">
                        <div className="text-white/60 text-sm mb-1">Budget total</div>
                        <div className="text-xl font-bold">{totalPrice.toLocaleString()} FCFA</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/10">
                        <div className="text-white/60 text-sm mb-1">Par jour</div>
                        <div className="text-xl font-bold">{pricePerDay.toLocaleString()} FCFA</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/10">
                        <div className="text-white/60 text-sm mb-1">Par personne</div>
                        <div className="text-xl font-bold">{pricePerPerson.toLocaleString()} FCFA</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/10">
                        <div className="text-white/60 text-sm mb-1">Voyageurs</div>
                        <div className="text-xl font-bold">{travelers} personne{travelers > 1 ? "s" : ""}</div>
                      </div>
                    </div>
                  </div>

                  {/* Day by Day */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-bold">
                      Planning jour par jour
                    </h3>

                    {itinerary.map((day, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-card rounded-2xl overflow-hidden shadow-elegant"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                            <img
                              src={day.image}
                              alt={day.city}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent md:bg-gradient-to-t" />
                            <div className="absolute bottom-4 left-4 md:top-4">
                              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center font-bold text-white shadow-purple">
                                J{day.day}
                              </div>
                            </div>
                          </div>

                          <div className="p-6 flex-1">
                            <div className="flex items-center gap-2 text-primary mb-3">
                              <MapPin className="w-5 h-5" />
                              <span className="font-semibold text-lg">{day.city}</span>
                            </div>
                            <ul className="space-y-2">
                              {day.activities.map((activity, aIdx) => (
                                <li
                                  key={aIdx}
                                  className="flex items-start gap-2 text-muted-foreground"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setStep(1);
                        setItinerary(null);
                      }}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Modifier mon voyage
                    </Button>
                    <Link to="/paiement">
                      <Button variant="hero" size="xl" className="gap-2 w-full md:w-auto">
                        Réserver maintenant
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
