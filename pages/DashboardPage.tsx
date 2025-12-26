
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Initializing Artist Hub...</p>
        </div>
      </div>
    );
  }

  const { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  const quickActions = [
    { label: 'Distribute', href: '#/pricing', icon: '💿', color: 'bg-neon-purple' },
    { label: 'Radio Pitch', href: '#/radio-plugging', icon: '📻', color: 'bg-electric-blue' },
    { label: 'TikTok Trend', href: '#/tiktok-growth', icon: '📱', color: 'bg-pink-500' },
    { label: 'PR Kit', href: '#/epk-service', icon: '📝', color: 'bg-orange-500' },
    { label: 'Sync Briefs', href: '#/sync-hub', icon: '🎥', color: 'bg-yellow-500' },
    { label: 'Accelerator', href: '#/accelerator', icon: '🚀', color: 'bg-green-500' },
  ];

  return (
    <div className="py-12 bg-brand-bg min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Navigation & Profile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-neon-purple/20 text-neon-purple text-[10px] font-black rounded-full uppercase border border-neon-purple/30">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Verified Artist
                    </span>
                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">TSA ID: #AFR-294</span>
                </div>
                <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                   {user.artistName} <span className="text-electric-blue">Portal</span>
                </h1>
                <p className="mt-2 text-gray-500 font-medium italic">Welcome back to your global command center.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 p-4 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/5 flex-grow">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="mr-6">
                      <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Unpaid Royalties</div>
                      <div className="text-2xl font-black text-white">$0.00</div>
                  </div>
                  <button className="px-6 py-2.5 bg-white text-black text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-neon-purple hover:text-white transition-all shadow-lg">Cash Out</button>
              </div>
            </div>
        </div>

        {/* Career Health Meter */}
        <div className="mb-12 bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Career Readiness Score</h3>
            <span className="text-neon-purple font-black text-xs uppercase italic">Level 4: Rising Contender</span>
          </div>
          <div className="relative h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-neon-purple to-electric-blue rounded-full shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <span>Local Talent</span>
            <span className="text-neon-purple">Current: Global Push</span>
            <span>Superstar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-6 rounded-[32px] border border-white/5 hover:border-neon-purple/20 transition-all">
                        <div className="text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest">Global Reach</div>
                        <div className="text-4xl font-black text-white">24.8K</div>
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-green-500 font-bold">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                           +12.4% vs last mo.
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-[32px] border border-white/5 hover:border-electric-blue/20 transition-all">
                        <div className="text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest">Radio Presence</div>
                        <div className="text-4xl font-black text-white">142</div>
                        <div className="mt-2 text-[10px] text-gray-500 font-bold">In 12 target regions</div>
                    </div>
                </div>

                {/* Growth Chart */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[40px] p-8 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Impact Analytics</h2>
                          <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">Daily aggregated stream trends</p>
                        </div>
                        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                            <button className="px-3 py-1.5 text-[9px] font-black text-white bg-white/10 rounded-lg uppercase">Daily</button>
                            <button className="px-3 py-1.5 text-[9px] font-black text-gray-500 hover:text-white uppercase">Monthly</button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={[{n:'Mon', s:500}, {n:'Tue', s:1200}, {n:'Wed', s:900}, {n:'Thu', s:2400}, {n:'Fri', s:1800}, {n:'Sat', s:3200}, {n:'Sun', s:5800}]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="n" stroke="#444" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                            <Tooltip 
                                contentStyle={{backgroundColor:'#000', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', fontSize:'10px'}} 
                                itemStyle={{color:'#fff', fontWeight:'900'}}
                                labelStyle={{color:'#888', fontWeight:'bold', marginBottom:'4px'}}
                            />
                            <Area type="monotone" dataKey="s" stroke="#8A2BE2" strokeWidth={5} fill="url(#colorS)" animationDuration={2000} />
                            <defs>
                                <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Active Projects Table */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[40px] p-10">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Active Campaigns</h2>
                        <a href="#/services" className="text-[10px] font-black text-neon-purple uppercase hover:underline">New Project +</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                                    <th className="pb-6">Service</th>
                                    <th className="pb-6">Project Name</th>
                                    <th className="pb-6">Tracking</th>
                                    <th className="pb-6 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeProjects.length === 0 ? (
                                    <tr><td colSpan={4} className="py-20 text-center text-gray-700 text-xs italic font-medium uppercase tracking-widest">No active data streams detected.</td></tr>
                                ) : activeProjects.map((p, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                                p.type === 'Radio' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                                                p.type === 'TikTok' ? 'border-pink-500/30 bg-pink-500/10 text-pink-400' :
                                                p.type === 'EPK' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' :
                                                p.type === 'Sync' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                                                'border-green-500/30 bg-green-500/10 text-green-400'
                                            }`}>{p.type}</span>
                                        </td>
                                        <td className="py-6">
                                            <div className="font-black text-sm text-white">{p.songTitle || 'Untitled Launch'}</div>
                                            <div className="text-[10px] text-gray-600 uppercase font-bold mt-1">{p.tier || 'Standard Package'}</div>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"></div>
                                                <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 text-right text-[10px] text-gray-600 font-mono">
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
            <div className="space-y-8">
                
                {/* Quick Action Grid */}
                <div className="bg-gray-900/50 border border-white/5 rounded-[40px] p-8">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Tools & Distribution</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map(action => (
                            <a key={action.label} href={action.href} className="flex flex-col items-center justify-center p-5 bg-black/40 border border-white/5 rounded-3xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all group text-center">
                                <span className="text-3xl mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">{action.icon}</span>
                                <span className="text-[9px] font-black text-gray-400 group-hover:text-white uppercase leading-tight tracking-tighter">{action.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* AI Insights Engine */}
                <div className="bg-gradient-to-br from-neon-purple/20 to-transparent border border-neon-purple/30 p-10 rounded-[48px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl -rotate-12 transition-transform group-hover:rotate-0">🧠</div>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 bg-neon-purple rounded-full animate-ping"></span>
                        <h3 className="text-white font-black uppercase italic tracking-tighter">AI A&R Insights</h3>
                    </div>
                    <div className="space-y-5 relative z-10">
                        <div className="p-5 bg-black/60 rounded-3xl border border-white/5 backdrop-blur-md">
                            <p className="text-[11px] text-gray-300 leading-relaxed italic">
                                "<span className="text-electric-blue font-black not-italic">VIRAL ALERT:</span> High engagement detected on Amapiano 'log drum' tags in your region. Release a 15s teaser now for 3x reach."
                            </p>
                        </div>
                        <div className="p-5 bg-black/60 rounded-3xl border border-white/5 backdrop-blur-md">
                            <p className="text-[11px] text-gray-300 leading-relaxed italic">
                                "<span className="text-neon-purple font-black not-italic">EPK TIP:</span> You haven't updated your press kit in 30 days. Updated kits are 45% more likely to be picked for 'Playlist Rising' placements."
                            </p>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl">Refine My Strategy</button>
                </div>

                {/* Social Community Snippet */}
                <div className="bg-gray-900/50 border border-white/5 p-10 rounded-[48px]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-black uppercase tracking-tighter italic">Label Feed</h3>
                        <span className="text-[10px] text-neon-purple font-black uppercase bg-neon-purple/10 px-2 py-0.5 rounded">Insider Only</span>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Kweku_Vibes', action: 'secured a sync deal with Jumia', time: '2m ago' },
                            { name: 'Sade_Afro', action: 'topped 10K streams on new drop', time: '14m ago' },
                            { name: 'DJ_Zuma', action: 'joined the Accelerator program', time: '1h ago' }
                        ].map((msg, i) => (
                            <div key={i} className="flex gap-4 group">
                                <img src={`https://i.pravatar.cc/100?u=${msg.name}`} className="w-10 h-10 rounded-2xl border border-gray-800 object-cover group-hover:scale-105 transition-transform" alt="User" />
                                <div>
                                    <div className="text-[10px] text-white font-bold tracking-tight">
                                        <span className="text-electric-blue">{msg.name}</span> <span className="text-gray-400 font-medium">{msg.action}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-600 mt-1 uppercase font-bold">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#/community" className="block w-full mt-10 py-4 bg-gray-800 border border-white/5 text-center text-[10px] font-black text-white uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all">Go to Community</a>
                </div>
            </div>
        </div>

        {/* Global Stats Banner */}
        <div className="mt-20 py-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: 'Label Streams', val: '15.2M' },
                { label: 'Active Projects', val: '840+' },
                { label: 'Artist Payouts', val: '$1.2M+' },
                { label: 'Sync Placements', val: '214' }
            ].map(item => (
                <div key={item.label} className="text-center">
                    <div className="text-2xl font-black text-white italic">{item.val}</div>
                    <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest mt-1">{item.label}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
