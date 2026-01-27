import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogIn, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { UserMenu } from "./UserMenu";
import { GlobalSearch } from "@/components/search/GlobalSearch";

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
  const { itemCount, totalPrice } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  // Determine if this page has a dark hero (homepage only)
  const isHomePage = location.pathname === "/";
  const hasDarkHero = isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Determine text colors based on page and scroll state
  const shouldUseLightText = hasDarkHero && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border"
          : hasDarkHero
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105 gradient-hero`}>
              <span className="text-white font-bold text-lg">4U</span>
            </div>
            <span className={`font-serif text-xl font-semibold transition-colors ${
              shouldUseLightText ? "text-white" : "text-foreground"
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
                    ? shouldUseLightText
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary"
                    : shouldUseLightText
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search, Wishlist, Cart & Auth */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Global Search */}
            <GlobalSearch isLight={shouldUseLightText} />

            {/* Wishlist Icon */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className={`relative gap-2 ${
                  shouldUseLightText
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart Icon */}
            {itemCount > 0 && (
              <Link to="/panier">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative gap-2 ${
                    shouldUseLightText
                      ? "text-white hover:bg-white/10"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                </Button>
              </Link>
            )}

            <Link to="/moteur">
              <Button 
                variant={shouldUseLightText ? "gold" : "hero"} 
                size="default" 
                className="gap-1.5 text-sm px-4 py-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Créer mon voyage
              </Button>
            </Link>

            {isAuthenticated ? (
              <UserMenu isScrolled={!shouldUseLightText} />
            ) : (
              <Link to="/connexion">
                <Button 
                  variant={shouldUseLightText ? "outline" : "default"}
                  size="sm"
                  className={`gap-1.5 ${
                    shouldUseLightText && "border-white/50 text-white hover:bg-white/10"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className={`relative ${
                  shouldUseLightText ? "text-white" : "text-foreground"
                }`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {itemCount > 0 && (
              <Link to="/panier">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${
                    shouldUseLightText ? "text-white" : "text-foreground"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                </Button>
              </Link>
            )}
            <button
              className={`p-2 rounded-lg transition-colors ${
                shouldUseLightText ? "hover:bg-white/10" : "hover:bg-secondary"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${shouldUseLightText ? "text-white" : "text-foreground"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${shouldUseLightText ? "text-white" : "text-foreground"}`} />
              )}
            </button>
          </div>
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
              {/* Mobile Search */}
              <div className="mb-2">
                <GlobalSearch isMobile onClose={() => setIsOpen(false)} />
              </div>

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
                    <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2 gap-2">
                        <Heart className="w-4 h-4" />
                        Ma Wishlist ({wishlistCount})
                      </Button>
                    </Link>
                    <Link to="/notifications" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">
                        Notifications
                      </Button>
                    </Link>
                    {itemCount > 0 && (
                      <Link to="/panier" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start mb-2 gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Panier ({itemCount})
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2 gap-2">
                        <Heart className="w-4 h-4" />
                        Ma Wishlist ({wishlistCount})
                      </Button>
                    </Link>
                    <Link to="/connexion" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2 mb-2">
                        <LogIn className="w-4 h-4" />
                        Login
                      </Button>
                    </Link>
                    {itemCount > 0 && (
                      <Link to="/panier" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start mb-2 gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Panier ({itemCount})
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
              
              <Link to="/moteur" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="default" className="w-full mt-2 gap-1.5 text-sm">
                  <Sparkles className="w-3.5 h-3.5" />
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
