
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from './LoginPage';

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

/**
 * Custom High-Fidelity SVG Chart
 * Built to be 100% reliable and independent of external libraries.
 */
const StudioTrendChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data, 1000); // Default max to 1000 for visuals
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / max) * 75}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="relative w-full h-[320px] mt-10 group/chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="neonGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
          </linearGradient>
          <filter id="svgGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Horizontal Grid System */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* Dynamic Area Fill */}
        <polygon points={areaPoints} fill="url(#neonGlowGrad)" className="transition-all duration-1000 ease-in-out" />
        
        {/* The Impact Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#8A2BE2"
          strokeWidth="1.2"
          filter="url(#svgGlow)"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-in-out"
        />

        {/* Data Snap Points */}
        {data.map((val, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={100 - (val / max) * 75}
            r="1.2"
            fill="#00BFFF"
            className="hover:r-2.5 transition-all cursor-pointer shadow-neon-blue"
          />
        ))}
      </svg>
      
      {/* Time-domain Labels */}
      <div className="flex justify-between mt-8 text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">
        <span>Cycle Alpha</span>
        <span>Cycle Beta</span>
        <span>Cycle Gamma</span>
        <span>Cycle Delta</span>
        <span>Live Stream</span>
      </div>
    </div>
  );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUnifiedData = useCallback(() => {
    try {
      const getStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
      
      const radio = getStorage('tsa-campaigns').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Radio' }));
      const tiktok = getStorage('tsa-tiktok-orders').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'TikTok' }));
      const launch = getStorage('tsa-artist-pages').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'LaunchPage', songTitle: 'Artist Profile Hub' }));
      const distro = getStorage('tsa-radio-distro').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'RadioDistro', tier: 'High Fidelity Distro' }));
      const playlist = getStorage('tsa-playlist-subs').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Playlist', songTitle: 'Playlist Inclusion' }));
      const epks = getStorage('tsa-epks').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'EPK', songTitle: 'Professional Press Kit' }));
      const syncs = getStorage('tsa-sync-apps').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Sync', songTitle: 'Sync Opportunity' }));
      const accelerator = getStorage('tsa-accelerator-apps').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Accelerator', songTitle: 'Accelerator Cohort' }));

      const merged = [...radio, ...tiktok, ...launch, ...distro, ...playlist, ...epks, ...syncs, ...accelerator]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setActiveProjects(merged);
    } catch (e) {
      console.error("Dashboard hydration failure:", e);
    } finally {
      // Small artificial delay to ensure the UI feels stable
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [user.email]);

  useEffect(() => {
    fetchUnifiedData();
  }, [fetchUnifiedData]);

  // Simulated metrics for visual feedback
  const trendMetrics = useMemo(() => [1100, 2400, 1900, 4200, 3100, 5800, 7500], []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-b-4 border-neon-purple rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xs uppercase tracking-widest animate-pulse">TSA</span>
            </div>
          </div>
          <p className="mt-8 text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Artist Node...</p>
        </div>
      </div>
    );
  }

  const gridActions = [
    { label: 'Distribute', href: '#/pricing', icon: '📀' },
    { label: 'Radio Plug', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok Spark', href: '#/tiktok-growth', icon: '📱' },
    { label: 'Sync Pitch', href: '#/sync-hub', icon: '🎥' },
    { label: 'Launch Page', href: '#/artist-launch', icon: '🔗' },
    { label: 'EPK Builder', href: '#/epk-service', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-purple selection:text-white pb-32 overflow-hidden">
      {/* Cybernetic Ambiance */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[250px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[250px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        
        {/* Command Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="px-5 py-2 bg-neon-purple/15 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/30 tracking-[0.3em] shadow-lg">
                <span className="inline-block w-2 h-2 bg-neon-purple rounded-full mr-3 animate-ping"></span>
                TSA Verified Command
              </span>
              <span className="text-gray-800 text-[10px] font-black uppercase tracking-[0.4em]">AUTH_ID: {user.email.substring(0,6).toUpperCase()}</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6">
              {user.artistName} <span className="text-electric-blue/50 font-outline-1">HQ</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-2xl max-w-lg leading-relaxed">Your professional sound evolution, monitored in real-time.</p>
          </div>

          <div className="w-full xl:w-auto">
            <div className="flex items-center gap-12 p-12 bg-white/[0.02] backdrop-blur-3xl rounded-[64px] border border-white/5 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="p-6 bg-neon-purple/10 rounded-3xl relative z-10 border border-neon-purple/10">
                  <svg className="w-12 h-12 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div className="mr-12 relative z-10">
                  <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] mb-3">Escrow Balance</div>
                  <div className="text-6xl font-black text-white tracking-tighter">$0.00</div>
               </div>
               <button className="px-14 py-6 bg-white text-black text-[12px] font-black rounded-2xl uppercase tracking-[0.4em] hover:bg-neon-purple hover:text-white transition-all shadow-xl active:scale-95 relative z-10">Withdraw</button>
            </div>
          </div>
        </div>

        {/* Career Evolution Track */}
        <div className="mb-20 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[72px] p-16 shadow-2xl relative group">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-6">
              <h3 className="text-[14px] font-black text-gray-600 uppercase tracking-[0.7em]">Career Growth Velocity</h3>
              <div className="px-5 py-2 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full border border-green-500/20 uppercase tracking-widest animate-pulse">Trending Up</div>
            </div>
            <div className="text-[12px] font-black text-gray-700 uppercase tracking-[0.3em] italic">Current Phase: Regional Expansion</div>
          </div>
          <div className="relative h-14 bg-black/60 rounded-full border border-white/5 p-3 shadow-inner">
            <div className="h-full w-[44%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_60px_rgba(138,43,226,0.5)]"></div>
          </div>
          <div className="mt-12 grid grid-cols-4 text-[10px] font-black text-gray-800 uppercase tracking-[0.6em]">
            <span className="text-white">Emerging</span>
            <span className="text-center text-electric-blue">Regional Star</span>
            <span className="text-center">Continental Icon</span>
            <span className="text-right">Global Legend</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">
          
          {/* Main Strategic Block */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* High-Level Impact Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white/[0.02] border border-white/5 rounded-[72px] p-16 hover:border-neon-purple/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.05] text-[200px] group-hover:rotate-12 transition-transform duration-1000">📈</div>
                <div className="text-[13px] text-gray-700 font-black uppercase mb-6 tracking-[0.5em] group-hover:text-neon-purple transition-colors">Digital Impressions</div>
                <div className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">24.8K</div>
                <div className="mt-10 flex items-center gap-4 text-[12px] text-green-500 font-black bg-green-500/10 w-fit px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border border-green-500/10 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                  +12.4% <span className="text-gray-700 font-bold ml-1 italic font-sans lowercase">this period</span>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[72px] p-16 hover:border-electric-blue/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.05] text-[200px] group-hover:-rotate-12 transition-transform duration-1000">📻</div>
                <div className="text-[13px] text-gray-700 font-black uppercase mb-6 tracking-[0.5em] group-hover:text-electric-blue transition-colors">Verified Radio Spins</div>
                <div className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">142</div>
                <div className="mt-10 text-[12px] text-gray-800 font-black uppercase tracking-[0.6em] flex items-center gap-4">
                  <span className="w-4 h-4 bg-electric-blue rounded-full shadow-[0_0_30px_#00BFFF] animate-pulse"></span>
                  Uplink Active
                </div>
              </div>
            </div>

            {/* Custom Trend Visualization */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[80px] p-20 shadow-2xl relative overflow-hidden group">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-10">
                  <div>
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Impact Trajectory</h2>
                    <p className="text-[12px] text-gray-700 uppercase font-black mt-4 tracking-[0.6em]">Consolidated Audience Analytics (30D)</p>
                  </div>
                  <div className="flex bg-black/60 p-3 rounded-[32px] border border-white/10 shadow-inner backdrop-blur-3xl">
                      <button className="px-12 py-4 text-[11px] font-black text-white bg-white/15 rounded-[24px] uppercase tracking-widest shadow-2xl">Real-Time</button>
                      <button className="px-12 py-4 text-[11px] font-black text-gray-800 hover:text-white uppercase tracking-widest transition-all">Historical</button>
                  </div>
               </div>
               
               <StudioTrendChart data={trendMetrics} />
            </div>

            {/* Unified Deployment Matrix */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[80px] p-20 shadow-2xl relative">
                <div className="flex justify-between items-center mb-20">
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Deployment Matrix</h2>
                    <a href="#/services" className="px-12 py-5 bg-white/5 text-[11px] font-black text-neon-purple border border-neon-purple/40 rounded-full uppercase tracking-[0.5em] hover:bg-neon-purple hover:text-white transition-all active:scale-95 shadow-2xl">New Launch +</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[13px] font-black text-gray-800 uppercase tracking-[0.7em]">
                                <th className="pb-16">Vertical</th>
                                <th className="pb-16">Active Asset</th>
                                <th className="pb-16">Deployment Status</th>
                                <th className="pb-16 text-right">Last Sync</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeProjects.length === 0 ? (
                                <tr><td colSpan={4} className="py-48 text-center text-gray-800 text-sm font-black uppercase tracking-[0.7em] italic">No active data streams detected. Start a service to track metrics.</td></tr>
                            ) : activeProjects.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.05] transition-all group">
                                    <td className="py-16">
                                        <span className={`px-7 py-3 rounded-full text-[11px] font-black uppercase border shadow-inner tracking-[0.2em] ${
                                            p.type === 'Radio' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                                            p.type === 'TikTok' ? 'border-pink-500/30 bg-pink-500/10 text-pink-400' :
                                            p.type === 'EPK' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' :
                                            p.type === 'Sync' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                                            'border-green-500/30 bg-green-500/10 text-green-400'
                                        }`}>{p.type}</span>
                                    </td>
                                    <td className="py-16">
                                        <div className="font-black text-2xl text-white group-hover:text-electric-blue transition-colors tracking-tighter leading-none">{p.songTitle || 'System Asset'}</div>
                                        <div className="text-[12px] text-gray-700 uppercase font-black mt-4 tracking-[0.3em]">{p.tier || 'Standard Lane'}</div>
                                    </td>
                                    <td className="py-16">
                                        <div className="flex items-center gap-6">
                                            <div className="w-4 h-4 rounded-full bg-neon-purple animate-pulse shadow-[0_0_30px_#8A2BE2] border border-white/20"></div>
                                            <span className="text-[14px] text-gray-400 font-black uppercase tracking-[0.5em]">{p.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-16 text-right text-[14px] text-gray-800 font-mono font-black">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* Sidebar Command Terminal */}
          <div className="space-y-16 xl:space-y-24">
            
            {/* Quick Command Grid */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[72px] p-16 shadow-2xl">
              <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-[0.8em] mb-14">Command Interface</h3>
              <div className="grid grid-cols-2 gap-8">
                {gridActions.map(action => (
                  <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-[56px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-2xl relative overflow-hidden">
                    <span className="text-6xl mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-700 ease-out">{action.icon}</span>
                    <span className="text-[11px] font-black text-gray-700 group-hover:text-white uppercase leading-tight tracking-[0.3em]">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* AI A&R Insights Engine */}
            <div className="bg-gradient-to-br from-neon-purple/50 to-black/20 border border-neon-purple/50 p-16 rounded-[80px] relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-16 opacity-[0.08] text-[260px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
               <div className="flex items-center gap-8 mb-14">
                  <span className="w-6 h-6 bg-neon-purple rounded-full animate-ping"></span>
                  <h3 className="text-white font-black uppercase italic tracking-tighter text-4xl">A&R Intelligence</h3>
               </div>
               <div className="space-y-12 relative z-10">
                  <div className="p-12 bg-black/95 rounded-[56px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/50 transition-all duration-700">
                    <p className="text-[16px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-electric-blue font-black uppercase tracking-[0.4em] block mb-6 not-italic text-[11px]">Strategic Recommendation:</span>
                      "Regional ingestion data indicates a <span className="text-white">74% uptick</span> in West African Drill consumption within UK diaspora hubs. A <span className="text-white underline decoration-neon-purple/50 underline-offset-8">TikTok Pro Burst</span> would optimize engagement."
                    </p>
                  </div>
                  <div className="p-12 bg-black/95 rounded-[56px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/50 transition-all duration-700">
                    <p className="text-[16px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-neon-purple font-black uppercase tracking-[0.4em] block mb-6 not-italic text-[11px]">Optimization Alert:</span>
                      "Metadata audit complete. Your EPK profile lacks high-fidelity session reels. Integrating a live performance link can increase agent response rates by <span className="text-white font-black">62%</span>."
                    </p>
                  </div>
               </div>
               <button className="w-full mt-16 py-8 bg-white text-black text-[13px] font-black uppercase tracking-[0.7em] rounded-[40px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-4 border-gray-400 hover:border-neon-purple">Run Growth Calibration</button>
            </div>

            {/* Global Network Pulse */}
            <div className="bg-white/[0.01] border border-white/5 p-16 rounded-[80px] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-white font-black uppercase tracking-tighter italic text-3xl">Network Pulse</h3>
                    <span className="text-[11px] text-neon-purple font-black uppercase bg-neon-purple/15 px-6 py-3 rounded-full border border-neon-purple/30 animate-pulse tracking-[0.5em] shadow-lg shadow-neon-purple/20">LIVE FEED</span>
                </div>
                <div className="space-y-16 relative z-10">
                    {[
                        { name: 'Kweku_V', action: 'secured sync deal with Nike Africa', time: '22s ago', icon: '💎' },
                        { name: 'Sade_Afro', action: 'topped 10K active monthly listeners', time: '18m ago', icon: '🔥' },
                        { name: 'DJ_Zuma', action: 'joined Accelerator Cohort #5', time: '4h ago', icon: '🚀' }
                    ].map((msg, i) => (
                        <div key={i} className="flex gap-10 group items-start">
                            <div className="w-20 h-20 rounded-[32px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                                {msg.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-[18px] text-white font-black leading-tight tracking-tight mb-3">
                                    <span className="text-electric-blue group-hover:underline cursor-pointer">{msg.name}</span> <span className="text-gray-700 font-bold">{msg.action}</span>
                                </div>
                                <div className="text-[12px] text-gray-900 uppercase font-black tracking-[0.6em]">{msg.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#/community" className="block w-full mt-24 py-8 bg-white/[0.04] border border-white/5 text-center text-[12px] font-black text-white uppercase tracking-[0.7em] rounded-[40px] hover:bg-white hover:text-black transition-all shadow-2xl">Enter Inner Circle</a>
            </div>
          </div>

        </div>

        {/* Global Aggregate Metrics */}
        <div className="mt-64 py-48 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-24">
            {[
                { label: 'Network Total Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Active Deployments', val: '840+', color: 'text-white' },
                { label: 'Verified Royalties Paid', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Global Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center group">
                    <div className={`text-8xl font-black italic tracking-tighter mb-8 group-hover:scale-110 transition-transform duration-700 ${item.color} drop-shadow-2xl`}>{item.val}</div>
                    <div className="text-[13px] text-gray-800 font-black uppercase tracking-[0.8em] leading-relaxed max-w-[220px] mx-auto group-hover:text-gray-400 transition-colors">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
