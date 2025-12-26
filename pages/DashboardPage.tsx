
// Import useCallback from react
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

  // Fixed error by ensuring useCallback is imported
  const fetchProjects = useCallback(() => {
    const radio = JSON.parse(localStorage.getItem('tsa-campaigns') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Radio' }));
    
    const tiktok = JSON.parse(localStorage.getItem('tsa-tiktok-orders') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'TikTok' }));

    const launch = JSON.parse(localStorage.getItem('tsa-artist-pages') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'LaunchPage', songTitle: 'Artist SmartLink' }));

    const radioDist = JSON.parse(localStorage.getItem('tsa-radio-distro') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'RadioDistro', tier: 'Broadcast HQ' }));

    const playlist = JSON.parse(localStorage.getItem('tsa-playlist-subs') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Playlist', songTitle: 'Playlist Pitch' }));

    const epks = JSON.parse(localStorage.getItem('tsa-epks') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'EPK', songTitle: 'EPK Kit' }));

    const syncs = JSON.parse(localStorage.getItem('tsa-sync-apps') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Sync', songTitle: 'Sync Opportunity' }));

    const accel = JSON.parse(localStorage.getItem('tsa-accelerator-apps') || '[]')
      .filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Accelerator', songTitle: 'Cohort Application' }));

    setActiveProjects([...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks, ...syncs, ...accel].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [user.email]);

  useEffect(() => {
    fetchProjects();

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
  }, [fetchProjects]);
  
  if (rechartsStatus === 'loading') {
    return <div className="py-24 text-center text-white">Initializing Artist Core...</div>;
  }

  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  const quickActions = [
    { label: 'Distribute Song', href: '#/pricing', icon: '💿' },
    { label: 'Radio Pitch', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok Trend', href: '#/tiktok-growth', icon: '📱' },
    { label: 'EPK Kit', href: '#/epk-service', icon: '📝' },
    { label: 'Live Radio', href: '#/ai-radio', icon: '🎙️' },
    { label: 'Sync Briefs', href: '#/sync-hub', icon: '🎥' },
  ];

  return (
    <div className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-neon-purple text-white text-[10px] font-black rounded uppercase">Verified Artist</span>
                    <span className="text-gray-500 text-xs">Member since {new Date().getFullYear()}</span>
                </div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                   {user.artistName} <span className="text-electric-blue">Control</span>
                </h1>
            </div>
            <div className="flex items-center gap-4 p-2 bg-gray-900 rounded-2xl border border-gray-800">
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-bold uppercase">Balance</div>
                    <div className="text-white font-black">$0.00</div>
                </div>
                <button className="px-4 py-2 bg-white text-black text-xs font-black rounded-xl hover:bg-neon-purple hover:text-white transition-all">Withdraw</button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Total Streams', val: '24.8K', color: 'text-neon-purple' },
                { label: 'Radio Spins', val: '142', color: 'text-electric-blue' },
                { label: 'TikTok Reach', val: '85K', color: 'text-white' },
                { label: 'Fan Base', val: '1.2K', color: 'text-neon-purple' }
            ].map(stat => (
                <div key={stat.label} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl">
                    <div className="text-[10px] text-gray-500 font-black uppercase mb-1">{stat.label}</div>
                    <div className={`text-3xl font-black ${stat.color}`}>{stat.val}</div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Quick Actions & Chart */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                    <h2 className="text-lg font-black text-white uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {quickActions.map(action => (
                            <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-4 bg-black/40 border border-gray-800 rounded-2xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all group">
                                <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">{action.icon}</span>
                                <span className="text-[10px] font-black text-gray-400 group-hover:text-white uppercase">{action.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-black text-white uppercase italic">Growth Velocity</h2>
                        <select className="bg-black text-[10px] font-bold text-gray-500 border border-gray-800 rounded-lg p-1 px-2">
                            <option>Last 30 Days</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={[{n:'W1', s:500}, {n:'W2', s:1200}, {n:'W3', s:2400}, {n:'W4', s:5800}]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="n" stroke="#444" axisLine={false} tickLine={false} fontSize={10} />
                            <Tooltip contentStyle={{backgroundColor:'#000', border:'none', borderRadius:'12px', fontSize:'10px', color:'#fff'}} />
                            <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={4} fill="url(#colorS)" />
                            <defs>
                                <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                    <h2 className="text-lg font-black text-white uppercase italic mb-6">Active Projects</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-800 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                    <th className="pb-4">Category</th>
                                    <th className="pb-4">Item</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeProjects.length === 0 ? (
                                    <tr><td colSpan={4} className="py-12 text-center text-gray-700 text-xs italic">No active projects found. Start a campaign to see it here!</td></tr>
                                ) : activeProjects.map((p, i) => (
                                    <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                                        <td className="py-4">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                                p.type === 'Radio' ? 'bg-blue-500/10 text-blue-400' :
                                                p.type === 'TikTok' ? 'bg-pink-500/10 text-pink-400' :
                                                p.type === 'EPK' ? 'bg-orange-500/10 text-orange-400' :
                                                p.type === 'Sync' ? 'bg-yellow-500/10 text-yellow-400' :
                                                'bg-green-500/10 text-green-400'
                                            }`}>{p.type}</span>
                                        </td>
                                        <td className="py-4 font-bold text-sm text-white">{p.songTitle || 'Untitled'}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse"></div>
                                                <span className="text-[10px] text-gray-300 font-bold uppercase">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right text-[10px] text-gray-600 font-mono">
                                            {new Date(p.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right: Insights & Social */}
            <div className="space-y-8">
                <div className="bg-gradient-to-br from-neon-purple/20 to-transparent border border-neon-purple/30 p-8 rounded-3xl">
                    <h3 className="text-white font-black uppercase italic mb-4">TSA AI Insights</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-xs text-gray-300 leading-relaxed">
                                <span className="text-electric-blue font-bold">Trending:</span> Amapiano rhythms are peaking in West Africa. Consider a "Lite Spark" TikTok campaign for your next release.
                            </p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-xs text-gray-300 leading-relaxed">
                                <span className="text-neon-purple font-bold">EPK Tip:</span> Labels are looking for live performance clips. Update your PR kit with video content to increase booking odds.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl">
                    <h3 className="text-white font-bold mb-6 flex justify-between items-center">
                        TSA Community
                        <span className="text-[10px] text-neon-purple font-black uppercase">Live</span>
                    </h3>
                    <div className="space-y-6">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex gap-4">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border border-gray-700" alt="User" />
                                <div>
                                    <div className="text-[10px] text-white font-bold">Artist_{i*2} <span className="text-gray-600 font-normal">pitched a song</span></div>
                                    <div className="text-[9px] text-gray-500 mt-0.5">{i*5} minutes ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#/community" className="block w-full mt-8 py-3 bg-gray-800 text-center text-[10px] font-black text-white uppercase rounded-xl hover:bg-white hover:text-black transition-all">Join the Chat</a>
                </div>

                <div className="bg-white p-8 rounded-3xl text-center">
                    <h3 className="text-black font-black uppercase mb-2">Music Accelerator</h3>
                    <p className="text-gray-600 text-[10px] mb-6">Cohort #4 starts in 14 days. 5 slots left.</p>
                    <a href="#/accelerator" className="block w-full py-4 bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-neon-purple transition-colors">Apply Now</a>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
