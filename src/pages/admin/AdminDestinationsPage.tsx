import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockDestinations, type Destination } from '@/data/mockAdminData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState(mockDestinations);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    region: '',
    description: '',
    pricePerDay: 0,
    recommendedDays: 1,
    type: 'ville' as Destination['type'],
  });

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDest) {
      setDestinations(
        destinations.map((d) =>
          d.id === editingDest.id
            ? { ...d, ...formData }
            : d
        )
      );
      toast({ title: 'Destination modifiée avec succès' });
    } else {
      const newDest: Destination = {
        id: Date.now().toString(),
        ...formData,
        image: '/placeholder.svg',
        status: 'active',
      };
      setDestinations([...destinations, newDest]);
      toast({ title: 'Destination ajoutée avec succès' });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (dest: Destination) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name,
      region: dest.region,
      description: dest.description,
      pricePerDay: dest.pricePerDay,
      recommendedDays: dest.recommendedDays,
      type: dest.type,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
    toast({ title: 'Destination supprimée' });
  };

  const resetForm = () => {
    setEditingDest(null);
    setFormData({
      name: '',
      region: '',
      description: '',
      pricePerDay: 0,
      recommendedDays: 1,
      type: 'ville',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Destinations</h1>
          <p className="text-muted-foreground">Gérez les villes, régions et sites touristiques</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {editingDest ? 'Modifier la destination' : 'Nouvelle destination'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nom</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Cotonou"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Région</label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="Ex: Littoral"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description courte"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prix/jour (FCFA)</label>
                  <Input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée recommandée</label>
                  <Input
                    type="number"
                    value={formData.recommendedDays}
                    onChange={(e) => setFormData({ ...formData, recommendedDays: Number(e.target.value) })}
                    min={1}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Destination['type'] })}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3"
                >
                  <option value="ville">Ville</option>
                  <option value="region">Région</option>
                  <option value="parc">Parc</option>
                  <option value="site">Site touristique</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="hero" className="flex-1">
                  {editingDest ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une destination..."
          className="pl-10"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-elegant overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Destination</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Région</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Prix/jour</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Durée</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Statut</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{dest.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{dest.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{dest.region}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary capitalize">
                      {dest.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium">{dest.pricePerDay.toLocaleString()} FCFA</td>
                  <td className="py-4 px-6">{dest.recommendedDays} jour{dest.recommendedDays > 1 ? 's' : ''}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dest.status === 'active' ? 'bg-nature/20 text-nature' : 'bg-muted text-muted-foreground'
                    }`}>
                      {dest.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(dest)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(dest.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
