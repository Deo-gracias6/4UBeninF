import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockExperiences, type Experience } from '@/data/mockAdminData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const categoryLabels = {
  culture: 'Culture & Traditions',
  artisanat: 'Artisanat',
  gastronomie: 'Gastronomie',
  nature: 'Nature & Aventure',
};

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState(mockExperiences);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'culture' as Experience['category'],
    description: '',
    price: 0,
    duration: '',
    days: 1,
    intensity: 'modéré' as Experience['intensity'],
    available: true,
  });

  const filteredExperiences = experiences.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingExp) {
      setExperiences(
        experiences.map((exp) =>
          exp.id === editingExp.id ? { ...exp, ...formData } : exp
        )
      );
      toast({ title: 'Expérience modifiée avec succès' });
    } else {
      const newExp: Experience = {
        id: Date.now().toString(),
        ...formData,
        image: '/placeholder.svg',
      };
      setExperiences([...experiences, newExp]);
      toast({ title: 'Expérience ajoutée avec succès' });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      category: exp.category,
      description: exp.description,
      price: exp.price,
      duration: exp.duration,
      days: exp.days,
      intensity: exp.intensity,
      available: exp.available,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    toast({ title: 'Expérience supprimée' });
  };

  const toggleAvailability = (id: string) => {
    setExperiences(
      experiences.map((e) =>
        e.id === id ? { ...e, available: !e.available } : e
      )
    );
  };

  const resetForm = () => {
    setEditingExp(null);
    setFormData({
      title: '',
      category: 'culture',
      description: '',
      price: 0,
      duration: '',
      days: 1,
      intensity: 'modéré',
      available: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Expériences</h1>
          <p className="text-muted-foreground">Gérez les expériences touristiques</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une expérience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {editingExp ? 'Modifier l\'expérience' : 'Nouvelle expérience'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Titre</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Cérémonie Vodoun authentique"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Experience['category'] })}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3"
                >
                  <option value="culture">Culture & Traditions</option>
                  <option value="artisanat">Artisanat</option>
                  <option value="gastronomie">Gastronomie</option>
                  <option value="nature">Nature & Aventure</option>
                </select>
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
                    placeholder="Ex: 4 heures"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre de jours</label>
                  <Input
                    type="number"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                    min={1}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Intensité</label>
                  <select
                    value={formData.intensity}
                    onChange={(e) => setFormData({ ...formData, intensity: e.target.value as Experience['intensity'] })}
                    className="w-full h-10 rounded-lg border border-input bg-background px-3"
                  >
                    <option value="facile">Facile</option>
                    <option value="modéré">Modéré</option>
                    <option value="intense">Intense</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <label className="text-sm font-medium">Disponible</label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="hero" className="flex-1">
                  {editingExp ? 'Modifier' : 'Ajouter'}
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
          placeholder="Rechercher une expérience..."
          className="pl-10"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-2xl overflow-hidden shadow-elegant"
          >
            <div className="h-40 bg-secondary flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {categoryLabels[exp.category]}
                </span>
                <Switch
                  checked={exp.available}
                  onCheckedChange={() => toggleAvailability(exp.id)}
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">{exp.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{exp.description}</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                <span className="font-semibold text-primary">{exp.price.toLocaleString()} FCFA</span>
                <span className="text-muted-foreground">{exp.duration}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  exp.intensity === 'facile' ? 'bg-nature/20 text-nature' :
                  exp.intensity === 'modéré' ? 'bg-accent/20 text-accent-dark' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {exp.intensity}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleEdit(exp)}>
                  <Edit className="w-4 h-4" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(exp.id)}>
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
