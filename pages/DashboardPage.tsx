
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

type ResponsibilityRole = 'Artist' | 'TSA Admin' | 'Promo Team' | 'System';

interface Campaign {
    id: string;
    songTitle?: string;
    artistName?: string;
    tier?: string;
    status: OrderStatus;
    date: string;
    type: 'Radio' | 'TikTok' | 'LaunchPage' | 'RadioDistro' | 'Playlist' | 'EPK' | 'Sync' | 'Accelerator';
    qcStatus: 'Passed' | 'Pending' | 'Flagged';
}

// Fix: Removed the pipe symbol which was incorrectly being interpreted as a bitwise OR operator
const STAGES: OrderStatus[] = [
  'Order Received', 
  'Payment Confirmed', 
  'Content Review', 
  'Campaign Scheduled', 
  'In Progress', 
  'Live Campaign', 
  'Completed', 
  'Follow‑Up'
];

/**
 * Technical Progress Stepper for the 8-Stage Workflow
 */
const PhaseMatrix: React.FC<{ currentStatus: OrderStatus }> = ({ currentStatus }) => {
  const currentIndex = STAGES.indexOf(currentStatus);
  return (
    <div className="flex items-center justify-between w-full gap-1 mt-6">
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex-1 group relative">
          <div className={`h-1.5 rounded-full transition-all duration-700 ${
            i <= currentIndex ? (stage === 'Completed' ? 'bg-green-500' : 'bg-neon-purple shadow-[0_0_10px_#8A2BE2]') : 'bg-white/5'
          }`}></div>
          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-3 py-1.5 rounded text-[8px] font-black uppercase tracking-widest whitespace-nowrap z-50 pointer-events-none transition-opacity">
            {stage}
          </div>
        </div>
      ))}
    </div>
  );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeProjects, setActiveProjects] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [systemLogs, setSystemLogs] = useState<{msg: string, role: ResponsibilityRole, time: string}[]>([]);

  const fetchOperationalData = useCallback(() => {
    try {
      const getS = (k: string) => JSON.parse(localStorage.getItem(k) || '[]');
      const keys = ['tsa-campaigns', 'tsa-tiktok-orders', 'tsa-artist-pages', 'tsa-radio-distro', 'tsa-playlist-subs', 'tsa-epks', 'tsa-sync-apps', 'tsa-accelerator-apps'];
      const types: any[] = ['Radio', 'TikTok', 'LaunchPage', 'RadioDistro', 'Playlist', 'EPK', 'Sync', 'Accelerator'];
      
      let all: Campaign[] = [];
      keys.forEach((k, i) => {
        const data = getS(k).filter((c: any) => c.userEmail === user.email).map((c: any) => ({ 
          ...c, 
          id: c.id || `CMP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: types[i],
          qcStatus: c.qcStatus || 'Pending'
        }));
        all = [...all, ...data];
      });

      if (all.length === 0) {
        all.push({
            id: 'CMP-INIT-001',
            songTitle: 'Ecosystem Initialization',
            status: 'Content Review',
            date: new Date().toISOString(),
            type: 'Accelerator',
            tier: 'Level 1',
            qcStatus: 'Passed'
        });
      }

      setActiveProjects(all.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      
      // Seed System Logs
      setSystemLogs([
        { msg: "System: Source of Truth (Google Sheets) Uplink Stable.", role: 'System', time: 'LIVE' },
        { msg: "AI Ops Director: Interpreting latest order metadata...", role: 'System', time: '2m' },
        { msg: "Admin: QA cycle complete for active TikTok campaigns.", role: 'TSA Admin', time: '14m' }
      ]);
    } catch (e) {
      console.error("Operational Ingestion Error:", e);
    } finally {
      setTimeout(() => setIsLoading(false), 900);
    }
  }, [user.email]);

  useEffect(() => {
    fetchOperationalData();
  }, [fetchOperationalData]);

  const getRoleForStatus = (status: OrderStatus): ResponsibilityRole => {
    if (status === 'Order Received' || status === 'Content Review' || status === 'Follow‑Up') return 'Artist';
    if (status === 'Payment Confirmed' || status === 'Campaign Scheduled') return 'TSA Admin';
    if (status === 'In Progress' || status === 'Live Campaign') return 'Promo Team';
    return 'System';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-t-2 border-r-2 border-neon-purple rounded-full animate-spin"></div>
          <p className="mt-8 text-[10px] font-black uppercase text-gray-700 tracking-[0.5em] animate-pulse">Initializing Ops Terminal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-purple pb-32">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        
        {/* Ops Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
          <div>
            <div className="flex items-center gap-5 mb-8">
              <span className="px-5 py-2.5 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/30 tracking-[0.4em]">
                Command Node: {user.artistName.toUpperCase()}
              </span>
              <span className="text-gray-800 text-[10px] font-black uppercase tracking-[0.5em] font-mono">NODE_OS: 2.5.0-FL-LITE</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black uppercase italic tracking-tighter leading-none mb-4">
              Control <span className="text-electric-blue/40 font-outline-1">Center</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-2xl max-w-xl">AI-Native Label Operations & Deployment Hub.</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[48px] backdrop-blur-3xl shadow-2xl flex items-center gap-12">
            <div>
              <div className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em] mb-3">Escalated Notifications</div>
              <div className="text-5xl font-black text-white italic">02</div>
            </div>
            <div className="h-12 w-[1px] bg-white/5"></div>
            <div>
               <div className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em] mb-3">Live Dispatches</div>
               <div className="text-5xl font-black text-electric-blue italic">{activeProjects.filter(p => p.status === 'Live Campaign').length}</div>
            </div>
          </div>
        </div>

        {/* AI Operations Director Terminal */}
        <div className="mb-16 bg-black border border-white/10 rounded-3xl p-8 font-mono shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-[120px] opacity-[0.02] pointer-events-none">📟</div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">AI Operations Director Terminal</h3>
          </div>
          <div className="space-y-3 h-32 overflow-y-auto custom-scrollbar pr-4">
             {systemLogs.map((log, i) => (
               <div key={i} className="flex gap-4 text-[11px] items-start animate-in fade-in slide-in-from-left-4 duration-500">
                 <span className="text-gray-800 shrink-0">[{log.time}]</span>
                 <span className={`${log.role === 'System' ? 'text-neon-purple' : 'text-gray-400'} font-bold`}>{log.msg}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">
          
          <div className="lg:col-span-2 space-y-16">
            
            {/* Active Deployment Matrix */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-12 shadow-2xl">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Active Matrix</h2>
                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">Single Source of Truth: Verified</span>
                </div>
                
                <div className="space-y-12">
                   {activeProjects.map((p, i) => {
                     const role = getRoleForStatus(p.status);
                     return (
                       <div key={p.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px] hover:border-white/10 transition-all group">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-3xl shadow-xl group-hover:rotate-3 transition-transform">
                                  {p.type === 'Radio' ? '📻' : p.type === 'TikTok' ? '📱' : '🚀'}
                               </div>
                               <div>
                                  <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-2xl font-black text-white tracking-tighter">{p.songTitle || 'Ecosystem Asset'}</h4>
                                    <span className="text-[9px] text-gray-600 font-mono font-bold tracking-widest">{p.id}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <span className="text-[10px] text-neon-purple font-black uppercase tracking-widest">{p.type} Vertical</span>
                                     <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${p.qcStatus === 'Passed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>QC: {p.qcStatus}</span>
                                  </div>
                               </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                               <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                                 role === 'Artist' ? 'bg-electric-blue/10 border-electric-blue/30 text-electric-blue animate-pulse' : 'bg-white/5 border-white/10 text-gray-500'
                               }`}>
                                 {role === 'Artist' ? 'Action Required: Artist' : `Responsible: ${role}`}
                               </span>
                               {role === 'Artist' && (
                                 <button className="text-[10px] font-black text-white uppercase tracking-widest underline decoration-electric-blue underline-offset-4 hover:text-electric-blue transition-colors">Handle Dispatch</button>
                               )}
                            </div>
                         </div>
                         <PhaseMatrix currentStatus={p.status} />
                       </div>
                     );
                   })}
                </div>
            </div>

            {/* Technical Campaign Planner Output */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-[200px] -rotate-12 group-hover:rotate-12 transition-transform duration-1000">📊</div>
                <h2 className="text-4xl font-black text-white mb-10 uppercase italic tracking-tighter">Operational Directives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                   <div className="bg-black/80 p-10 rounded-[48px] border border-white/5 backdrop-blur-3xl hover:border-neon-purple/40 transition-all group/card shadow-2xl">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple font-black text-xs shadow-lg">01</div>
                         <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Region Alignment Logic</h4>
                      </div>
                      <p className="text-[14px] text-gray-500 leading-relaxed font-bold italic group-hover/card:text-gray-300 transition-colors">
                        "Ecosystem data identifies <span className="text-white">UK Diaspora</span> and <span className="text-white">Ghana Regional Hubs</span> as high-affinity clusters for the current master recording. Prioritize micro-wins via regional community radio over continental scale in Phase 1."
                      </p>
                   </div>
                   <div className="bg-black/80 p-10 rounded-[48px] border border-white/5 backdrop-blur-3xl hover:border-electric-blue/40 transition-all group/card shadow-2xl">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue font-black text-xs shadow-lg">02</div>
                         <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">KPI Optimization</h4>
                      </div>
                      <p className="text-[14px] text-gray-500 leading-relaxed font-bold italic group-hover/card:text-gray-300 transition-colors">
                        "Initiating <span className="text-white">TikTok Spark</span>. Strategic goal: 12% user-generated content retention rate. Prefer high-engagement niche creators over low-context viral influencers to protect artist brand equity."
                      </p>
                   </div>
                </div>
            </div>
          </div>

          {/* Functional Sidebar */}
          <div className="space-y-16 xl:space-y-24">
             {/* Integrated Service Grid */}
             <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-12 shadow-2xl">
                <h3 className="text-[12px] font-black text-gray-700 uppercase tracking-[0.8em] mb-12">Deployment Catalog</h3>
                <div className="grid grid-cols-2 gap-6">
                   {[
                     { label: 'Radio', icon: '📻', h: '#/radio-plugging' },
                     { label: 'TikTok', icon: '📱', h: '#/tiktok-growth' },
                     { label: 'EPK Hub', icon: '📄', h: '#/epk-service' },
                     { label: 'Sync Ops', icon: '🎥', h: '#/sync-hub' },
                     { label: 'Distro', icon: '💿', h: '#/pricing' },
                     { label: 'Accel.', icon: '🚀', h: '#/accelerator' },
                   ].map(cat => (
                     <a key={cat.label} href={cat.h} className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-[40px] hover:border-neon-purple hover:bg-neon-purple/5 transition-all group text-center shadow-xl">
                        <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <span className="text-[9px] font-black text-gray-700 group-hover:text-white uppercase tracking-widest">{cat.label}</span>
                     </a>
                   ))}
                </div>
             </div>

             {/* Network Monitoring Feed */}
             <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[64px] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-white font-black uppercase tracking-tighter italic text-3xl leading-none">Global Pulse</h3>
                    <span className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-neon-purple/10 text-neon-purple border border-neon-purple/30 shadow-lg animate-pulse">System Active</span>
                </div>
                <div className="space-y-12">
                   {[
                     { user: 'Ras_T', action: 'Live Campaign triggered in South Africa', time: '14s ago' },
                     { user: 'Sade_X', action: 'EPK Matrix synchronized for Press Ingest', time: '12m ago' },
                     { user: 'System', action: 'QC Pass: 42 new assets verified', time: '1h ago' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl group-hover:bg-neon-purple transition-all shadow-xl">⚡</div>
                        <div>
                           <div className="text-[14px] text-white font-black leading-tight tracking-tight mb-2">
                             <span className="text-electric-blue">{item.user}</span> <span className="text-gray-600 font-bold">{item.action}</span>
                           </div>
                           <div className="text-[10px] text-gray-800 font-mono font-black uppercase tracking-widest">{item.time}</div>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-16 py-7 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.5em] rounded-[32px] hover:bg-white hover:text-black transition-all shadow-2xl">Access Inner Circle</button>
             </div>
          </div>

        </div>

        {/* Holistic Ecosystem Metrics */}
        <div className="mt-64 py-48 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
                { l: 'Ecosystem Volume', v: '15.2M', c: 'text-neon-purple' },
                { l: 'Active Operations', v: '840+', c: 'text-white' },
                { l: 'Settled Royalties', v: '$1.2M+', c: 'text-electric-blue' },
                { l: 'Placements Secured', v: '214', c: 'text-white' }
            ].map(m => (
                <div key={m.l} className="text-center group">
                    <div className={`text-9xl font-black italic tracking-tighter mb-6 group-hover:scale-110 transition-transform duration-700 ${m.c} drop-shadow-2xl`}>{m.v}</div>
                    <div className="text-[11px] text-gray-800 font-black uppercase tracking-[0.8em] leading-relaxed max-w-[180px] mx-auto group-hover:text-gray-400 transition-colors">{m.l}</div>
                </div>
            ))}
        </div>
      </div>
      
      {/* Global Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-3xl border-t border-white/10 h-16 flex items-center px-12 z-[100] shadow-2xl">
         <div className="flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.6em] text-gray-700">
            <span className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div> API Status: Stable</span>
            <span className="flex items-center gap-3"><div className="w-2 h-2 bg-electric-blue rounded-full shadow-[0_0_10px_#00BFFF]"></div> Latency: 14ms</span>
            <span className="hidden md:inline-block">Ecosystem Secure & Encrypted</span>
         </div>
      </div>
    </div>
  );
};

export default DashboardPage;
