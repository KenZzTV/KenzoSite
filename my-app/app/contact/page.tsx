'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { sendEmail } from './actions';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête de la page */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Besoin d'une application sécurisée ou d'un audit ? Je vous réponds sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* --- COLONNE GAUCHE : INFOS DE CONTACT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6">Coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-lg">kenzopancaldi0@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Téléphone</p>
                    <p className="text-lg">+33 6 28 95 03 23</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Localisation</p>
                    <p className="text-lg">Toulouse, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Sécurité (pour rassurer) */}
            <div className="p-6 border border-blue-900/30 bg-blue-900/10 rounded-2xl flex items-start gap-4">
              <MessageSquare className="text-blue-400 shrink-0" size={24} />
              <p className="text-sm text-blue-200/70">
                Toutes vos données de projet sont traitées avec la plus grande confidentialité. 
                L'échange est sécurisé par un cryptage de bout en bout.
              </p>
            </div>
          </motion.div>

          {/* --- COLONNE DROITE : FORMULAIRE --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl"
          >
            <form action={async (formData) => {
              const result = await sendEmail(formData);
                if (result.success) {
                alert("Message envoyé avec succès !");
                 } else {
                  alert("Erreur lors de l'envoi.");
                    }
                  }}
                  className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Prénom</label>
                  <input name='nom'
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                    placeholder="Jean"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Nom</label>
                  <input name='prenom'
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email professionnel</label>
                <input name='email'
                  type="email" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  placeholder="jean@entreprise.fr"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Sujet</label>
                <select name='sujet' className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-gray-400">
                  <option value="Création de Dashboard / SaaS">Création de Dashboard / SaaS</option>
                  <option value="Forfait Maintenance & Sécurité">Forfait Maintenance & Sécurité</option>
                  <option value="Audit de sécurité">Audit de sécurité</option>
                  <option value="Autre">Autre demande</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea name='message'
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Décrivez brièvement votre besoin..."
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-blue-900/20"
              >
                Envoyer ma demande
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}