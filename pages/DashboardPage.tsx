
import React, { useState, useEffect, useCallback } from 'react';
import { User } from './LoginPage';

declare global {
  interface Window {
    Recharts: any;
  }
}

interface DashboardPageProps {
  user: User;
}

interface Campaign {
    songTitle: string;
    tier: string;
    status: string;
    date: string;
    regions?: string[];
    type: 'Radio' | 'TikTok' | 'LaunchPage';
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [rechartsStatus, setRechartsStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);

  useEffect(() => {
    // Collect all project types from local storage
    const radio = JSON.parse(localStorage.getItem('tsa-campaigns') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Radio' }));
    
    const tiktok = JSON.parse(localStorage.getItem('tsa-tiktok-orders') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'TikTok' }));

    const launch = JSON.parse(localStorage.getItem('tsa-artist-pages') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'LaunchPage', songTitle: 'Artist Portfolio' }));

    setActiveProjects([...radio, ...tiktok, ...launch]);

    if (window.Recharts) {
      setRechartsStatus('ready');
      return;
    }

    let attempts = 0;
    const intervalId = setInterval(() => {
      attempts++;
      if (window.Recharts) {
        setRechartsStatus('ready');
        clearInterval(intervalId);
      } else if (attempts > 50) {
        setRechartsStatus('error');
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [user.email]);
  
  if (rechartsStatus === 'loading') {
    return <div className="py-24 text-center text-white">Loading Performance Stats...</div>;
  }

  const { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                Artist Hub: <span className="text-neon-purple">{user.artistName}</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Manage your growth tools and distribution analytics.</p>
            </div>
            <div className="flex gap-3">
                <a href="#/radio-plugging" className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg text-sm hover:border-neon-purple transition-all">Plug Radio</a>
                <a href="#/tiktok-growth" className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg text-sm hover:border-neon-purple transition-all">TikTok Growth</a>
                <a href="#/artist-launch" className="px-4 py-2 bg-neon-purple text-white rounded-lg text-sm font-bold hover:scale-105 transition-all">Launch Page</a>
            </div>
        </div>

        {/* Unified Projects Table */}
        <div className="mt-12 bg-gray-900/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-6">Active Projects</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase">
                            <th className="pb-4">Type</th>
                            <th className="pb-4">Project</th>
                            <th className="pb-4">Package</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {activeProjects.length === 0 ? (
                            <tr><td colSpan={5} className="py-8 text-center text-gray-600 italic">No active projects. Start growing your sound!</td></tr>
                        ) : activeProjects.map((proj, idx) => (
                            <tr key={idx} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors text-sm">
                                <td className="py-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${proj.type === 'Radio' ? 'bg-blue-500/20 text-blue-400' : proj.type === 'TikTok' ? 'bg-pink-500/20 text-pink-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {proj.type}
                                    </span>
                                </td>
                                <td className="py-4 font-semibold text-white">{proj.songTitle}</td>
                                <td className="py-4 capitalize">{proj.tier}</td>
                                <td className="py-4">
                                    <span className="flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>
                                        {proj.status}
                                    </span>
                                </td>
                                <td className="py-4 text-gray-500">{new Date(proj.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Analytics Section - Simplified for this update */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-6">Audience Growth</h3>
                <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={[{n:'W1', s:100}, {n:'W2', s:250}, {n:'W3', s:800}, {n:'W4', s:1200}]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="n" stroke="#666" />
                        <Tooltip contentStyle={{backgroundColor:'#000', border:'none'}} />
                        <Area type="monotone" dataKey="s" stroke="#8A2BE2" fill="#8A2BE2" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 rounded-xl">
                        <span className="text-xs text-gray-500 block">TIKTOK USAGE</span>
                        <span className="text-2xl font-bold text-white">4.2K</span>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl">
                        <span className="text-xs text-gray-500 block">RADIO REACH</span>
                        <span className="text-2xl font-bold text-white">120K</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
