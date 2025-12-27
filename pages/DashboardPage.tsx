
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

  // Aggregate all campaign types from the TSA ecosystem
  const fetchProjects = useCallback(() => {
    try {
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

      setActiveProjects([...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks, ...syncs, ...accel]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (e) {
      console.error("Dashboard data fetch error:", e);
    }
  }, [user.email]);

  useEffect(() => {
    fetchProjects();

    const checkRecharts = () => {
        // Critical: Ensure window.Recharts is populated and AreaChart is a valid constructor
        if (window.Recharts && typeof window.Recharts.AreaChart === 'function') {
          setRechartsStatus('ready');
          return true;
        }
        return false;
    };

    if (!checkRecharts()) {
        let attempts = 0;
        const intervalId = setInterval(() => {
          attempts++;
          if (checkRecharts()) {
            clearInterval(intervalId);
          } else if (attempts > 120) { 
            setRechartsStatus('error');
            clearInterval(intervalId);
          }
        }, 150);
        return () => clearInterval(intervalId);
    }
  }, [fetchProjects]);
  
  if (rechartsStatus === 'loading') {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/5 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-neon-purple border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black text-neon-purple animate-pulse">TSA</span>
            </div>
          </div>
          <p className="mt-8 text-gray-500 font-black uppercase tracking-[0.5em] text-[9px] animate-pulse">Calibrating Artist Command HQ</p>
        </div>
      </div>
    );
  }

  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  const quickActions = [
    { label: 'Distribute', href: '#/pricing', icon: '💿' },
    { label: 'Radio Plug', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok Spark', href: '#/tiktok-growth', icon: '📱' },
    { label: 'Sync Pitch', href: '#/sync-hub', icon: '🎥' },
    { label: 'Smart Link', href: '#/artist-launch', icon: '🔗' },
    { label: 'Accelerator', href: '#/accelerator', icon: '🚀' },
  ];

  return (
    <div className="py-12 bg-brand-bg min-h-screen relative overflow-hidden selection:bg-neon-purple selection:text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-neon-purple/5 rounded-full blur-[200px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-electric-blue/5 rounded-full blur-[200px] -z-10 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Elite Profile Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
                <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center gap-2 px-5 py-2 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/40 tracking-[0.2em] shadow-lg shadow-neon-purple/10">
                        <span className="w-2 h-2 bg-neon-purple rounded-full animate-ping"></span>
                        TSA Official HQ
                    </span>
                    <span className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">REF: {(user.artistName || 'TSA').substring(0,3).toUpperCase()}-492-X</span>
                </div>
                <h1 className="text-6xl sm:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                   {user.artistName} <span className="text-electric-blue/40 font-outline-2">Portal</span>
                </h1>
                <p className="text-gray-500 font-medium italic text-xl max-w-lg leading-relaxed">Your professional sound evolution, monitored in real-time.</p>
            </div>
            
            <div className="w-full lg:w-auto animate-in fade-in slide-in-from-right duration-1000">
              <div className="flex items-center gap-10 p-10 bg-gray-900/60 backdrop-blur-3xl rounded-[56px] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-5 bg-neon-purple/10 rounded-3xl relative z-10 border border-neon-purple/20">
                    <svg className="w-10 h-10 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="mr-16 relative z-10">
                      <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mb-2">Accrued Royalties</div>
                      <div className="text-5xl font-black text-white tracking-tighter">$0.00</div>
                  </div>
                  <button className="px-12 py-5 bg-white text-black text-[12px] font-black rounded-2xl uppercase tracking-[0.3em] hover:bg-neon-purple hover:text-white transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)] active:scale-95 relative z-10">Withdraw</button>
              </div>
            </div>
        </div>

        {/* Career Velocity Progress Meter */}
        <div className="mb-16 bg-gray-900/40 backdrop-blur-3xl border border-white/5 rounded-[64px] p-14 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
               <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.5em]">Career Path Index</h3>
               <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black rounded-full border border-green-500/20 uppercase">Trending Up</div>
            </div>
            <span className="text-neon-purple font-black text-[12px] uppercase italic bg-neon-purple/10 px-6 py-2 rounded-full border border-neon-purple/20 shadow-neon-purple/20 shadow-2xl">Phase: Regional Expansion</span>
          </div>
          <div className="relative h-9 bg-black/60 rounded-full overflow-hidden border border-white/10 p-2 shadow-inner">
            <div className="h-full w-[42%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_35px_rgba(138,43,226,0.7)]"></div>
          </div>
          <div className="mt-10 flex justify-between text-[11px] font-black text-gray-700 uppercase tracking-[0.4em]">
            <span>Emerging</span>
            <span className="text-electric-blue">Regional Presence</span>
            <span className="text-neon-purple">Continental Star</span>
            <span>Global Legacy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            
            {/* Primary Command Block */}
            <div className="lg:col-span-2 space-y-14">
                
                {/* Visual Stats Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-gray-900/50 p-14 rounded-[64px] border border-white/5 hover:border-neon-purple/40 transition-all group shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl text-neon-purple group-hover:scale-110 transition-transform">📈</div>
                        <div className="text-[12px] text-gray-600 font-black uppercase mb-4 tracking-[0.2em] group-hover:text-neon-purple transition-colors">Digital Impressions</div>
                        <div className="text-7xl font-black text-white tracking-tighter drop-shadow-lg">24.8K</div>
                        <div className="mt-8 flex items-center gap-3 text-[11px] text-green-500 font-black bg-green-500/10 w-fit px-5 py-2.5 rounded-2xl uppercase tracking-widest border border-green-500/10">
                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                           +12.4% <span className="text-gray-600 font-bold ml-1 italic">THIS MONTH</span>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-14 rounded-[64px] border border-white/5 hover:border-electric-blue/40 transition-all group shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl text-electric-blue group-hover:scale-110 transition-transform">📡</div>
                        <div className="text-[12px] text-gray-600 font-black uppercase mb-4 tracking-[0.2em] group-hover:text-electric-blue transition-colors">FM/Broadcast Spans</div>
                        <div className="text-7xl font-black text-white tracking-tighter drop-shadow-lg">142</div>
                        <div className="mt-8 text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] flex items-center gap-3">
                          <span className="w-3 h-3 bg-electric-blue rounded-full shadow-[0_0_15px_#00BFFF] animate-pulse"></span>
                          Verified Core Logs
                        </div>
                    </div>
                </div>

                {/* Trajectory Analytics Chart */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[72px] p-14 backdrop-blur-3xl shadow-2xl relative group/chart">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-8">
                        <div>
                          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Impact Trajectory</h2>
                          <p className="text-[11px] text-gray-600 uppercase font-black mt-3 tracking-[0.5em]">Consolidated Audience Data • Real-time Stream</p>
                        </div>
                        <div className="flex bg-black/60 p-2.5 rounded-[32px] border border-white/10 shadow-inner backdrop-blur-2xl">
                            <button className="px-10 py-3.5 text-[11px] font-black text-white bg-white/15 rounded-[24px] uppercase tracking-widest shadow-xl">Detailed View</button>
                            <button className="px-10 py-3.5 text-[11px] font-black text-gray-700 hover:text-white uppercase tracking-widest transition-all">Aggregate</button>
                        </div>
                    </div>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{n:'Mon', s:500}, {n:'Tue', s:2100}, {n:'Wed', s:1400}, {n:'Thu', s:3900}, {n:'Fri', s:2800}, {n:'Sat', s:5100}, {n:'Sun', s:8200}]}>
                                <defs>
                                    <linearGradient id="colorTrajectory" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} strokeOpacity={0.2} />
                                <XAxis dataKey="n" stroke="#555" axisLine={false} tickLine={false} fontSize={12} fontWeight="900" dy={25} />
                                <Tooltip 
                                    contentStyle={{backgroundColor:'rgba(0,0,0,0.98)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'40px', padding:'25px', backdropFilter:'blur(25px)', boxShadow:'0 30px 60px -12px rgba(0,0,0,0.8)'}} 
                                    itemStyle={{color:'#fff', fontWeight:'900', textTransform:'uppercase', fontSize:'13px', letterSpacing:'0.15em'}}
                                    labelStyle={{color:'#666', fontWeight:'900', marginBottom:'10px', fontSize:'10px', tracking:'0.4em'}}
                                />
                                <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={10} fill="url(#colorTrajectory)" animationDuration={4000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Central Deployment Hub */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[72px] p-16 shadow-2xl relative">
                    <div className="flex justify-between items-center mb-14">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Campaign Roadmap</h2>
                        <a href="#/services" className="px-12 py-5 bg-white/5 text-[11px] font-black text-neon-purple border border-neon-purple/40 rounded-full uppercase tracking-[0.4em] hover:bg-neon-purple hover:text-white transition-all shadow-xl active:scale-95">Initiate Launch +</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[12px] font-black text-gray-700 uppercase tracking-[0.5em]">
                                    <th className="pb-12">Service Vertical</th>
                                    <th className="pb-12">Asset Blueprint</th>
                                    <th className="pb-12">Deployment Status</th>
                                    <th className="pb-12 text-right">Last Sync</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {activeProjects.length === 0 ? (
                                    <tr><td colSpan={4} className="py-32 text-center text-gray-700 text-sm font-black uppercase tracking-[0.5em] italic">Ecosystem idle. No data streams detected.</td></tr>
                                ) : activeProjects.map((p, i) => (
                                    <tr key={i} className="hover:bg-white/[0.05] transition-all group">
                                        <td className="py-12">
                                            <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase border shadow-inner tracking-widest ${
                                                p.type === 'Radio' ? 'border-blue-500/40 bg-blue-500/10 text-blue-400' :
                                                p.type === 'TikTok' ? 'border-pink-500/40 bg-pink-500/10 text-pink-400' :
                                                p.type === 'EPK' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' :
                                                p.type === 'Sync' ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400' :
                                                'border-green-500/40 bg-green-500/10 text-green-400'
                                            }`}>{p.type}</span>
                                        </td>
                                        <td className="py-12">
                                            <div className="font-black text-lg text-white group-hover:text-electric-blue transition-colors tracking-tight leading-none">{p.songTitle || 'System Launch'}</div>
                                            <div className="text-[11px] text-gray-600 uppercase font-black mt-3 tracking-[0.2em]">{p.tier || 'Standard Deployment'}</div>
                                        </td>
                                        <td className="py-12">
                                            <div className="flex items-center gap-5">
                                                <div className="w-4 h-4 rounded-full bg-neon-purple animate-pulse shadow-[0_0_25px_rgba(138,43,226,1)] border border-white/20"></div>
                                                <span className="text-[12px] text-gray-300 font-black uppercase tracking-[0.4em]">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-12 text-right text-[13px] text-gray-700 font-mono font-black">
                                            {new Date(p.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Sidebar Modules */}
            <div className="space-y-14">
                
                {/* Growth Toolbelt Grid */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[64px] p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl -rotate-12">⚡</div>
                    <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-[0.6em] mb-14">Growth Toolbelt</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {quickActions.map(action => (
                            <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-10 bg-black/60 border border-white/5 rounded-[48px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="text-5xl mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-700 ease-out">{action.icon}</span>
                                <span className="text-[11px] font-black text-gray-600 group-hover:text-white uppercase leading-tight tracking-[0.2em] relative z-10">{action.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* AI A&R Insights Engine */}
                <div className="bg-gradient-to-br from-neon-purple/50 to-black/30 border border-neon-purple/60 p-16 rounded-[80px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-16 opacity-10 text-[240px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
                    <div className="flex items-center gap-6 mb-12">
                        <span className="w-5 h-5 bg-neon-purple rounded-full animate-ping shadow-[0_0_20px_#8A2BE2]"></span>
                        <h3 className="text-white font-black uppercase italic tracking-tighter text-3xl">AI A&R Feed</h3>
                    </div>
                    <div className="space-y-10 relative z-10">
                        <div className="p-12 bg-black/95 rounded-[56px] border border-white/10 backdrop-blur-3xl shadow-2xl group/card hover:border-neon-purple/40 transition-all duration-500 hover:-translate-y-2">
                            <p className="text-[14px] text-gray-400 leading-relaxed font-bold italic">
                                <span className="text-electric-blue font-black uppercase tracking-[0.3em] block mb-5 not-italic text-sm">Trend Alert:</span>
                                "Massive frequency spike detected for <span className="text-white">Amapiano Jazz</span> fusion in Central Europe. Initiating a <span className="text-white font-black underline underline-offset-8 decoration-neon-purple/50">TikTok Micro-Push</span> now would optimize reach by 480%."
                            </p>
                        </div>
                        <div className="p-12 bg-black/95 rounded-[56px] border border-white/10 backdrop-blur-3xl shadow-2xl group/card hover:border-neon-purple/40 transition-all duration-500 hover:-translate-y-2">
                            <p className="text-[14px] text-gray-400 leading-relaxed font-bold italic">
                                <span className="text-neon-purple font-black uppercase tracking-[0.3em] block mb-5 not-italic text-sm">Strategic Fix:</span>
                                "Your digital press kit metadata is incomplete. Labels are <span className="text-white font-black">82% more responsive</span> when high-fidelity performance reels are anchored to the EPK hub."
                            </p>
                        </div>
                    </div>
                    <button className="w-full mt-14 py-7 bg-white text-black text-[13px] font-black uppercase tracking-[0.5em] rounded-[32px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-4 border-gray-300 hover:border-neon-purple/50">Run Calibration</button>
                </div>

                {/* TSA Network Pulse */}
                <div className="bg-gray-900/50 border border-white/5 p-14 rounded-[80px] shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-14">
                        <h3 className="text-white font-black uppercase tracking-tighter italic text-2xl">Network Pulse</h3>
                        <span className="text-[11px] text-neon-purple font-black uppercase bg-neon-purple/15 px-6 py-2.5 rounded-full border border-neon-purple/30 animate-pulse tracking-[0.3em] shadow-lg shadow-neon-purple/20">LIVE STREAM</span>
                    </div>
                    <div className="space-y-14 relative z-10">
                        {[
                            { name: 'Kweku_V', action: 'locked a sync deal with African Fashion Week', time: '8s ago', icon: '💎' },
                            { name: 'Sade_Afro', action: 'hit 10K active monthly listeners', time: '14m ago', icon: '🎙️' },
                            { name: 'DJ_Zuma', action: 'joined Accelerator Cohort #5', time: '2h ago', icon: '🌊' }
                        ].map((msg, i) => (
                            <div key={i} className="flex gap-10 group items-start">
                                <div className="w-20 h-20 rounded-[32px] bg-gray-800/80 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                                    {msg.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-[15px] text-white font-black leading-tight tracking-tight mb-3">
                                        <span className="text-electric-blue group-hover:underline cursor-pointer">{msg.name}</span> <span className="text-gray-600 font-bold">{msg.action}</span>
                                    </div>
                                    <div className="text-[12px] text-gray-800 uppercase font-black tracking-[0.4em]">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#/community" className="block w-full mt-16 py-7 bg-gray-800/80 border border-white/5 text-center text-[12px] font-black text-white uppercase tracking-[0.5em] rounded-[32px] hover:bg-white hover:text-black transition-all shadow-2xl">Enter Inner Lounge</a>
                </div>
            </div>
        </div>

        {/* Cinematic Stats Footer */}
        <div className="mt-40 py-32 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-20 animate-in fade-in duration-1500">
            {[
                { label: 'Network Aggregated Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Verified Global Briefs', val: '840+', color: 'text-white' },
                { label: 'Total Artist Payouts', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Regional Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center group cursor-default">
                    <div className={`text-7xl font-black italic tracking-tighter mb-5 group-hover:scale-110 transition-transform duration-700 ${item.color} drop-shadow-2xl`}>{item.val}</div>
                    <div className="text-[12px] text-gray-700 font-black uppercase tracking-[0.6em] leading-relaxed max-w-[180px] mx-auto group-hover:text-gray-400 transition-colors">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
