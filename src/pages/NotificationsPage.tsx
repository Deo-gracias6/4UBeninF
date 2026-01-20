import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  Clock,
  Check,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserAuth, Notification } from '@/contexts/UserAuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const notificationIcons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  reminder: Clock,
};

const notificationColors = {
  success: 'text-nature bg-nature/10',
  info: 'text-primary bg-primary/10',
  warning: 'text-accent-dark bg-accent/10',
  reminder: 'text-blue-600 bg-blue-500/10',
};

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  const Icon = notificationIcons[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border transition-all ${
        notification.read
          ? 'bg-card border-border'
          : 'bg-primary/5 border-primary/20 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${notificationColors[notification.type]}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{notification.title}</h3>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: fr })}
          </p>
        </div>

        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="shrink-0"
          >
            <Check className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default function NotificationsPage() {
  const {
    isAuthenticated,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    isLoading,
  } = useUserAuth();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: '/notifications' }} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="absolute inset-0 gradient-hero opacity-5 pointer-events-none" />
        <div className="absolute inset-0 pattern-african opacity-5 pointer-events-none" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                  Notifications
                </h1>
                <p className="text-muted-foreground">
                  {unreadNotificationsCount > 0
                    ? `${unreadNotificationsCount} notification${unreadNotificationsCount > 1 ? 's' : ''} non lue${unreadNotificationsCount > 1 ? 's' : ''}`
                    : 'Toutes vos notifications sont lues'}
                </p>
              </div>

              {unreadNotificationsCount > 0 && (
                <Button
                  variant="outline"
                  onClick={markAllNotificationsAsRead}
                  className="gap-2"
                >
                  <Check className="w-4 h-4" />
                  Tout marquer comme lu
                </Button>
              )}
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markNotificationAsRead}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl shadow-elegant">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Aucune notification
                </h3>
                <p className="text-muted-foreground">
                  Vous n'avez pas encore de notifications.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
