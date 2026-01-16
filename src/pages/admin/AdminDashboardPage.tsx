import { motion } from 'framer-motion';
import { MapPin, Sparkles, Calendar, CreditCard, Users, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { mockStats, mockReservations } from '@/data/mockAdminData';

const statCards = [
  { label: 'Destinations', value: mockStats.destinations, icon: MapPin, color: 'bg-primary' },
  { label: 'Expériences', value: mockStats.experiences, icon: Sparkles, color: 'bg-accent' },
  { label: 'Festivals à venir', value: mockStats.upcomingFestivals, icon: Calendar, color: 'bg-nature' },
  { label: 'Réservations', value: mockStats.totalReservations, icon: CreditCard, color: 'bg-primary-dark' },
];

const quickStats = [
  { label: 'Visiteurs ce mois', value: mockStats.visitors.toLocaleString(), icon: Users, trend: '+12%' },
  { label: 'En attente', value: mockStats.pendingReservations, icon: TrendingUp, trend: '-5%' },
  { label: 'Revenu total', value: `${(mockStats.revenue / 1000000).toFixed(1)}M FCFA`, icon: DollarSign, trend: '+23%' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme 4UBENIN</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-elegant"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-elegant"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-nature' : 'text-destructive'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Reservations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card rounded-2xl p-6 shadow-elegant"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold">Réservations récentes</h2>
          <button className="text-primary text-sm font-medium hover:underline">
            Voir tout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Destinations</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Dates</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Montant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReservations.map((res) => (
                <tr key={res.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4 font-mono text-sm">{res.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{res.clientName}</div>
                      <div className="text-sm text-muted-foreground">{res.clientEmail}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{res.destinations.join(', ')}</td>
                  <td className="py-3 px-4 text-sm">{res.startDate}</td>
                  <td className="py-3 px-4 font-medium">{res.totalPrice.toLocaleString()} FCFA</td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
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
