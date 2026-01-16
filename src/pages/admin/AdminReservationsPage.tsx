import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockReservations, type Reservation } from '@/data/mockAdminData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminReservationsPage() {
  const [reservations] = useState(mockReservations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.clientEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: reservations.length,
    paid: reservations.filter((r) => r.status === 'paid').length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    revenue: reservations
      .filter((r) => r.status === 'paid')
      .reduce((sum, r) => sum + r.totalPrice, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Réservations</h1>
          <p className="text-muted-foreground">Gérez les réservations et paiements</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 shadow-elegant"
        >
          <div className="text-muted-foreground text-sm">Total</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 shadow-elegant"
        >
          <div className="text-muted-foreground text-sm">Payées</div>
          <div className="text-2xl font-bold text-nature">{stats.paid}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-4 shadow-elegant"
        >
          <div className="text-muted-foreground text-sm">En attente</div>
          <div className="text-2xl font-bold text-accent">{stats.pending}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-4 shadow-elegant"
        >
          <div className="text-muted-foreground text-sm">Revenu</div>
          <div className="text-2xl font-bold text-primary">{(stats.revenue / 1000000).toFixed(1)}M</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par ID, nom ou email..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {['all', 'paid', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-muted'
              }`}
            >
              {status === 'all' ? 'Tous' : status === 'paid' ? 'Payé' : status === 'pending' ? 'En attente' : 'Annulé'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl shadow-elegant overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Destinations</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Dates</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Voyageurs</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Montant</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Statut</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-4 px-6 font-mono text-sm">{res.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{res.clientName}</div>
                      <div className="text-sm text-muted-foreground">{res.clientEmail}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm max-w-[200px] truncate">
                    {res.destinations.join(', ')}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div>{res.startDate}</div>
                    <div className="text-muted-foreground">{res.endDate}</div>
                  </td>
                  <td className="py-4 px-6">{res.travelers}</td>
                  <td className="py-4 px-6 font-medium">{res.totalPrice.toLocaleString()} FCFA</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      res.status === 'paid' 
                        ? 'bg-nature/20 text-nature' 
                        : res.status === 'pending'
                        ? 'bg-accent/20 text-accent-dark'
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {res.status === 'paid' ? 'Payé' : res.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedRes(res)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRes} onOpenChange={() => setSelectedRes(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Détails de la réservation
            </DialogTitle>
          </DialogHeader>
          {selectedRes && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">ID</div>
                  <div className="font-mono font-medium">{selectedRes.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Statut</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedRes.status === 'paid' 
                      ? 'bg-nature/20 text-nature' 
                      : selectedRes.status === 'pending'
                      ? 'bg-accent/20 text-accent-dark'
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {selectedRes.status === 'paid' ? 'Payé' : selectedRes.status === 'pending' ? 'En attente' : 'Annulé'}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Client</div>
                <div className="font-medium">{selectedRes.clientName}</div>
                <div className="text-sm">{selectedRes.clientEmail}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Destinations</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRes.destinations.map((d) => (
                    <span key={d} className="px-2 py-1 rounded-full text-xs bg-secondary">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Expériences</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRes.experiences.map((e) => (
                    <span key={e} className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Dates</div>
                  <div>{selectedRes.startDate} - {selectedRes.endDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Voyageurs</div>
                  <div>{selectedRes.travelers} personne{selectedRes.travelers > 1 ? 's' : ''}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {selectedRes.totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
