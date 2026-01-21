import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Ticket, 
  Compass,
  Route,
  TrendingUp,
  Heart,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Crown,
  Star,
  Zap
} from 'lucide-react';
import { MockUser, UserReservation } from '@/data/mockUsersData';

interface UserDetailModalProps {
  user: MockUser | null;
  open: boolean;
  onClose: () => void;
}

const typeConfig = {
  'experience': { label: 'Expérience', icon: Sparkles, color: 'bg-primary/10 text-primary' },
  'festival': { label: 'Festival', icon: Ticket, color: 'bg-accent/10 text-accent-dark' },
  'discovery': { label: 'Découverte', icon: Compass, color: 'bg-nature/10 text-nature' },
  'smart-trip': { label: 'Voyage intelligent', icon: Route, color: 'bg-primary-dark/10 text-primary-dark' },
};

const statusConfig = {
  'confirmed': { label: 'Confirmé', icon: CheckCircle, color: 'bg-nature/20 text-nature' },
  'pending': { label: 'En attente', icon: AlertCircle, color: 'bg-accent/20 text-accent-dark' },
  'cancelled': { label: 'Annulé', icon: XCircle, color: 'bg-destructive/20 text-destructive' },
};

const packConfig = {
  'standard': { label: 'Standard', icon: Zap, color: 'bg-muted text-muted-foreground' },
  'premium': { label: 'Premium', icon: Star, color: 'bg-accent/20 text-accent-dark' },
  'vip': { label: 'VIP', icon: Crown, color: 'bg-primary/20 text-primary' },
};

function ReservationCard({ reservation }: { reservation: UserReservation }) {
  const typeInfo = typeConfig[reservation.type];
  const statusInfo = statusConfig[reservation.status];
  const TypeIcon = typeInfo.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="border border-border rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${typeInfo.color}`}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-sm">{reservation.name}</h4>
            <p className="text-xs text-muted-foreground">{typeInfo.label}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
          <StatusIcon className="w-3 h-3" />
          {statusInfo.label}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <DollarSign className="w-4 h-4 text-primary" />
          <span>{reservation.amount.toLocaleString()} FCFA</span>
        </div>
      </div>

      {/* Purchase Path */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {reservation.purchasePath === 'smart-engine' ? '🧠 Moteur intelligent' : '🛒 Achat direct'}
        </Badge>
        {reservation.packType && (
          <Badge className={`text-xs ${packConfig[reservation.packType].color}`}>
            {packConfig[reservation.packType].label}
          </Badge>
        )}
      </div>

      {/* Cities */}
      {reservation.cities.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Villes
          </p>
          <div className="flex flex-wrap gap-1">
            {reservation.cities.map((city, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {city}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {reservation.activities.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Compass className="w-3 h-3" /> Activités
          </p>
          <div className="flex flex-wrap gap-1">
            {reservation.activities.map((activity, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {activity}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experiences */}
      {reservation.experiences.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Expériences
          </p>
          <div className="flex flex-wrap gap-1">
            {reservation.experiences.map((exp, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-primary/5">
                {exp}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function UserDetailModal({ user, open, onClose }: UserDetailModalProps) {
  if (!user) return null;

  const confirmedReservations = user.reservations.filter(r => r.status === 'confirmed');
  const pendingReservations = user.reservations.filter(r => r.status === 'pending');
  const cancelledReservations = user.reservations.filter(r => r.status === 'cancelled');
  
  const smartTripCount = user.reservations.filter(r => r.purchasePath === 'smart-engine').length;
  const directPurchaseCount = user.reservations.filter(r => r.purchasePath === 'direct').length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Détails utilisateur</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info Header */}
          <div className="flex items-start gap-6 p-6 bg-secondary/30 rounded-xl">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-2xl">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-muted-foreground">ID: {user.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Inscrit le {new Date(user.registrationDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Dernière activité: {new Date(user.lastActivity).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={user.status === 'active' ? 'bg-nature/20 text-nature' : 'bg-muted text-muted-foreground'}>
                  {user.status === 'active' ? 'Compte actif' : 'Compte désactivé'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-xl border border-border text-center">
              <p className="text-2xl font-bold text-primary">{user.reservationsCount}</p>
              <p className="text-xs text-muted-foreground">Réservations</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border text-center">
              <p className="text-2xl font-bold text-accent-dark">{user.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">FCFA dépensés</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border text-center">
              <p className="text-2xl font-bold text-nature">{smartTripCount}</p>
              <p className="text-xs text-muted-foreground">Via moteur IA</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border text-center">
              <p className="text-2xl font-bold">{directPurchaseCount}</p>
              <p className="text-xs text-muted-foreground">Achats directs</p>
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Vision comportementale
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Catégories préférées
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.preferredCategories.length > 0 ? (
                    user.preferredCategories.map((cat, idx) => (
                      <Badge key={idx} variant="secondary" className="capitalize">
                        {cat}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Aucune donnée</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Mode d'achat préféré</p>
                <p className="text-sm">
                  {smartTripCount > directPurchaseCount 
                    ? '🧠 Préfère le moteur intelligent' 
                    : smartTripCount === directPurchaseCount && smartTripCount > 0
                    ? '⚖️ Utilise les deux modes'
                    : '🛒 Préfère l\'achat direct'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Panier moyen</p>
                <p className="text-lg font-semibold">
                  {user.reservationsCount > 0 
                    ? `${Math.round(user.totalSpent / user.reservationsCount).toLocaleString()} FCFA`
                    : '—'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Taux de confirmation</p>
                <p className="text-lg font-semibold text-nature">
                  {user.reservationsCount > 0 
                    ? `${Math.round((confirmedReservations.length / user.reservationsCount) * 100)}%`
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Reservations */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                Toutes ({user.reservations.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmées ({confirmedReservations.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                En attente ({pendingReservations.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Annulées ({cancelledReservations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-3">
              {user.reservations.length > 0 ? (
                user.reservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune réservation
                </p>
              )}
            </TabsContent>

            <TabsContent value="confirmed" className="mt-4 space-y-3">
              {confirmedReservations.length > 0 ? (
                confirmedReservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune réservation confirmée
                </p>
              )}
            </TabsContent>

            <TabsContent value="pending" className="mt-4 space-y-3">
              {pendingReservations.length > 0 ? (
                pendingReservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune réservation en attente
                </p>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-4 space-y-3">
              {cancelledReservations.length > 0 ? (
                cancelledReservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune réservation annulée
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
