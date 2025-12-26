
import React, { useState } from 'react';
import { User } from './LoginPage';

const SyncPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [view, setView] = useState<'briefs' | 'talents'>('briefs');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const briefs = [
    { id: 1, brand: 'Soda Pop Africa', title: 'Summer Campaign', music: 'Upbeat Afrobeats', budget: '$500', deadline: '3 days' },
    { id: 2, brand: 'Z-Tech Solutions', title: 'App Launch Video', music: 'Ambient Tech-House', budget: '$300', deadline: '1 week' },
    { id: 3, brand: 'Safari Tours', title: 'Instagram Reel Series', music: 'Authentic Folk/Live Instrumentation', budget: '$150/track', deadline: 'Ongoing' },
  ];

  const handleApply = (briefTitle: string) => {
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const apps = JSON.parse(localStorage.getItem('tsa-sync-apps') || '[]');
    apps.push({
        songTitle: `Proposal for ${briefTitle}`,
        status: 'Proposal Review',
        date: new Date().toISOString(),
        userEmail: user.email
    });
    localStorage.setItem('tsa-sync-apps', JSON.stringify(apps));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="py-24 text-center">
            <h1 className="text-4xl font-black text-white">Application Sent! 🎥</h1>
            <p className="mt-4 text-gray-400">Our sync agents will review your proposal against the brand brief. Good luck!</p>
            <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-electric-blue text-black font-bold rounded-full">Dashboard</a>
        </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h1 className="text-4xl font-black text-white uppercase italic">Sync <span className="text-electric-blue">Marketplace</span></h1>
                <p className="text-gray-500 mt-2">Connect your sound to regional brand campaigns.</p>
            </div>
            <div className="bg-gray-900 p-1 rounded-xl flex border border-gray-800">
                <button onClick={() => setView('briefs')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${view === 'briefs' ? 'bg-electric-blue text-black' : 'text-gray-500 hover:text-white'}`}>Current Briefs</button>
                <button onClick={() => setView('talents')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${view === 'talents' ? 'bg-electric-blue text-black' : 'text-gray-500 hover:text-white'}`}>Sync Catalogs</button>
            </div>
        </div>

        {view === 'briefs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {briefs.map(b => (
                    <div key={b.id} className="bg-gray-900 border border-gray-800 p-8 rounded-[32px] hover:border-electric-blue transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-black text-electric-blue uppercase tracking-widest">{b.brand}</span>
                            <span className="px-2 py-1 bg-white/5 text-gray-500 text-[10px] rounded font-bold">{b.deadline}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 leading-none">{b.title}</h3>
                        <p className="text-xs text-gray-500 mb-8">Looking for: <span className="text-gray-300">{b.music}</span></p>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-xl font-black text-white">{b.budget}</span>
                            <button onClick={() => handleApply(b.title)} className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-electric-blue hover:text-black transition-all">Pitch Song</button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-900 rounded-[40px] border-2 border-dashed border-gray-800">
                <div className="mb-6 text-4xl">📀</div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Register your Sync-Ready Catalog</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">We need your high-quality WAVs, instrumentals, and lyric sheets to pitch to our brand partners effectively.</p>
                <button className="px-10 py-4 bg-neon-purple text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-transform">Injest My Catalog</button>
            </div>
        )}

        <div className="mt-20 p-10 bg-gray-900 border border-gray-800 rounded-[40px]">
            <h3 className="text-xl font-black text-white mb-8 uppercase italic">Recent Success Deals</h3>
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-800 pb-6">
                    <div>
                        <span className="text-white font-bold block text-sm">Afro-Electro Project</span>
                        <span className="text-[10px] text-gray-600 uppercase font-black">Sync with Regional Telecom</span>
                    </div>
                    <span className="text-neon-purple font-mono font-black text-lg">$1,500 Paid</span>
                </div>
                 <div className="flex justify-between items-center border-b border-gray-800 pb-6">
                    <div>
                        <span className="text-white font-bold block text-sm">Acoustic Soul Ballad</span>
                        <span className="text-[10px] text-gray-600 uppercase font-black">Indie Film Soundtrack</span>
                    </div>
                    <span className="text-neon-purple font-mono font-black text-lg">$600 Paid</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SyncPage;
