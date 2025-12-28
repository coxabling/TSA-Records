
import React, { useState } from 'react';
import { User } from './LoginPage';

const EPKPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [formData, setFormData] = useState({
    tagline: '',
    fullBio: '',
    topAchievement: '',
    pressLinks: '',
    template: 'Afro-Minimal'
  });

  const templates = [
    { id: 'minimal', name: 'Afro-Minimal', img: 'https://picsum.photos/seed/epk1/300/400' },
    { id: 'bold', name: 'Neon Pulse', img: 'https://picsum.photos/seed/epk2/300/400' },
    { id: 'classic', name: 'Vintage Highlife', img: 'https://picsum.photos/seed/epk3/300/400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const epks = JSON.parse(localStorage.getItem('tsa-epks') || '[]');
    epks.push({ 
        ...formData, 
        userEmail: user?.email, 
        artistName: user?.artistName, 
        date: new Date().toISOString(), 
        status: 'Order Received',
        type: 'EPK'
    });
    localStorage.setItem('tsa-epks', JSON.stringify(epks));
    window.location.hash = `#/checkout?item=${encodeURIComponent('Professional EPK Kit')}&price=${encodeURIComponent('$40')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[150px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <h1 className="text-5xl font-black text-white sm:text-8xl mb-8 uppercase italic tracking-tighter leading-none">
                    Industry <span className="text-neon-purple font-outline-1 text-transparent">Kits</span>
                </h1>
                <p className="text-2xl text-gray-500 mb-12 italic leading-relaxed">
                    A professional Electronic Press Kit (EPK) is your digital passport to festivals, playlists, and media cycles. We build high-fidelity, mobile-ready kits for the elite industry.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-neon-purple/30 transition-all duration-700">
                        <div className="w-16 h-16 bg-neon-purple/10 rounded-3xl flex items-center justify-center text-neon-purple font-black text-xl mb-6 shadow-lg">01</div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Strategic Design</h4>
                        <p className="text-[12px] text-gray-600 font-bold leading-relaxed">We transform your raw assets into a polished, high-converting digital presentation.</p>
                    </div>
                     <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[48px] hover:border-electric-blue/30 transition-all duration-700">
                        <div className="w-16 h-16 bg-electric-blue/10 rounded-3xl flex items-center justify-center text-electric-blue font-black text-xl mb-6 shadow-lg">02</div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">A&R Optimized</h4>
                        <p className="text-[12px] text-gray-600 font-bold leading-relaxed">Structured specifically for the short attention spans of booking agents and label heads.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-12 lg:p-16 rounded-[64px] shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-right-8 duration-1000">
                <h2 className="text-4xl font-black text-white mb-10 uppercase italic tracking-tighter">Initialize EPK Build</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Professional Tagline</label>
                        <input required placeholder="e.g. The New Voice of Lagos Soul" className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-white focus:border-neon-purple outline-none transition-all" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Extended Artist Bio</label>
                        <textarea required rows={5} placeholder="Describe your journey, influences, and sonic philosophy..." className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-white focus:border-neon-purple outline-none" value={formData.fullBio} onChange={e => setFormData({...formData, fullBio: e.target.value})} />
                    </div>
                    
                    <div>
                        <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-6">Visual Identity Template</label>
                        <div className="grid grid-cols-3 gap-6">
                            {templates.map(t => (
                                <button type="button" key={t.id} onClick={() => setFormData({...formData, template: t.name})} className={`flex flex-col rounded-3xl border-2 transition-all p-2 group ${formData.template === t.name ? 'border-neon-purple bg-neon-purple/5' : 'border-white/5 bg-black/40 hover:border-white/20'}`}>
                                    <div className="aspect-[3/4] bg-gray-900 rounded-2xl mb-3 overflow-hidden">
                                        <img src={t.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={t.name} />
                                    </div>
                                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest text-center py-2">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="w-full py-8 bg-white text-black font-black uppercase text-[14px] tracking-[0.7em] rounded-3xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Launch $40 Build</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EPKPage;
