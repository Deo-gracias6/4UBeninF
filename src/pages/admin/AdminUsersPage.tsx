import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Eye, 
  Edit2, 
  Trash2, 
  UserCheck, 
  UserX,
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { mockUsers, userStats, MockUser } from '@/data/mockUsersData';
import { UserDetailModal } from '@/components/admin/UserDetailModal';
import { UserEditModal } from '@/components/admin/UserEditModal';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'disabled'>('all');
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [editingUser, setEditingUser] = useState<MockUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<MockUser | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (user: MockUser) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' }
        : u
    ));
    toast.success(
      user.status === 'active' 
        ? `Compte de ${user.firstName} ${user.lastName} désactivé`
        : `Compte de ${user.firstName} ${user.lastName} réactivé`
    );
  };

  const handleDeleteUser = () => {
    if (deletingUser) {
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
      toast.success(`Utilisateur ${deletingUser.firstName} ${deletingUser.lastName} supprimé`);
      setDeletingUser(null);
    }
  };

  const handleUpdateUser = (updatedUser: MockUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    toast.success('Utilisateur mis à jour avec succès');
    setEditingUser(null);
  };

  const stats = [
    { 
      label: 'Total utilisateurs', 
      value: users.length, 
      icon: Users, 
      color: 'bg-primary' 
    },
    { 
      label: 'Comptes actifs', 
      value: users.filter(u => u.status === 'active').length, 
      icon: UserCheck, 
      color: 'bg-nature' 
    },
    { 
      label: 'Comptes désactivés', 
      value: users.filter(u => u.status === 'disabled').length, 
      icon: UserX, 
      color: 'bg-muted-foreground' 
    },
    { 
      label: 'Revenu total', 
      value: `${(users.reduce((acc, u) => acc + u.totalSpent, 0) / 1000000).toFixed(1)}M FCFA`, 
      icon: DollarSign, 
      color: 'bg-accent' 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground">Gestion des comptes utilisateurs de la plateforme</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-elegant"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 shadow-elegant">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              Tous
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('active')}
              size="sm"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Actifs
            </Button>
            <Button
              variant={statusFilter === 'disabled' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('disabled')}
              size="sm"
            >
              <UserX className="w-4 h-4 mr-2" />
              Désactivés
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl shadow-elegant overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Inscription</TableHead>
              <TableHead>Réservations</TableHead>
              <TableHead>Total dépensé</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-secondary/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell className="text-sm">{new Date(user.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <span className="font-medium">{user.reservationsCount}</span>
                </TableCell>
                <TableCell className="font-medium">
                  {user.totalSpent.toLocaleString()} FCFA
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-nature/20 text-nature' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {user.status === 'active' ? 'Actif' : 'Désactivé'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedUser(user)}
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingUser(user)}
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(user)}
                      title={user.status === 'active' ? 'Désactiver' : 'Réactiver'}
                    >
                      {user.status === 'active' ? (
                        <UserX className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-nature" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingUser(user)}
                      title="Supprimer"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
          </div>
        )}
      </motion.div>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {/* User Edit Modal */}
      <UserEditModal
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleUpdateUser}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le compte de{' '}
              <strong>{deletingUser?.firstName} {deletingUser?.lastName}</strong> ?
              <br /><br />
              Cette action est irréversible et supprimera toutes les données associées à cet utilisateur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
