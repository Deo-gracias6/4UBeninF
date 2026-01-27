import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/NotificationsContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface TripReminderBannerProps {
  tripId: string;
  tripTitle: string;
  isBooked: boolean;
}

export function TripReminderBanner({ tripId, tripTitle, isBooked }: TripReminderBannerProps) {
  const { 
    reminders, 
    preferences, 
    scheduleRemindersForTrip, 
    cancelRemindersForTrip 
  } = useNotifications();
  const [showBanner, setShowBanner] = useState(false);

  const tripReminders = reminders.filter(r => r.tripId === tripId);
  const hasReminders = tripReminders.length > 0;

  useEffect(() => {
    if (isBooked && !hasReminders && preferences.emailEnabled) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isBooked, hasReminders, preferences.emailEnabled]);

  const handleEnableReminders = () => {
    scheduleRemindersForTrip(tripId);
    setShowBanner(false);
    toast.success('Rappels activés !', {
      description: `Vous recevrez des rappels par email avant "${tripTitle}".`,
    });
  };

  const handleDisableReminders = () => {
    cancelRemindersForTrip(tripId);
    toast.info('Rappels désactivés', {
      description: 'Vous ne recevrez plus de rappels pour cette sortie.',
    });
  };

  if (!preferences.emailEnabled) return null;

  return (
    <AnimatePresence>
      {/* Reminder Setup Banner */}
      {showBanner && !hasReminders && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Activer les rappels ?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Recevez des rappels par email avant votre sortie pour ne rien oublier.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEnableReminders} className="gap-2">
                  <Mail className="w-4 h-4" />
                  Activer les rappels
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowBanner(false)}
                >
                  Plus tard
                </Button>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0"
              onClick={() => setShowBanner(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Reminders Active Status */}
      {hasReminders && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-nature/5 border border-nature/20 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-nature/10">
                <CheckCircle className="w-5 h-5 text-nature" />
              </div>
              <div>
                <h4 className="font-medium text-nature">Rappels activés</h4>
                <p className="text-sm text-muted-foreground">
                  {tripReminders.filter(r => !r.sent).length} rappel(s) programmé(s)
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDisableReminders}
              className="text-muted-foreground hover:text-destructive"
            >
              Désactiver
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
