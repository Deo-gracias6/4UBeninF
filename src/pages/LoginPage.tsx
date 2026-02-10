import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';
  const successMessage = (location.state as { message?: string })?.message;

  // Afficher le message de succès si présent (venant de l'inscription)
  useEffect(() => {
    if (successMessage) {
      toast({ title: successMessage });
    }
  }, [successMessage, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation email
    if (!email.trim()) {
      toast({ title: 'Veuillez entrer votre email', variant: 'destructive' });
      return;
    }

    // Validation mot de passe
    if (!password.trim() || password.length < 8) {
      toast({ title: 'Mot de passe invalide (8 caractères minimum)', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      // Appel à login du contexte
      await login(email.trim(), password);

      toast({ 
        title: 'Connexion réussie', 
        description: 'Bienvenue sur 4UBENIN !' 
      });

      // Navigation vers la page précédente ou accueil
      navigate(from, { replace: true });

    } catch (error: any) {
      const errorMessage = error.message || 'Erreur de connexion';
      toast({ 
        title: 'Erreur de connexion', 
        description: errorMessage, 
        variant: 'destructive' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute inset-0 pattern-african opacity-5" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-hero mb-6 shadow-purple"
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Connexion</h1>
            <p className="text-muted-foreground">
              Connectez-vous pour accéder à votre espace voyage
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-2xl shadow-elegant"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="h-12"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Mot de passe
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12"
                  disabled={isLoading}
                  required
                />
                <div className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Vous n'êtes pas encore inscrit ?{' '}
                <Link
                  to="/inscription"
                  className="text-primary font-medium hover:underline"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
