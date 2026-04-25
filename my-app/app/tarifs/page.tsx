'use client';
import { 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  Layout,
  Smartphone,
  Search,
  Lock,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function TarifsPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="mb-24">
          <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Star size={14} className="fill-blue-600" /> Investissement & Valeur
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-none mb-8 italic text-slate-900">
            Votre vision, <br/><span className="text-blue-600">mon obsession.</span>
          </h1>
          <p className="text-slate-700 font-bold italic text-xl max-w-3xl leading-relaxed">
            Je prends le temps nécessaire pour que chaque pixel soit parfait. Pas de précipitation, juste un travail artisanal de haute précision.
          </p>
        </div>

        {/* GRILLE DE TARIFS : (À partir de... / Focus Valeur) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {[
            {
              name: "Vitrine Alpha",
              price: "À partir de 1 500€",
              focus: "Objectif : Crédibilité",
              desc: "Une présence digitale qui rassure vos prospects et pose les bases de votre marque.",
              features: ["Design unique (Zéro Template)", "Architecture Next.js moderne", "SEO Technique optimisé", "Performance Mobile maximale", "Code source livré à 100%"],
              color: "bg-white text-slate-900 border-2 border-slate-200"
            },
            {
              name: "Business Pro",
              price: "À partir de 2 900€",
              focus: "Objectif : Conversion",
              desc: "Pour transformer votre site en un véritable outil d'acquisition de clients.",
              features: ["Tout le pack Alpha", "Interface de gestion (CMS)", "Automatisation des contacts", "Analyse sémantique SEO", "Support direct & personnalisé"],
              color: "bg-slate-950 text-white shadow-3xl lg:-translate-y-4 scale-105 border-slate-900"
            },
            {
              name: "Custom Studio",
              price: "Sur Devis",
              focus: "Objectif : Innovation",
              desc: "Pour les projets qui ne rentrent dans aucune case et demandent du sur-mesure.",
              features: ["Audit métier complet", "Développement d'outils métiers", "Intégrations complexes", "Sécurité & Tests poussés", "Évolutivité garantie"],
              color: "bg-white text-slate-900 border-2 border-slate-200"
            }
          ].map((plan, i) => (
            <div key={i} className={`p-12 rounded-[4rem] border flex flex-col shadow-sm ${plan.color}`}>
              <div className="mb-10">
                <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${plan.name === 'Business Pro' ? 'text-blue-400' : 'text-slate-400'}`}>
                  <Sparkles size={12} /> {plan.focus}
                </span>
                <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter mt-2 mb-4 italic">{plan.name}</h3>
                <div className="text-4xl font-[1000] tracking-tighter mb-6 italic">{plan.price}</div>
                <p className="text-sm font-bold italic opacity-80 leading-relaxed">{plan.desc}</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-[11px] font-black uppercase italic tracking-tighter">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`block text-center py-6 rounded-3xl font-[1000] uppercase text-[10px] tracking-widest transition-all ${plan.name === 'Business Pro' ? 'bg-blue-600 text-white hover:bg-white hover:text-slate-950' : 'bg-slate-950 text-white hover:bg-blue-600'}`}>
                Discuter du projet
              </Link>
            </div>
          ))}
        </div>

        {/* SECTION : LE STANDARD (POURQUOI PRENDRE SON TEMPS) */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter mb-4 italic text-slate-900">Ma méthode de travail_</h2>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Qualité artisanale vs production de masse</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, t: "Audit Initial", d: "Je prends le temps d'étudier votre marché avant de coder." },
              { icon: Zap, t: "Code Propre", d: "Une architecture légère et sans superflu pour durer des années." },
              { icon: Smartphone, t: "Tests Réels", d: "Je teste chaque page sur une dizaine d'appareils différents." },
              { icon: ShieldCheck, t: "Validation", d: "Rien n'est mis en ligne sans votre validation totale pixel par pixel." }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 p-8 rounded-[3rem] shadow-sm">
                <item.icon className="text-blue-600 mb-6" size={32} />
                <h4 className="font-black uppercase italic text-sm mb-3 text-slate-900">{item.t}</h4>
                <p className="text-slate-600 text-[11px] font-bold italic leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GARANTIES */}
        <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative shadow-3xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter mb-8 italic">Votre projet, <br/><span className="text-blue-500 text-outline">ma priorité.</span></h2>
              <p className="text-slate-400 font-bold italic mb-8">Je ne prends qu'un seul projet à la fois pour garantir une concentration totale sur votre business.</p>
              <div className="flex gap-4 items-center text-blue-500 font-black uppercase text-xs tracking-widest italic">
                <ShieldCheck size={20} /> Propriété intellectuelle garantie
              </div>
            </div>
            <div className="text-center lg:text-right">
              <Link href="/contact" className="inline-block bg-blue-600 text-white px-12 py-8 rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-slate-950 transition-all">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}