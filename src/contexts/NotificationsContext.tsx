import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserAuth } from './UserAuthContext';
import { organizedTrips, OrganizedTrip } from '@/data/organizedTripsData';
import { differenceInDays, format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface TripReminder {
  id: string;
  tripId: string;
  tripTitle: string;
  tripDate: Date;
  reminderDate: Date;
  daysUntilTrip: number;
  type: 'week' | 'five_days' | 'three_days' | 'one_day';
  sent: boolean;
  emailSentAt?: Date;
}

export interface NotificationPreferences {
  emailEnabled: boolean;
  smsEnabled: boolean;
  reminderDays: number[]; // Days before trip to send reminders
}

interface NotificationsContextType {
  reminders: TripReminder[];
  preferences: NotificationPreferences;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
  getUpcomingReminders: () => TripReminder[];
  markReminderAsSent: (reminderId: string) => void;
  scheduleRemindersForTrip: (tripId: string) => void;
  cancelRemindersForTrip: (tripId: string) => void;
  simulateSendEmail: (reminder: TripReminder) => Promise<boolean>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const DEFAULT_REMINDER_DAYS = [7, 5, 3, 1]; // 7 days, 5 days, 3 days, 1 day before

const getReminderType = (daysUntil: number): TripReminder['type'] => {
  if (daysUntil >= 7) return 'week';
  if (daysUntil >= 5) return 'five_days';
  if (daysUntil >= 3) return 'three_days';
  return 'one_day';
};

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useUserAuth();
  const [reminders, setReminders] = useState<TripReminder[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailEnabled: true,
    smsEnabled: false,
    reminderDays: DEFAULT_REMINDER_DAYS,
  });

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('4ubenin_notification_prefs');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse notification preferences');
      }
    }
  }, []);

  // Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('4ubenin_reminders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReminders(parsed.map((r: any) => ({
          ...r,
          tripDate: new Date(r.tripDate),
          reminderDate: new Date(r.reminderDate),
          emailSentAt: r.emailSentAt ? new Date(r.emailSentAt) : undefined,
        })));
      } catch (e) {
        console.error('Failed to parse reminders');
      }
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('4ubenin_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('4ubenin_notification_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (prefs: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const scheduleRemindersForTrip = (tripId: string) => {
    const trip = organizedTrips.find(t => t.id === tripId);
    if (!trip || !user) return;

    const tripDate = new Date(trip.date);
    const today = new Date();
    
    // Create reminders for each configured day
    const newReminders: TripReminder[] = preferences.reminderDays
      .filter(days => {
        const reminderDate = addDays(tripDate, -days);
        return differenceInDays(reminderDate, today) >= 0;
      })
      .map(days => {
        const reminderDate = addDays(tripDate, -days);
        return {
          id: `${tripId}-${days}`,
          tripId,
          tripTitle: trip.title,
          tripDate,
          reminderDate,
          daysUntilTrip: days,
          type: getReminderType(days),
          sent: false,
        };
      });

    // Remove existing reminders for this trip and add new ones
    setReminders(prev => [
      ...prev.filter(r => r.tripId !== tripId),
      ...newReminders,
    ]);
  };

  const cancelRemindersForTrip = (tripId: string) => {
    setReminders(prev => prev.filter(r => r.tripId !== tripId));
  };

  const getUpcomingReminders = () => {
    const today = new Date();
    return reminders
      .filter(r => !r.sent && differenceInDays(r.reminderDate, today) <= 0)
      .sort((a, b) => a.reminderDate.getTime() - b.reminderDate.getTime());
  };

  const markReminderAsSent = (reminderId: string) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === reminderId
          ? { ...r, sent: true, emailSentAt: new Date() }
          : r
      )
    );
  };

  const simulateSendEmail = async (reminder: TripReminder): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`📧 [MOCK EMAIL] Sending reminder to ${user?.email}`);
    console.log(`   Subject: Rappel - ${reminder.tripTitle}`);
    console.log(`   Message: Votre sortie "${reminder.tripTitle}" a lieu dans ${reminder.daysUntilTrip} jour(s) !`);
    
    markReminderAsSent(reminder.id);
    return true;
  };

  return (
    <NotificationsContext.Provider
      value={{
        reminders,
        preferences,
        updatePreferences,
        getUpcomingReminders,
        markReminderAsSent,
        scheduleRemindersForTrip,
        cancelRemindersForTrip,
        simulateSendEmail,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
