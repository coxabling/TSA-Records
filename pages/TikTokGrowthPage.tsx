
import React, { useState } from 'react';
import { User } from './LoginPage';

interface TikTokGrowthPageProps {
  user: User | null;
}

const TikTokGrowthPage: React.FC<TikTokGrowthPageProps> = ({ user }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    songTitle: '',
    soundLink: '',
    concept: '',
    targetAudience: 'Dance/Vibe'
  });

  const tiers = [
    { id: 'lite', name: 'Lite Spark', price: '$45', creators: '20 Micro-Creators', features: ['Sound Optimization', 'Basic Outreach', '1-Week Campaign'] },
    { id: 'pro', name: 'Pro Viral', price: '$120', creators: '50 Mid-Tier Creators', features: ['Meme/Dance Concept', 'Creator Management', '2-Week Campaign', 'Usage Analytics'] },
    { id: 'elite', name: 'Elite Takeover', price: '$350', creators: '100+ Influencers', features: ['Custom Dance Challenge', 'Top Tier Outreach', 'Dedicated Account Manager', 'Viral Guaranteed Retries'] },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return alert('Select a growth tier first.');
    if (!user) {
        window.location.hash = '#/login';
        return;
    }

    const tierObj = tiers.find(t => t.id === selectedTier);
    
    const growthOrders = JSON.parse(localStorage.getItem('tsa-tiktok-orders') || '[]');
    growthOrders.push({
      ...formData,
      tier: tierObj?.name,
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Order Received',
      type: 'TikTok'
    });
    localStorage.setItem('tsa-tiktok-orders', JSON.stringify(growthOrders));
    
    window.location.hash = `#/checkout?item=${encodeURIComponent(tierObj?.name || 'TikTok Growth')}&price=${encodeURIComponent(tierObj?.price || '$45')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white sm:text-7xl uppercase italic tracking-tighter">
            TikTok <span className="text-neon-purple font-outline-1 text-transparent">Growth</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto italic">
            Propel your sounds into the zeitgeist. We activate our curated creator network to ignite viral trends around your master recordings.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-10 rounded-[48px] cursor-pointer border-2 transition-all duration-500 relative overflow-hidden group ${selectedTier === tier.id ? 'border-neon-purple bg-neon-purple/10 shadow-neon-purple' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-8xl group-hover:scale-125 transition-transform">📱</div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{tier.name}</h3>
              <p className="text-electric-blue font-black uppercase text-xs tracking-[0.3em] mt-2">{tier.creators}</p>
              <div className="text-5xl font-black text-white mt-8 tracking-tighter">{tier.price}</div>
              <ul className="mt-10 space-y-4">
                {tier.features.map(f => (
                  <li key={f} className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center">
                    <span className="w-2 h-2 bg-neon-purple rounded-full mr-3 shadow-neon-purple"></span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {selectedTier && (
          <div className="mt-24 max-w-3xl mx-auto bg-white/[0.01] backdrop-blur-3xl p-12 rounded-[64px] border border-white/5 shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-10 uppercase italic tracking-tighter">Campaign Strategy</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-3">Song Identity</label>
                  <input required type="text" className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neon-purple outline-none transition-all" placeholder="Track Name" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-3">Audience Segment</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neon-purple outline-none" value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})}>
                      <option>Dance / High Energy</option>
                      <option>Chill / Lifestyle</option>
                      <option>Comedy / Skit</option>
                      <option>Luxury / Aesthetic</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-3">Official Sound Link</label>
                <input required type="url" className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neon-purple outline-none" placeholder="https://vm.tiktok.com/..." value={formData.soundLink} onChange={e => setFormData({...formData, soundLink: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-3">Creative Vision / Challenge Concept</label>
                <textarea required rows={4} className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neon-purple outline-none" placeholder="Describe the ideal video concept (e.g. A specific dance move or transitions)..." value={formData.concept} onChange={e => setFormData({...formData, concept: e.target.value})} />
              </div>
              <button className="w-full py-7 bg-white text-black font-black uppercase text-[13px] tracking-[0.6em] rounded-3xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Proceed to Payment Gateway</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokGrowthPage;
