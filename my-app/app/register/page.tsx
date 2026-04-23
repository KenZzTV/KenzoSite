'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Inscription réussie ! Vérifiez vos emails pour confirmer votre compte.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111] border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <ShieldCheck className="text-blue-500 w-12 h-12 mb-2" />
          <h1 className="text-2xl font-bold text-white">Créer un compte KZV</h1>
          <p className="text-gray-400 text-sm">Accédez à votre console de sécurité</p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg border text-sm ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email professionnel</label>
            <input
              type="email"
              className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none transition text-white"
              placeholder="nom@entreprise.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Mot de passe</label>
            <input
              type="password"
              className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none transition text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 shadow-lg shadow-blue-900/20"
          >
            {loading ? 'Création en cours...' : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Déjà un compte ? <Link href="/login" className="text-blue-400 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}   