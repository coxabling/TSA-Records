
import React, { useState } from 'react';
import { User } from './LoginPage';

interface RadioDistributionPageProps {
  user: User | null;
}

const RadioDistributionPage: React.FC<RadioDistributionPageProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    songTitle: '',
    artistName: user?.artistName || '',
    isClean: true,
    bpm: '',
    genre: 'Afrobeats',
    fileLink: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const distroOrders = JSON.parse(localStorage.getItem('tsa-radio-distro') || '[]');
    distroOrders.push({
      ...formData,
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Order Received',
      type: 'RadioDistro'
    });
    localStorage.setItem('tsa-radio-distro', JSON.stringify(distroOrders));
    window.location.hash = `#/checkout?item=${encodeURIComponent('Private Radio Distribution')}&price=${encodeURIComponent('$15')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-6xl font-black text-white sm:text-8xl mb-8 uppercase italic tracking-tighter leading-none">
              Private <span className="text-neon-purple font-outline-1 text-transparent">Broadcast</span>
            </h1>
            <p className="text-2xl text-gray-500 mb-12 italic leading-relaxed">
              Deliver high-fidelity, broadcast-ready masters directly into the internal libraries of 500+ radio stations across the African continent and diaspora.
            </p>
            <div className="grid grid-cols-2 gap-8">
                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-neon-purple/30 transition-all duration-700">
                    <span className="text-neon-purple font-black uppercase text-xs tracking-widest block mb-4">Metadata HQ</span>
                    <span className="text-[12px] text-gray-600 font-bold leading-relaxed block">Industry-standard tagging ensures your assets are searchable in broadcast software.</span>
                </div>
                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-electric-blue/30 transition-all duration-700">
                    <span className="text-electric-blue font-black uppercase text-xs tracking-widest block mb-4">Compliance Check</span>
                    <span className="text-[12px] text-gray-600 font-bold leading-relaxed block">Our team verifies your Clean Edit for FCC/Ofcom broadcast standards.</span>
                </div>
            </div>
          </div>

          <div className="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="bg-white/[0.01] border border-white/10 p-12 lg:p-16 rounded-[64px] shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-8xl group-hover:rotate-12 transition-transform">📻</div>
              <h2 className="text-4xl font-black text-white mb-10 uppercase italic tracking-tighter">Submit Asset $15</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Master Recording Title</label>
                   <input required placeholder="Song Title" className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none transition-all" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">BPM</label>
                        <input placeholder="e.g. 104" className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none" value={formData.bpm} onChange={e => setFormData({...formData, bpm: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Sonic Vertical</label>
                        <select className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}>
                            <option>Afrobeats</option>
                            <option>Amapiano</option>
                            <option>Gospel</option>
                            <option>Hip Hop / Drill</option>
                            <option>Alté / Soul</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-black/40 rounded-3xl border border-white/5 group-hover:border-white/10 transition-all">
                    <input type="checkbox" className="w-6 h-6 accent-neon-purple cursor-pointer" checked={formData.isClean} onChange={e => setFormData({...formData, isClean: e.target.checked})} />
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Verified Radio-Clean Master (No Profanity)</span>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">HQ Asset Uplink (WAV/FLAC)</label>
                    <input required type="url" placeholder="Direct Link (Dropbox / G-Drive)" className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none" value={formData.fileLink} onChange={e => setFormData({...formData, fileLink: e.target.value})} />
                </div>
                <button className="w-full py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-3xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Initialize Distribution</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioDistributionPage;
