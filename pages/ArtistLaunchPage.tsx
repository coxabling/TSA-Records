
import React, { useState } from 'react';
import { User } from './LoginPage';

interface ArtistLaunchPageProps {
  user: User | null;
}

const ArtistLaunchPage: React.FC<ArtistLaunchPageProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    bio: '',
    instagram: '',
    spotify: '',
    youtube: '',
    bookingEmail: user?.email || '',
    template: 'Sleek Dark'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const pages = JSON.parse(localStorage.getItem('tsa-artist-pages') || '[]');
    pages.push({
      ...formData,
      artistName: user?.artistName || 'Artist',
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Order Received',
      type: 'LaunchPage'
    });
    localStorage.setItem('tsa-artist-pages', JSON.stringify(pages));
    window.location.hash = `#/checkout?item=${encodeURIComponent('Artist Launch Page')}&price=${encodeURIComponent('$25')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full blur-[150px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-6xl font-black text-white sm:text-8xl mb-8 uppercase italic tracking-tighter leading-none">
              Artist <span className="text-electric-blue font-outline-1 text-transparent">Launch</span>
            </h1>
            <p className="text-2xl text-gray-500 mb-12 italic leading-relaxed">
              One link to command them all. A professional, high-converting digital hub for your master recordings, social footprint, and booking cycles.
            </p>
            <div className="mt-10 bg-white/[0.01] border border-white/10 p-12 rounded-[64px] shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-8xl group-hover:rotate-12 transition-transform">🌐</div>
              <h2 className="text-4xl font-black text-white mb-10 uppercase italic tracking-tighter">Initialize Link $25</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Artist Narrative</label>
                   <textarea required placeholder="Brief Artist Bio..." rows={3} className="w-full bg-black/60 border border-white/5 rounded-3xl p-6 text-white focus:border-neon-purple outline-none" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="Instagram URL" className="w-full bg-black/60 border border-white/5 rounded-2xl p-4 text-white focus:border-neon-purple outline-none" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                   <input type="text" placeholder="Spotify URL" className="w-full bg-black/60 border border-white/5 rounded-2xl p-4 text-white focus:border-neon-purple outline-none" value={formData.spotify} onChange={e => setFormData({...formData, spotify: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Visual Template Selection</label>
                    <select className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none" value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})}>
                        <option>Sleek Dark (HQ)</option>
                        <option>Neon Pulse (Vibrant)</option>
                        <option>Afro-Vibrant (Cultural)</option>
                    </select>
                </div>
                <button className="w-full py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-3xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Proceed to Deployment</button>
              </form>
            </div>
          </div>

          <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-electric-blue/20 blur-[120px] -z-10"></div>
            <div className="bg-[#050505] border-[12px] border-gray-900 rounded-[56px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] p-8 h-[650px] w-[320px] mx-auto relative overflow-hidden group">
                <div className="w-16 h-1.5 bg-gray-800 rounded-full mx-auto mb-12"></div>
                <div className="w-24 h-24 bg-neon-purple/20 rounded-full mx-auto mb-6 border border-neon-purple/30 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                    <span className="text-white font-black text-3xl italic">TSA</span>
                </div>
                <div className="h-4 w-32 bg-gray-800 rounded mx-auto mb-3"></div>
                <div className="h-2.5 w-48 bg-gray-900 rounded mx-auto mb-12"></div>
                
                <div className="space-y-4">
                    <div className="h-12 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-center text-[11px] text-gray-500 font-black uppercase tracking-widest hover:bg-white/10 transition-all">Stream on Spotify</div>
                    <div className="h-12 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-center text-[11px] text-gray-500 font-black uppercase tracking-widest hover:bg-white/10 transition-all">Official Music Video</div>
                    <div className="h-12 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-center text-[11px] text-gray-500 font-black uppercase tracking-widest hover:bg-white/10 transition-all">Booking Inquiries</div>
                </div>
                
                <div className="absolute bottom-10 left-0 right-0 text-center">
                    <span className="text-[10px] text-gray-800 font-black uppercase tracking-[0.3em]">TSA Professional Deployment</span>
                </div>
            </div>
            <p className="text-center mt-8 text-gray-700 font-black text-xs uppercase tracking-[0.4em]">Live Preview: Sleek Dark Template</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistLaunchPage;
