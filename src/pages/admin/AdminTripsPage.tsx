import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { organizedTrips, OrganizedTrip } from '@/data/organizedTripsData';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<OrganizedTrip[]>(organizedTrips);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<OrganizedTrip | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    city: '',
    location: '',
    meetingPoint: '',
    date: '',
    time: '08:00',
    duration: '1 jour',
    durationDays: 1,
    price: 0,
    totalPlaces: 20,
    category: 'journée' as 'journée' | 'tournée' | 'immersion',
  });

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      title: '',
      shortDescription: '',
      description: '',
      city: '',
      location: '',
      meetingPoint: '',
      date: '',
      time: '08:00',
      duration: '1 jour',
      durationDays: 1,
      price: 0,
      totalPlaces: 20,
      category: 'journée',
    });
    setEditingTrip(null);
  };

  const handleAddTrip = () => {
    const newTrip: OrganizedTrip = {
      id: `trip-${Date.now()}`,
      ...formData,
      image: '/placeholder.svg',
      images: ['/placeholder.svg'],
      availablePlaces: formData.totalPlaces,
      program: [],
      activities: [],
      includes: [],
      rating: 0,
      reviewCount: 0,
    };

    setTrips([...trips, newTrip]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: 'Sortie créée',
      description: `La sortie "${newTrip.title}" a été créée avec succès.`,
    });
  };

  const handleEditTrip = () => {
    if (!editingTrip) return;

    const updatedTrips = trips.map((trip) =>
      trip.id === editingTrip.id
        ? {
            ...trip,
            ...formData,
            availablePlaces: Math.min(trip.availablePlaces, formData.totalPlaces),
          }
        : trip
    );

    setTrips(updatedTrips);
    setEditingTrip(null);
    resetForm();
    toast({
      title: 'Sortie modifiée',
      description: 'La sortie a été mise à jour avec succès.',
    });
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter((t) => t.id !== tripId));
    toast({
      title: 'Sortie supprimée',
      description: 'La sortie a été supprimée avec succès.',
    });
  };

  const openEditDialog = (trip: OrganizedTrip) => {
    setEditingTrip(trip);
    setFormData({
      title: trip.title,
      shortDescription: trip.shortDescription,
      description: trip.description,
      city: trip.city,
      location: trip.location,
      meetingPoint: trip.meetingPoint,
      date: trip.date,
      time: trip.time,
      duration: trip.duration,
      durationDays: trip.durationDays,
      price: trip.price,
      totalPlaces: trip.totalPlaces,
      category: trip.category,
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'journée':
        return 'Journée';
      case 'tournée':
        return 'Tournée';
      case 'immersion':
        return 'Immersion';
      default:
        return category;
    }
  };

  const TripForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>Titre</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Journée découverte à Ouidah"
          />
        </div>

        <div className="col-span-2">
          <Label>Description courte</Label>
          <Input
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="Résumé en une phrase"
          />
        </div>

        <div className="col-span-2">
          <Label>Description complète</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description détaillée de la sortie..."
            rows={4}
          />
        </div>

        <div>
          <Label>Ville</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Ex: Ouidah"
          />
        </div>

        <div>
          <Label>Région</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Ex: Atlantique"
          />
        </div>

        <div className="col-span-2">
          <Label>Point de rendez-vous</Label>
          <Input
            value={formData.meetingPoint}
            onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
            placeholder="Ex: Place de l'Étoile Rouge, Cotonou"
          />
        </div>

        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <Label>Heure de départ</Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>

        <div>
          <Label>Durée</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => {
              const daysMap: Record<string, number> = {
                '1 jour': 1,
                '2 jours': 2,
                '3 jours': 3,
                '1 semaine': 7,
              };
              setFormData({
                ...formData,
                duration: value,
                durationDays: daysMap[value] || 1,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 jour">1 jour</SelectItem>
              <SelectItem value="2 jours">2 jours</SelectItem>
              <SelectItem value="3 jours">3 jours</SelectItem>
              <SelectItem value="1 semaine">1 semaine</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Catégorie</Label>
          <Select
            value={formData.category}
            onValueChange={(value: 'journée' | 'tournée' | 'immersion') =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journée">Journée découverte</SelectItem>
              <SelectItem value="tournée">Tournée touristique</SelectItem>
              <SelectItem value="immersion">Immersion culturelle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Prix (FCFA)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="45000"
          />
        </div>

        <div>
          <Label>Nombre de places</Label>
          <Input
            type="number"
            value={formData.totalPlaces}
            onChange={(e) => setFormData({ ...formData, totalPlaces: Number(e.target.value) })}
            placeholder="20"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={resetForm}>
          Annuler
        </Button>
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold">Sorties Organisées</h1>
          <p className="text-muted-foreground">
            Gérez les sorties touristiques en groupe
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle sortie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une sortie organisée</DialogTitle>
            </DialogHeader>
            <TripForm onSubmit={handleAddTrip} submitLabel="Créer la sortie" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-xl p-4">
          <div className="text-2xl font-bold">{trips.length}</div>
          <div className="text-sm text-muted-foreground">Total sorties</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="text-2xl font-bold text-nature">
            {trips.filter((t) => t.availablePlaces > 0).length}
          </div>
          <div className="text-sm text-muted-foreground">Disponibles</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="text-2xl font-bold text-destructive">
            {trips.filter((t) => t.availablePlaces === 0).length}
          </div>
          <div className="text-sm text-muted-foreground">Complètes</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="text-2xl font-bold text-accent">
            {trips.reduce((sum, t) => sum + (t.totalPlaces - t.availablePlaces), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Réservations</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une sortie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sortie</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Places</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{trip.title}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {trip.city}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {format(parseISO(trip.date), 'dd MMM yyyy', { locale: fr })}
                  </div>
                </TableCell>
                <TableCell>{trip.duration}</TableCell>
                <TableCell className="font-medium">
                  {trip.price.toLocaleString()} FCFA
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {trip.availablePlaces}/{trip.totalPlaces}
                  </div>
                </TableCell>
                <TableCell>
                  {trip.availablePlaces === 0 ? (
                    <Badge variant="destructive">Complet</Badge>
                  ) : trip.availablePlaces <= 5 ? (
                    <Badge className="bg-accent text-accent-foreground">
                      Places limitées
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Disponible</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/sorties/${trip.id}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(trip)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Modifier la sortie</DialogTitle>
                        </DialogHeader>
                        <TripForm onSubmit={handleEditTrip} submitLabel="Enregistrer" />
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer cette sortie ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. La sortie "{trip.title}" sera
                            définitivement supprimée.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTrip(trip.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
