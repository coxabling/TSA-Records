
import React, { useState } from 'react';
import { User } from './LoginPage';

const SyncPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [view, setView] = useState<'briefs' | 'talents'>('briefs');

  const briefs = [
    { id: 1, brand: 'Global Sportswear', title: 'Urban Rhythm Campaign', music: 'High-Energy Afro-Fusion', budget: '$1,200', deadline: '48h' },
    { id: 2, brand: 'Tech Nova', title: 'App Launch Commercial', music: 'Ambient Tech-House / Melodic', budget: '$800', deadline: '5 days' },
    { id: 3, brand: 'Adventure Tours', title: 'Documentary Series', music: 'Traditional Folk / Cinematic', budget: '$400/ep', deadline: 'Ongoing' },
  ];

  const handleApply = (briefTitle: string, price: string) => {
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const apps = JSON.parse(localStorage.getItem('tsa-sync-apps') || '[]');
    apps.push({
        songTitle: `Proposal: ${briefTitle}`,
        status: 'Order Received',
        date: new Date().toISOString(),
        userEmail: user.email,
        type: 'Sync'
    });
    localStorage.setItem('tsa-sync-apps', JSON.stringify(apps));
    
    // Most sync apps are free to apply but we might have a submission fee or a pro-tier
    window.location.hash = `#/checkout?item=${encodeURIComponent('Sync Pitch: ' + briefTitle)}&price=${encodeURIComponent('$15')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-20 gap-10">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">Sync <span className="text-electric-blue font-outline-1 text-transparent">Market</span></h1>
                <p className="text-2xl text-gray-500 mt-6 italic font-medium max-w-2xl">Connect your master recordings to high-impact brand narratives and cinematic media projects.</p>
            </div>
            <div className="bg-black/60 p-2 rounded-[32px] flex border border-white/10 backdrop-blur-3xl shadow-2xl">
                <button onClick={() => setView('briefs')} className={`px-10 py-4 text-[11px] font-black uppercase rounded-[24px] transition-all ${view === 'briefs' ? 'bg-electric-blue text-black' : 'text-gray-700 hover:text-white'}`}>Open Briefs</button>
                <button onClick={() => setView('talents')} className={`px-10 py-4 text-[11px] font-black uppercase rounded-[24px] transition-all ${view === 'talents' ? 'bg-electric-blue text-black' : 'text-gray-700 hover:text-white'}`}>Catalog Ingest</button>
            </div>
        </div>

        {view === 'briefs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {briefs.map(b => (
                    <div key={b.id} className="bg-white/[0.01] border border-white/5 p-10 rounded-[56px] hover:border-electric-blue transition-all group relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-9xl group-hover:scale-125 transition-transform">🎥</div>
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <span className="px-5 py-2 bg-electric-blue/10 text-electric-blue text-[10px] font-black uppercase border border-electric-blue/20 rounded-full tracking-widest">{b.brand}</span>
                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">{b.deadline} rem.</span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 leading-none tracking-tighter italic">{b.title}</h3>
                        <p className="text-[12px] text-gray-600 font-bold uppercase tracking-widest mb-10">Target Sound: <span className="text-white italic">{b.music}</span></p>
                        <div className="flex justify-between items-center relative z-10 pt-8 border-t border-white/5">
                            <span className="text-3xl font-black text-white italic tracking-tighter">{b.budget}</span>
                            <button onClick={() => handleApply(b.title, b.budget)} className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-electric-blue hover:text-black transition-all shadow-xl active:scale-95">Pitch Asset</button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-40 bg-white/[0.01] rounded-[64px] border-2 border-dashed border-white/5 animate-in zoom-in duration-1000">
                <div className="mb-10 text-8xl opacity-20">📀</div>
                <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">Sync Catalog Ingestion</h3>
                <p className="text-gray-500 mb-12 max-w-lg mx-auto text-lg italic leading-relaxed">We require high-fidelity WAVs, isolated instrumentals, and verified lyric sheets to effectively broker deals with our brand partners.</p>
                <button className="px-14 py-7 bg-neon-purple text-white font-black uppercase text-[12px] tracking-[0.6em] rounded-3xl hover:scale-105 transition-all shadow-neon-purple">Authorize Metadata Upload</button>
            </div>
        )}

        <div className="mt-32 p-16 bg-white/[0.01] border border-white/5 rounded-[64px] shadow-2xl">
            <h3 className="text-4xl font-black text-white mb-12 uppercase italic tracking-tighter leading-none">Global Sync Success</h3>
            <div className="space-y-10">
                {[
                    { title: 'Afro-Drill Pulse', context: 'Pan-African Telecom Brand Spot', payout: '$3,200' },
                    { title: 'Soulful Horizon', context: 'Independent Feature Film Soundtrack', payout: '$1,500' },
                    { title: 'Desert Wind', context: 'International Travel Documentary', payout: '$850' }
                ].map((deal, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-10 gap-6">
                        <div>
                            <span className="text-2xl text-white font-black italic tracking-tighter block mb-2">{deal.title}</span>
                            <span className="text-[11px] text-gray-700 uppercase font-black tracking-[0.5em]">{deal.context}</span>
                        </div>
                        <span className="text-4xl font-black text-electric-blue italic tracking-tighter shadow-neon-blue px-6 py-2 bg-electric-blue/5 rounded-2xl border border-electric-blue/20">{deal.payout} Disbursed</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SyncPage;
