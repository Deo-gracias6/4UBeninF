import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Loader2, ArrowLeft, Phone, Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function RegisterPage() {
  const [nom, setNom] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour les erreurs de champs
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  // Validation locale avant envoi
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Le prénom est requis';
    }

    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])/.test(password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une minuscule';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule';
    } else if (!/(?=.*\d)/.test(password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation locale
    if (!validateForm()) {
      toast({ 
        title: 'Formulaire incomplet', 
        description: 'Veuillez corriger les erreurs dans le formulaire',
        variant: 'destructive' 
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email: email.trim(),
        password,
        password_confirmation: confirmPassword,
        nom: nom.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        country: country.trim(),
        preferred_language: 'fr'
      });

      toast({ 
        title: '✅ Compte créé avec succès !', 
        description: 'Vous pouvez maintenant vous connecter.',
        className: 'bg-green-50 border-green-200'
      });
      
      navigate('/connexion', { 
        state: { email, message: 'Compte créé ! Connectez-vous maintenant.' } 
      });
      
    } catch (error: any) {
      console.error('❌ Erreur inscription:', error);
      
      const response = error.response?.data;
      const status = error.response?.status;

      // Réinitialiser les erreurs
      const fieldErrors: Record<string, string> = {};
      let toastTitle = 'Erreur d\'inscription';
      let toastMessage = 'Une erreur est survenue lors de la création du compte';

      // ✅ Gestion des erreurs par code HTTP
      if (status === 409) {
        // Conflit = Email déjà utilisé
        toastTitle = '📧 Email déjà utilisé';
        toastMessage = 'Cette adresse email est déjà associée à un compte existant. Essayez de vous connecter ou utilisez un autre email.';
        fieldErrors.email = 'Cet email est déjà utilisé';
      } 
      else if (status === 422) {
        // Erreurs de validation
        toastTitle = '⚠️ Données invalides';
        
        if (response?.errors) {
          // Erreurs Laravel détaillées par champ
          const allErrors: string[] = [];
          
          for (const field in response.errors) {
            const messages = Array.isArray(response.errors[field]) 
              ? response.errors[field] 
              : [response.errors[field]];
            
            // Mapper les noms de champs backend vers frontend
            const fieldMap: Record<string, string> = {
              'nom': 'nom',
              'last_name': 'lastName',
              'email': 'email',
              'password': 'password',
              'password_confirmation': 'confirmPassword',
              'phone': 'phone',
              'country': 'country'
            };
            
            const frontendField = fieldMap[field] || field;
            fieldErrors[frontendField] = messages[0];
            allErrors.push(`${this.translateField(field)}: ${messages[0]}`);
          }
          
          toastMessage = allErrors.join(' • ');
        } else if (response?.message) {
          toastMessage = response.message;
        }
      }
      else if (status === 400) {
        // Mauvaise requête
        toastTitle = '⚠️ Requête invalide';
        toastMessage = response?.message || 'Les données envoyées sont invalides';
      }
      else if (status === 500) {
        // Erreur serveur
        toastTitle = '🔧 Erreur serveur';
        toastMessage = 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.';
      }
      else if (!status) {
        // Erreur réseau
        toastTitle = '🌐 Erreur de connexion';
        toastMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
      }
      else {
        // Autre erreur
        toastMessage = response?.message || error.message || toastMessage;
      }

      // Afficher les erreurs de champs
      setErrors(fieldErrors);
      
      // Toast global
      toast({ 
        title: toastTitle, 
        description: toastMessage, 
        variant: 'destructive',
        duration: 6000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Traduction des noms de champs
  const translateField = (field: string): string => {
    const translations: Record<string, string> = {
      'nom': 'Nom',
      'last_name': 'Prénom',
      'email': 'Email',
      'password': 'Mot de passe',
      'password_confirmation': 'Confirmation',
      'phone': 'Téléphone',
      'country': 'Pays'
    };
    return translations[field] || field;
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
              {/* Nom */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Nom *
                </label>
                <Input
                  type="text"
                  value={nom}
                  onChange={(e) => {
                    setNom(e.target.value);
                    if (errors.nom) setErrors({ ...errors, nom: '' });
                  }}
                  placeholder="Dupont"
                  className={`h-12 ${errors.nom ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.nom && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.nom}
                  </p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Prénom *
                </label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors({ ...errors, lastName: '' });
                  }}
                  placeholder="Jean"
                  className={`h-12 ${errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="votre@email.com"
                  className={`h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Téléphone */}
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

              {/* Pays */}
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

              {/* Mot de passe */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Mot de passe *
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="••••••••"
                  className={`h-12 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.password ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    8 caractères minimum avec majuscule, minuscule et chiffre
                  </p>
                )}
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Confirmer le mot de passe *
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="••••••••"
                  className={`h-12 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
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
                    Création en cours...
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
