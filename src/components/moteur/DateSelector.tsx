import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  arrivalDate: Date | undefined;
  onArrivalDateChange: (date: Date | undefined) => void;
  numberOfDays: number;
  onNumberOfDaysChange: (days: number) => void;
}

export default function DateSelector({
  arrivalDate,
  onArrivalDateChange,
  numberOfDays,
  onNumberOfDaysChange,
}: DateSelectorProps) {
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (arrivalDate) {
      setEndDate(addDays(arrivalDate, numberOfDays - 1));
    } else {
      setEndDate(null);
    }
  }, [arrivalDate, numberOfDays]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          Quand souhaitez-vous voyager ?
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez votre date d'arrivée et la durée de votre séjour
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Arrival Date */}
        <div className="bg-card p-6 rounded-2xl shadow-elegant">
          <label className="flex items-center gap-2 font-medium mb-4">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Date d'arrivée
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-14 justify-start text-left font-normal text-lg',
                  !arrivalDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {arrivalDate ? (
                  format(arrivalDate, 'EEEE d MMMM yyyy', { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={arrivalDate}
                onSelect={onArrivalDateChange}
                disabled={(date) => date < today}
                initialFocus
                className={cn('p-3 pointer-events-auto')}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Number of Days */}
        <div className="bg-card p-6 rounded-2xl shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 font-medium">
              <Clock className="w-5 h-5 text-primary" />
              Nombre de jours
            </label>
            <span className="text-2xl font-bold text-primary">
              {numberOfDays} jours
            </span>
          </div>

          <Slider
            value={[numberOfDays]}
            onValueChange={([value]) => onNumberOfDaysChange(value)}
            min={2}
            max={21}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>2 jours</span>
            <span>21 jours</span>
          </div>
        </div>
      </div>

      {/* Calculated End Date */}
      {arrivalDate && endDate && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-sm text-muted-foreground">Date de départ calculée</span>
              <div className="font-serif text-xl font-bold">
                {format(endDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{numberOfDays}</div>
                <div className="text-xs text-muted-foreground">jours</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-nature">{numberOfDays - 1}</div>
                <div className="text-xs text-muted-foreground">nuits</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
