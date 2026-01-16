import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Sliders, ToggleLeft, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { mockEngineSettings } from '@/data/mockAdminData';
import { useToast } from '@/hooks/use-toast';

export default function AdminEnginePage() {
  const [settings, setSettings] = useState(mockEngineSettings);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Paramètres sauvegardés avec succès' });
  };

  const toggleRule = (id: string) => {
    setSettings({
      ...settings,
      rules: settings.rules.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r
      ),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Moteur Intelligent</h1>
          <p className="text-muted-foreground">Configurez les paramètres du moteur de recommandation</p>
        </div>
        <Button variant="hero" className="gap-2" onClick={handleSave}>
          <Save className="w-4 h-4" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Budget Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-elegant"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-serif text-xl font-bold">Paramètres de budget</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Budget minimum (FCFA)</label>
              <Input
                type="number"
                value={settings.budgets.min}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    budgets: { ...settings.budgets, min: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Budget maximum (FCFA)</label>
              <Input
                type="number"
                value={settings.budgets.max}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    budgets: { ...settings.budgets, max: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Pas d'incrémentation</label>
              <Input
                type="number"
                value={settings.budgets.step}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    budgets: { ...settings.budgets, step: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Duration Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-elegant"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-serif text-xl font-bold">Paramètres de durée</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-4 block">
                Durée min-max : {settings.durations.min} - {settings.durations.max} jours
              </label>
              <Slider
                value={[settings.durations.min, settings.durations.max]}
                onValueChange={([min, max]) =>
                  setSettings({
                    ...settings,
                    durations: { min, max },
                  })
                }
                min={1}
                max={30}
                step={1}
              />
            </div>
          </div>
        </motion.div>

        {/* Travel Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-elegant"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-nature" />
            </div>
            <h2 className="font-serif text-xl font-bold">Types de voyage</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.travelTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full bg-secondary font-medium text-sm capitalize"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Ces types sont utilisés dans le formulaire du moteur de personnalisation.
          </p>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-elegant"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ToggleLeft className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-serif text-xl font-bold">Centres d'intérêt</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm capitalize"
              >
                {interest}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Ces centres d'intérêt influencent les recommandations d'expériences.
          </p>
        </motion.div>
      </div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-6 shadow-elegant"
      >
        <h2 className="font-serif text-xl font-bold mb-6">Règles de recommandation</h2>
        <div className="space-y-4">
          {settings.rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary"
            >
              <div>
                <div className="font-medium">{rule.name}</div>
                <div className="text-sm text-muted-foreground">
                  {rule.enabled ? 'Activée' : 'Désactivée'}
                </div>
              </div>
              <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
