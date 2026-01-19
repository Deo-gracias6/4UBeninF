import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

interface MapCity {
  name: string;
  day: number;
  coordinates: { x: number; y: number };
  activities: string[];
}

interface InteractiveMapProps {
  cities: MapCity[];
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
}

// Mock Benin map cities with relative coordinates (%)
const cityPositions: Record<string, { x: number; y: number }> = {
  Cotonou: { x: 45, y: 88 },
  'Porto-Novo': { x: 55, y: 85 },
  Ganvié: { x: 42, y: 82 },
  Ouidah: { x: 35, y: 86 },
  'Grand-Popo': { x: 25, y: 90 },
  Abomey: { x: 48, y: 70 },
  Bohicon: { x: 50, y: 72 },
  Dassa: { x: 52, y: 60 },
  Parakou: { x: 58, y: 42 },
  Natitingou: { x: 42, y: 28 },
  Pendjari: { x: 35, y: 18 },
  Tanguiéta: { x: 40, y: 22 },
  Kandi: { x: 62, y: 25 },
  Djougou: { x: 48, y: 35 },
  Savè: { x: 60, y: 55 },
};

export default function InteractiveMap({
  cities,
  selectedDay,
  onSelectDay,
}: InteractiveMapProps) {
  const getCityPosition = (cityName: string) => {
    // Try to find exact match first
    if (cityPositions[cityName]) {
      return cityPositions[cityName];
    }
    // Try partial match
    const match = Object.keys(cityPositions).find(
      (key) =>
        cityName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(cityName.toLowerCase())
    );
    if (match) {
      return cityPositions[match];
    }
    // Default position
    return { x: 50, y: 50 };
  };

  return (
    <div className="bg-card rounded-2xl shadow-elegant overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-serif text-lg font-bold flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" />
          Carte de votre parcours
        </h3>
        <p className="text-sm text-muted-foreground">
          Cliquez sur une ville pour voir les détails
        </p>
      </div>

      <div className="relative aspect-[3/4] bg-gradient-to-b from-nature/10 via-nature/5 to-primary/5">
        {/* Benin Map Outline (SVG) */}
        <svg
          viewBox="0 0 100 120"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Simplified Benin shape */}
          <path
            d="M 35 10 
               L 65 10 
               L 70 30 
               L 68 50 
               L 70 70 
               L 60 85 
               L 55 95 
               L 45 95 
               L 38 88 
               L 30 85 
               L 28 70 
               L 30 50 
               L 28 30 
               Z"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />

          {/* Route lines connecting cities */}
          {cities.length > 1 &&
            cities.slice(0, -1).map((city, idx) => {
              const currentPos = getCityPosition(city.name);
              const nextCity = cities[idx + 1];
              const nextPos = getCityPosition(nextCity.name);

              return (
                <motion.line
                  key={`route-${idx}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: idx * 0.3, duration: 0.5 }}
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                  opacity="0.7"
                />
              );
            })}

          {/* Animated route overlay */}
          {cities.length > 1 && (
            <motion.circle
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{
                duration: cities.length * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              r="2"
              fill="hsl(var(--accent))"
            />
          )}
        </svg>

        {/* City markers */}
        {cities.map((city, idx) => {
          const pos = getCityPosition(city.name);
          const isSelected = selectedDay === city.day;

          return (
            <motion.button
              key={`${city.name}-${idx}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => onSelectDay(city.day)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div
                className={`relative transition-all duration-300 ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                {/* Pulse effect */}
                {isSelected && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-10 h-10 -m-1 rounded-full bg-primary"
                  />
                )}

                {/* Marker */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-colors ${
                    isSelected
                      ? 'bg-accent text-white'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {city.day}
                </div>

                {/* City name tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap px-2 py-1 rounded text-xs font-medium transition-opacity ${
                    isSelected
                      ? 'bg-foreground text-background opacity-100'
                      : 'bg-foreground/80 text-background opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {city.name}
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Map legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Ville visitée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 border-t-2 border-dashed border-primary" />
            <span>Itinéraire</span>
          </div>
        </div>

        {/* Ready for Google Maps text */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          🗺️ Google Maps (bientôt)
        </div>
      </div>

      {/* Selected city details */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary/50"
        >
          {cities
            .filter((c) => c.day === selectedDay)
            .map((city) => (
              <div key={city.day}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-semibold">
                    Jour {city.day} - {city.name}
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {city.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </motion.div>
      )}
    </div>
  );
}
