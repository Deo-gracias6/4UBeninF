import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import heroAmazone from "@/assets/hero-amazone.jpg";
import heroOuidah from "@/assets/hero-ouidah.jpg";
import heroKota from "@/assets/hero-kota.jpg";
import HeroSearch from "./HeroSearch";

const slides = [
  {
    id: 1,
    image: heroAmazone,
    title: "Place de l'Amazone",
    location: "Cotonou",
  },
  {
    id: 2,
    image: heroOuidah,
    title: "Porte du Non-Retour",
    location: "Ouidah",
  },
  {
    id: 3,
    image: heroKota,
    title: "Chutes de Kota",
    location: "Natitingou",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent mb-8"
          >
            <span className="text-sm font-medium">✨ Voyage sur mesure au Bénin</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]"
          >
            Vivez le{" "}
            <span className="text-gradient-gold">Bénin</span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-light">
              autrement
            </span>
          </motion.h1>

          {/* Subtitle - Emotion focused */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-6 font-light max-w-2xl mx-auto"
          >
            Des expériences, pas juste des voyages.
          </motion.p>

          {/* Hero Search */}
          <HeroSearch />
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className="group flex items-center gap-2"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentSlide
                  ? "w-10 bg-accent"
                  : "w-3 bg-white/40 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Current Location Badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-28 left-8 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            {slides[currentSlide].title}
          </span>
          <span className="text-white/60 text-sm">
            — {slides[currentSlide].location}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm">Défiler</span>
          <ChevronRight className="w-5 h-5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
