import { motion } from 'framer-motion';
import { Mail, Bell, Clock, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationsContext';

const reminderOptions = [
  { days: 7, label: '1 semaine avant' },
  { days: 5, label: '5 jours avant' },
  { days: 3, label: '3 jours avant' },
  { days: 1, label: '1 jour avant' },
];

export function NotificationSettings() {
  const { preferences, updatePreferences } = useNotifications();

  const toggleReminderDay = (days: number) => {
    const current = preferences.reminderDays;
    const updated = current.includes(days)
      ? current.filter(d => d !== days)
      : [...current, days].sort((a, b) => b - a);
    updatePreferences({ reminderDays: updated });
  };

  return (
    <Card className="border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif">
          <Bell className="w-5 h-5 text-primary" />
          Préférences de notification
        </CardTitle>
        <CardDescription>
          Configurez comment et quand recevoir vos rappels de sortie
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="email-notifications" className="font-medium">
                Notifications par email
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevez des rappels par email avant vos sorties
              </p>
            </div>
          </div>
          <Switch
            id="email-notifications"
            checked={preferences.emailEnabled}
            onCheckedChange={(checked) => updatePreferences({ emailEnabled: checked })}
          />
        </div>

        {/* SMS Toggle (Coming Soon) */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <Label className="font-medium text-muted-foreground">
                Notifications par SMS
                <Badge variant="secondary" className="ml-2 text-xs">
                  Bientôt
                </Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Recevez des rappels par SMS avant vos sorties
              </p>
            </div>
          </div>
          <Switch disabled checked={false} />
        </div>

        {/* Reminder Timing */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <Label className="font-medium">Quand recevoir les rappels</Label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {reminderOptions.map((option) => {
              const isSelected = preferences.reminderDays.includes(option.days);
              return (
                <motion.button
                  key={option.days}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleReminderDay(option.days)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 bg-card hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Sélectionnez les moments où vous souhaitez recevoir un rappel
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
