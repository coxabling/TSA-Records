
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from './LoginPage';

interface DashboardPageProps {
  user: User;
}

// Aligning with the MASTER ORDER STATUS FLOW (Stage 8 of workflow)
type OrderStatus = 
  | 'Order Received' 
  | 'Payment Confirmed' 
  | 'Content Review' 
  | 'Campaign Scheduled' 
  | 'In Progress' 
  | 'Live Campaign' 
  | 'Completed' 
  | 'Follow‑Up';

interface Campaign {
    songTitle?: string;
    artistName?: string;
    tier?: string;
    status: OrderStatus;
    date: string;
    type: 'Radio' | 'TikTok' | 'LaunchPage' | 'RadioDistro' | 'Playlist' | 'EPK' | 'Sync' | 'Accelerator' | 'AIDistribution';
}

/**
 * Custom High-Fidelity SVG Chart
 * Engineered for TSA Refix aesthetic - Zero external dependencies.
 */
const StudioTrendChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data, 1000);
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
        
        {/* Horizontal Grid */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* Dynamic Area Fill */}
        <polygon points={areaPoints} fill="url(#neonGlowGrad)" className="transition-all duration-1000 ease-in-out" />
        
        {/* Main Line */}
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

        {/* Data Markers */}
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
      
      <div className="flex justify-between mt-8 text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">
        <span>Discovery</span>
        <span>Validation</span>
        <span>Scaling</span>
        <span>Peak</span>
        <span>Real-Time</span>
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
      const launch = getStorage('tsa-artist-pages').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'LaunchPage' }));
      const radioDist = getStorage('tsa-radio-distro').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'RadioDistro' }));
      const playlist = getStorage('tsa-playlist-subs').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Playlist' }));
      const epks = getStorage('tsa-epks').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'EPK' }));
      const syncs = getStorage('tsa-sync-apps').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Sync' }));
      const accelerator = getStorage('tsa-accelerator-apps').filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: 'Accelerator' }));

      // Mocking some "In Progress" data for visual testing if empty
      const demoData: Campaign[] = activeProjects.length === 0 ? [
        { songTitle: 'Sonic Boom (Radio)', status: 'Live Campaign', date: new Date().toISOString(), type: 'Radio' },
        { songTitle: 'Viral Wave #1', status: 'In Progress', date: new Date().toISOString(), type: 'TikTok' }
      ] : [];

      const merged = [...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks, ...syncs, ...accelerator, ...demoData]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setActiveProjects(merged);
    } catch (e) {
      console.error("Dashboard hydration failure:", e);
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  }, [user.email, activeProjects.length]);

  useEffect(() => {
    fetchUnifiedData();
  }, [fetchUnifiedData]);

  const trendMetrics = useMemo(() => [1200, 3100, 2800, 5200, 4100, 6800, 8500], []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Completed': return 'text-green-400 border-green-500/20 bg-green-500/5';
      case 'Live Campaign': return 'text-electric-blue border-electric-blue/20 bg-electric-blue/5';
      case 'In Progress': return 'text-neon-purple border-neon-purple/20 bg-neon-purple/5';
      default: return 'text-gray-500 border-gray-800 bg-gray-900/40';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-b-4 border-neon-purple rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-sm uppercase tracking-widest animate-pulse">TSA Refix</span>
            </div>
          </div>
          <p className="mt-8 text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Establishing Secure Uplink...</p>
        </div>
      </div>
    );
  }

  // Refined Service Catalog Grid (Stage 1)
  const serviceCatalog = [
    { label: 'Distro', href: '#/pricing', icon: '💿' },
    { label: 'Radio', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok', href: '#/tiktok-growth', icon: '📱' },
    { label: 'Playlist', href: '#/playlists', icon: '🎧' },
    { label: 'EPK', href: '#/epk-service', icon: '📄' },
    { label: 'Launch', href: '#/artist-launch', icon: '🌐' },
    { label: 'AI Radio', href: '#/ai-radio', icon: '🎙' },
    { label: 'Accelerate', href: '#/accelerator', icon: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-purple selection:text-white pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-neon-purple/10 rounded-full blur-[300px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-electric-blue/10 rounded-full blur-[300px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        
        {/* Professional Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div>
            <div className="flex items-center gap-5 mb-8">
              <span className="px-6 py-2.5 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/40 tracking-[0.4em] shadow-[0_0_30px_rgba(138,43,226,0.2)]">
                <span className="inline-block w-2 h-2 bg-neon-purple rounded-full mr-3 animate-ping"></span>
                Official Artist Hub
              </span>
              <span className="text-gray-800 text-[10px] font-black uppercase tracking-[0.5em]">LBL_ID: {user.artistName.substring(0,4).toUpperCase()}</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6 drop-shadow-2xl">
              {user.artistName} <span className="text-electric-blue/40 font-outline-1">TSA</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-2xl max-w-xl leading-relaxed">Integrated deployment and analytics command center.</p>
          </div>

          <div className="w-full xl:w-auto">
            <div className="flex items-center gap-14 p-12 bg-white/[0.03] backdrop-blur-3xl rounded-[64px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="p-7 bg-neon-purple/15 rounded-3xl relative z-10 border border-neon-purple/20">
                  <svg className="w-14 h-14 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" /></svg>
               </div>
               <div className="mr-12 relative z-10">
                  <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.6em] mb-4">Total Revenue</div>
                  <div className="text-7xl font-black text-white tracking-tighter">$0.00</div>
               </div>
               <button className="px-16 py-7 bg-white text-black text-[13px] font-black rounded-3xl uppercase tracking-[0.5em] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 relative z-10 border-b-4 border-gray-400 hover:border-neon-purple">Payout</button>
            </div>
          </div>
        </div>

        {/* Career Progression Core */}
        <div className="mb-20 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[80px] p-16 shadow-2xl relative group">
          <div className="flex justify-between items-center mb-14">
            <div className="flex items-center gap-7">
              <h3 className="text-[16px] font-black text-gray-600 uppercase tracking-[0.8em]">Career Velocity Metric</h3>
              <div className="px-6 py-2.5 bg-green-500/10 text-green-500 text-[11px] font-black rounded-full border border-green-500/20 uppercase tracking-widest animate-pulse shadow-lg">Stage 3: Accelerating</div>
            </div>
            <div className="text-[13px] font-black text-gray-700 uppercase tracking-[0.4em] italic">Status: Content Review Active</div>
          </div>
          <div className="relative h-16 bg-black/60 rounded-full border border-white/10 p-4 shadow-inner overflow-hidden">
            <div className="h-full w-[42%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_60px_rgba(138,43,226,0.6)]"></div>
          </div>
          <div className="mt-14 grid grid-cols-4 text-[11px] font-black text-gray-800 uppercase tracking-[0.7em]">
            <span className="text-white">Emerging</span>
            <span className="text-center text-electric-blue">Regional Star</span>
            <span className="text-center">Continental Icon</span>
            <span className="text-right">Global Legend</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Main Strategic Dashboard */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/[0.02] border border-white/5 rounded-[80px] p-20 hover:border-neon-purple/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.06] text-[220px] group-hover:rotate-12 transition-transform duration-1000">📊</div>
                <div className="text-[14px] text-gray-700 font-black uppercase mb-7 tracking-[0.6em] group-hover:text-neon-purple transition-colors">Global Reach</div>
                <div className="text-9xl font-black text-white tracking-tighter">24.8K</div>
                <div className="mt-12 flex items-center gap-5 text-[13px] text-green-500 font-black bg-green-500/10 w-fit px-8 py-4 rounded-3xl uppercase tracking-[0.3em] border border-green-500/20 shadow-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                  +12.4% <span className="text-gray-700 font-bold ml-1 italic lowercase font-sans">mo/mo</span>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[80px] p-20 hover:border-electric-blue/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.06] text-[220px] group-hover:-rotate-12 transition-transform duration-1000">📻</div>
                <div className="text-[14px] text-gray-700 font-black uppercase mb-7 tracking-[0.6em] group-hover:text-electric-blue transition-colors">Airplay Sync</div>
                <div className="text-9xl font-black text-white tracking-tighter">142</div>
                <div className="mt-12 text-[13px] text-gray-800 font-black uppercase tracking-[0.7em] flex items-center gap-5">
                  <span className="w-5 h-5 bg-electric-blue rounded-full shadow-[0_0_40px_#00BFFF] animate-pulse border border-white/20"></span>
                  Stations Verified
                </div>
              </div>
            </div>

            {/* Custom SVG Trend Visualization */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[90px] p-24 shadow-2xl relative overflow-hidden group">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-20 gap-12">
                  <div>
                    <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Sonic Trajectory</h2>
                    <p className="text-[13px] text-gray-700 uppercase font-black mt-5 tracking-[0.7em]">Consolidated Growth Metrics (Last 30 Days)</p>
                  </div>
                  <div className="flex bg-black/70 p-4 rounded-[40px] border border-white/10 shadow-inner backdrop-blur-3xl">
                      <button className="px-14 py-5 text-[12px] font-black text-white bg-white/15 rounded-[28px] uppercase tracking-widest shadow-2xl">Live Feed</button>
                      <button className="px-14 py-5 text-[12px] font-black text-gray-800 hover:text-white uppercase tracking-widest transition-all">Archived</button>
                  </div>
               </div>
               
               <StudioTrendChart data={trendMetrics} />
            </div>

            {/* Unified Deployment Matrix (8-point flow) */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[90px] p-24 shadow-2xl relative">
                <div className="flex justify-between items-center mb-20">
                    <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">Deployment Matrix</h2>
                    <a href="#/services" className="px-14 py-6 bg-white/5 text-[12px] font-black text-neon-purple border border-neon-purple/50 rounded-full uppercase tracking-[0.6em] hover:bg-neon-purple hover:text-white transition-all active:scale-95 shadow-2xl">Deploy Service +</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[14px] font-black text-gray-800 uppercase tracking-[0.8em]">
                                <th className="pb-20">Service Core</th>
                                <th className="pb-20">Active Asset</th>
                                <th className="pb-20">Master Status</th>
                                <th className="pb-20 text-right">Last Sync</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeProjects.length === 0 ? (
                                <tr><td colSpan={4} className="py-56 text-center text-gray-800 text-sm font-black uppercase tracking-[0.8em] italic">No active data streams detected. Start a deployment to begin.</td></tr>
                            ) : activeProjects.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.06] transition-all group">
                                    <td className="py-16">
                                        <span className={`px-8 py-3.5 rounded-full text-[11px] font-black uppercase border shadow-inner tracking-[0.3em] ${
                                            p.type === 'Radio' ? 'border-blue-500/40 bg-blue-500/10 text-blue-400' :
                                            p.type === 'TikTok' ? 'border-pink-500/40 bg-pink-500/10 text-pink-400' :
                                            p.type === 'EPK' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' :
                                            'border-green-500/40 bg-green-500/10 text-green-400'
                                        }`}>{p.type}</span>
                                    </td>
                                    <td className="py-16">
                                        <div className="font-black text-3xl text-white group-hover:text-electric-blue transition-colors tracking-tighter leading-none">{p.songTitle || 'System Asset'}</div>
                                        <div className="text-[13px] text-gray-700 uppercase font-black mt-5 tracking-[0.4em]">{p.tier || 'Master Deployment'}</div>
                                    </td>
                                    <td className="py-16">
                                        <div className="flex items-center gap-7">
                                            <div className="w-5 h-5 rounded-full bg-neon-purple animate-pulse shadow-[0_0_40px_#8A2BE2] border border-white/20"></div>
                                            <span className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase border tracking-[0.5em] ${getStatusColor(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-16 text-right text-[15px] text-gray-800 font-mono font-black">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* Sidebar Terminal Core */}
          <div className="space-y-16 xl:space-y-24">
            
            {/* Quick Command Interface */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[80px] p-16 shadow-2xl">
              <h3 className="text-[14px] font-black text-gray-800 uppercase tracking-[0.9em] mb-16">Command Interface</h3>
              <div className="grid grid-cols-2 gap-10">
                {serviceCatalog.map(action => (
                  <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-[64px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-2xl relative overflow-hidden">
                    <span className="text-7xl mb-7 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-700 ease-out">{action.icon}</span>
                    <span className="text-[12px] font-black text-gray-700 group-hover:text-white uppercase leading-tight tracking-[0.4em]">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* AI A&R Insights (Planning Powered) */}
            <div className="bg-gradient-to-br from-neon-purple/60 to-black/30 border border-neon-purple/60 p-20 rounded-[90px] relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-20 opacity-[0.1] text-[300px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
               <div className="flex items-center gap-10 mb-16">
                  <span className="w-7 h-7 bg-neon-purple rounded-full animate-ping shadow-[0_0_40px_rgba(138,43,226,0.8)]"></span>
                  <h3 className="text-white font-black uppercase italic tracking-tighter text-5xl">A&R Intelligence</h3>
               </div>
               <div className="space-y-14 relative z-10">
                  <div className="p-14 bg-black/95 rounded-[72px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/60 transition-all duration-700">
                    <p className="text-[17px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-electric-blue font-black uppercase tracking-[0.5em] block mb-7 not-italic text-[12px]">Strategic recommendation:</span>
                      "Consolidated data for <span className="text-white uppercase">Amapiano Jazz</span> indicates a <span className="text-white font-black">74% uptick</span> in UK Diaspora engagement. Initiating a <span className="text-white underline decoration-neon-purple/60 underline-offset-8">TikTok Pro Spark</span> campaign now would yield 3.8x ROI based on current trend alignment."
                    </p>
                  </div>
                  <div className="p-14 bg-black/95 rounded-[72px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/60 transition-all duration-700">
                    <p className="text-[17px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-neon-purple font-black uppercase tracking-[0.5em] block mb-7 not-italic text-[12px]">Optimization insight:</span>
                      "Metadata audit complete for your recent deployment. Adding <span className="text-white">Live Performance Reels</span> to your EPK profile will increase regional festival agent responsiveness by <span className="text-white font-black">62%</span>."
                    </p>
                  </div>
               </div>
               <button className="w-full mt-20 py-10 bg-white text-black text-[15px] font-black uppercase tracking-[0.8em] rounded-[48px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Refine Growth Core</button>
            </div>

            {/* Global Network Pulse */}
            <div className="bg-white/[0.01] border border-white/5 p-20 rounded-[90px] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-white font-black uppercase tracking-tighter italic text-4xl">Network Pulse</h3>
                    <span className="text-[12px] text-neon-purple font-black uppercase bg-neon-purple/20 px-8 py-4 rounded-full border border-neon-purple/40 animate-pulse tracking-[0.6em] shadow-lg">LIVE UPLINK</span>
                </div>
                <div className="space-y-20 relative z-10">
                    {[
                        { name: 'Kweku_V', action: 'secured sync deal with Nike Africa', time: '14s ago', icon: '💎' },
                        { name: 'Sade_Afro', action: 'topped 10K active monthly listeners', time: '18m ago', icon: '🔥' },
                        { name: 'DJ_Zuma', action: 'joined Accelerator Cohort #5', time: '4h ago', icon: '🚀' }
                    ].map((msg, i) => (
                        <div key={i} className="flex gap-12 group items-start">
                            <div className="w-24 h-24 rounded-[40px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                                {msg.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-[20px] text-white font-black leading-tight tracking-tight mb-4">
                                    <span className="text-electric-blue group-hover:underline cursor-pointer">{msg.name}</span> <span className="text-gray-700 font-bold">{msg.action}</span>
                                </div>
                                <div className="text-[13px] text-gray-900 uppercase font-black tracking-[0.7em]">{msg.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#/community" className="block w-full mt-24 py-10 bg-white/[0.05] border border-white/10 text-center text-[13px] font-black text-white uppercase tracking-[0.8em] rounded-[48px] hover:bg-white hover:text-black transition-all shadow-2xl">Enter Inner Circle</a>
            </div>
          </div>

        </div>

        {/* Global Label Aggregated Metrics */}
        <div className="mt-48 py-48 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-24">
            {[
                { label: 'Ecosystem Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Live Deployments', val: '840+', color: 'text-white' },
                { label: 'Royalties Distributed', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Sync Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center group">
                    <div className={`text-9xl font-black italic tracking-tighter mb-8 group-hover:scale-110 transition-transform duration-700 ${item.color} drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]`}>{item.val}</div>
                    <div className="text-[14px] text-gray-800 font-black uppercase tracking-[0.9em] leading-relaxed max-w-[250px] mx-auto group-hover:text-gray-400 transition-colors">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
