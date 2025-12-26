
import React, { useState } from 'react';
import { User } from './LoginPage';

const SyncPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [view, setView] = useState<'briefs' | 'talents'>('briefs');

  const briefs = [
    { id: 1, brand: 'Soda Pop Africa', title: 'Summer Campaign', music: 'Upbeat Afrobeats', budget: '$500', deadline: '3 days' },
    { id: 2, brand: 'Z-Tech Solutions', title: 'App Launch Video', music: 'Ambient Tech-House', budget: '$300', deadline: '1 week' },
    { id: 3, brand: 'Safari Tours', title: 'Instagram Reel Series', music: 'Authentic Folk/Live Instrumentation', budget: '$150/track', deadline: 'Ongoing' },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-4xl font-black text-white uppercase italic">Sync <span className="text-electric-blue">Marketplace</span></h1>
                <p className="text-gray-500 mt-2">Connect your sound to regional brand campaigns.</p>
            </div>
            <div className="bg-gray-900 p-1 rounded-xl flex">
                <button onClick={() => setView('briefs')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'briefs' ? 'bg-electric-blue text-black' : 'text-gray-500'}`}>Current Briefs</button>
                <button onClick={() => setView('talents')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'talents' ? 'bg-electric-blue text-black' : 'text-gray-500'}`}>Sync Catalogs</button>
            </div>
        </div>

        {view === 'briefs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {briefs.map(b => (
                    <div key={b.id} className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl hover:border-electric-blue transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-electric-blue uppercase tracking-widest">{b.brand}</span>
                            <span className="px-2 py-1 bg-electric-blue/10 text-electric-blue text-[10px] rounded font-bold">Ends in {b.deadline}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                        <p className="text-sm text-gray-500 mb-6">Music Style: {b.music}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-black text-white">{b.budget}</span>
                            <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg group-hover:bg-electric-blue transition-all">Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-900 rounded-3xl border border-dashed border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Register your Sync-Ready Catalog</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">We need your high-quality WAVs, instrumentals, and lyric sheets to pitch to our brand partners.</p>
                <button className="px-8 py-4 bg-neon-purple text-white font-bold rounded-xl hover:scale-105 transition-transform">Submit Catalog</button>
            </div>
        )}

        <div className="mt-20 p-8 bg-gray-900 border border-gray-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Deals Closed</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <div>
                        <span className="text-white font-bold block">Artist X</span>
                        <span className="text-xs text-gray-500">Sync with African Fintech Brand</span>
                    </div>
                    <span className="text-neon-purple font-mono font-bold">$1,200 Paid</span>
                </div>
                 <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <div>
                        <span className="text-white font-bold block">Producer Y</span>
                        <span className="text-xs text-gray-500">Soundtrack for Documentary</span>
                    </div>
                    <span className="text-neon-purple font-mono font-bold">$450 Paid</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SyncPage;
