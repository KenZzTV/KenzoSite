'use client';
import { ShieldCheck, LayoutDashboard, Activity, FileText, Settings, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Sidebar FIXE */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block shrink-0 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 mb-10">
          <ShieldCheck className="text-blue-500 w-8 h-8" />
          <Link href="/" className="font-bold text-xl tracking-wider text-blue-400">KZV</Link>
        </div>
        
        <nav className="space-y-2">
          <Link href="/dashboard">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Vue d'ensemble" />
          </Link>
          <NavItem icon={<Activity size={20}/>} label="Sécurité" />
          <Link href="/dashboard/reports">
            <NavItem icon={<FileText size={20}/>} label="Rapports" />
          </Link>
          <Link href="/dashboard/settings">
            <NavItem icon={<Settings size={20}/>} label="Paramètres" />
          </Link>
        </nav>
      </aside>

      {/* Zone de contenu principale */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header FIXE */}
        <header className="flex justify-between items-center p-8 border-b border-gray-800/50 bg-[#0a0a0a]">
          <h1 className="text-sm font-mono text-gray-500 uppercase tracking-widest">KZV Secure Systems</h1>
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 px-4 py-2 rounded-lg transition text-xs font-bold border border-red-600/20"
            >
              <LogOut size={14} /> DÉCONNEXION
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* CONTENU VARIABLE */}
        <main className="p-8 overflow-y-auto bg-[#0a0a0a] flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-gray-400 hover:bg-blue-600/10 hover:text-blue-400 group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}