
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
    songTitle?: string;
    artistName?: string;
    tier?: string;
    status: string;
    date: string;
    type: 'Radio' | 'TikTok' | 'LaunchPage' | 'RadioDistro' | 'Playlist' | 'EPK' | 'Sync' | 'Accelerator';
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [rechartsStatus, setRechartsStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);

  useEffect(() => {
    const radio = JSON.parse(localStorage.getItem('tsa-campaigns') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Radio' }));
    
    const tiktok = JSON.parse(localStorage.getItem('tsa-tiktok-orders') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'TikTok' }));

    const launch = JSON.parse(localStorage.getItem('tsa-artist-pages') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'LaunchPage', songTitle: 'Portfolio Site' }));

    const radioDist = JSON.parse(localStorage.getItem('tsa-radio-distro') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'RadioDistro', tier: 'High-Res Delivery' }));

    const playlist = JSON.parse(localStorage.getItem('tsa-playlist-subs') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Playlist', songTitle: 'Playlist Pitch', tier: 'Review' }));

    const epks = JSON.parse(localStorage.getItem('tsa-epks') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'EPK', songTitle: 'Press Kit v1' }));

    setActiveProjects([...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

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
    return <div className="py-24 text-center text-white">Loading Your Creative Hub...</div>;
  }

  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  return (
    <div className="py-12 sm:py-16 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
                {user.artistName} <span className="text-neon-purple">Portal</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Manage your music assets and growth tools.</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <a href="#/radio-plugging" className="px-3 py-1 bg-gray-900 border border-gray-800 text-[10px] text-white rounded font-bold uppercase hover:border-neon-purple">Plugger</a>
                <a href="#/tiktok-growth" className="px-3 py-1 bg-gray-900 border border-gray-800 text-[10px] text-white rounded font-bold uppercase hover:border-neon-purple">TikTok</a>
                <a href="#/epk-service" className="px-3 py-1 bg-gray-900 border border-gray-800 text-[10px] text-white rounded font-bold uppercase hover:border-neon-purple">PR Kit</a>
                <a href="#/sync-hub" className="px-3 py-1 bg-gray-900 border border-gray-800 text-[10px] text-white rounded font-bold uppercase hover:border-neon-purple">Sync</a>
                <a href="#/accelerator" className="px-4 py-1 bg-electric-blue text-black rounded font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Accelerator</a>
            </div>
        </div>

        <div className="mt-12 bg-gray-900/40 border border-gray-800 rounded-3xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Active Projects</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                            <th className="pb-4">Type</th>
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Package</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Launched</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {activeProjects.length === 0 ? (
                            <tr><td colSpan={5} className="py-12 text-center text-gray-600 italic text-sm">No active projects. Start your next campaign above!</td></tr>
                        ) : activeProjects.map((proj, idx) => (
                            <tr key={idx} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors text-sm">
                                <td className="py-4">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                        proj.type === 'Radio' ? 'bg-blue-500/20 text-blue-400' : 
                                        proj.type === 'TikTok' ? 'bg-pink-500/20 text-pink-400' : 
                                        proj.type === 'EPK' ? 'bg-orange-500/20 text-orange-400' :
                                        proj.type === 'RadioDistro' ? 'bg-purple-500/20 text-purple-400' :
                                        proj.type === 'Playlist' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-green-500/20 text-green-400'}`}>
                                        {proj.type}
                                    </span>
                                </td>
                                <td className="py-4 font-bold text-white">{proj.songTitle}</td>
                                <td className="py-4 capitalize text-xs text-gray-500">{proj.tier || 'Standard'}</td>
                                <td className="py-4">
                                    <span className="flex items-center text-xs text-white">
                                        <span className="w-1 h-1 rounded-full bg-neon-purple mr-2 animate-ping"></span>
                                        {proj.status}
                                    </span>
                                </td>
                                <td className="py-4 text-[10px] text-gray-600 font-mono">{new Date(proj.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-12 bg-gray-900/30 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-lg font-black text-white mb-8 uppercase tracking-widest">Growth Velocity</h3>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[{n:'W1', s:200}, {n:'W2', s:650}, {n:'W3', s:1400}, {n:'W4', s:3200}]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="n" stroke="#444" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor:'#000', border:'none', borderRadius:'12px', fontSize:'12px'}} />
                    <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={4} fill="#8A2BE2" fillOpacity={0.1} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
