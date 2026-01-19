import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">4U</span>
              </div>
              <span className="font-serif text-xl font-semibold">4UBENIN</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Découvrez le Bénin autrement. Voyages personnalisés, expériences authentiques.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explorer</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Destinations", path: "/destinations" },
                { label: "Expériences", path: "/experiences" },
                { label: "Festivals", path: "/festivals" },
                { label: "Découvrir le Bénin", path: "/decouvrir" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white/60 hover:text-accent transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Infos</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "À propos", path: "/a-propos" },
                { label: "Centre d'aide", path: "/" },
                { label: "Conditions générales", path: "/" },
                { label: "FAQ", path: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-white/60 hover:text-accent transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@4ubenin.com" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors text-sm">
                <Mail className="w-5 h-5" />
                contact@4ubenin.com
              </a>
              <a href="tel:+22901234567" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors text-sm">
                <Phone className="w-5 h-5" />
                +229 01 234 567
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 shrink-0" />
                Cotonou, Bénin
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 4UBENIN. Tous droits réservés.
          </p>
          <p className="text-white/40 text-sm">
            Créé avec ❤️ pour le tourisme béninois
          </p>
        </div>
      </div>
    </footer>
  );
}
