import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AuthPromptProps {
  onAuthenticated: (user: { name: string; email: string }) => void;
}

export default function AuthPrompt({ onAuthenticated }: AuthPromptProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'register' && !name.trim()) {
      toast({ title: 'Veuillez entrer votre nom', variant: 'destructive' });
      return;
    }
    if (!email.trim() || !password.trim()) {
      toast({ title: 'Veuillez remplir tous les champs', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    // Mock authentication - ready for backend integration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: mode === 'login' ? 'Connexion réussie' : 'Compte créé avec succès',
        description: 'Votre itinéraire va être généré',
      });
      onAuthenticated({
        name: mode === 'register' ? name : email.split('@')[0],
        email,
      });
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
        >
          <User className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          {mode === 'login' ? 'Connectez-vous' : 'Créez votre compte'}
        </h2>
        <p className="text-muted-foreground">
          {mode === 'login'
            ? 'Connectez-vous pour générer et sauvegarder votre itinéraire'
            : 'Inscrivez-vous pour accéder à votre voyage personnalisé'}
        </p>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-8 rounded-2xl shadow-elegant"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User className="w-4 h-4" />
                Nom complet
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                className="h-12"
              />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="h-12"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Lock className="w-4 h-4" />
              Mot de passe
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>Chargement...</>
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-5 h-5" />
                Se connecter
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Créer mon compte
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          {mode === 'login' ? (
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-primary font-medium hover:underline"
              >
                Inscrivez-vous
              </button>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Déjà inscrit ?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-primary font-medium hover:underline"
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
      </motion.div>

      {/* Skip for demo */}
      <div className="mt-4 text-center">
        <button
          onClick={() =>
            onAuthenticated({ name: 'Visiteur', email: 'visiteur@demo.com' })
          }
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mx-auto"
        >
          Continuer en tant que visiteur
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
