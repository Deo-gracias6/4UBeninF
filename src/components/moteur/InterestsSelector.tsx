import { motion } from 'framer-motion';
import { Check, Landmark, TreePine, Sun, Mountain, Utensils, Palette, Camera, Music, Users } from 'lucide-react';

export interface Interest {
  id: string;
  label: string;
  icon: typeof Landmark;
}

export interface TravelType {
  id: string;
  label: string;
  emoji: string;
}

const interests: Interest[] = [
  { id: 'culture', label: 'Culture & Histoire', icon: Landmark },
  { id: 'nature', label: 'Nature & Safari', icon: TreePine },
  { id: 'beach', label: 'Plages & Détente', icon: Sun },
  { id: 'adventure', label: 'Aventure', icon: Mountain },
  { id: 'gastro', label: 'Gastronomie', icon: Utensils },
  { id: 'art', label: 'Art & Artisanat', icon: Palette },
  { id: 'photo', label: 'Photographie', icon: Camera },
  { id: 'music', label: 'Musique & Danse', icon: Music },
];

const travelTypes: TravelType[] = [
  { id: 'solo', label: 'Solo', emoji: '🧑' },
  { id: 'couple', label: 'Couple', emoji: '💑' },
  { id: 'family', label: 'Famille', emoji: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Entre amis', emoji: '👥' },
  { id: 'business', label: 'Affaires', emoji: '💼' },
];

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  selectedTravelType: string;
  onTravelTypeChange: (type: string) => void;
  travelers: number;
  onTravelersChange: (count: number) => void;
}

export default function InterestsSelector({
  selectedInterests,
  onInterestsChange,
  selectedTravelType,
  onTravelTypeChange,
  travelers,
  onTravelersChange,
}: InterestsSelectorProps) {
  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      onInterestsChange(selectedInterests.filter((i) => i !== id));
    } else {
      onInterestsChange([...selectedInterests, id]);
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          Personnalisez votre voyage
        </h2>
        <p className="text-muted-foreground">
          Dites-nous en plus sur vos préférences
        </p>
      </div>

      {/* Travel Type */}
      <div className="bg-card p-6 rounded-2xl shadow-elegant">
        <label className="flex items-center gap-2 font-medium mb-4">
          <Users className="w-5 h-5 text-primary" />
          Type de voyage
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {travelTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTravelTypeChange(type.id)}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedTravelType === type.id
                  ? 'bg-primary text-primary-foreground shadow-purple'
                  : 'bg-secondary hover:bg-muted'
              }`}
            >
              <span className="text-2xl block mb-1">{type.emoji}</span>
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Number of travelers */}
        <div className="mt-6 pt-6 border-t border-border">
          <label className="text-sm font-medium mb-3 block">
            Nombre de voyageurs
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onTravelersChange(Math.max(1, travelers - 1))}
              className="w-12 h-12 rounded-xl bg-secondary hover:bg-muted font-bold text-lg transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold w-16 text-center">{travelers}</span>
            <button
              onClick={() => onTravelersChange(Math.min(20, travelers + 1))}
              className="w-12 h-12 rounded-xl bg-secondary hover:bg-muted font-bold text-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-card p-6 rounded-2xl shadow-elegant">
        <label className="flex items-center gap-2 font-medium mb-4">
          <Palette className="w-5 h-5 text-primary" />
          Centres d'intérêt
          <span className="text-sm text-muted-foreground ml-2">
            (sélectionnez plusieurs)
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            const isSelected = selectedInterests.includes(interest.id);

            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-purple'
                    : 'bg-secondary hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{interest.label}</span>
                {isSelected && <Check className="w-4 h-4 ml-auto" />}
              </motion.button>
            );
          })}
        </div>

        {selectedInterests.length === 0 && (
          <p className="text-sm text-amber-600 mt-4">
            Veuillez sélectionner au moins un centre d'intérêt
          </p>
        )}
      </div>
    </div>
  );
}
