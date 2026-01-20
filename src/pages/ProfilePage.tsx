import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Plane,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUserAuth, Trip } from '@/contexts/UserAuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const budgetLabels = {
  economique: { label: 'Économique', color: 'bg-nature/10 text-nature' },
  premium: { label: 'Premium', color: 'bg-primary/10 text-primary' },
  vip: { label: 'VIP', color: 'bg-accent/10 text-accent-dark' },
};

const statusConfig = {
  upcoming: { label: 'À venir', icon: Clock, color: 'bg-blue-500/10 text-blue-600' },
  completed: { label: 'Terminé', icon: CheckCircle, color: 'bg-nature/10 text-nature' },
  cancelled: { label: 'Annulé', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
};

function TripCard({ trip }: { trip: Trip }) {
  const StatusIcon = statusConfig[trip.status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg font-semibold">{trip.title}</h3>
          <p className="text-sm text-muted-foreground">
            {format(trip.startDate, 'dd MMMM yyyy', { locale: fr })} -{' '}
            {format(trip.endDate, 'dd MMMM yyyy', { locale: fr })}
          </p>
        </div>
        <Badge className={statusConfig[trip.status].color}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {statusConfig[trip.status].label}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {trip.destinations.map((dest) => (
          <span
            key={dest}
            className="inline-flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full"
          >
            <MapPin className="w-3 h-3" />
            {dest}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Badge className={budgetLabels[trip.budget].color}>
          {budgetLabels[trip.budget].label}
        </Badge>
        <span className="text-xs text-muted-foreground">
          Créé le {format(trip.createdAt, 'dd/MM/yyyy', { locale: fr })}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user, isAuthenticated, trips, updateProfile, isLoading } = useUserAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  if (!isAuthenticated || !user) {
    return <Navigate to="/connexion" state={{ from: '/profil' }} replace />;
  }

  const handleEdit = () => {
    setEditedName(user.name);
    setEditedPhone(user.phone || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateProfile({
      name: editedName,
      phone: editedPhone || undefined,
    });

    if (success) {
      toast({ title: 'Profil mis à jour', description: 'Vos informations ont été enregistrées.' });
      setIsEditing(false);
    } else {
      toast({ title: 'Erreur', description: 'Impossible de mettre à jour le profil.', variant: 'destructive' });
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming');
  const pastTrips = trips.filter((t) => t.status !== 'upcoming');

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
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 shadow-elegant mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center shadow-purple">
                    <span className="text-3xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nom</label>
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                        <Input
                          value={editedPhone}
                          onChange={(e) => setEditedPhone(e.target.value)}
                          placeholder="+229 XX XX XX XX"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Enregistrer
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="gap-2">
                          <X className="w-4 h-4" />
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
                      <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </span>
                        {user.phone && (
                          <span className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {user.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Membre depuis {format(user.createdAt, 'MMMM yyyy', { locale: fr })}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <Button onClick={handleEdit} variant="outline" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>

            {/* Trips Section */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming" className="gap-2">
                  <Plane className="w-4 h-4" />
                  À venir ({upcomingTrips.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Historique ({pastTrips.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {upcomingTrips.length > 0 ? (
                  <div className="grid gap-4">
                    {upcomingTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl">
                    <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-2">Aucun voyage prévu</h3>
                    <p className="text-muted-foreground mb-6">
                      Créez votre premier itinéraire personnalisé !
                    </p>
                    <Link to="/moteur">
                      <Button variant="hero">Créer mon voyage</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                {pastTrips.length > 0 ? (
                  <div className="grid gap-4">
                    {pastTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-2">Aucun historique</h3>
                    <p className="text-muted-foreground">
                      Vos voyages passés apparaîtront ici.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
