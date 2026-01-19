import { motion } from 'framer-motion';
import { Wallet, Crown, Gem, Check } from 'lucide-react';

export interface BudgetTier {
  id: 'economique' | 'premium' | 'vip';
  label: string;
  description: string;
  priceRange: string;
  icon: typeof Wallet;
  features: string[];
  basePrice: number;
}

const budgetTiers: BudgetTier[] = [
  {
    id: 'economique',
    label: 'Économique',
    description: 'Découverte authentique',
    priceRange: '150,000 - 400,000 FCFA',
    icon: Wallet,
    features: [
      'Hébergement confortable',
      'Transport local',
      'Guides locaux',
      'Repas traditionnels',
    ],
    basePrice: 150000,
  },
  {
    id: 'premium',
    label: 'Premium',
    description: 'Confort et immersion',
    priceRange: '400,000 - 800,000 FCFA',
    icon: Crown,
    features: [
      'Hôtels 3-4 étoiles',
      'Transport privé climatisé',
      'Guides experts certifiés',
      'Expériences exclusives',
      'Restaurants recommandés',
    ],
    basePrice: 400000,
  },
  {
    id: 'vip',
    label: 'VIP',
    description: 'Luxe sur mesure',
    priceRange: '800,000+ FCFA',
    icon: Gem,
    features: [
      'Lodges & hôtels 5 étoiles',
      'Véhicule 4x4 privé + chauffeur',
      'Guide personnel dédié',
      'Accès privilégiés',
      'Gastronomie haut de gamme',
      'Concierge 24/7',
    ],
    basePrice: 800000,
  },
];

interface BudgetSelectorProps {
  selectedBudget: BudgetTier['id'] | null;
  onSelect: (budget: BudgetTier) => void;
}

export default function BudgetSelector({ selectedBudget, onSelect }: BudgetSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          Choisissez votre niveau de confort
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez le type d'expérience qui vous correspond
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {budgetTiers.map((tier, index) => {
          const Icon = tier.icon;
          const isSelected = selectedBudget === tier.id;

          return (
            <motion.button
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(tier)}
              className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-purple ring-2 ring-primary ring-offset-2'
                  : 'bg-card hover:bg-secondary/50 shadow-elegant'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              <div
                className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                  isSelected ? 'bg-white/20' : 'bg-primary/10'
                }`}
              >
                <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-primary'}`} />
              </div>

              <h3 className="font-serif text-xl font-bold mb-1">{tier.label}</h3>
              <p className={`text-sm mb-3 ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                {tier.description}
              </p>

              <div
                className={`text-lg font-bold mb-4 ${
                  isSelected ? 'text-accent' : 'text-primary'
                }`}
              >
                {tier.priceRange}
              </div>

              <ul className="space-y-2">
                {tier.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className={`flex items-start gap-2 text-sm ${
                      isSelected ? 'text-white/90' : 'text-muted-foreground'
                    }`}
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export { budgetTiers };
