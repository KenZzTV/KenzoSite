'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Animations pour l'apparition en cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } as const,
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // ou "tween"
      stiffness: 100,
      damping: 10,
    } as const,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* --- SECTION HERO --- */}
      <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4">
        
        {/* Lumières de fond animées */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"
          />
          <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 rounded-full blur-[120px]"
          />
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 mb-8">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Expertise Web & Sécurité</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Des applications web<br /> 
            <span className="text-blue-500">performantes</span> et <span className="text-purple-500">ultra-sécurisées</span>.
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
            Je crée votre infrastructure digitale de A à Z : du portfolio moderne au dashboard client privé, avec une maintenance pro incluse.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="group flex items-center gap-2 px-8 py-4 bg-blue-600 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300">
                Lancer mon projet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#offres" className="px-8 py-4 bg-gray-800 rounded-xl font-medium text-lg border border-gray-700 hover:bg-gray-700 transition duration-300">
                Voir mes forfaits
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION OFFRES --- */}
      <section id="offres" className="py-24 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center tracking-tight mb-16"
          >
            Mes solutions de Maintenance & Sécurité
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Forfait 1 */}
            <motion.div whileHover={{ y: -10 }} className="bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-xl">
              <Zap className="w-10 h-10 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold">Essentiel</h3>
              <p className="mt-4 text-gray-400 italic">Pour les indépendants</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-400">
                <li>• Mises à jour hebdomadaires</li>
                <li>• Sauvegardes cloud</li>
                <li>• Certificat SSL</li>
              </ul>
              <p className="mt-8 text-3xl font-bold">49€<span className="text-sm text-gray-500 font-normal"> /mois</span></p>
            </motion.div>

            {/* Forfait 2 - LE PLUS POPULAIRE */}
            <motion.div whileHover={{ y: -10 }} className="bg-gray-950 p-8 rounded-2xl border-2 border-blue-600 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Populaire</div>
              <Lock className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold">Expert</h3>
              <p className="mt-4 text-gray-400 italic">Sécurité & Dashboard</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-400">
                <li>• Tout le forfait Essentiel</li>
                <li>• Audit de sécurité mensuel</li>
                <li>• Dashboard client privé</li>
              </ul>
              <p className="mt-8 text-3xl font-bold">99€<span className="text-sm text-gray-500 font-normal"> /mois</span></p>
            </motion.div>

            {/* Forfait 3 */}
            <motion.div whileHover={{ y: -10 }} className="bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-xl">
              <ShieldCheck className="w-10 h-10 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold">Sur Mesure</h3>
              <p className="mt-4 text-gray-400 italic">Entreprises & Saas</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-400">
                <li>• Développement spécifique</li>
                <li>• Monitoring 24h/24</li>
                <li>• Support prioritaire</li>
              </ul>
              <p className="mt-8 text-3xl font-bold text-gray-500">Sur devis</p>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}