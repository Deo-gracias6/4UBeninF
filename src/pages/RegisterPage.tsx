import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Loader2, ArrowLeft, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function RegisterPage() {
  // États pour tous les champs requis par ton API
  const [nom, setNom] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!nom.trim()) {
      toast({ title: 'Veuillez entrer votre nom', variant: 'destructive' });
      return;
    }
    if (!lastName.trim()) {
      toast({ title: 'Veuillez entrer votre prénom', variant: 'destructive' });
      return;
    }
    if (!email.trim()) {
      toast({ title: 'Veuillez entrer votre email', variant: 'destructive' });
      return;
    }
    if (!password.trim() || password.length < 8) {
      toast({ title: 'Mot de passe invalide (8 caractères minimum)', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Les mots de passe ne correspondent pas', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      // Appel à ton API avec les données exactes attendues
      await register({
        email: email.trim(),
        password,
        password_confirmation: confirmPassword,
        nom: nom.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        country: country.trim(),
        preferred_language: 'fr' // Langue par défaut
      });

      toast({ 
        title: 'Compte créé avec succès !', 
        description: 'Veuillez vous connecter pour continuer.' 
      });
      
      // Redirection vers la page de connexion avec un message
      navigate('/connexion', { 
        state: { message: 'Compte créé avec succès. Veuillez vous connecter.' } 
      });
      
    } catch (error: any) {
      // Gestion des erreurs de l'API avec détails
      console.error('Erreur d\'inscription:', error);
      
      let errorMessage = 'Erreur lors de la création du compte';
      let errorTitle = 'Erreur';
      
      // Essayons d'extraire le message d'erreur de différentes façons
      if (error.response) {
        // Si c'est une erreur HTTP avec réponse
        const data = error.response.data;
        
        // Cas 1: Erreur Laravel typique avec champ "message"
        if (data.message) {
          errorMessage = data.message;
        }
        
        // Cas 2: Erreurs de validation Laravel (422)
        if (data.errors) {
          // Concaténer toutes les erreurs de validation
          const validationErrors = [];
          for (const field in data.errors) {
            if (Array.isArray(data.errors[field])) {
              validationErrors.push(...data.errors[field]);
            } else {
              validationErrors.push(data.errors[field]);
            }
          }
          if (validationErrors.length > 0) {
            errorMessage = validationErrors.join(', ');
          }
        }
        
        // Cas 3: Autre structure d'erreur
        if (data.error) {
          errorMessage = data.error;
        }
        
        // Ajouter le statut HTTP si disponible
        if (error.response.status) {
          errorTitle = `Erreur ${error.response.status}`;
        }
      } 
      // Cas 4: Erreur réseau ou autre
      else if (error.message) {
        errorMessage = error.message;
      }
      
      // Afficher un message spécifique pour les emails déjà utilisés
      if (errorMessage.toLowerCase().includes('email') && 
          (errorMessage.toLowerCase().includes('already') || 
           errorMessage.toLowerCase().includes('existe') ||
           errorMessage.toLowerCase().includes('utilisé'))) {
        errorTitle = 'Email déjà utilisé';
        errorMessage = 'Cette adresse email est déjà associée à un compte.';
      }
      
      // Afficher un message spécifique pour les mots de passe faibles
      if (errorMessage.toLowerCase().includes('password') || 
          errorMessage.toLowerCase().includes('mot de passe')) {
        errorTitle = 'Mot de passe invalide';
      }
      
      toast({ 
        title: errorTitle, 
        description: errorMessage, 
        variant: 'destructive',
        duration: 5000 // Garder plus longtemps pour lire
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
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Inscription</h1>
            <p className="text-muted-foreground">
              Créez votre compte pour planifier vos voyages au Bénin
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
                  <User className="w-4 h-4 text-primary" />
                  Nom *
                </label>
                <Input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Dupont"
                  className="h-12"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Prénom *
                </label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Jean"
                  className="h-12"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email *
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
                  <Phone className="w-4 h-4 text-primary" />
                  Téléphone
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 XX XX XX XX"
                  className="h-12"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Pays
                </label>
                <Input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Bénin"
                  className="h-12"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Mot de passe *
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
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 8 caractères
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Confirmer le mot de passe *
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12"
                  disabled={isLoading}
                  required
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
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Création...
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
              <p className="text-sm text-muted-foreground">
                Déjà inscrit ?{' '}
                <Link
                  to="/connexion"
                  state={{ from }}
                  className="text-primary font-medium hover:underline"
                >
                  Connectez-vous
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}