'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, RefreshCcw, Check, Zap, Terminal, Globe, ArrowRight, Info, X, Cpu, TrendingUp, ShieldCheck, Wallet, Rocket } from 'lucide-react';
import { useState } from 'react';

// --- DATA STRATÉGIQUE AJUSTÉE ---
const PRICING_DATA = {
  construction: [
    {
      id: "starter",
      title: "Starter",
      price: "790€",
      subtitle: "Idéal Indépendants",
      shortFeatures: ["Page Unique (Landing)", "Design Pro", "Livraison 7j"],
      fullDetails: {
        title: "Pack Starter : Lancez-vous",
        description: "Une solution accessible pour garantir votre présence en ligne sans compromis sur la qualité.",
        points: [
          "Design épuré et moderne adapté à votre image",
          "Optimisation mobile (Responsive) totale",
          "Formulaire de contact et liens réseaux sociaux",
          "SEO de base (Indexation Google)",
          "Hébergement ultra-rapide inclus"
        ]
      }
    },
    {
      id: "elite",
      title: "Elite Vitrine",
      price: "1 990€",
      subtitle: "Le Best-Seller",
      isPopular: true,
      shortFeatures: ["Multi-pages", "Vortex Animé", "Gestionnaire CMS"],
      fullDetails: {
        title: "Pack Elite : Dominez votre secteur",
        description: "L'alliance de l'esthétique studio et de la puissance technique.",
        points: [
          "Architecture Multi-pages (Services, À propos, etc.)",
          "Animations signature (Vortex & Particules)",
          "Espace d'administration pour modifier vos textes/images",
          "Stratégie SEO approfondie pour être trouvé",
          "Performance optimisée pour un chargement instantané"
        ]
      }
    },
    {
      id: "empire",
      title: "SaaS Empire",
      price: "4 500€+",
      subtitle: "Solution Business",
      shortFeatures: ["Paiements Stripe", "Espace Client", "Sur-mesure"],
      fullDetails: {
        title: "Pack Empire : Votre plateforme métier",
        description: "Un véritable outil de travail automatisé pour scaler votre activité.",
        points: [
          "Espace membre sécurisé pour vos clients",
          "Intégration de paiements (Stripe/PayPal)",
          "Base de données complexe et sécurisée",
          "Automatisations métiers (Emails, Factures)",
          "Accompagnement stratégique sur-mesure"
        ]
      }
    }
  ],
  maintenance: [
    {
      id: "essentiel",
      title: "Essentiel",
      price: "49€/m",
      icon: ShieldCheck,
      shortFeatures: ["Backups", "Sécurité"],
      fullDetails: {
        title: "Maintenance Essentielle",
        description: "Le minimum vital pour dormir tranquille.",
        points: [
          "Sauvegardes hebdomadaires",
          "Mises à jour de sécurité critiques",
          "Certificat SSL inclus",
          "Monitoring de disponibilité"
        ]
      }
    },
    {
      id: "souverain",
      title: "Souverain",
      price: "149€/m",
      icon: Lock,
      isPopular: true,
      shortFeatures: ["Anti-DDoS", "Support Prioritaire"],
      fullDetails: {
        title: "Maintenance Souveraine",
        description: "Protection active et support réactif pour votre business.",
        points: [
          "Sauvegardes quotidiennes",
          "Protection contre les attaques (DDoS/Spam)",
          "1h de modifications offertes par mois",
          "Support WhatsApp prioritaire"
        ]
      }
    },
    {
      id: "croissance",
      title: "Croissance",
      price: "350€/m",
      icon: TrendingUp,
      shortFeatures: ["Dev Inclus", "Audit SEO"],
      fullDetails: {
        title: "Abonnement Croissance",
        description: "Votre site évolue en même temps que votre entreprise.",
        points: [
          "Toutes les options de Souverain",
          "3h de développement incluses / mois",
          "Optimisation SEO mensuelle",
          "Rapport de performance analytique"
        ]
      }
    }
  ]
};

export default function PricingPage() {
  const [activeInfo, setActiveInfo] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans italic pt-32 pb-20 overflow-x-hidden">
      
      {/* MODAL D'INFORMATION */}
      <AnimatePresence>
        {activeInfo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveInfo(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[50px] max-w-xl w-full shadow-2xl max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActiveInfo(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"><X size={32}/></button>
              <h2 className="text-3xl font-black uppercase italic text-blue-500 mb-6">{activeInfo.fullDetails.title}</h2>
              <p className="text-gray-400 font-bold uppercase text-[13px] leading-relaxed mb-10 border-l-4 border-blue-600 pl-4">{activeInfo.fullDetails.description}</p>
              <div className="space-y-6 mb-10">
                {activeInfo.fullDetails.points.map((p: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <Check className="text-blue-600 shrink-0 mt-1" size={18} />
                    <p className="text-[12px] font-black uppercase tracking-wide text-gray-300 group-hover:text-white transition-colors">{p}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveInfo(null)} className="w-full py-5 bg-blue-600 text-white rounded-full font-black uppercase italic hover:bg-white hover:text-black transition-all">Fermer</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* HEADER */}
        <header className="mb-32">
          <motion.h1 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-[10vw] font-[1000] leading-none tracking-tighter uppercase mb-6">TARIFS<br/><span className="text-blue-600">ACCESSIBLES_</span></motion.h1>
          <p className="text-gray-500 text-xl font-black uppercase tracking-tighter max-w-xl italic">L&apos;ingénierie d&apos;élite, adaptée à chaque étape de votre succès.</p>
        </header>

        {/* SECTION 1 : CRÉATION */}
        <section className="mb-48">
          <div className="flex items-center gap-4 mb-16">
            <Rocket className="text-blue-600" />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Construction de l&apos;Empire</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            {PRICING_DATA.construction.map((item) => (
              <div key={item.id} className={`relative p-10 rounded-[50px] border-2 transition-all flex flex-col ${item.isPopular ? 'bg-blue-600 border-blue-600 scale-105 shadow-2xl z-10' : 'bg-[#0a0a0a] border-white/5'}`}>
                <button onClick={() => setActiveInfo(item)} className="absolute top-8 left-8 text-[10px] font-black uppercase opacity-40 hover:opacity-100 flex items-center gap-2 italic">
                  <Info size={14} /> Détails complets
                </button>
                <h3 className="text-3xl font-black uppercase italic mt-12 mb-2">{item.title}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-8 ${item.isPopular ? 'text-blue-100' : 'text-gray-500'}`}>{item.subtitle}</p>
                <div className="text-5xl font-[1000] italic mb-10">{item.price}</div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {item.shortFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest">
                      <Check size={14} className={item.isPopular ? 'text-white' : 'text-blue-500'} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-full font-black uppercase italic text-sm ${item.isPopular ? 'bg-white text-blue-600 hover:bg-black hover:text-white' : 'bg-blue-600 text-white hover:bg-white hover:text-black'} transition-all shadow-xl`}>
                  Démarrer
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2 : ABONNEMENTS */}
        <section className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <Shield className="text-blue-600" />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Sécurité & Support</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_DATA.maintenance.map((item) => (
              <div key={item.id} className={`p-10 rounded-[45px] border ${item.isPopular ? 'bg-blue-600/10 border-blue-600 shadow-xl' : 'bg-[#0a0a0a] border-white/5'} relative group`}>
                 <button onClick={() => setActiveInfo(item)} className="absolute top-8 right-8 text-[10px] font-black opacity-30 group-hover:opacity-100 transition-opacity">
                    <Info size={18} />
                 </button>
                 <item.icon className="text-blue-500 mb-6" size={32} />
                 <h4 className="text-2xl font-black uppercase italic mb-2">{item.title}</h4>
                 <div className="text-4xl font-black italic mb-8">{item.price}</div>
                 <button className="w-full py-4 border border-white/10 hover:border-blue-600 hover:bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">S&apos;abonner</button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER ENGAGEMENT */}
        <section className="border-t border-white/5 pt-40 pb-20 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-[1000] uppercase italic leading-none mb-10">L&apos;ENGAGEMENT<br/><span className="text-blue-600 underline decoration-8">KZV.STUDIO_</span></h2>
              <p className="text-gray-500 font-black uppercase text-sm tracking-widest leading-relaxed mb-8">Nous accompagnons les créateurs, des premiers pas jusqu&apos;à l&apos;empire numérique.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { t: "Architecture", d: "Structure saine", icon: Wallet },
                { t: "Frontend", d: "Interface Elite", icon: Cpu },
                { t: "Vitesse", d: "Next.js 15", icon: Zap },
                { t: "Support", d: "Humain & Réactif", icon: Check }
              ].map((obj, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 group hover:border-blue-600 transition-colors">
                  <obj.icon className="text-blue-600 mb-4" size={24} />
                  <h4 className="text-[12px] font-black uppercase mb-1">{obj.t}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{obj.d}</p>
                </div>
              ))}
            </div>
        </section>
      </div>
    </div>
  );
}