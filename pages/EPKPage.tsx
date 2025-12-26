
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const templates = [
    { id: 'minimal', name: 'Afro-Minimal', img: 'https://picsum.photos/seed/epk1/300/400' },
    { id: 'bold', name: 'Neon Pulse', img: 'https://picsum.photos/seed/epk2/300/400' },
    { id: 'classic', name: 'Vintage Highlife', img: 'https://picsum.photos/seed/epk3/300/400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const epks = JSON.parse(localStorage.getItem('tsa-epks') || '[]');
    epks.push({ ...formData, userEmail: user?.email, artistName: user?.artistName, date: new Date().toISOString(), status: 'Designing' });
    localStorage.setItem('tsa-epks', JSON.stringify(epks));
  };

  if (isSubmitted) {
    return (
        <div className="py-24 text-center">
            <h1 className="text-4xl font-black text-white">EPK Construction Started! 🎨</h1>
            <p className="mt-4 text-gray-400">Our design team is building your professional press kit. Check your dashboard in 48 hours for the download link.</p>
            <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-neon-purple text-white font-bold rounded-full">Dashboard</a>
        </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
                <h1 className="text-4xl font-black text-white sm:text-6xl mb-6 uppercase italic">Digital Press <span className="text-neon-purple">& PR Kits</span></h1>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    A professional Electronic Press Kit (EPK) is your passport to festivals, playlists, and interviews. We design high-converting, mobile-ready kits for the modern industry.
                </p>
                
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-electric-blue font-bold">01</div>
                        <div>
                            <h4 className="text-white font-bold">Done-For-You Design</h4>
                            <p className="text-sm text-gray-500">We take your raw assets and turn them into a polished PDF and SmartLink.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-neon-purple font-bold">02</div>
                        <div>
                            <h4 className="text-white font-bold">Industry Standard</h4>
                            <p className="text-sm text-gray-500">Structured correctly for booking agents and music journalists.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-[32px]">
                <h2 className="text-2xl font-bold text-white mb-8">Launch EPK Kit — $40</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input required placeholder="Short Tagline (e.g. The King of Afro-Jazz)" className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
                    <textarea required rows={4} placeholder="Full Artist Bio..." className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white" value={formData.fullBio} onChange={e => setFormData({...formData, fullBio: e.target.value})} />
                    <input placeholder="Biggest Achievement to date" className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white" value={formData.topAchievement} onChange={e => setFormData({...formData, topAchievement: e.target.value})} />
                    
                    <div className="grid grid-cols-1 gap-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Template</label>
                        <div className="flex gap-3">
                            {templates.map(t => (
                                <button type="button" key={t.id} onClick={() => setFormData({...formData, template: t.name})} className={`flex-1 p-2 rounded-xl border-2 transition-all ${formData.template === t.name ? 'border-electric-blue bg-electric-blue/10' : 'border-gray-800 bg-black hover:border-gray-600'}`}>
                                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-2 overflow-hidden">
                                        <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
                                    </div>
                                    <span className="text-[10px] text-white font-bold uppercase">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neon-purple hover:text-white transition-all">Submit Order</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EPKPage;
