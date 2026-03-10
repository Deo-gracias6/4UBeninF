import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  XCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Eye,
  Ban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Booking {
  id: string;
  booking_type: string;
  item_id: string;
  item?: {
    id: string;
    name: string;
    type: string;
  };
  start_date: string;
  end_date?: string;
  participants: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'expired';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  expires_at?: string;
  created_at: string;
}

export default function MyBookingsPage() {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      navigate('/connexion');
      return;
    }

    loadBookings();
  }, [user, navigate, statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await api.get('/bookings', { params });
      const data = response.data.data || response.data;
      setBookings(data.bookings || []);
    } catch (error: any) {
      console.error('Erreur chargement réservations:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos réservations.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      return;
    }

    try {
      await api.post(`/bookings/${bookingId}/cancel`, {
        reason: 'Annulation par l\'utilisateur'
      });

      toast({
        title: 'Réservation annulée',
        description: 'Votre réservation a été annulée avec succès.',
      });

      loadBookings();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Impossible d\'annuler la réservation.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><AlertCircle className="w-3 h-3" /> En attente</Badge>;
      case 'confirmed':
        return <Badge className="gap-1 bg-nature text-white"><CheckCircle className="w-3 h-3" /> Confirmé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> Annulé</Badge>;
      case 'completed':
        return <Badge className="gap-1 bg-primary"><CheckCircle className="w-3 h-3" /> Terminé</Badge>;
      case 'expired':
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> Expiré</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return <Badge className="gap-1 bg-nature text-white"><CreditCard className="w-3 h-3" /> Payé</Badge>;
      case 'unpaid':
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="w-3 h-3" /> Non payé</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="gap-1"><CreditCard className="w-3 h-3" /> Remboursé</Badge>;
      default:
        return <Badge>{paymentStatus}</Badge>;
    }
  };

  const getBookingTypeLabel = (type: string) => {
    switch (type) {
      case 'experience':
        return 'Expérience';
      case 'outing':
        return 'Sortie organisée';
      case 'accommodation':
        return 'Hébergement';
      case 'festival_pack':
        return 'Pack festival';
      default:
        return type;
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Mes réservations
            </h1>
            <p className="text-muted-foreground">
              Gérez vos voyages et expériences au Bénin
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['all', 'pending', 'confirmed', 'cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  statusFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-muted'
                }`}
              >
                {filter === 'all' && 'Toutes'}
                {filter === 'pending' && 'En attente'}
                {filter === 'confirmed' && 'Confirmées'}
                {filter === 'cancelled' && 'Annulées'}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="font-serif text-2xl font-bold mb-2">Aucune réservation</h2>
              <p className="text-muted-foreground mb-6">
                Vous n'avez pas encore de réservation.
              </p>
              <Link to="/sorties">
                <Button>Découvrir nos sorties</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl p-6 shadow-elegant border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left: Details */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {getBookingTypeLabel(booking.booking_type)}
                            </Badge>
                            {getStatusBadge(booking.status)}
                            {getPaymentBadge(booking.payment_status)}
                          </div>
                          <h3 className="font-serif text-xl font-semibold mb-1">
                            {booking.item?.name || 'Réservation'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Réservation #{booking.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(parseISO(booking.start_date), 'dd MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{booking.participants} personne{booking.participants > 1 ? 's' : ''}</span>
                        </div>
                        {booking.expires_at && booking.status === 'pending' && (
                          <div className="flex items-center gap-2 text-accent">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">
                              Expire le {format(parseISO(booking.expires_at), 'dd MMM à HH:mm', { locale: fr })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {booking.total_price.toLocaleString()} FCFA
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {booking.unit_price.toLocaleString()} FCFA × {booking.participants}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {/* Bouton Payer (si pending et unpaid) */}
                        {booking.status === 'pending' && booking.payment_status === 'unpaid' && (
                          <Link to={`/paiement/${booking.id}`}>
                            <Button size="sm" variant="default" className="gap-1">
                              <CreditCard className="w-4 h-4" />
                              Payer
                            </Button>
                          </Link>
                        )}

                        {/* Bouton Voir détails */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // Redirection vers la page de détail selon le type
                            if (booking.booking_type === 'outing') {
                              navigate(`/sorties/${booking.item_id}`);
                            } else if (booking.booking_type === 'experience') {
                              navigate(`/experiences/${booking.item_id}`);
                            }
                          }}
                          className="gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Voir
                        </Button>

                        {/* Bouton Annuler (si pending ou confirmed) */}
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="gap-1"
                          >
                            <Ban className="w-4 h-4" />
                            Annuler
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
