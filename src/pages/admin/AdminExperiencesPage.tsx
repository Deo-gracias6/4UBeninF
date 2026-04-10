import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Loader2, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import adminExperienceService, { AdminExperience, ExperienceFormData } from '@/services/adminExperienceService';
import adminUtilsService, { Destination, Category } from '@/services/adminUtilsService';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<AdminExperience[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<AdminExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ExperienceFormData>({
    name: '',
    description: '',
    included: '',
    destination_id: '',
    category_id: '',
    price: 0,
    duration_minutes: 120,
    max_participants: 15,
    main_image: '',
    latitude: undefined,
    longitude: undefined,
    is_active: true,
  });

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger en parallèle
      const [expResponse, destResponse, catResponse] = await Promise.all([
        adminExperienceService.getAll(),
        adminUtilsService.getDestinations(),
        adminUtilsService.getCategories(),
      ]);

      setExperiences(expResponse.experiences || []);
      setDestinations(destResponse || []);
      setCategories(catResponse || []);
    } catch (error: any) {
      console.error('Erreur chargement:', error);
      toast({
        title: 'Erreur',
        description: error.response?.data?.error?.message || 'Impossible de charger les données',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.destination?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingExp) {
        // Modification
        await adminExperienceService.update(editingExp.id, formData);
        toast({ title: ' Expérience modifiée avec succès' });
      } else {
        // Création
        await adminExperienceService.create(formData);
        toast({ title: ' Expérience ajoutée avec succès' });
      }

      setIsDialogOpen(false);
      resetForm();
      loadData(); // Recharger la liste
    } catch (error: any) {
      console.error('Erreur soumission:', error);
      toast({
        title: 'Erreur',
        description: error.response?.data?.error?.message || 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (exp: AdminExperience) => {
    setEditingExp(exp);
    setFormData({
      name: exp.name,
      description: exp.description,
      included: exp.included,
      destination_id: exp.destination?.id || '',
      category_id: exp.category?.id || '',
      price: exp.price,
      duration_minutes: exp.durationMinutes,
      max_participants: exp.maxParticipants,
      main_image: exp.mainImage || '',
      latitude: exp.latitude || undefined,
      longitude: exp.longitude || undefined,
      is_active: exp.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette expérience ?')) return;

    try {
      await adminExperienceService.delete(id);
      toast({ title: ' Expérience supprimée' });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.error?.message || 'Impossible de supprimer',
        variant: 'destructive',
      });
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await adminExperienceService.toggleActive(id, !currentStatus);
      toast({ title: currentStatus ? 'Expérience désactivée' : 'Expérience activée' });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le statut',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingExp(null);
    setFormData({
      name: '',
      description: '',
      included: '',
      destination_id: '',
      category_id: '',
      price: 0,
      duration_minutes: 120,
      max_participants: 15,
      main_image: '',
      latitude: undefined,
      longitude: undefined,
      is_active: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {editingExp ? 'Modifier l\'expérience' : 'Nouvelle expérience'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Nom */}
              <div>
                <label className="text-sm font-medium mb-2 block">Nom de l'expérience *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Cérémonie Vodoun authentique"
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Destination *
                </label>
                <select
                  value={formData.destination_id}
                  onChange={(e) => setFormData({ ...formData, destination_id: e.target.value })}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3"
                  required
                >
                  <option value="">-- Sélectionnez une destination --</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catégorie */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Catégorie (optionnel)
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3"
                >
                  <option value="">-- Aucune catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez l'expérience en quelques phrases..."
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  required
                />
              </div>

              {/* Inclus */}
              <div>
                <label className="text-sm font-medium mb-2 block">Ce qui est inclus *</label>
                <Input
                  value={formData.included}
                  onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                  placeholder="Ex: Guide, transport, repas, photos..."
                  required
                />
              </div>

              {/* Prix & Durée */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prix (FCFA) *</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    min={0}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée (minutes) *</label>
                  <Input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                    min={30}
                    step={30}
                    required
                  />
                </div>
              </div>

              {/* Participants max */}
              <div>
                <label className="text-sm font-medium mb-2 block">Nombre max de participants *</label>
                <Input
                  type="number"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: Number(e.target.value) })}
                  min={1}
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="text-sm font-medium mb-2 block">URL de l'image</label>
                <Input
                  value={formData.main_image}
                  onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {/* Coordonnées GPS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Latitude</label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.latitude || ''}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="6.3667"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Longitude</label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.longitude || ''}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="2.4167"
                  />
                </div>
              </div>

              {/* Statut actif */}
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <label className="text-sm font-medium">Expérience active</label>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)} disabled={submitting}>
                  Annuler
                </Button>
                <Button type="submit" variant="hero" className="flex-1" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    editingExp ? 'Modifier' : 'Créer'
                  )}
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
            {/* Image */}
            <div className="h-40 bg-secondary relative">
              {exp.mainImage ? (
                <img src={exp.mainImage} alt={exp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  {exp.destination && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {exp.destination.name}
                    </span>
                  )}
                </div>
                <Switch
                  checked={exp.isActive}
                  onCheckedChange={() => toggleAvailability(exp.id, exp.isActive)}
                />
              </div>

              {/* Titre */}
              <h3 className="font-serif text-lg font-semibold mb-1 line-clamp-2">{exp.name}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{exp.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm mb-4">
                <span className="font-semibold text-primary">{exp.price.toLocaleString()} FCFA</span>
                <span className="text-muted-foreground">{exp.durationMinutes} min</span>
                <span className="text-muted-foreground">Max {exp.maxParticipants}</span>
              </div>

              {/* Actions */}
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

      {/* Empty state */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune expérience trouvée</p>
        </div>
      )}
    </div>
  );
}
