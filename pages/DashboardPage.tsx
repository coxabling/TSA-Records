
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from './LoginPage';

interface DashboardPageProps {
  user: User;
}

// Master Order Status Flow (8 Stages)
type OrderStatus = 
  | 'Order Received' 
  | 'Payment Confirmed' 
  | 'Content Review' 
  | 'Campaign Scheduled' 
  | 'In Progress' 
  | 'Live Campaign' 
  | 'Completed' 
  | 'Follow‑Up';

// Roles & Responsibilities mapping
type ResponsibilityRole = 'Artist' | 'TSA Admin' | 'Promo Team' | 'System';

interface Campaign {
    songTitle?: string;
    artistName?: string;
    tier?: string;
    status: OrderStatus;
    date: string;
    type: 'Radio' | 'TikTok' | 'LaunchPage' | 'RadioDistro' | 'Playlist' | 'EPK' | 'Sync' | 'Accelerator';
}

/**
 * Role Tracker Badge
 * Visually identifies who is currently responsible for the project's next move.
 */
const RoleBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  let role: ResponsibilityRole = 'System';
  let color = 'text-gray-500 bg-gray-500/10 border-gray-500/20';

  if (status === 'Order Received' || status === 'Content Review') {
    role = 'Artist';
    color = 'text-electric-blue bg-electric-blue/10 border-electric-blue/20';
  } else if (status === 'Payment Confirmed' || status === 'Campaign Scheduled') {
    role = 'TSA Admin';
    color = 'text-neon-purple bg-neon-purple/10 border-neon-purple/20';
  } else if (status === 'In Progress' || status === 'Live Campaign') {
    role = 'Promo Team';
    color = 'text-green-400 bg-green-400/10 border-green-400/20';
  } else {
    role = 'System';
    color = 'text-white bg-white/10 border-white/20';
  }

  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${color}`}>
      {role}
    </span>
  );
};

const StudioTrendChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data, 1000);
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / max) * 75}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="relative w-full h-[280px] mt-10 group/chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="neonGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
          </linearGradient>
          <filter id="svgGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        ))}
        <polygon points={areaPoints} fill="url(#neonGlowGrad)" className="transition-all duration-1000 ease-in-out" />
        <polyline points={points} fill="none" stroke="#8A2BE2" strokeWidth="1" filter="url(#svgGlow)" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between mt-8 text-[9px] font-black text-gray-800 uppercase tracking-[0.5em]">
        <span>Discovery</span>
        <span>Adoption</span>
        <span>Velocity</span>
        <span>Peak Impact</span>
      </div>
    </div>
  );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEcosystemData = useCallback(() => {
    try {
      const getS = (k: string) => JSON.parse(localStorage.getItem(k) || '[]');
      const keys = ['tsa-campaigns', 'tsa-tiktok-orders', 'tsa-artist-pages', 'tsa-radio-distro', 'tsa-playlist-subs', 'tsa-epks', 'tsa-sync-apps', 'tsa-accelerator-apps'];
      const types: any[] = ['Radio', 'TikTok', 'LaunchPage', 'RadioDistro', 'Playlist', 'EPK', 'Sync', 'Accelerator'];
      
      let all: Campaign[] = [];
      keys.forEach((k, i) => {
        const data = getS(k).filter((c: any) => c.userEmail === user.email).map((c: any) => ({ ...c, type: types[i] }));
        all = [...all, ...data];
      });

      // Default demo project for new users
      if (all.length === 0) {
        all.push({
            songTitle: 'Initial Asset Synchronization',
            status: 'Content Review',
            date: new Date().toISOString(),
            type: 'Accelerator',
            tier: 'TSA Onboarding'
        });
      }

      setActiveProjects(all.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (e) {
      console.error("Hydration Error:", e);
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [user.email]);

  useEffect(() => {
    fetchEcosystemData();
  }, [fetchEcosystemData]);

  const trendData = useMemo(() => [800, 2400, 1900, 4800, 3100, 7200, 9500], []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-b-2 border-neon-purple rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase text-gray-700 animate-pulse">Syncing</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-purple selection:text-white pb-32">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        
        {/* Elite Command Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div>
            <div className="flex items-center gap-5 mb-10">
              <span className="px-5 py-2.5 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/40 tracking-[0.4em]">
                <span className="inline-block w-2 h-2 bg-neon-purple rounded-full mr-3 animate-ping"></span>
                Operations Command
              </span>
              <span className="text-gray-800 text-[10px] font-black uppercase tracking-[0.6em]">ARTIST_NODE: {user.artistName.substring(0,4).toUpperCase()}</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black uppercase italic tracking-tighter leading-none mb-8">
              {user.artistName} <span className="text-electric-blue/40 font-outline-1">HQ</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-3xl max-w-lg leading-relaxed">Integrated deployment and performance hub.</p>
          </div>

          <div className="w-full xl:w-auto">
            <div className="flex items-center gap-12 p-12 bg-white/[0.02] backdrop-blur-3xl rounded-[64px] border border-white/5 shadow-2xl relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="mr-16">
                  <div className="text-[10px] text-gray-700 font-black uppercase tracking-[0.6em] mb-4">Total Revenue Share</div>
                  <div className="text-7xl font-black text-white tracking-tighter">$0.00</div>
               </div>
               <button className="px-14 py-7 bg-white text-black text-[13px] font-black rounded-3xl uppercase tracking-[0.5em] hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Payout</button>
            </div>
          </div>
        </div>

        {/* 8-Stage Progression Pulse */}
        <div className="mb-24 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[80px] p-16 shadow-2xl group overflow-hidden">
          <div className="flex justify-between items-center mb-14">
            <h3 className="text-[14px] font-black text-gray-700 uppercase tracking-[0.8em]">Master Velocity Tracking</h3>
            <div className="text-[11px] font-black text-neon-purple uppercase tracking-[0.4em] bg-neon-purple/10 px-6 py-2 rounded-full border border-neon-purple/20">Stage: Regional Scaling</div>
          </div>
          <div className="relative h-14 bg-black/60 rounded-full border border-white/10 p-3 shadow-inner">
            <div className="h-full w-[38%] bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient rounded-full shadow-[0_0_60px_rgba(138,43,226,0.6)]"></div>
          </div>
          <div className="mt-12 grid grid-cols-4 text-[11px] font-black text-gray-800 uppercase tracking-[0.7em]">
            <span className="text-white">Emerging</span>
            <span className="text-center text-electric-blue">Regional</span>
            <span className="text-center">Continental</span>
            <span className="text-right">Global</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">
          
          <div className="lg:col-span-2 space-y-20">
            
            {/* Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white/[0.02] border border-white/5 rounded-[72px] p-16 hover:border-neon-purple/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.05] text-[180px] group-hover:rotate-12 transition-transform duration-1000">📈</div>
                <div className="text-[13px] text-gray-800 font-black uppercase mb-6 tracking-[0.5em]">Digital Impressions</div>
                <div className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">24.8K</div>
                <div className="mt-10 flex items-center gap-4 text-[12px] text-green-500 font-black bg-green-500/10 w-fit px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border border-green-500/10">
                  +12.4% <span className="text-gray-800 font-bold ml-1 lowercase font-sans">this cycle</span>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[72px] p-16 hover:border-electric-blue/40 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.05] text-[180px] group-hover:-rotate-12 transition-transform duration-1000">📻</div>
                <div className="text-[13px] text-gray-800 font-black uppercase mb-6 tracking-[0.5em]">Radio Synchronizations</div>
                <div className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">142</div>
                <div className="mt-10 text-[12px] text-gray-800 font-black uppercase tracking-[0.6em] flex items-center gap-4">
                  <span className="w-4 h-4 bg-electric-blue rounded-full shadow-[0_0_30px_#00BFFF] animate-pulse"></span>
                  Verified Airplay
                </div>
              </div>
            </div>

            {/* Performance Visualization */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[80px] p-20 shadow-2xl relative group">
               <div className="flex justify-between items-center mb-16">
                  <div>
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Impact Trajectory</h2>
                    <p className="text-[12px] text-gray-800 uppercase font-black mt-4 tracking-[0.6em]">Consolidated Audience Analytics (30D)</p>
                  </div>
                  <div className="flex bg-black/60 p-3 rounded-[32px] border border-white/10">
                      <button className="px-10 py-4 text-[10px] font-black text-white bg-white/10 rounded-[24px] uppercase tracking-widest">Real-Time</button>
                      <button className="px-10 py-4 text-[10px] font-black text-gray-800 hover:text-white uppercase tracking-widest transition-all">Archived</button>
                  </div>
               </div>
               <StudioTrendChart data={trendData} />
            </div>

            {/* Deployment Matrix (8-Stage Flow) */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[80px] p-20 shadow-2xl">
                <div className="flex justify-between items-center mb-20">
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Deployment Matrix</h2>
                    <a href="#/services" className="px-12 py-5 bg-white/5 text-[11px] font-black text-neon-purple border border-neon-purple/40 rounded-full uppercase tracking-[0.5em] hover:bg-neon-purple hover:text-white transition-all shadow-2xl">Initialize New +</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[13px] font-black text-gray-800 uppercase tracking-[0.7em]">
                                <th className="pb-16">Service Core</th>
                                <th className="pb-16">Active Asset</th>
                                <th className="pb-16">Current Responsibility</th>
                                <th className="pb-16 text-right">Last Sync</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeProjects.map((p, i) => (
                                <tr key={i} className="hover:bg-white/[0.04] transition-all group">
                                    <td className="py-14">
                                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase border tracking-[0.3em] ${
                                            p.type === 'Radio' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                                            p.type === 'TikTok' ? 'border-pink-500/30 text-pink-400 bg-pink-500/5' :
                                            p.type === 'Sync' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                                            'border-green-500/30 text-green-400 bg-green-500/5'
                                        }`}>{p.type}</span>
                                    </td>
                                    <td className="py-14">
                                        <div className="font-black text-2xl text-white tracking-tighter group-hover:text-electric-blue transition-colors">{p.songTitle || 'System Asset'}</div>
                                        <div className="text-[12px] text-gray-700 uppercase font-black mt-3 tracking-[0.4em]">{p.status}</div>
                                    </td>
                                    <td className="py-14">
                                        <RoleBadge status={p.status} />
                                    </td>
                                    <td className="py-14 text-right text-[14px] text-gray-800 font-mono font-black italic">
                                        {new Date(p.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* Operations Sidebar */}
          <div className="space-y-16 xl:space-y-24">
            
            {/* Quick Command Hub */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[72px] p-14 shadow-2xl">
              <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-[0.8em] mb-12">Service Catalog</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'Radio Plug', h: '#/radio-plugging', i: '📻' },
                  { label: 'TikTok Spark', h: '#/tiktok-growth', i: '📱' },
                  { label: 'Sync Pitch', h: '#/sync-hub', i: '🎥' },
                  { label: 'PR (EPK)', h: '#/epk-service', i: '📄' },
                  { label: 'AI Rotation', h: '#/ai-radio', i: '🎙' },
                  { label: 'Accelerator', h: '#/accelerator', i: '🚀' },
                ].map(action => (
                  <a key={action.label} href={action.h} className="flex flex-col items-center justify-center p-10 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-neon-purple hover:bg-neon-purple/10 transition-all group shadow-2xl">
                    <span className="text-5xl mb-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">{action.i}</span>
                    <span className="text-[10px] font-black text-gray-800 group-hover:text-white uppercase tracking-[0.3em]">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* AI A&R Operations Terminal */}
            <div className="bg-gradient-to-br from-neon-purple/50 to-black/30 border border-neon-purple/50 p-16 rounded-[80px] relative overflow-hidden group shadow-2xl shadow-neon-purple/20">
               <div className="absolute top-0 right-0 p-16 opacity-[0.1] text-[280px] -rotate-12 group-hover:rotate-12 transition-transform duration-1000">🧠</div>
               <div className="flex items-center gap-7 mb-14">
                  <span className="w-6 h-6 bg-neon-purple rounded-full animate-ping"></span>
                  <h3 className="text-white font-black uppercase italic tracking-tighter text-4xl">Ops Directive</h3>
               </div>
               <div className="space-y-10 relative z-10">
                  <div className="p-10 bg-black/90 rounded-[56px] border border-white/5 shadow-2xl hover:border-neon-purple/40 transition-all duration-700">
                    <p className="text-[16px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-electric-blue font-black uppercase tracking-[0.5em] block mb-5 not-italic text-[10px]">Strategic Ingestion:</span>
                      "Regional data for <span className="text-white">West African Afrobeats</span> shows a <span className="text-white font-black">72% uptick</span> in Diaspora radio requests. A <span className="text-white underline underline-offset-8 decoration-neon-purple/40">Radio Distro</span> sweep would optimize ROI."
                    </p>
                  </div>
                  <div className="p-10 bg-black/90 rounded-[56px] border border-white/5 shadow-2xl hover:border-neon-purple/40 transition-all duration-700">
                    <p className="text-[16px] text-gray-400 leading-relaxed font-bold italic">
                      <span className="text-neon-purple font-black uppercase tracking-[0.5em] block mb-5 not-italic text-[10px]">Optimization Alert:</span>
                      "Content Review stage detected. Your EPK profile is missing <span className="text-white">Live Performance Reels</span>. Integrating these will increase agent response by <span className="text-white font-black">62%</span>."
                    </p>
                  </div>
               </div>
               <button className="w-full mt-16 py-8 bg-white text-black text-[13px] font-black uppercase tracking-[0.8em] rounded-[40px] hover:bg-neon-purple hover:text-white transition-all shadow-2xl border-b-6 border-gray-400 hover:border-neon-purple">Run Calibration</button>
            </div>

            {/* Live Operations Feed (Roles & Responsibilities) */}
            <div className="bg-white/[0.01] border border-white/5 p-16 rounded-[80px] shadow-2xl relative">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-white font-black uppercase tracking-tighter italic text-3xl">Ops Log</h3>
                    <span className="text-[11px] text-neon-purple font-black uppercase bg-neon-purple/15 px-6 py-2 rounded-full border border-neon-purple/30 animate-pulse tracking-[0.5em]">SYSTEM LIVE</span>
                </div>
                <div className="space-y-14 relative z-10">
                    {[
                        { role: 'System', action: 'Metadata audit complete for "Sonic Wave"', time: '12s ago', icon: '⚙️' },
                        { role: 'TSA Admin', action: 'Initialized station pitching in UK Diaspora', time: '18m ago', icon: '📝' },
                        { role: 'Promo Team', action: 'Campaign Live: South African Radio Hub', time: '4h ago', icon: '📻' }
                    ].map((log, i) => (
                        <div key={i} className="flex gap-8 group items-start">
                            <div className="w-16 h-16 rounded-[28px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                                {log.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-[16px] text-white font-black leading-tight tracking-tight mb-2">
                                    <span className="text-neon-purple font-black uppercase tracking-[0.2em] block text-[9px] mb-2">{log.role}</span>
                                    <span className="text-gray-400 font-bold italic">{log.action}</span>
                                </div>
                                <div className="text-[11px] text-gray-800 uppercase font-black tracking-[0.5em]">{log.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#/community" className="block w-full mt-20 py-7 bg-white/[0.04] border border-white/5 text-center text-[11px] font-black text-white uppercase tracking-[0.7em] rounded-[40px] hover:bg-white hover:text-black transition-all shadow-2xl">Enter Inner Circle</a>
            </div>
          </div>

        </div>

        {/* Aggregate Label Metrics */}
        <div className="mt-64 py-48 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-24">
            {[
                { label: 'Ecosystem Total Streams', val: '15.2M', color: 'text-neon-purple' },
                { label: 'Live Deployments', val: '840+', color: 'text-white' },
                { label: 'Verified Royalties Disbursed', val: '$1.2M+', color: 'text-electric-blue' },
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
