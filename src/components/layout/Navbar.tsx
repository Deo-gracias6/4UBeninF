import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { UserMenu } from "./UserMenu";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/decouvrir", label: "Découvrir" },
  { path: "/destinations", label: "Destinations" },
  { path: "/experiences", label: "Expériences" },
  { path: "/festivals", label: "Festivals" },
  { path: "/a-propos", label: "À propos" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useUserAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105 ${
              isScrolled ? "gradient-hero" : "bg-white/20 backdrop-blur-sm"
            }`}>
              <span className="text-white font-bold text-lg">4U</span>
            </div>
            <span className={`font-serif text-xl font-semibold transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              4UBENIN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? isScrolled
                      ? "bg-primary/10 text-primary"
                      : "bg-white/20 text-white"
                    : isScrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/moteur">
                  <Button 
                    variant={isScrolled ? "hero" : "gold"} 
                    size="lg" 
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Créer mon voyage
                  </Button>
                </Link>
                <UserMenu isScrolled={isScrolled} />
              </>
            ) : (
              <>
                <Link to="/connexion">
                  <Button 
                    variant="ghost"
                    className={`gap-2 ${
                      isScrolled
                        ? "text-foreground hover:bg-secondary"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/inscription">
                  <Button 
                    variant={isScrolled ? "default" : "outline"}
                    className={`gap-2 ${
                      !isScrolled && "border-white/50 text-white hover:bg-white/10"
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Inscription
                  </Button>
                </Link>
                <Link to="/moteur">
                  <Button 
                    variant={isScrolled ? "hero" : "gold"} 
                    size="lg" 
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Créer mon voyage
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "hover:bg-secondary" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-border my-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/profil" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">
                        Mon profil
                      </Button>
                    </Link>
                    <Link to="/notifications" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">
                        Notifications
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/connexion" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2 mb-2">
                        <LogIn className="w-4 h-4" />
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/inscription" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 mb-2">
                        <UserPlus className="w-4 h-4" />
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              <Link to="/moteur" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="lg" className="w-full mt-2 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Créer mon voyage
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
