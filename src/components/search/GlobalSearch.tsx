import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Calendar, Compass, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiencesData";
import { festivals } from "@/data/festivalsData";
import { beninCities } from "@/data/beninCities";

interface SearchResult {
  id: string;
  name: string;
  type: "city" | "experience" | "festival" | "activity";
  image?: string;
  location?: string;
  link: string;
}

interface GlobalSearchProps {
  isLight?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

export function GlobalSearch({ isLight = false, isMobile = false, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (link: string) => {
    setQuery("");
    setIsOpen(false);
    onClose?.();
    navigate(link);
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

  if (isMobile) {
    return (
      <div className="relative w-full" ref={containerRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Rechercher..."
            className="pl-9 pr-9 bg-secondary border-border"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isOpen && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-50"
            >
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result.link)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                >
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {getTypeIcon(result.type)}
                      <span>{getTypeLabel(result.type)}</span>
                      {result.location && (
                        <>
                          <span>•</span>
                          <span>{result.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={`gap-2 ${isLight ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"}`}
      >
        <Search className="w-4 h-4" />
        <span className="hidden xl:inline text-sm">Rechercher</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-0 right-0 w-80 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-50"
          >
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Villes, expériences, festivals..."
                  className="pl-9 pr-9"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result.link)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                  >
                    {result.image && (
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {getTypeIcon(result.type)}
                        <span>{getTypeLabel(result.type)}</span>
                        {result.location && (
                          <>
                            <span>•</span>
                            <span>{result.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun résultat pour "{query}"</p>
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Compass className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Tapez au moins 2 caractères</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
