import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface FilterState {
  budgets: string[];
  durations: string[];
  types: string[];
  priceRange: [number, number];
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice?: number;
  showTypes?: boolean;
  showDurations?: boolean;
}

const budgetOptions = [
  { id: "economique", label: "Économique", description: "< 50 000 FCFA" },
  { id: "premium", label: "Premium", description: "50 000 - 150 000 FCFA" },
  { id: "vip", label: "VIP", description: "> 150 000 FCFA" },
];

const durationOptions = [
  { id: "1-day", label: "1 jour" },
  { id: "2-3-days", label: "2-3 jours" },
  { id: "1-week", label: "1 semaine +" },
];

const typeOptions = [
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Nature" },
  { id: "aventure", label: "Aventure" },
  { id: "detente", label: "Détente" },
  { id: "gastro", label: "Gastronomie" },
];

export function AdvancedFilters({
  filters,
  onFiltersChange,
  maxPrice = 200000,
  showTypes = true,
  showDurations = true,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["budget", "type"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const toggleBudget = (budgetId: string) => {
    const newBudgets = filters.budgets.includes(budgetId)
      ? filters.budgets.filter((b) => b !== budgetId)
      : [...filters.budgets, budgetId];
    onFiltersChange({ ...filters, budgets: newBudgets });
  };

  const toggleDuration = (durationId: string) => {
    const newDurations = filters.durations.includes(durationId)
      ? filters.durations.filter((d) => d !== durationId)
      : [...filters.durations, durationId];
    onFiltersChange({ ...filters, durations: newDurations });
  };

  const toggleType = (typeId: string) => {
    const newTypes = filters.types.includes(typeId)
      ? filters.types.filter((t) => t !== typeId)
      : [...filters.types, typeId];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearFilters = () => {
    onFiltersChange({
      budgets: [],
      durations: [],
      types: [],
      priceRange: [0, maxPrice],
    });
  };

  const activeFiltersCount =
    filters.budgets.length +
    filters.durations.length +
    filters.types.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        Filtres
        {activeFiltersCount > 0 && (
          <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-card shadow-xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold">Filtres</h3>
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Réinitialiser
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Budget Section */}
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("budget")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Budget</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedSections.includes("budget") ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections.includes("budget") && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-3">
                          {budgetOptions.map((option) => (
                            <label
                              key={option.id}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <Checkbox
                                checked={filters.budgets.includes(option.id)}
                                onCheckedChange={() => toggleBudget(option.id)}
                              />
                              <div>
                                <span className="font-medium text-sm">{option.label}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  {option.description}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price Range Section */}
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("price")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Prix</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedSections.includes("price") ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections.includes("price") && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-4">
                          <Slider
                            value={[filters.priceRange[0], filters.priceRange[1]]}
                            onValueChange={handlePriceChange}
                            max={maxPrice}
                            step={5000}
                            className="mt-2"
                          />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {filters.priceRange[0].toLocaleString()} FCFA
                            </span>
                            <span className="text-muted-foreground">
                              {filters.priceRange[1].toLocaleString()} FCFA
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Duration Section */}
                {showDurations && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("duration")}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                    >
                      <span className="font-medium">Durée</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedSections.includes("duration") ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.includes("duration") && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-3">
                            {durationOptions.map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <Checkbox
                                  checked={filters.durations.includes(option.id)}
                                  onCheckedChange={() => toggleDuration(option.id)}
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Type Section */}
                {showTypes && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("type")}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                    >
                      <span className="font-medium">Type</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedSections.includes("type") ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.includes("type") && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-3">
                            {typeOptions.map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <Checkbox
                                  checked={filters.types.includes(option.id)}
                                  onCheckedChange={() => toggleType(option.id)}
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4">
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Appliquer les filtres
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
