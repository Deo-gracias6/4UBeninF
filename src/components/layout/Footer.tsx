import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg">4U</span>
              </div>
              <span className="font-serif text-xl font-semibold">4UBENIN</span>
            </div>
            <p className="text-background/70 text-sm mb-6">
              Le moteur intelligent de personnalisation touristique du Bénin. Découvrez l'Afrique autrement.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explorer</h4>
            <div className="flex flex-col gap-3">
              {["Destinations", "Expériences", "Festivals", "Découvrir le Bénin"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-background/70 hover:text-accent transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-3">
              {["Centre d'aide", "Conditions générales", "Politique de confidentialité", "FAQ"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-background/70 hover:text-accent transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@4ubenin.com" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm">
                <Mail className="w-5 h-5" />
                contact@4ubenin.com
              </a>
              <a href="tel:+22901234567" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm">
                <Phone className="w-5 h-5" />
                +229 01 234 567
              </a>
              <div className="flex items-start gap-3 text-background/70 text-sm">
                <MapPin className="w-5 h-5 shrink-0" />
                Cotonou, Bénin
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2025 4UBENIN. Tous droits réservés.
          </p>
          <p className="text-background/50 text-sm">
            Propulsé par l'intelligence artificielle 🤖
          </p>
        </div>
      </div>
    </footer>
  );
}
