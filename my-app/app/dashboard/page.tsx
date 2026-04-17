'use client';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  Settings, 
  Bell, 
  User,
  Activity,
  LogOut // J'ai changé l'icône pour LogOut, c'est plus parlant
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase'; // Import manquant ajouté
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <ShieldCheck className="text-blue-500 w-8 h-8" />
          <Link href='/'>KZV</Link>
        </div>
        
        <nav className="space-y-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Vue d'ensemble" active />
          <NavItem icon={<Activity size={20}/>} label="Sécurité" />
          <NavItem icon={<FileText size={20}/>} label="Rapports" />
          <NavItem icon={<Settings size={20}/>} label="Paramètres" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Bienvenue, Utilisateur</h1>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400 cursor-pointer hover:text-white mr-2" />
            
            {/* Bouton de Déconnexion intégré ici */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 px-4 py-2 rounded-lg transition text-sm font-medium border border-red-600/20"
            >
              <LogOut size={16} />
              Déconnexion
            </button>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ml-2">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Score Sécurité" value="98%" detail="Optimal" color="text-green-500" />
          <StatCard title="Menaces Bloquées" value="24" detail="+3 cette semaine" color="text-blue-500" />
          <StatCard title="Systèmes Actifs" value="12" detail="Tous opérationnels" color="text-purple-500" />
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-400">Dernières actions</h3>
          <div className="space-y-4">
            <ActivityItem text="Analyse complète effectuée" date="Il y a 2h" />
            <ActivityItem text="Mise à jour du pare-feu" date="Hier" />
            <ActivityItem text="Nouveau rapport PDF généré" date="2 jours" />
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Composants Utilitaires (inchangés mais nécessaires dans le fichier) ---

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${active ? 'bg-blue-600/10 text-blue-500' : 'text-gray-400 hover:bg-white/5'}`}>
      {icon} <span>{label}</span>
    </div>
  );
}

function StatCard({ title, value, detail, color }: any) {
  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-3xl font-bold my-2 ${color}`}>{value}</p>
      <p className="text-xs text-gray-500">{detail}</p>
    </div>
  );
}

function ActivityItem({ text, date }: any) {
  return (
    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
      <span className="text-sm">{text}</span>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
  );
}