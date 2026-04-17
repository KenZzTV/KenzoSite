'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email });
    setMessage(error 
      ? { type: "error", text: error.message } 
      : { type: "success", text: "Email de confirmation envoyé !" }
    );
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error 
      ? { type: "error", text: error.message } 
      : { type: "success", text: "Mot de passe mis à jour !" }
    );
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-8">Paramètres du profil</h2>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg border ${message.type === "success" ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Email Form */}
        <section className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium mb-4">Modifier l'adresse email</h3>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Nouvel email"
              className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition disabled:opacity-50">
              Mettre à jour
            </button>
          </form>
        </section>

        {/* Password Form */}
        <section className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium mb-4">Changer le mot de passe</h3>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="w-full bg-black border border-gray-800 p-3 rounded-lg focus:border-blue-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button disabled={loading} className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg font-bold transition disabled:opacity-50">
              Mettre à jour
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}