import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Edit, Trash2, MapPin, Loader2,
  ToggleLeft, ToggleRight, Star, AlertTriangle, RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { ImageUpload } from '@/components/ui/ImageUpload';
import adminDestinationService, { AdminDestination, CreateDestinationData } from '@/services/adminDestinationService';

const EMPTY_FORM: CreateDestinationData = {
  name: '',
  region: '',
  description: '',
  latitude: null,
  longitude: null,
  banner_image: '',
  is_popular: false,
  is_active: true,
};

export default function AdminDestinationsPage() {
  const { toast } = useToast();

  // ── Data ──
  const [destinations, setDestinations] = useState<AdminDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // ── Dialog état ──
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingDest, setEditingDest] = useState<AdminDestination | null>(null);
  const [formData, setFormData] = useState<CreateDestinationData>(EMPTY_FORM);

  // ── Suppression ──
  const [deleteTarget, setDeleteTarget] = useState<AdminDestination | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ────────────────────────────────────────
  // Chargement des destinations
  // ────────────────────────────────────────
  const fetchDestinations = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await adminDestinationService.getAll(page, 20);
      setDestinations(result.destinations);
      setTotalPages(result.totalPages);
      setTotal(result.total);
      setCurrentPage(page);
    } catch (err: any) {
      toast({
        title: 'Erreur de chargement',
        description: err?.response?.data?.error?.message || 'Impossible de charger les destinations.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchDestinations(1); }, [fetchDestinations]);

  // ────────────────────────────────────────
  // Filtrage local
  // ────────────────────────────────────────
  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase()),
  );

  // ────────────────────────────────────────
  // Ouvrir formulaire
  // ────────────────────────────────────────
  const openCreate = () => {
    setEditingDest(null);
    setFormData(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (dest: AdminDestination) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name,
      region: dest.region,
      description: dest.description || '',
      latitude: dest.latitude,
      longitude: dest.longitude,
      banner_image: dest.bannerImage || '',
      is_popular: dest.isPopular,
      is_active: dest.isActive,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingDest(null);
    setFormData(EMPTY_FORM);
  };

  // ────────────────────────────────────────
  // Soumission formulaire (créer / modifier)
  // ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.region.trim()) {
      toast({ title: 'Nom et région sont obligatoires', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const payload: CreateDestinationData = {
        ...formData,
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
      };

      if (editingDest) {
        await adminDestinationService.update(editingDest.id, payload);
        toast({ title: 'Destination modifiée avec succès ✅' });
      } else {
        await adminDestinationService.create(payload);
        toast({ title: 'Destination ajoutée avec succès ✅' });
      }

      closeDialog();
      fetchDestinations(currentPage);
    } catch (err: any) {
      toast({
        title: 'Erreur',
        description: err?.response?.data?.error?.message || 'Une erreur est survenue.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // ────────────────────────────────────────
  // Activer / Désactiver
  // ────────────────────────────────────────
  const handleToggleActive = async (dest: AdminDestination) => {
    try {
      await adminDestinationService.toggleActive(dest.id, !dest.isActive);
      setDestinations((prev) =>
        prev.map((d) => (d.id === dest.id ? { ...d, isActive: !d.isActive } : d)),
      );
      toast({ title: `Destination ${!dest.isActive ? 'activée' : 'désactivée'}` });
    } catch {
      toast({ title: 'Erreur lors du changement de statut', variant: 'destructive' });
    }
  };

  // ────────────────────────────────────────
  // Suppression
  // ────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDestinationService.delete(deleteTarget.id, true);
      toast({ title: 'Destination supprimée définitivement' });
      setDeleteTarget(null);
      fetchDestinations(currentPage);
    } catch (err: any) {
      toast({
        title: 'Erreur de suppression',
        description: err?.response?.data?.error?.message || 'Impossible de supprimer.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  // ────────────────────────────────────────
  // Rendu
  // ────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Destinations</h1>
          <p className="text-muted-foreground">
            {total} destination{total !== 1 ? 's' : ''} au total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => fetchDestinations(currentPage)} title="Rafraîchir">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="hero" className="gap-2" onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Ajouter une destination
          </Button>
        </div>
      </div>

      {/* Recherche */}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <MapPin className="w-10 h-10 opacity-30" />
            <p>{search ? 'Aucun résultat pour cette recherche.' : 'Aucune destination. Cliquez sur « Ajouter » pour commencer.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Destination</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Région</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Slug</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Populaire</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Actif</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dest) => (
                  <tr key={dest.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    {/* Nom + image */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {dest.bannerImage ? (
                          <img
                            src={dest.bannerImage}
                            alt={dest.name}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{dest.name}</div>
                          {dest.description && (
                            <div
                              className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]"
                              dangerouslySetInnerHTML={{ __html: dest.description }}
                            />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Région */}
                    <td className="py-4 px-6 text-sm">{dest.region}</td>

                    {/* Slug */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">{dest.slug}</span>
                    </td>

                    {/* Populaire */}
                    <td className="py-4 px-6 text-center">
                      {dest.isPopular ? (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>

                    {/* Actif toggle */}
                    <td className="py-4 px-6 text-center">
                      <button onClick={() => handleToggleActive(dest)} className="inline-flex">
                        {dest.isActive ? (
                          <ToggleRight className="w-6 h-6 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(dest)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(dest)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Supprimer"
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
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-border">
            <Button
              variant="outline" size="sm"
              disabled={currentPage === 1}
              onClick={() => fetchDestinations(currentPage - 1)}
            >
              Précédent
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline" size="sm"
              disabled={currentPage === totalPages}
              onClick={() => fetchDestinations(currentPage + 1)}
            >
              Suivant
            </Button>
          </div>
        )}
      </motion.div>

      {/* ─── Dialog Créer / Modifier ─── */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingDest ? 'Modifier la destination' : 'Nouvelle destination'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Nom */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Nom <span className="text-destructive">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Cotonou"
                required
              />
            </div>

            {/* Région */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Région <span className="text-destructive">*</span>
              </label>
              <Input
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="Ex: Littoral"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <RichTextEditor
                value={formData.description || ''}
                onChange={(val) => setFormData({ ...formData, description: val })}
                placeholder="Rédigez une description riche..."
              />
            </div>

            {/* Image bannière */}
            <div>
              <label className="text-sm font-medium mb-2 block">Image bannière</label>
              <ImageUpload
                value={formData.banner_image || ''}
                onChange={(url) => setFormData({ ...formData, banner_image: url })}
                bucket="banner_destinations"
                folder="destinations"
              />
            </div>

            {/* Latitude / Longitude */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude ?? ''}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value ? Number(e.target.value) : null })}
                  placeholder="Ex: 6.3654"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Longitude</label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude ?? ''}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value ? Number(e.target.value) : null })}
                  placeholder="Ex: 2.4183"
                />
              </div>
            </div>

            {/* Switches */}
            <div className="flex gap-8 pt-2">
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_popular ?? false}
                  onCheckedChange={(v) => setFormData({ ...formData, is_popular: v })}
                  id="is_popular"
                />
                <label htmlFor="is_popular" className="text-sm font-medium cursor-pointer">
                  Destination populaire ⭐
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_active ?? true}
                  onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                  id="is_active"
                />
                <label htmlFor="is_active" className="text-sm font-medium cursor-pointer">
                  Active (visible sur le site)
                </label>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={closeDialog} disabled={saving}>
                Annuler
              </Button>
              <Button type="submit" variant="hero" className="flex-1" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingDest ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── Dialog Suppression ─── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Supprimer la destination ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est <strong>irréversible</strong>. La destination{' '}
              <strong>« {deleteTarget?.name} »</strong> sera supprimée définitivement de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
