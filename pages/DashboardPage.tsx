
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

  // Robustly fetch all campaign types from localStorage
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
        // Essential check: Recharts object MUST contain AreaChart component before we proceed
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
          } else if (attempts > 100) { 
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
            <div className="w-16 h-16 border-4 border-white/5 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Artist Command...</p>
        </div>
      </div>
    );
  }

  // Safe destructuring only after status is 'ready'
  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  const quickActions = [
    { label: 'Distribute', href: '#/pricing', icon: '💿', color: 'bg-neon-purple' },
    { label: 'Radio Pitch', href: '#/radio-plugging', icon: '📻', color: 'bg-electric-blue' },
    { label: 'TikTok Spark', href: '#/tiktok-growth', icon: '📱', color: 'bg-pink-500' },
    { label: 'Sync Ops', href: '#/sync-hub', icon: '🎥', color: 'bg-yellow-500' },
    { label: 'PR Kit', href: '#/epk-service', icon: '📝', color: 'bg-orange-500' },
    { label: 'Accelerator', href: '#/accelerator', icon: '🚀', color: 'bg-green-500' },
  ];

  return (
    <div className="py-12 bg-brand-bg min-h-screen relative overflow-hidden font-sans selection:bg-neon-purple selection:text-white">
      {/* Immersive Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[180px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[180px] -z-10 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Superior Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="animate-in fade-in slide-in-from-left duration-700">
                <div className="flex items-center gap-3 mb-5">
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/30 tracking-widest shadow-lg shadow-neon-purple/10">
                        <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping"></span>
                        TSA Verified Artist
                    </span>
                    <span className="text-gray-700 text-[10px] font-black uppercase tracking-widest">TSA-ID: #{(user.artistName || 'ART').substring(0,3).toUpperCase()}-942</span>
                </div>
                <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4 drop-shadow-2xl">
                   {user.artistName} <span className="text-electric-blue underline decoration-neon-purple/20 underline-offset-8">HQ</span>
                </h1>
                <p className="text-gray-500 font-medium italic text-xl max-w-lg">The global dashboard for your sonic evolution.</p>
            </div>
            
            <div className="w-full md:w-auto animate-in fade-in slide-in-from-right duration-700">
              <div className="flex items-center gap-8 p-8 bg-gray-900/60 backdrop-blur-3xl rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-4 bg-neon-purple/10 rounded-3xl relative z-10">
                    <svg className="w-8 h-8 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="mr-12 relative z-10">
                      <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-1">Global Royalties</div>
                      <div className="text-4xl font-black text-white tracking-tighter">$0.00</div>
                  </div>
                  <button className="px-10 py-4 bg-white text-black text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-neon-purple hover:text-white transition-all shadow-xl relative z-10">Cash Out</button>
              </div>
            </div>
        </div>

        {/* Dynamic Career Velocity Meter */}
        <div className="mb-12 bg-gray-900/40 backdrop-blur-3xl border border-white/5 rounded-[56px] p-12 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.4em]">Career Velocity Metric</h3>
            <span className="text-neon-purple font-black text-[11px] uppercase italic bg-neon-purple/10 px-5 py-2 rounded-full border border-neon-purple/20 shadow-neon-purple/20 shadow-lg">Stage: Regional Spark</span>
          </div>
          <div className="relative h-7 bg-black/60 rounded-full overflow-hidden border border-white/5 p-1.5 shadow-inner">
            <div className="h-full w-[44%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_30px_rgba(138,43,226,0.6)]"></div>
          </div>
          <div className="mt-8 flex justify-between text-[11px] font-black text-gray-600 uppercase tracking-[0.3em]">
            <span>Bedroom Producer</span>
            <span className="text-electric-blue">Regional Presence</span>
            <span className="text-neon-purple">Continental Star</span>
            <span>Global Legacy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Command Panel */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Visual Stats Summary */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gray-900/50 p-12 rounded-[56px] border border-white/5 hover:border-neon-purple/40 transition-all group shadow-xl">
                        <div className="text-[12px] text-gray-500 font-black uppercase mb-3 tracking-widest group-hover:text-neon-purple transition-colors">Cumulative Audience</div>
                        <div className="text-7xl font-black text-white tracking-tighter">24.8K</div>
                        <div className="mt-6 flex items-center gap-2 text-[11px] text-green-500 font-black bg-green-500/10 w-fit px-4 py-2 rounded-2xl uppercase tracking-widest">
                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                           +12.4% <span className="text-gray-600 font-medium ml-1 italic font-sans">Growth Trend</span>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-12 rounded-[56px] border border-white/5 hover:border-electric-blue/40 transition-all group shadow-xl">
                        <div className="text-[12px] text-gray-500 font-black uppercase mb-3 tracking-widest group-hover:text-electric-blue transition-colors">Digital/FM Spins</div>
                        <div className="text-7xl font-black text-white tracking-tighter">142</div>
                        <div className="mt-6 text-[11px] text-gray-600 font-black uppercase tracking-[0.3em] flex items-center gap-3">
                          <span className="w-2.5 h-2.5 bg-electric-blue rounded-full shadow-[0_0_10px_#00BFFF]"></span>
                          Real-time Feed
                        </div>
                    </div>
                </div>

                {/* Impact Analytics Graph */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[64px] p-12 backdrop-blur-3xl shadow-2xl relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
                        <div>
                          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Engagement Trajectory</h2>
                          <p className="text-[11px] text-gray-500 uppercase font-black mt-3 tracking-[0.4em]">Aggregated Listening Data • 30 Day Feed</p>
                        </div>
                        <div className="flex bg-black/60 p-2 rounded-[24px] border border-white/5 shadow-inner backdrop-blur-xl">
                            <button className="px-8 py-3 text-[11px] font-black text-white bg-white/10 rounded-2xl uppercase tracking-widest shadow-lg">Daily View</button>
                            <button className="px-8 py-3 text-[11px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-all">Monthly</button>
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{n:'Mon', s:500}, {n:'Tue', s:1800}, {n:'Wed', s:1300}, {n:'Thu', s:3400}, {n:'Fri', s:2600}, {n:'Sat', s:4800}, {n:'Sun', s:7200}]}>
                                <defs>
                                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.7}/>
                                        <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} strokeOpacity={0.3} />
                                <XAxis dataKey="n" stroke="#444" axisLine={false} tickLine={false} fontSize={12} fontWeight="900" dy={20} />
                                <Tooltip 
                                    contentStyle={{backgroundColor:'rgba(0,0,0,0.95)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'32px', padding:'20px', backdropFilter:'blur(20px)', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)'}} 
                                    itemStyle={{color:'#fff', fontWeight:'900', textTransform:'uppercase', fontSize:'12px', letterSpacing:'0.1em'}}
                                    labelStyle={{color:'#888', fontWeight:'900', marginBottom:'8px', fontSize:'10px', tracking:'0.3em'}}
                                />
                                <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={8} fill="url(#colorGrowth)" animationDuration={3500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Central Tracking Hub */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[64px] p-14 shadow-2xl">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Campaign Roadmap</h2>
                        <a href="#/services" className="px-10 py-4 bg-white/5 text-[11px] font-black text-neon-purple border border-neon-purple/40 rounded-full uppercase tracking-[0.3em] hover:bg-neon-purple hover:text-white transition-all shadow-lg shadow-neon-purple/5">Launch New +</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[11px] font-black text-gray-700 uppercase tracking-[0.4em]">
                                    <th className="pb-10">Market Vertical</th>
                                    <th className="pb-10">Campaign Asset</th>
                                    <th className="pb-10">Live Status</th>
                                    <th className="pb-10 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {activeProjects.length === 0 ? (
                                    <tr><td colSpan={4} className="py-28 text-center text-gray-700 text-sm font-black uppercase tracking-[0.4em] italic">No active data streams. Initiate service to track here.</td></tr>
                                ) : activeProjects.map((p, i) => (
                                    <tr key={i} className="hover:bg-white/[0.04] transition-all group">
                                        <td className="py-10">
                                            <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase border shadow-inner ${
                                                p.type === 'Radio' ? 'border-blue-500/40 bg-blue-500/10 text-blue-400' :
                                                p.type === 'TikTok' ? 'border-pink-500/40 bg-pink-500/10 text-pink-400' :
                                                p.type === 'EPK' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' :
                                                p.type === 'Sync' ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400' :
                                                'border-green-500/40 bg-green-500/10 text-green-400'
                                            }`}>{p.type}</span>
                                        </td>
                                        <td className="py-10">
                                            <div className="font-black text-base text-white group-hover:text-electric-blue transition-colors">{p.songTitle || 'Untitled Launch'}</div>
                                            <div className="text-[10px] text-gray-600 uppercase font-black mt-2 tracking-widest">{p.tier || 'Standard Deployment'}</div>
                                        </td>
                                        <td className="py-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse shadow-[0_0_20px_rgba(138,43,226,1)]"></div>
                                                <span className="text-[11px] text-gray-300 font-black uppercase tracking-[0.3em]">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-10 text-right text-[12px] text-gray-700 font-mono font-black">
                                            {new Date(p.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Elite Sidebar Widgets */}
            <div className="space-y-12">
                
                {/* Visual Action Grid */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[56px] p-10 shadow-2xl">
                    <h3 className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] mb-12">Artist Growth Tools</h3>
                    <div className="grid grid-cols-2 gap-5">
                        {quickActions.map(action => (
                            <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-8 bg-black/50 border border-white/5 rounded-[40px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-xl">
                                <span className="text-5xl mb-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">{action.icon}</span>
                                <span className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase leading-tight tracking-[0.2em]">{action.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* AI A&R Insights Engine */}
                <div className="bg-gradient-to-br from-neon-purple/40 to-black/20 border border-neon-purple/50 p-14 rounded-[72px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 text-[200px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
                    <div className="flex items-center gap-5 mb-10">
                        <span className="w-4 h-4 bg-neon-purple rounded-full animate-ping"></span>
                        <h3 className="text-white font-black uppercase italic tracking-tighter text-2xl">AI A&R Feed</h3>
                    </div>
                    <div className="space-y-8 relative z-10">
                        <div className="p-10 bg-black/90 rounded-[48px] border border-white/10 backdrop-blur-3xl shadow-2xl group/card hover:border-neon-purple/30 transition-colors">
                            <p className="text-[13px] text-gray-400 leading-relaxed font-bold italic">
                                <span className="text-electric-blue font-black uppercase tracking-[0.2em] block mb-4 not-italic text-xs">Viral Signal:</span>
                                "High frequency detected on <span className="text-white">Amapiano</span> bass-lines in East Africa. Our data suggests a <span className="text-white font-black underline underline-offset-4">TikTok Pro</span> campaign now would yield 4.2x engagement."
                            </p>
                        </div>
                        <div className="p-10 bg-black/90 rounded-[48px] border border-white/10 backdrop-blur-3xl shadow-2xl group/card hover:border-neon-purple/30 transition-colors">
                            <p className="text-[13px] text-gray-400 leading-relaxed font-bold italic">
                                <span className="text-neon-purple font-black uppercase tracking-[0.2em] block mb-4 not-italic text-xs">Metadata Fix:</span>
                                "Your recent distribution is missing <span className="text-white">Gen-Z</span> tags. Updated metadata has historically improved playlist placement by <span className="text-white font-black">74%</span> for label artists."
                            </p>
                        </div>
                    </div>
                    <button className="w-full mt-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-[32px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95">Calibrate Growth</button>
                </div>

                {/* Network Pulse */}
                <div className="bg-gray-900/50 border border-white/5 p-12 rounded-[72px] shadow-2xl relative">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-white font-black uppercase tracking-tighter italic text-xl">TSA Network</h3>
                        <span className="text-[10px] text-neon-purple font-black uppercase bg-neon-purple/15 px-5 py-2 rounded-full border border-neon-purple/30 animate-pulse tracking-[0.2em]">Live Data</span>
                    </div>
                    <div className="space-y-12">
                        {[
                            { name: 'Kweku_V', action: 'secured a sync deal with Jumia', time: '12s ago', icon: '⚡' },
                            { name: 'Sade_Afro', action: 'topped 10K monthly listeners', time: '18m ago', icon: '📊' },
                            { name: 'DJ_Zuma', action: 'joined the Cohort #4 Accelerator', time: '1h ago', icon: '🚀' }
                        ].map((msg, i) => (
                            <div key={i} className="flex gap-8 group items-start">
                                <div className="w-16 h-16 rounded-[24px] bg-gray-800 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                                    {msg.icon}
                                </div>
                                <div>
                                    <div className="text-[14px] text-white font-black leading-tight tracking-tight mb-2">
                                        <span className="text-electric-blue group-hover:underline">{msg.name}</span> <span className="text-gray-600 font-bold">{msg.action}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-800 uppercase font-black tracking-[0.3em]">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#/community" className="block w-full mt-14 py-6 bg-gray-800 border border-white/5 text-center text-[11px] font-black text-white uppercase tracking-[0.4em] rounded-[32px] hover:bg-white hover:text-black transition-all shadow-xl">Enter Insider Lounge</a>
                </div>
            </div>
        </div>

        {/* Global Label Stats (World-Class Footer) */}
        <div className="mt-32 py-24 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-16 animate-in fade-in duration-1000">
            {[
                { label: 'Label Aggregated Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Live Global Projects', val: '840+', color: 'text-white' },
                { label: 'Artist Royalties Paid', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Regional Sync Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center group">
                    <div className={`text-6xl font-black italic tracking-tighter mb-4 group-hover:scale-110 transition-transform ${item.color}`}>{item.val}</div>
                    <div className="text-[11px] text-gray-700 font-black uppercase tracking-[0.5em] leading-relaxed max-w-[150px] mx-auto">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
