
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
 * Replaces Recharts to ensure 100% reliability and custom TSA aesthetic.
 */
const TrendChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / max) * 80}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="relative w-full h-[300px] mt-8 group/chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        ))}

        {/* Area Fill */}
        <polygon points={areaPoints} fill="url(#chartGradient)" className="transition-all duration-1000 ease-out" />
        
        {/* Main Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#8A2BE2"
          strokeWidth="1.5"
          filter="url(#glow)"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Data Points */}
        {data.map((val, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={100 - (val / max) * 80}
            r="1"
            fill="#00BFFF"
            className="hover:r-2 transition-all cursor-pointer"
          >
            <title>{val} Streams</title>
          </circle>
        ))}
      </svg>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
        <span>WK 1</span>
        <span>WK 2</span>
        <span>WK 3</span>
        <span>WK 4</span>
        <span>CURRENT</span>
      </div>
    </div>
  );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      const all = [...radio, ...tiktok, ...launch, ...radioDist, ...playlist, ...epks, ...syncs, ...accel]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setActiveProjects(all);
    } catch (e) {
      console.error("Dashboard data fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [user.email]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Mock stream data for the chart
  const streamData = useMemo(() => [1200, 2400, 1800, 4200, 3600, 5800, 7200], []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white/5 rounded-full relative">
            <div className="absolute inset-0 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] animate-pulse">Initializing Command...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    { label: 'Distribute', href: '#/pricing', icon: '💿' },
    { label: 'Radio Plug', href: '#/radio-plugging', icon: '📻' },
    { label: 'TikTok Push', href: '#/tiktok-growth', icon: '📱' },
    { label: 'Sync Hub', href: '#/sync-hub', icon: '🎥' },
    { label: 'Smart Link', href: '#/artist-launch', icon: '🔗' },
    { label: 'PR Kit', href: '#/epk-service', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-purple selection:text-white pb-24">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-purple/5 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-electric-blue/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-neon-purple/15 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/20 tracking-[0.2em] shadow-[0_0_20px_rgba(138,43,226,0.15)]">
                <span className="inline-block w-1.5 h-1.5 bg-neon-purple rounded-full mr-2 animate-ping"></span>
                Official Label Access
              </span>
              <span className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">TSA-A&R-{user.artistName.substring(0,3).toUpperCase()}</span>
            </div>
            <h1 className="text-6xl sm:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4 drop-shadow-2xl">
              {user.artistName} <span className="text-electric-blue/50">HQ</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-xl max-w-lg leading-relaxed">Global artist management & deployment core.</p>
          </div>

          <div className="w-full xl:w-auto">
            <div className="flex items-center gap-10 p-10 bg-white/[0.02] backdrop-blur-3xl rounded-[48px] border border-white/5 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="p-5 bg-neon-purple/10 rounded-3xl relative z-10 border border-neon-purple/10">
                  <svg className="w-10 h-10 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div className="mr-12 relative z-10">
                  <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mb-2">Verified Revenue</div>
                  <div className="text-5xl font-black text-white tracking-tighter">$0.00</div>
               </div>
               <button className="px-12 py-5 bg-white text-black text-[12px] font-black rounded-2xl uppercase tracking-[0.3em] hover:bg-neon-purple hover:text-white transition-all shadow-xl active:scale-95 relative z-10">Payout</button>
            </div>
          </div>
        </div>

        {/* Career Progression Bar */}
        <div className="mb-16 bg-white/[0.01] backdrop-blur-2xl border border-white/[0.03] rounded-[64px] p-12 shadow-2xl relative group">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <h3 className="text-[13px] font-black text-gray-500 uppercase tracking-[0.6em]">Professional Evolution Index</h3>
              <div className="px-3 py-1 bg-neon-purple/10 text-neon-purple text-[9px] font-black rounded-full border border-neon-purple/10 uppercase animate-pulse">Regional Tier</div>
            </div>
            <div className="text-[11px] font-black text-gray-600 uppercase tracking-widest italic">42% to Continental Star</div>
          </div>
          <div className="relative h-10 bg-black/40 rounded-full border border-white/5 p-2 shadow-inner">
            <div className="h-full w-[42%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_40px_rgba(138,43,226,0.6)]"></div>
          </div>
          <div className="mt-10 grid grid-cols-4 text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">
            <span className="text-white">Local Talent</span>
            <span className="text-center text-electric-blue">Regional Presence</span>
            <span className="text-center">Continental Icon</span>
            <span className="text-right">Global Legend</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-[64px] p-14 hover:border-neon-purple/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl group-hover:rotate-12 transition-transform duration-1000">📊</div>
                <div className="text-[12px] text-gray-600 font-black uppercase mb-4 tracking-[0.3em]">Total Stream Impact</div>
                <div className="text-7xl font-black text-white tracking-tighter">24.8K</div>
                <div className="mt-8 flex items-center gap-3 text-[11px] text-green-500 font-black bg-green-500/10 w-fit px-5 py-2.5 rounded-2xl uppercase tracking-widest border border-green-500/10">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                  +12.4% <span className="text-gray-600 font-bold ml-1 font-sans italic lowercase">mo/mo</span>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[64px] p-14 hover:border-electric-blue/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl group-hover:-rotate-12 transition-transform duration-1000">📻</div>
                <div className="text-[12px] text-gray-600 font-black uppercase mb-4 tracking-[0.3em]">Live Radio Spins</div>
                <div className="text-7xl font-black text-white tracking-tighter">142</div>
                <div className="mt-8 text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] flex items-center gap-3">
                  <span className="w-3 h-3 bg-electric-blue rounded-full shadow-[0_0_20px_#00BFFF] animate-pulse"></span>
                  Verified Airplay
                </div>
              </div>
            </div>

            {/* Custom Interactive Trend Chart */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[72px] p-16 shadow-2xl relative overflow-hidden group">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-8">
                  <div>
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Growth Trajectory</h2>
                    <p className="text-[11px] text-gray-600 uppercase font-black mt-3 tracking-[0.5em]">Consolidated 30-Day Stream Feed</p>
                  </div>
                  <div className="flex bg-black/60 p-2.5 rounded-[32px] border border-white/10 shadow-inner backdrop-blur-2xl">
                      <button className="px-10 py-3.5 text-[11px] font-black text-white bg-white/15 rounded-[24px] uppercase tracking-widest shadow-xl">Real-time</button>
                      <button className="px-10 py-3.5 text-[11px] font-black text-gray-700 hover:text-white uppercase tracking-widest transition-all">Archived</button>
                  </div>
               </div>
               
               <TrendChart data={streamData} />
            </div>

            {/* Service Tracking Hub */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[72px] p-16 shadow-2xl relative">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Deployment Roadmap</h2>
                    <a href="#/services" className="px-10 py-4 bg-white/5 text-[11px] font-black text-neon-purple border border-neon-purple/30 rounded-full uppercase tracking-[0.4em] hover:bg-neon-purple hover:text-white transition-all active:scale-95">Initiate +</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[12px] font-black text-gray-700 uppercase tracking-[0.5em]">
                                <th className="pb-12">Service</th>
                                <th className="pb-12">Deployment Asset</th>
                                <th className="pb-12">Status</th>
                                <th className="pb-12 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeProjects.length === 0 ? (
                                <tr><td colSpan={4} className="py-32 text-center text-gray-700 text-sm font-black uppercase tracking-[0.5em] italic">No active data streams detected. Launch a service to track.</td></tr>
                            ) : activeProjects.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.04] transition-all group">
                                    <td className="py-12">
                                        <span className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase border shadow-inner tracking-widest ${
                                            p.type === 'Radio' ? 'border-blue-500/30 bg-blue-500/5 text-blue-400' :
                                            p.type === 'TikTok' ? 'border-pink-500/30 bg-pink-500/5 text-pink-400' :
                                            p.type === 'EPK' ? 'border-orange-500/30 bg-orange-500/5 text-orange-400' :
                                            p.type === 'Sync' ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400' :
                                            'border-green-500/30 bg-green-500/5 text-green-400'
                                        }`}>{p.type}</span>
                                    </td>
                                    <td className="py-12">
                                        <div className="font-black text-lg text-white group-hover:text-electric-blue transition-colors tracking-tight leading-none">{p.songTitle || 'System Asset'}</div>
                                        <div className="text-[11px] text-gray-600 uppercase font-black mt-2 tracking-[0.2em]">{p.tier || 'Standard Lane'}</div>
                                    </td>
                                    <td className="py-12">
                                        <div className="flex items-center gap-5">
                                            <div className="w-3.5 h-3.5 rounded-full bg-neon-purple animate-pulse shadow-[0_0_20px_#8A2BE2] border border-white/20"></div>
                                            <span className="text-[11px] text-gray-300 font-black uppercase tracking-[0.4em]">{p.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-12 text-right text-[12px] text-gray-700 font-mono font-black">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-16">
            
            {/* Quick Command Grid */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-12 shadow-2xl">
              <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-[0.6em] mb-12">Command Grid</h3>
              <div className="grid grid-cols-2 gap-5">
                {quickActions.map(action => (
                  <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group text-center shadow-xl relative overflow-hidden">
                    <span className="text-5xl mb-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500 ease-out">{action.icon}</span>
                    <span className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase leading-tight tracking-[0.2em]">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* AI A&R Terminal */}
            <div className="bg-gradient-to-br from-neon-purple/40 to-black/20 border border-neon-purple/40 p-16 rounded-[80px] relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-16 opacity-10 text-[200px] -rotate-12 transition-transform group-hover:rotate-12 duration-1000">🧠</div>
               <div className="flex items-center gap-6 mb-12">
                  <span className="w-4 h-4 bg-neon-purple rounded-full animate-ping"></span>
                  <h3 className="text-white font-black uppercase italic tracking-tighter text-3xl">A&R Intelligence</h3>
               </div>
               <div className="space-y-10 relative z-10">
                  <div className="p-10 bg-black/90 rounded-[48px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/40 transition-all">
                    <p className="text-[14px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-electric-blue font-black uppercase tracking-[0.3em] block mb-4 not-italic text-sm">Trend Alert:</span>
                      "Detected surge in <span className="text-white">Amapiano Jazz</span> tags in the UK Diaspora. A <span className="text-white underline decoration-neon-purple/40">TikTok Spark</span> campaign now would yield 3.8x engagement."
                    </p>
                  </div>
                  <div className="p-10 bg-black/90 rounded-[48px] border border-white/5 backdrop-blur-3xl shadow-2xl hover:border-neon-purple/40 transition-all">
                    <p className="text-[14px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-neon-purple font-black uppercase tracking-[0.3em] block mb-4 not-italic text-sm">Strategic Fix:</span>
                      "EPK metadata analysis complete. Labels are <span className="text-white">62% more responsive</span> when live session videos are pinned to the header."
                    </p>
                  </div>
               </div>
               <button className="w-full mt-12 py-7 bg-white text-black text-[13px] font-black uppercase tracking-[0.5em] rounded-[32px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl">Refine Growth Core</button>
            </div>

            {/* Label Network Pulse */}
            <div className="bg-white/[0.01] border border-white/5 p-14 rounded-[80px] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-14">
                    <h3 className="text-white font-black uppercase tracking-tighter italic text-2xl">Network Pulse</h3>
                    <span className="text-[11px] text-neon-purple font-black uppercase bg-neon-purple/15 px-6 py-2.5 rounded-full border border-neon-purple/30 animate-pulse tracking-[0.3em]">LIVE</span>
                </div>
                <div className="space-y-12 relative z-10">
                    {[
                        { name: 'Kweku_V', action: 'secured a sync deal with Jumia', time: '12s ago', icon: '💎' },
                        { name: 'Sade_Afro', action: 'topped 10K monthly listeners', time: '14m ago', icon: '📊' },
                        { name: 'DJ_Zuma', action: 'joined Accelerator Cohort #5', time: '2h ago', icon: '🚀' }
                    ].map((msg, i) => (
                        <div key={i} className="flex gap-8 group items-start">
                            <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                                {msg.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-[15px] text-white font-black leading-tight tracking-tight mb-2">
                                    <span className="text-electric-blue group-hover:underline cursor-pointer">{msg.name}</span> <span className="text-gray-600 font-bold">{msg.action}</span>
                                </div>
                                <div className="text-[11px] text-gray-800 uppercase font-black tracking-[0.3em]">{msg.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#/community" className="block w-full mt-16 py-7 bg-white/[0.03] border border-white/5 text-center text-[11px] font-black text-white uppercase tracking-[0.5em] rounded-[32px] hover:bg-white hover:text-black transition-all">Inner Lounge</a>
            </div>
          </div>

        </div>

        {/* Global Stats Footer */}
        <div className="mt-40 py-32 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
                { label: 'Ecosystem Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Live Deployments', val: '840+', color: 'text-white' },
                { label: 'Verified Royalties', val: '$1.2M+', color: 'text-electric-blue' },
                { label: 'Global Placements', val: '214', color: 'text-white' }
            ].map(item => (
                <div key={item.label} className="text-center group">
                    <div className={`text-6xl font-black italic tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-700 ${item.color} drop-shadow-2xl`}>{item.val}</div>
                    <div className="text-[11px] text-gray-700 font-black uppercase tracking-[0.6em] leading-relaxed max-w-[150px] mx-auto group-hover:text-gray-400 transition-colors">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
