'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { FileText, Download, Clock } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      // 1. Récupérer l'ID de l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Récupérer les rapports liés à cet utilisateur
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error) setReports(data);
      }
      setLoading(false);
    }
    fetchReports();
  }, []);

  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-bold mb-6">Mes Rapports de Sécurité</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Chargement des rapports...</p>
      ) : reports.length > 0 ? (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-[#111] border border-gray-800 p-5 rounded-xl flex items-center justify-between hover:border-blue-500/50 transition group">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">{report.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(report.created_at).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-full border ${report.status === 'Terminé' ? 'border-green-500/50 text-green-500' : 'border-yellow-500/50 text-yellow-500'}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
              <a 
                href={report.pdf_url} 
                target="_blank" 
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition font-medium"
              >
                <Download size={16} /> Voir le rapport
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111] border border-dashed border-gray-800 rounded-2xl">
          <FileText className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">Aucun rapport disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
}