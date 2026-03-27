import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useUserAuth } from '@/contexts/UserAuthContext';
import api from '@/services/api';

export function AdminProtectedRoute() {
  const { user, isAuthenticated, loading } = useUserAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      try {
        const response = await api.get('/auth/check-admin');
        const data = response.data.data || response.data;
        setIsAdmin(data.isAdmin === true);
      } catch (error) {
        console.error('❌ Erreur vérification admin:', error);
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, user]);

  // Chargement initial
  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  // Non authentifié → Redirection vers login
 if (!isAuthenticated) {
  return <Navigate to="/connexion" state={{ from: '/admin' }} replace />;
}
  // Authentifié mais pas admin → Accès refusé
  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center max-w-md p-8 bg-card rounded-2xl shadow-elegant">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Accès refusé</h2>
          <p className="text-muted-foreground mb-6">
            Vous n'avez pas les autorisations nécessaires pour accéder à cette zone.
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/" className="text-primary hover:underline">
              Retour à l'accueil
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/profil" className="text-primary hover:underline">
              Mon profil
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin authentifié → Afficher les routes admin
  return <Outlet />;
}
