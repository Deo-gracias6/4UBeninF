import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BudgetSelector, { BudgetTier, budgetTiers } from '@/components/moteur/BudgetSelector';
import DateSelector from '@/components/moteur/DateSelector';
import InterestsSelector from '@/components/moteur/InterestsSelector';
import AuthPrompt from '@/components/moteur/AuthPrompt';
import ItineraryResult, { ItineraryDay } from '@/components/moteur/ItineraryResult';
import { useUserAuth } from '@/contexts/UserAuthContext';
import cotonouCity from '@/assets/cotonou-city.jpg';
import ganvieVillage from '@/assets/ganvie-village.jpg';
import pendjariPark from '@/assets/pendjari-park.jpg';
import ouidahDoor from '@/assets/ouidah-door.jpg';

// Mock itinerary data with times
const generateMockItinerary = (days: number, budget: BudgetTier['id']): ItineraryDay[] => {
  const baseItinerary: ItineraryDay[] = [
    {
      day: 1,
      city: 'Cotonou',
      image: cotonouCity,
      activities: [
        { time: '14:00', description: 'Arrivée à l\'aéroport de Cotonou' },
        { time: '16:00', description: budget === 'vip' ? 'Installation au Sofitel Marina 5*' : budget === 'premium' ? 'Installation à l\'hôtel Azalaï 4*' : 'Installation à l\'hôtel du Port' },
        { time: '18:00', description: 'Visite du Marché Dantokpa' },
        { time: '20:00', description: 'Dîner de bienvenue' },
      ],
    },
    {
      day: 2,
      city: 'Ganvié',
      image: ganvieVillage,
      activities: [
        { time: '08:00', description: 'Petit-déjeuner à l\'hôtel' },
        { time: '09:30', description: 'Excursion en pirogue à Ganvié' },
        { time: '12:00', description: 'Déjeuner chez l\'habitant' },
        { time: '15:00', description: 'Découverte du village lacustre' },
        { time: '18:00', description: 'Retour et temps libre' },
      ],
    },
    {
      day: 3,
      city: 'Ouidah',
      image: ouidahDoor,
      activities: [
        { time: '08:00', description: 'Route vers Ouidah (1h)' },
        { time: '09:30', description: 'Temple des Pythons' },
        { time: '11:00', description: 'Route des Esclaves' },
        { time: '13:00', description: 'Déjeuner local' },
        { time: '15:00', description: 'Porte du Non-Retour' },
        { time: '17:00', description: budget === 'vip' ? 'Cérémonie vodoun privée' : 'Visite du musée historique' },
      ],
    },
    {
      day: 4,
      city: 'Grand-Popo',
      image: ganvieVillage,
      activities: [
        { time: '09:00', description: 'Route vers Grand-Popo' },
        { time: '11:00', description: 'Détente sur les plages' },
        { time: '13:00', description: 'Déjeuner de fruits de mer' },
        { time: '15:00', description: 'Excursion à la Bouche du Roy' },
        { time: '18:00', description: 'Cours de cuisine locale' },
      ],
    },
    {
      day: 5,
      city: 'Abomey',
      image: ouidahDoor,
      activities: [
        { time: '08:00', description: 'Route vers Abomey (2h)' },
        { time: '10:30', description: 'Visite des Palais Royaux (UNESCO)' },
        { time: '13:00', description: 'Déjeuner au restaurant du palais' },
        { time: '15:00', description: 'Atelier bronze traditionnel' },
        { time: '17:00', description: 'Musée Historique d\'Abomey' },
      ],
    },
    {
      day: 6,
      city: 'Natitingou',
      image: pendjariPark,
      activities: [
        { time: '07:00', description: budget === 'vip' ? 'Vol intérieur vers le Nord' : 'Route vers le Nord (départ tôt)' },
        { time: '12:00', description: 'Arrivée et installation' },
        { time: '14:00', description: 'Visite des Tata Somba' },
        { time: '17:00', description: 'Coucher de soleil sur les collines' },
      ],
    },
    {
      day: 7,
      city: 'Pendjari',
      image: pendjariPark,
      activities: [
        { time: '05:30', description: 'Safari au lever du soleil' },
        { time: '08:00', description: 'Observation de la faune' },
        { time: '12:00', description: 'Déjeuner au lodge' },
        { time: '15:00', description: 'Safari après-midi' },
        { time: '19:00', description: 'Dîner sous les étoiles' },
      ],
    },
    {
      day: 8,
      city: 'Pendjari',
      image: pendjariPark,
      activities: [
        { time: '06:00', description: 'Safari matinal' },
        { time: '10:00', description: 'Cascades de Tanougou' },
        { time: '13:00', description: 'Pique-nique en brousse' },
        { time: '16:00', description: 'Retour au lodge' },
      ],
    },
    {
      day: 9,
      city: 'Parakou',
      image: cotonouCity,
      activities: [
        { time: '08:00', description: 'Route vers Parakou' },
        { time: '12:00', description: 'Découverte de la ville' },
        { time: '14:00', description: 'Marché central' },
        { time: '17:00', description: 'Temps libre' },
      ],
    },
    {
      day: 10,
      city: 'Cotonou',
      image: cotonouCity,
      activities: [
        { time: '09:00', description: budget === 'vip' ? 'Vol retour vers Cotonou' : 'Route retour vers Cotonou' },
        { time: '14:00', description: 'Shopping artisanat' },
        { time: '16:00', description: 'Plage de Fidjrossè' },
        { time: '20:00', description: 'Dîner d\'adieu' },
      ],
    },
  ];

  return baseItinerary.slice(0, days);
};

type Step = 'budget' | 'dates' | 'interests' | 'auth' | 'generating' | 'result';

const stepLabels: Record<Step, string> = {
  budget: 'Budget',
  dates: 'Dates',
  interests: 'Préférences',
  auth: 'Connexion',
  generating: 'Génération',
  result: 'Itinéraire',
};

export default function MoteurPage() {
  const { isAuthenticated, user: authUser, addTrip } = useUserAuth();
  
  // Dynamic step order based on authentication status
  const stepOrder: Step[] = isAuthenticated 
    ? ['budget', 'dates', 'interests', 'generating', 'result']
    : ['budget', 'dates', 'interests', 'auth', 'generating', 'result'];
  
  const [currentStep, setCurrentStep] = useState<Step>('budget');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['culture', 'nature']);
  const [travelType, setTravelType] = useState('couple');
  const [travelers, setTravelers] = useState(2);
  const [localUser, setLocalUser] = useState<{ name: string; email: string } | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  const currentStepIndex = stepOrder.indexOf(currentStep);

  // Get the effective user (either from auth context or local state for visitors)
  const effectiveUser = authUser ? { name: authUser.name, email: authUser.email } : localUser;

  const canProceed = () => {
    switch (currentStep) {
      case 'budget':
        return selectedBudget !== null;
      case 'dates':
        return arrivalDate !== undefined && numberOfDays >= 2;
      case 'interests':
        return selectedInterests.length > 0;
      default:
        return true;
    }
  };

  const startGeneration = () => {
    setCurrentStep('generating');
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedItinerary = generateMockItinerary(numberOfDays, selectedBudget!.id);
      setItinerary(generatedItinerary);
      
      // If user is authenticated, save the trip
      if (isAuthenticated && arrivalDate) {
        const endDate = new Date(arrivalDate);
        endDate.setDate(endDate.getDate() + numberOfDays);
        
        addTrip({
          title: `Voyage au Bénin - ${numberOfDays} jours`,
          startDate: arrivalDate,
          endDate,
          budget: selectedBudget!.id as 'economique' | 'premium' | 'vip',
          destinations: generatedItinerary.map(day => day.city).filter((city, index, arr) => arr.indexOf(city) === index),
          status: 'upcoming',
        });
      }
      
      setCurrentStep('result');
    }, 3000);
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      const nextStep = stepOrder[nextIndex];
      
      // If authenticated and next step would be 'generating', start generation directly
      if (nextStep === 'generating') {
        startGeneration();
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const handleAuthenticated = (authenticatedUser: { name: string; email: string }) => {
    setLocalUser(authenticatedUser);
    startGeneration();
  };

  const handleRestart = () => {
    setCurrentStep('budget');
    setSelectedBudget(null);
    setArrivalDate(undefined);
    setNumberOfDays(7);
    setSelectedInterests(['culture', 'nature']);
    setTravelType('couple');
    setTravelers(2);
    setLocalUser(null);
    setItinerary(null);
  };
  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0 pattern-african opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-hero mb-4 shadow-purple"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3">
              Moteur <span className="text-gradient">Intelligent</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Créez votre itinéraire personnalisé en quelques étapes simples
            </p>
          </motion.div>

          {/* Progress Steps */}
          {currentStep !== 'result' && (
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-between">
                {stepOrder.slice(0, 5).map((step, idx) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                          currentStepIndex >= idx
                            ? 'gradient-hero text-white shadow-purple'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStepIndex > idx ? <Check className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground hidden md:block">
                        {stepLabels[step]}
                      </span>
                    </div>
                    {idx < 4 && (
                      <div
                        className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all ${
                          currentStepIndex > idx ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Budget Selection */}
              {currentStep === 'budget' && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <BudgetSelector
                    selectedBudget={selectedBudget?.id || null}
                    onSelect={(tier) => setSelectedBudget(tier)}
                  />
                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={goToNextStep}
                      variant="hero"
                      size="xl"
                      className="gap-2"
                      disabled={!canProceed()}
                    >
                      Continuer
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date Selection */}
              {currentStep === 'dates' && (
                <motion.div
                  key="dates"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <DateSelector
                    arrivalDate={arrivalDate}
                    onArrivalDateChange={setArrivalDate}
                    numberOfDays={numberOfDays}
                    onNumberOfDaysChange={setNumberOfDays}
                  />
                  <div className="mt-10 flex justify-between">
                    <Button onClick={goToPrevStep} variant="ghost" size="lg" className="gap-2">
                      <ChevronLeft className="w-5 h-5" />
                      Retour
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      variant="hero"
                      size="xl"
                      className="gap-2"
                      disabled={!canProceed()}
                    >
                      Continuer
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Interests Selection */}
              {currentStep === 'interests' && (
                <motion.div
                  key="interests"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <InterestsSelector
                    selectedInterests={selectedInterests}
                    onInterestsChange={setSelectedInterests}
                    selectedTravelType={travelType}
                    onTravelTypeChange={setTravelType}
                    travelers={travelers}
                    onTravelersChange={setTravelers}
                  />
                  <div className="mt-10 flex justify-between">
                    <Button onClick={goToPrevStep} variant="ghost" size="lg" className="gap-2">
                      <ChevronLeft className="w-5 h-5" />
                      Retour
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      variant="hero"
                      size="xl"
                      className="gap-2"
                      disabled={!canProceed()}
                    >
                      Continuer
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Authentication */}
              {currentStep === 'auth' && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <AuthPrompt onAuthenticated={handleAuthenticated} />
                  <div className="mt-8 flex justify-center">
                    <Button onClick={goToPrevStep} variant="ghost" size="lg" className="gap-2">
                      <ChevronLeft className="w-5 h-5" />
                      Modifier mes préférences
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Generating */}
              {currentStep === 'generating' && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-3xl p-12 md:p-16 shadow-elegant text-center max-w-2xl mx-auto"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-hero mb-8 shadow-purple"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Génération en cours...
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Notre IA crée votre itinéraire parfait
                  </p>

                  <div className="max-w-md mx-auto space-y-3">
                    {[
                      'Analyse de vos préférences',
                      'Sélection des destinations',
                      'Optimisation du parcours',
                      'Calcul du budget détaillé',
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.6 }}
                        className="flex items-center gap-3 text-left"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.6 + 0.4 }}
                          className="w-6 h-6 rounded-full bg-nature/20 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-nature" />
                        </motion.div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 6: Result */}
              {currentStep === 'result' && itinerary && selectedBudget && arrivalDate && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ItineraryResult
                    itinerary={itinerary}
                    budget={selectedBudget}
                    arrivalDate={arrivalDate}
                    numberOfDays={numberOfDays}
                    travelers={travelers}
                    userName={effectiveUser?.name || 'Voyageur'}
                    onRestart={handleRestart}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
