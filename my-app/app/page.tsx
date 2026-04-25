'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { 
  Laptop, Code2, CheckCircle2, ArrowRight, Layout, Smartphone, 
  ShieldCheck, Clock, Zap, Target, Eye, Handshake, Sparkles, 
  Star, Rocket, MousePointer2, ClipboardCheck, Lock, 
  BarChart3, Fingerprint, MessagesSquare, Lightbulb, Smile
} from 'lucide-react';
import Link from 'next/link';
import { kzvIcon } from '../public/kzv-icon.png';

// --- FOND 3D INTERACTIF (PHYSIQUE RAYCASTER) ---
const TechCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Création d'un nuage de particules (Digital Grid)
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: '#3b82f6',
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Ajout d'une structure en fil de fer (The Core)
    const coreGeometry = new THREE.IcosahedronGeometry(20, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: '#3b82f6',
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    camera.position.z = 50;

    // Animation au mouvement de souris
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Suivi fluide de la souris
      core.rotation.y += 0.005;
      scene.rotation.y += (mouseX - scene.rotation.y) * 0.05;
      scene.rotation.x += (mouseY - scene.rotation.x) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-[#020617]" />;
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-slate-950 font-sans selection:bg-blue-100 overflow-x-hidden">
      <TechCanvas />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-2xl border border-slate-200 p-4 rounded-[2rem] shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-3 font-[1000] text-2xl tracking-tighter uppercase italic">
            <img src="/kzv-icon.png" alt="logo KZV" width="120" height="120" />
            KZV<span className="text-blue-600">.</span>STUDIO
          </div>
          <div className="hidden lg:flex gap-8 items-center">
            <Link href="#expert" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expertise</Link>
            <Link href="#comparatif" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pourquoi nous ?</Link>
            <Link href="/tarifs" className="bg-slate-950 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">Lancer un projet</Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO - TEXTE MASSIF */}
      <section className="relative pt-64 pb-40 px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-7xl md:text-[11rem] font-[1000] leading-[0.8] tracking-[ -0.05em] uppercase mb-16 italic text-blue-900">
              Le web,<br /><span className="text-blue-600">sans effort.</span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                <p className="text-2xl md:text-5xl text-slate-500 font-medium leading-none italic tracking-tighter">
                    Nous créons des sites web sur-mesure, rapides et sécurisés, sans que vous ayez à lever le petit doigt. Pas de frais cachés, juste un site qui performe et vous appartient à 100%.
                </p>
                <div className="flex flex-col gap-6 items-start lg:items-end">
                    <Link href="/contact?type=audit">
                      <button className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-[1000] uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center gap-4 group">
                        Démarrer l'audit
                      </button>
                    </Link>
                    <div className="flex items-center gap-4 text-slate-400 font-black text-[9px] uppercase tracking-[0.2em]">
                        <CheckCircle2 size={14} className="text-green-500" /> Propriété totale du code
                        <CheckCircle2 size={14} className="text-green-500" /> Zéro frais mensuels cachés
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SECTION CONTRASTÉE : L'EXPERTISE RÉELLE */}
      <section id="expert" className="relative z-10 py-40 px-8 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 shadow-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div className="space-y-8">
              <div className="text-blue-500 font-black text-xs uppercase tracking-[0.5em]">L&apos;Approche</div>
              <h2 className="text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none">
                Le design est une <br/><span className="text-blue-500">stratégie,</span> pas une option.
              </h2>
            </div>
            <div className="space-y-8 text-xl text-slate-400 font-medium italic leading-relaxed">
              <p>
                Un beau site qui ne convertit pas est une dépense. Un site bien pensé est un investissement. Chez KZV, nous analysons votre marché avant de poser la première brique.
              </p>
              <p>
                Nous créons des expériences digitales qui captivent, engagent et transforment les visiteurs en clients fidèles. Chaque pixel a un but, chaque interaction est optimisée pour la conversion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Lightbulb, t: "Vision Produit", d: "On ne crée pas juste un site, on définit l'outil de croissance de votre entreprise." },
              { icon: BarChart3, t: "Data Driven", d: "Optimisation des parcours clients pour transformer chaque visiteur en client." },
              { icon: Fingerprint, t: "Identité Forte", d: "Un design qui ne ressemble à aucun autre. Votre site devient votre signature." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-slate-800/50 rounded-[3rem] border border-slate-700">
                <item.icon className="text-blue-500 mb-6" size={40} />
                <h4 className="text-xl font-black uppercase italic mb-4">{item.t}</h4>
                <p className="text-slate-500 text-sm italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION COMPARATIVE : ARTISAN VS MASSE */}
      <section id="comparatif" className="relative z-10 py-40 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter mb-4 italic text-blue-500">Pourquoi nous ?</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">La différence entre un outil et un succès</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-12 rounded-[3.5rem] opacity-60 shadow-sm">
                <h3 className="text-2xl font-[1000] uppercase italic mb-8 italic text-slate-400">Solutions &quot;Automatiques&quot;</h3>
                <ul className="space-y-6">
                    {["Lenteurs structurelles", "Design déjà vu partout", "Abonnements à vie", "Référencement limité", "Support robotisé"].map((txt, i) => (
                        <li key={i} className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase italic tracking-tighter">
                            <span className="text-red-500">✕</span> {txt}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-600 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-500/20">
                <h3 className="text-2xl font-[1000] uppercase italic mb-8 italic">Le Studio KZV</h3>
                <ul className="space-y-6">
                    {["Vitesse de chargement", "Design exclusif sur-mesure", "Vous êtes 100% propriétaire", "SEO Optimisé", "Ligne directe avec le créateur"].map((txt, i) => (
                        <li key={i} className="flex items-center gap-4 font-black text-xs uppercase italic tracking-tighter">
                            <span className="text-white">✓</span> {txt}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* 4. LE PROCESSUS IMMERSIF */}
      <section className="relative z-10 py-40 px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-16">
                    <div className="flex gap-8">
                        <div className="text-5xl font-[1000] text-blue-200 italic">01</div>
                        <div>
                            <h4 className="text-2xl font-[1000] uppercase italic mb-2 tracking-tighter">Architecture & Design</h4>
                            <p className="text-slate-500 italic font-medium leading-relaxed">Nous créons un prototype interactif. Vous validez l&apos;esthétique et le fonctionnement avant que le code ne commence.</p>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="text-5xl font-[1000] text-blue-200 italic">02</div>
                        <div>
                            <h4 className="text-2xl font-[1000] uppercase italic mb-2 tracking-tighter">Ingénierie & Performance</h4>
                            <p className="text-slate-500 italic font-medium leading-relaxed">Je développe votre site avec une obsession pour la légèreté et la sécurité. Le résultat : un site fluide et inattaquable.</p>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="text-5xl font-[1000] text-blue-200 italic">03</div>
                        <div>
                            <h4 className="text-2xl font-[1000] uppercase italic mb-2 tracking-tighter">Support & Evolution</h4>
                            <p className="text-slate-500 italic font-medium leading-relaxed">Le lancement n&apos;est que le début. Je surveille votre site et vous accompagne pour le faire grandir avec votre business.</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-slate-900 rounded-[4rem] aspect-square p-20 flex items-center justify-center shadow-3xl overflow-hidden group">
                        <Rocket size={120} className="text-blue-500 group-hover:-translate-y-4 group-hover:translate-x-4 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. ENGAGEMENTS & GARANTIES */}
      <section className="relative z-10 py-40 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
                { icon: Lock, t: "Propriété Totale", d: "Contrairement aux agences, je vous donne les clés. Code, domaine, hébergement : tout vous appartient légalement." },
                { icon: MessagesSquare, t: "Support Messagerie", d: "Une question ? Une idée ? Une messagerie pour une réactivité totale au quotidien." },
                { icon: ClipboardCheck, t: "Devis Ferme", d: "Pas de dépassement. Le prix fixé au début est le prix payé à la fin. Point." },
                { icon: Zap, t: "TRAVAIL DE PRÉCISION", d: "Je ne travaille pas à la chaîne. En tant que développeur dédié, je consacre le temps nécessaire à chaque ligne de code pour garantir un résultat robuste, propre et parfaitement conforme à vos besoins." },
                { icon: Smartphone, t: "Mobile Native", d: "Votre site sera aussi beau sur un téléphone que sur un ordinateur. C'est là qu'est votre trafic." },
                { icon: Handshake, t: "DÉPLOIEMENT ACCOMPAGNÉ", d: "Je vous accompagne jusqu'au bout. La mise en ligne technique et la configuration de votre serveur sont incluses pour tout projet lié à une offre de maintenance, vous garantissant un démarrage sans stress" }
            ].map((item, i) => (
                <div key={i} className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                    <item.icon className="text-blue-600 mb-8" size={32} />
                    <h4 className="text-lg font-[1000] uppercase italic mb-4 tracking-tighter">{item.t}</h4>
                    <p className="text-slate-400 text-xs italic font-medium leading-relaxed">{item.d}</p>
                </div>
            ))}
        </div>
      </section>

      {/* 6. MOT DU FONDATEUR */}
      <section className="relative z-10 py-40 px-8 max-w-4xl mx-auto text-center">
        <Smile size={48} className="text-blue-600 mx-auto mb-10" />
        <h2 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter mb-10 italic text-blue-600">C&apos;est personnel.</h2>
        <p className="text-2xl text-slate-500 font-medium italic leading-relaxed mb-16">
            &quot;Chaque projet qui sort du studio porte mon nom. Je ne livre rien dont je ne sois pas fier à 100%. Travailler ensemble, c&apos;est choisir un artisan qui prend votre réussite à cœur.&quot;
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-48 bg-slate-950 text-white rounded-t-[5rem]">
        <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-6xl md:text-[10rem] font-[1000] uppercase italic tracking-tighter mb-20 leading-[0.8]">
                Parlons de <br/><span className="text-blue-500">demain.</span>
            </h2>
            <div className="flex flex-col items-center gap-12">
                <a 
                    href="/contact"
                    className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-[1000] uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center gap-4 group w-fit"
                  >
                    Demander mon devis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </a>
                <div className="flex flex-wrap justify-center gap-10 opacity-30 text-[10px] font-black uppercase tracking-[0.5em] italic">
                    <span>Code Artisanal</span>
                    <span>Design Haute Couture</span>
                    <span>Performance Max</span>
                </div>
            </div>
            <p className="mt-40 text-[10px] font-black uppercase tracking-[0.8em] text-slate-700">
                © 2026 KZV.STUDIO — développeur web fullstack. 
            </p>
        </div>
      </footer>
    </main>
  );
}