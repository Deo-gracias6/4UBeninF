import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Sparkles, Compass, ArrowRight } from "lucide-react";
import { experiences } from "@/data/experiencesData";
import { festivals } from "@/data/festivalsData";
import { beninCities } from "@/data/beninCities";

interface SearchResult {
  id: string;
  name: string;
  type: "city" | "experience" | "festival";
  image?: string;
  location?: string;
  link: string;
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search cities
    beninCities
      .filter((city) =>
        city.name.toLowerCase().includes(searchQuery) ||
        city.department.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .forEach((city) => {
        searchResults.push({
          id: city.id,
          name: city.name,
          type: "city",
          image: city.image,
          location: city.department,
          link: `/decouvrir/${city.id}`,
        });
      });

    // Search experiences
    experiences
      .filter((exp) =>
        exp.title.toLowerCase().includes(searchQuery) ||
        exp.category.toLowerCase().includes(searchQuery) ||
        exp.location.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .forEach((exp) => {
        searchResults.push({
          id: exp.id,
          name: exp.title,
          type: "experience",
          image: exp.image,
          location: exp.location,
          link: `/experiences/${exp.id}`,
        });
      });

    // Search festivals
    festivals
      .filter((fest) =>
        fest.name.toLowerCase().includes(searchQuery) ||
        fest.city.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .forEach((fest) => {
        searchResults.push({
          id: fest.id,
          name: fest.name,
          type: "festival",
          image: fest.image,
          location: fest.city,
          link: `/festivals/${fest.id}`,
        });
      });

    setResults(searchResults);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (link: string) => {
    setQuery("");
    setIsFocused(false);
    navigate(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultClick(results[0].link);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "city":
        return <MapPin className="w-4 h-4" />;
      case "festival":
        return <Calendar className="w-4 h-4" />;
      case "experience":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "city":
        return "Ville";
      case "festival":
        return "Festival";
      case "experience":
        return "Expérience";
      default:
        return "Activité";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "city":
        return "bg-emerald-500/20 text-emerald-300";
      case "festival":
        return "bg-purple-500/20 text-purple-300";
      case "experience":
        return "bg-amber-500/20 text-amber-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="relative w-full max-w-2xl mx-auto mt-10"
    >
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative flex items-center gap-3 
            bg-white/10 backdrop-blur-xl 
            border transition-all duration-300
            ${isFocused 
              ? "border-accent/50 bg-white/15 shadow-2xl shadow-accent/10" 
              : "border-white/20 hover:border-white/30"
            }
            rounded-2xl px-5 py-4
          `}
        >
          <Search className={`w-5 h-5 transition-colors ${isFocused ? "text-accent" : "text-white/60"}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Rechercher une ville, une expérience ou un festival..."
            className="flex-1 bg-transparent text-white placeholder:text-white/50 text-base md:text-lg outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
          {query.length >= 2 && results.length > 0 && (
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-sm font-medium transition-colors"
            >
              <span className="hidden sm:inline">Rechercher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isFocused && (query.length >= 2 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={`${result.type}-${result.id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleResultClick(result.link)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors text-left group"
                    >
                      {result.image && (
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-14 h-14 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-accent/30 transition-all"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                          {result.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getTypeColor(result.type)}`}>
                            {getTypeIcon(result.type)}
                            {getTypeLabel(result.type)}
                          </span>
                          {result.location && (
                            <span className="text-xs text-muted-foreground">
                              {result.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : query.length >= 2 ? (
              <div className="p-8 text-center">
                <Search className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Aucun résultat pour "{query}"</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Essayez avec un autre terme
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-4"
      >
        <span className="text-white/50 text-sm">Populaires :</span>
        {["Ouidah", "Ganvié", "Pendjari", "Vodoun"].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              setIsFocused(true);
            }}
            className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full border border-white/10 hover:border-white/20 transition-all"
          >
            {tag}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
