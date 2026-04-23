'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Zap, ShieldCheck, 
  Smartphone, Globe, Code2, CheckCircle2, 
  Plus, Minus, Target, MousePointer2
} from 'lucide-react';

// --- BACKGROUND 3D : L'OBJET MALLÉABLE ---
const GravityBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef(new THREE.Vector2(-100, -100)); // Position hors écran au début

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
    renderer.setPixelRatio(1);

    // On crée une géométrie avec assez de points pour voir la déformation
    const geometry = new THREE.IcosahedronGeometry(20, 4); 
    const originalPositions = geometry.attributes.position.array.slice(); // On garde les positions d'origine
    
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x2563eb,
      wireframe: true, 
      transparent: true, 
      opacity: 0.4 
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 50;

    const raycaster = new THREE.Raycaster();

    const animate = () => {
      const time = Date.now() * 0.001;
      mesh.rotation.y += 0.001; // Rotation constante très lente

      // Mise à jour de la déformation
      const positions = geometry.attributes.position.array;
      raycaster.setFromCamera(mouse.current, camera);

      for (let i = 0; i < positions.length; i += 3) {
        // Position actuelle du point
        const v = new THREE.Vector3(positions[i], positions[i+1], positions[i+2]);
        const worldV = v.clone().applyMatrix4(mesh.matrixWorld);
        
        // Calcul de la distance entre la souris (rayon) et le point
        const dist = raycaster.ray.distanceToPoint(worldV);
        
        // Cible (Position d'origine)
        const origX = originalPositions[i];
        const origY = originalPositions[i+1];
        const origZ = originalPositions[i+2];

        if (dist < 12) { // Rayon d'influence de la souris
          const force = (12 - dist) / 12;
          // On pousse le point vers le centre de l'objet (effet d'écrasement)
          positions[i] += (0 - positions[i]) * force * 0.2;
          positions[i+1] += (0 - positions[i+1]) * force * 0.2;
          positions[i+2] += (0 - positions[i+2]) * force * 0.2;
        } else {
          // Régénération : On ramène doucement vers l'origine
          positions[i] += (origX - positions[i]) * 0.1;
          positions[i+1] += (origY - positions[i+1]) * 0.1;
          positions[i+2] += (origZ - positions[i+2]) * 0.1;
        }
      }
      
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-slate-50" />;
};

// --- FAQ ITEM ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left group">
        <span className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{question}</span>
        {isOpen ? <Minus className="text-blue-600" /> : <Plus className="text-slate-400 group-hover:text-blue-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pt-4 text-slate-500 leading-relaxed italic">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-slate-950 overflow-x-hidden selection:bg-blue-100 font-sans">
      <GravityBackground />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Code2 className="text-white" size={18} />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">KZV.STUDIO</span>
          </div>
          <button className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
            Parlons de vous
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-48 pb-32 px-8 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] uppercase tracking-widest mb-10 border border-blue-100">
            <Sparkles size={14} /> Design Interactif & Code Haute Performance
          </div>
          <h1 className="text-6xl md:text-[9vw] font-[1000] leading-[0.85] tracking-tight uppercase mb-10">
            Le futur est<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Malléable.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12">
            Passez votre souris sur l&apos;arrière-plan pour voir la puissance de nos interfaces. Nous créons des expériences que vos clients n&apos;oublieront jamais.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs flex items-center gap-3 shadow-xl shadow-blue-200">
               Lancer mon projet <ArrowRight size={18} />
             </button>
             <div className="flex items-center gap-2 bg-white/40 border border-slate-100 px-6 py-4 rounded-[2rem]">
               <MousePointer2 className="text-blue-600 animate-bounce" size={16}/>
               <span className="text-xs font-bold text-slate-500 tracking-wider">Touchez l&apos;objet avec votre souris</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES DENSE */}
      <section className="relative z-10 py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Smartphone/>, color: 'blue', t: 'Web & Mobile', d: 'Apps fluides sous Next.js et React Native.' },
          { icon: <Globe/>, color: 'indigo', t: 'Architecture', d: 'Cloud scalable et sécurité maximale.' },
          { icon: <Zap/>, color: 'pink', t: 'Audit Tech', d: 'Analyse et boost de vos performances.' }
        ].map(s => (
          <div key={s.t} className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border border-white shadow-sm hover:border-blue-200 transition-all">
            <div className="text-blue-600 mb-6">{s.icon}</div>
            <h3 className="text-2xl font-black uppercase mb-4 italic">{s.t}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{s.d}</p>
          </div>
        ))}
      </section>

      {/* MÉTHODE */}
      <section className="relative z-10 py-24 px-8 bg-slate-950 rounded-[4rem] mx-4 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 text-center leading-none">Notre Méthode<br/><span className="text-blue-600">Gagnante_</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { n: '01', t: 'Stratégie', d: 'On définit le "Pourquoi" avant le "Comment".' },
              { n: '02', t: 'Design', d: 'Prototypes interactifs pour valider l&apos;idée.' },
              { n: '03', t: 'Développement', d: 'Code propre, rapide et testé.' },
              { n: '04', t: 'Suivi', d: 'Support et évolution de votre produit.' }
            ].map(i => (
              <div key={i.n} className="flex gap-6">
                <span className="text-4xl font-black text-blue-600 italic opacity-50">{i.n}</span>
                <div>
                  <h4 className="text-xl font-bold uppercase italic mb-2">{i.t}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{i.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-32 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black uppercase text-center mb-16 italic text-slate-950 underline decoration-blue-500 decoration-4">On répond à vos doutes_</h2>
        <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/60">
          <FAQItem question="Quel budget pour un projet ?" answer="Nos tarifs sont adaptés à l'ampleur du projet. Contactez-nous pour un devis personnalisé sous 24h." />
          <FAQItem question="Le code m'appartient-il ?" answer="Oui, vous êtes l'unique propriétaire du code source et de l'infrastructure à la fin du projet." />
          <FAQItem question="Délai de livraison ?" answer="Un premier prototype est généralement prêt sous 15 jours." />
        </div>
      </section>

      {/* FINAL CTA */}
      <footer className="py-32 text-center z-10 relative">
        <h2 className="text-[10vw] font-black uppercase italic mb-10 text-slate-950">Prêt ?</h2>
        <button className="bg-blue-600 text-white px-16 py-6 rounded-full font-black uppercase text-xl hover:scale-105 transition-transform shadow-2xl">Démarrer maintenant</button>
        <p className="mt-20 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 italic">KZV.STUDIO — CRAFTING INTERACTIVE EXCELLENCE</p>
      </footer>
    </main>
  );
}