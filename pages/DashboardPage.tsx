
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

      setActiveProjects([...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks, ...syncs, ...accel].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (e) {
      console.error("Dashboard data fetch error:", e);
    }
  }, [user.email]);

  useEffect(() => {
    fetchProjects();

    const checkRecharts = () => {
        // Recharts UMD bundle puts components under the 'Recharts' global
        if (window.Recharts && window.Recharts.AreaChart) {
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
          } else if (attempts > 100) { // Extended timeout for script loading
            setRechartsStatus('error');
            clearInterval(intervalId);
          }
        }, 100);
        return () => clearInterval(intervalId);
    }
  }, [fetchProjects]);
  
  if (rechartsStatus === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">Initializing Artist Core...</p>
        </div>
      </div>
    );
  }

  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  const quickActions = [
    { label: 'Distribute', href: '#/pricing', icon: '💿' },
    { label: 'Radio Pitch', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok Spark', href: '#/tiktok-growth', icon: '📱' },
    { label: 'Smart Link', href: '#/artist-launch', icon: '🔗' },
    { label: 'PR Kit', href: '#/epk-service', icon: '📝' },
    { label: 'Sync Briefs', href: '#/sync-hub', icon: '🎥' },
  ];

  return (
    <div className="py-12 bg-brand-bg min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[160px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[160px] -z-10 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-2 px-3 py-1 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/30">
                        <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping"></span>
                        Verified Artist Portal
                    </span>
                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Est. {new Date().getFullYear()}</span>
                </div>
                <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                   {user.artistName} <span className="text-electric-blue underline decoration-neon-purple/20">Control</span>
                </h1>
                <p className="text-gray-500 font-medium italic text-lg">Your global music career, managed in real-time.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-6 p-6 bg-gray-900/60 backdrop-blur-3xl rounded-[40px] border border-white/5 flex-grow shadow-2xl">
                  <div className="p-4 bg-neon-purple/10 rounded-2xl">
                    <svg className="w-7 h-7 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="mr-10">
                      <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Live Royalties</div>
                      <div className="text-4xl font-black text-white tracking-tighter">$0.00</div>
                  </div>
                  <button className="px-10 py-4 bg-white text-black text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-neon-purple hover:text-white transition-all shadow-[0_15px_30px_rgba(255,255,255,0.05)]">Withdraw</button>
              </div>
            </div>
        </div>

        {/* Career Growth Meter */}
        <div className="mb-12 bg-gray-900/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">TSA Career Velocity</h3>
            <span className="text-neon-purple font-black text-[10px] uppercase italic bg-neon-purple/10 px-4 py-1.5 rounded-full border border-neon-purple/20">Phase 2: Regional Spark</span>
          </div>
          <div className="relative h-6 bg-black/60 rounded-full overflow-hidden border border-white/5 p-1">
            <div className="h-full w-[38%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_25px_rgba(138,43,226,0.6)]"></div>
          </div>
          <div className="mt-6 flex justify-between text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
            <span>Local Artist</span>
            <span className="text-electric-blue">Regional Presence</span>
            <span className="text-neon-purple">Continental Star</span>
            <span>Global Icon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Main Stats and Projects */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-10 rounded-[48px] border border-white/5 hover:border-neon-purple/30 transition-all group">
                        <div className="text-[11px] text-gray-500 font-black uppercase mb-2 tracking-widest group-hover:text-neon-purple transition-colors">Cumulative Reach</div>
                        <div className="text-6xl font-black text-white tracking-tighter">24.8K</div>
                        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-green-500 font-black bg-green-500/10 w-fit px-3 py-1.5 rounded-xl uppercase">
                           +12.4% <span className="text-gray-600 font-medium ml-1">vs Last Mo.</span>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-10 rounded-[48px] border border-white/5 hover:border-electric-blue/30 transition-all group">
                        <div className="text-[11px] text-gray-500 font-black uppercase mb-2 tracking-widest group-hover:text-electric-blue transition-colors">FM/Digital Airplay</div>
                        <div className="text-6xl font-black text-white tracking-tighter">142</div>
                        <div className="mt-4 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                          Verified Spins
                        </div>
                    </div>
                </div>

                {/* Analytical Graph */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[56px] p-12 backdrop-blur-3xl shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                        <div>
                          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Impact Analytics</h2>
                          <p className="text-[10px] text-gray-500 uppercase font-black mt-2 tracking-[0.3em]">Stream Trajectory • 30 Day Feed</p>
                        </div>
                        <div className="flex bg-black/50 p-2 rounded-2xl border border-white/5 shadow-inner">
                            <button className="px-6 py-2.5 text-[10px] font-black text-white bg-white/10 rounded-xl uppercase tracking-widest">Daily</button>
                            <button className="px-6 py-2.5 text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Aggregated</button>
                        </div>
                    </div>
                    <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{n:'Mon', s:500}, {n:'Tue', s:1400}, {n:'Wed', s:1100}, {n:'Thu', s:2900}, {n:'Fri', s:2200}, {n:'Sat', s:4100}, {n:'Sun', s:6800}]}>
                                <defs>
                                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.6}/>
                                        <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} strokeOpacity={0.4} />
                                <XAxis dataKey="n" stroke="#444" axisLine={false} tickLine={false} fontSize={11} fontWeight="900" dy={15} />
                                <Tooltip 
                                    contentStyle={{backgroundColor:'rgba(0,0,0,0.95)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'24px', padding:'15px', backdropFilter:'blur(10px)'}} 
                                    itemStyle={{color:'#fff', fontWeight:'900', textTransform:'uppercase', fontSize:'11px'}}
                                    labelStyle={{color:'#888', fontWeight:'900', marginBottom:'5px', fontSize:'9px', tracking:'0.2em'}}
                                />
                                <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={6} fill="url(#colorGrowth)" animationDuration={3000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tracking Table */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[56px] p-12 shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Campaign Roadmap</h2>
                        <a href="#/services" className="px-8 py-3 bg-white/5 text-[10px] font-black text-neon-purple border border-neon-purple/40 rounded-full uppercase tracking-[0.2em] hover:bg-neon-purple hover:text-white transition-all">Launch New +</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                                    <th className="pb-8">Vertical</th>
                                    <th className="pb-8">Asset</th>
                                    <th className="pb-8">Deployment Intelligence</th>
                                    <th className="pb-8 text-right">Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {activeProjects.length === 0 ? (
                                    <tr><td colSpan={4} className="py-24 text-center text-gray-700 text-xs font-black uppercase tracking-[0.3em] italic">No active data streams. Launch a service to begin.</td></tr>
                                ) : activeProjects.map((p, i) => (
                                    <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                                        <td className="py-8">
                                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase border ${
                                                p.type === 'Radio' ? 'border-blue-500/40 bg-blue-500/10 text-blue-400' :
                                                p.type === 'TikTok' ? 'border-pink-500/40 bg-pink-500/10 text-pink-400' :
                                                p.type === 'EPK' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' :
                                                p.type === 'Sync' ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400' :
                                                'border-green-500/40 bg-green-500/10 text-green-400'
                                            }`}>{p.type}</span>
                                        </td>
                                        <td className="py-8">
                                            <div className="font-black text-sm text-white group-hover:text-electric-blue transition-colors">{p.songTitle || 'Untitled Launch'}</div>
                                            <div className="text-[10px] text-gray-600 uppercase font-black mt-2 tracking-widest">{p.tier || 'Standard Deployment'}</div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse shadow-[0_0_15px_rgba(138,43,226,0.8)]"></div>
                                                <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-right text-[11px] text-gray-600 font-mono font-black">
                                            {new Date(p.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-10">
                
                {/* Artist Toolbelt */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[48px] p-10 shadow-2xl">
                    <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Growth Engine</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {quickActions.map(action => (
                            <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-8 bg-black/40 border border-white/5 rounded-[32px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-inner">
                                <span className="text-4xl mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">{action.icon}</span>
                                <span className="text-[9px] font-black text-gray-500 group-hover:text-white uppercase leading-tight tracking-[0.15em]">{action.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* AI Insights Engine */}
                <div className="bg-gradient-to-br from-neon-purple/30 to-black/20 border border-neon-purple/40 p-12 rounded-[64px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 text-[150px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="w-3 h-3 bg-neon-purple rounded-full animate-ping"></span>
                        <h3 className="text-white font-black uppercase italic tracking-tighter text-xl underline decoration-neon-purple/40">AI Intelligence</h3>
                    </div>
                    <div className="space-y-8 relative z-10">
                        <div className="p-8 bg-black/80 rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-2xl">
                            <p className="text-[12px] text-gray-300 leading-relaxed font-bold italic">
                                <span className="text-electric-blue font-black uppercase tracking-widest block mb-3 not-italic">Viral Alert:</span>
                                "High engagement detected on Amapiano log-drum tags. Launching a <span className="text-white font-black">TikTok Pro</span> campaign now would yield 3.8x estimated reach."
                            </p>
                        </div>
                        <div className="p-8 bg-black/80 rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-2xl">
                            <p className="text-[12px] text-gray-300 leading-relaxed font-bold italic">
                                <span className="text-neon-purple font-black uppercase tracking-widest block mb-3 not-italic">Optimization Tip:</span>
                                "Your digital press kit is missing performance video. Labels are <span className="text-white font-black">65% more likely</span> to book artists with live visual proof."
                            </p>
                        </div>
                    </div>
                    <button className="w-full mt-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-[28px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl">Refine Growth Strategy</button>
                </div>

                {/* Global Artist Feed */}
                <div className="bg-gray-900/50 border border-white/5 p-12 rounded-[64px] shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-white font-black uppercase tracking-tighter italic text-lg">Label Activity</h3>
                        <span className="text-[9px] text-neon-purple font-black uppercase bg-neon-purple/10 px-4 py-1.5 rounded-full border border-neon-purple/20 animate-pulse">Live</span>
                    </div>
                    <div className="space-y-10">
                        {[
                            { name: 'Kweku_V', action: 'secured a sync deal with Jumia', time: '2m ago', icon: '⚡' },
                            { name: 'Sade_Afro', action: 'topped 10K monthly listeners', time: '25m ago', icon: '📈' },
                            { name: 'DJ_Zuma', action: 'joined the Accelerator', time: '1h ago', icon: '🚀' }
                        ].map((msg, i) => (
                            <div key={i} className="flex gap-6 group items-start">
                                <div className="w-14 h-14 rounded-3xl bg-gray-800 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                                    {msg.icon}
                                </div>
                                <div>
                                    <div className="text-[13px] text-white font-black leading-tight tracking-tight">
                                        <span className="text-electric-blue">{msg.name}</span> <span className="text-gray-500 font-bold">{msg.action}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-700 mt-2 uppercase font-black tracking-[0.2em]">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#/community" className="block w-full mt-12 py-5 bg-gray-800 border border-white/5 text-center text-[10px] font-black text-white uppercase tracking-[0.3em] rounded-[28px] hover:bg-white hover:text-black transition-all">Enter Insider Lounge</a>
                </div>
            </div>
        </div>

        {/* Global Stats Footer */}
        <div className="mt-32 py-20 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-16">
            {[
                { label: 'Ecosystem Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Active Projects', val: '840+', color: 'text-white' },
                { label: 'Artist Payouts', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Global Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center">
                    <div className={`text-5xl font-black italic tracking-tighter mb-3 ${item.color}`}>{item.val}</div>
                    <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
