import { motion } from 'framer-motion';
import { Bell, Calendar, Mail, CheckCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications, TripReminder } from '@/contexts/NotificationsContext';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const reminderTypeLabels = {
  week: 'Rappel 1 semaine',
  five_days: 'Rappel 5 jours',
  three_days: 'Rappel 3 jours',
  one_day: 'Rappel veille',
};

const reminderTypeColors = {
  week: 'bg-blue-500/10 text-blue-600',
  five_days: 'bg-purple-500/10 text-purple-600',
  three_days: 'bg-accent/10 text-accent-dark',
  one_day: 'bg-red-500/10 text-red-600',
};

function ReminderCard({ reminder }: { reminder: TripReminder }) {
  const { simulateSendEmail } = useNotifications();
  const [isSending, setIsSending] = useState(false);
  const today = new Date();
  const daysUntilReminder = differenceInDays(reminder.reminderDate, today);

  const handleSendNow = async () => {
    setIsSending(true);
    try {
      await simulateSendEmail(reminder);
      toast.success('Email de rappel envoyé !', {
        description: `Rappel pour "${reminder.tripTitle}" envoyé avec succès.`,
      });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border transition-all ${
        reminder.sent
          ? 'bg-nature/5 border-nature/20'
          : 'bg-card border-border/50 hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${reminderTypeColors[reminder.type]}`}>
          {reminder.sent ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Mail className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Link 
              to={`/sorties/${reminder.tripId}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {reminder.tripTitle}
            </Link>
            <Badge variant="secondary" className="text-xs">
              {reminderTypeLabels[reminder.type]}
            </Badge>
            {reminder.sent && (
              <Badge className="bg-nature/10 text-nature text-xs">
                Envoyé
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Sortie le {format(reminder.tripDate, 'd MMMM yyyy', { locale: fr })}
            </span>
          </div>

          {reminder.sent && reminder.emailSentAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Envoyé le {format(reminder.emailSentAt, 'd MMM à HH:mm', { locale: fr })}
            </p>
          )}

          {!reminder.sent && (
            <div className="flex items-center gap-2 mt-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {daysUntilReminder <= 0
                  ? 'À envoyer maintenant'
                  : `Prévu dans ${daysUntilReminder} jour(s)`}
              </span>
            </div>
          )}
        </div>

        {!reminder.sent && daysUntilReminder <= 0 && (
          <Button
            size="sm"
            onClick={handleSendNow}
            disabled={isSending}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSending ? 'Envoi...' : 'Envoyer'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function UpcomingReminders() {
  const { reminders } = useNotifications();

  const pendingReminders = reminders.filter(r => !r.sent);
  const sentReminders = reminders.filter(r => r.sent);

  if (reminders.length === 0) {
    return (
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="py-12 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-serif text-lg font-medium mb-2">
            Aucun rappel programmé
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Les rappels seront automatiquement créés lorsque vous réserverez une sortie organisée.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif">
          <Bell className="w-5 h-5 text-primary" />
          Rappels programmés
        </CardTitle>
        <CardDescription>
          {pendingReminders.length} rappel(s) en attente · {sentReminders.length} envoyé(s)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pending Reminders */}
        {pendingReminders.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              En attente
            </h4>
            {pendingReminders.map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        )}

        {/* Sent Reminders */}
        {sentReminders.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Historique des envois
            </h4>
            {sentReminders.slice(0, 5).map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
