'use client';

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Bienvenue sur votre console</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Score Sécurité" value="98%" detail="Optimal" color="text-green-500" />
        <StatCard title="Menaces Bloquées" value="24" detail="+3 cette semaine" color="text-blue-500" />
        <StatCard title="Systèmes Actifs" value="12" detail="Tous opérationnels" color="text-purple-500" />
      </div>

      {/* Recent Activity */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-400">Dernières actions détectées</h3>
        <div className="space-y-4">
          <ActivityItem text="Analyse complète effectuée" date="Il y a 2h" />
          <ActivityItem text="Mise à jour du pare-feu v2.1" date="Hier" />
          <ActivityItem text="Nouveau rapport PDF généré" date="2 jours" />
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, detail, color }: any) {
  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <p className={`text-3xl font-bold my-2 ${color}`}>{value}</p>
      <p className="text-xs text-gray-500">{detail}</p>
    </div>
  );
}

function ActivityItem({ text, date }: any) {
  return (
    <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
      <span className="text-sm text-gray-300">{text}</span>
      <span className="text-xs text-gray-500 font-mono">{date}</span>
    </div>
  );
}