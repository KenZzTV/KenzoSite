'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Erreur : " + error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <form onSubmit={handleLogin} className="p-8 bg-[#111] border border-gray-800 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Espace Client</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          className="w-full p-3 mb-6 bg-black border border-gray-700 rounded text-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition">
          Se connecter
        </button>
      </form>
    </div>
  )
}