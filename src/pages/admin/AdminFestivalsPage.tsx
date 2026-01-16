import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockFestivals, type Festival } from '@/data/mockAdminData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function AdminFestivalsPage() {
  const [festivals, setFestivals] = useState(mockFestivals);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFest, setEditingFest] = useState<Festival | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    startDate: '',
    endDate: '',
    price: 0,
    duration: '',
    description: '',
  });

  const filteredFestivals = festivals.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFest) {
      setFestivals(
        festivals.map((f) =>
          f.id === editingFest.id ? { ...f, ...formData, status: 'upcoming' as const } : f
        )
      );
      toast({ title: 'Festival modifié avec succès' });
    } else {
      const newFest: Festival = {
        id: Date.now().toString(),
        ...formData,
        image: '/placeholder.svg',
        status: 'upcoming',
      };
      setFestivals([...festivals, newFest]);
      toast({ title: 'Festival ajouté avec succès' });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (fest: Festival) => {
    setEditingFest(fest);
    setFormData({
      name: fest.name,
      city: fest.city,
      startDate: fest.startDate,
      endDate: fest.endDate,
      price: fest.price,
      duration: fest.duration,
      description: fest.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFestivals(festivals.filter((f) => f.id !== id));
    toast({ title: 'Festival supprimé' });
  };

  const resetForm = () => {
    setEditingFest(null);
    setFormData({
      name: '',
      city: '',
      startDate: '',
      endDate: '',
      price: 0,
      duration: '',
      description: '',
    });
  };

  // Calendar view
  const festivalsByMonth = months.map((month, idx) => ({
    month,
    festivals: festivals.filter((f) => new Date(f.startDate).getMonth() === idx),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Festivals & Événements</h1>
          <p className="text-muted-foreground">Gérez le calendrier des festivals</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un festival
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {editingFest ? 'Modifier le festival' : 'Nouveau festival'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nom</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Festival du Vodoun"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ville</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Ouidah"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date début</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date fin</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Ex: 3 jours"
                    required
                  />
                </div>
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
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="hero" className="flex-1">
                  {editingFest ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 shadow-elegant"
      >
        <h2 className="font-serif text-xl font-bold mb-6">Calendrier annuel</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {festivalsByMonth.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl text-center ${
                item.festivals.length > 0 ? 'bg-primary/10 border border-primary/20' : 'bg-secondary'
              }`}
            >
              <div className="font-medium text-sm">{item.month.slice(0, 3)}</div>
              {item.festivals.length > 0 && (
                <div className="text-xs text-primary mt-1 font-medium">
                  {item.festivals.length} festival{item.festivals.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un festival..."
          className="pl-10"
        />
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFestivals.map((fest, idx) => (
          <motion.div
            key={fest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-2xl overflow-hidden shadow-elegant"
          >
            <div className="h-32 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white/50" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  fest.status === 'upcoming' ? 'bg-nature/20 text-nature' :
                  fest.status === 'ongoing' ? 'bg-accent/20 text-accent-dark' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {fest.status === 'upcoming' ? 'À venir' : fest.status === 'ongoing' ? 'En cours' : 'Passé'}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">{fest.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{fest.city}</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                <span>{fest.startDate}</span>
                <span className="font-semibold text-primary">{fest.price.toLocaleString()} FCFA</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleEdit(fest)}>
                  <Edit className="w-4 h-4" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(fest.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
