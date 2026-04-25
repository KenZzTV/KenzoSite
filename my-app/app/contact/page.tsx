'use client';

import { 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { sendEmail } from './actions'; 

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('sending');
    const result = await sendEmail(formData);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[700px]">
          
          {/* COLONNE GAUCHE : NOIRE */}
          <div className="lg:w-1/2 bg-slate-950 rounded-[4rem] p-12 md:p-16 text-white flex flex-col justify-between shadow-3xl">
            <div className="space-y-12">
              
              {/* BOUTON RETOUR À L'ACCUEIL */}
              <Link 
                href="/" 
                className="inline-flex items-center gap-3 text-slate-500 hover:text-blue-500 transition-all group mb-4"
              >
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-all">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                  Retour
                </span>
              </Link>

              <h1 className="text-5xl md:text-6xl font-[1000] uppercase italic tracking-tighter leading-tight">
                Prêt pour <br/><span className="text-blue-500">le décollage ?</span>
              </h1>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:bg-blue-600 transition-all">
                    <Mail size={24} className="text-blue-500 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Email Direct</div>
                    <div className="text-lg font-bold italic tracking-tighter">kzvstudio@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:bg-green-500 transition-all">
                    <MessageCircle size={24} className="text-green-500 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">WhatsApp Business</div>
                    <div className="text-lg font-bold italic tracking-tighter">+33 6 28 95 03 23</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-900">
               <div className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest mb-4">
                 <Clock size={14} /> Réponse sous 24h
               </div>
               <p className="text-xs text-slate-400 italic font-bold leading-relaxed">
                 Chaque demande est traitée personnellement par moi-même. Je ne fais pas de copier-coller.
               </p>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <div className="lg:w-2/3 bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl shadow-blue-900/10 border-2 border-slate-200">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900">Message envoyé !</h2>
                <p className="text-slate-500 font-bold italic">Je reviens vers vous dans les plus brefs délais.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-blue-600 font-black uppercase text-xs tracking-widest border-b-2 border-blue-600 pb-1"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form action={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 ml-4 italic">Votre Nom</label>
                    <input name="nom" required type="text" placeholder="ex: Marc" className="w-full bg-slate-100 border-2 border-slate-200 rounded-3xl p-6 italic font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 transition-all outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 ml-4 italic">Email</label>
                    <input name="email" required type="email" placeholder="ex: marc@business.com" className="w-full bg-slate-100 border-2 border-slate-200 rounded-3xl p-6 italic font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 transition-all outline-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 ml-4 italic">Votre Projet</label>
                  <div className="relative">
                    <select name="projet" className="w-full bg-slate-100 border-2 border-slate-200 rounded-3xl p-6 italic font-bold appearance-none outline-none focus:bg-white focus:border-blue-600 text-slate-900 cursor-pointer">
                      <option>Site Vitrine Alpha</option>
                      <option>Business Pro</option>
                      <option>Custom Studio</option>
                      <option>Maintenance / Autre</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                      <ArrowRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 ml-4 italic">Votre Message</label>
                  <textarea name="message" required rows={4} placeholder="Expliquez-nous vos objectifs..." className="w-full bg-slate-100 border-2 border-slate-200 rounded-3xl p-6 italic font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 transition-all outline-none resize-none" />
                </div>

                <button 
                  disabled={status === 'sending'} 
                  type="submit" 
                  className="bg-blue-600 text-white px-12 py-8 rounded-3xl font-[1000] uppercase text-sm tracking-[0.4em] shadow-2xl hover:bg-slate-950 transition-all flex items-center justify-center gap-4 w-full disabled:opacity-50"
                >
                  {status === 'sending' ? 'Décollage...' : 'Envoyer'} <Send size={20} />
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-center font-bold italic text-xs uppercase animate-pulse">
                    Oups ! Vérifie ta connexion ou ta clé API Resend.
                  </p>
                )}

                <div className="flex items-center gap-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest pt-8 border-t border-slate-100">
                   <ShieldCheck size={16} className="text-green-600" /> 
                   <span>RGPD : Vos données restent strictement confidentielles.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}