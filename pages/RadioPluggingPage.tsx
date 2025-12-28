
import React, { useState } from 'react';
import { User } from './LoginPage';

interface RadioPluggingPageProps {
  user: User | null;
}

const RadioPluggingPage: React.FC<RadioPluggingPageProps> = ({ user }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    songTitle: '',
    artistName: user?.artistName || '',
    songLink: '',
    regions: [] as string[],
    notes: ''
  });

  const tiers = [
    { id: 'standard', name: 'Standard Pitch', price: '$20', stations: '5 Stations', features: ['Email Pitching', 'West Africa Focus', 'Digital Delivery'] },
    { id: 'advanced', name: 'Advanced Plug', price: '$65', stations: '15 Stations', features: ['Email + WhatsApp Pitching', 'Pan-African Reach', 'Spin Tracking Report'] },
    { id: 'elite', name: 'Elite Airplay', price: '$150', stations: '40 Stations', features: ['Everything in Advanced', 'Interview Pitching', 'Chart Submission', 'Dedicated Plugger'] },
  ];

  const handleRegionToggle = (region: string) => {
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.includes(region) 
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return alert('Please select a package tier.');
    if (!user) {
        window.location.hash = '#/login';
        return;
    }

    const tierObj = tiers.find(t => t.id === selectedTier);
    
    // Save as 'Order Received' (Stage 1)
    const campaigns = JSON.parse(localStorage.getItem('tsa-campaigns') || '[]');
    campaigns.push({
      ...formData,
      tier: tierObj?.name,
      date: new Date().toISOString(),
      status: 'Order Received',
      userEmail: user?.email,
      type: 'Radio'
    });
    localStorage.setItem('tsa-campaigns', JSON.stringify(campaigns));

    // Redirect to Checkout (Stage 2)
    window.location.hash = `#/checkout?item=${encodeURIComponent(tierObj?.name || 'Radio Plugging')}&price=${encodeURIComponent(tierObj?.price || '$20')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase italic">
            Radio Plugging <span className="text-electric-blue">Sync</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400">
            Choose your broadcast tier and let our global plugging engine handle the distribution and feedback cycles.
          </p>
        </div>

        {/* Tier Selection */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`text-left p-8 rounded-2xl border transition-all duration-300 ${
                selectedTier === tier.id 
                ? 'bg-neon-purple/20 border-neon-purple shadow-neon-purple scale-105' 
                : 'bg-gray-900 border-gray-800 hover:border-gray-600'
              }`}
            >
              <h3 className="text-2xl font-bold text-white uppercase italic">{tier.name}</h3>
              <p className="text-electric-blue font-black uppercase text-[10px] tracking-widest mt-2">{tier.stations}</p>
              <div className="mt-6 text-4xl font-black text-white tracking-tighter">{tier.price}</div>
              <ul className="mt-8 space-y-4">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center text-xs text-gray-400">
                    <svg className="h-4 w-4 mr-2 text-neon-purple" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Form Section */}
        {selectedTier && (
          <div className="mt-20 max-w-3xl mx-auto bg-gray-900/50 p-10 rounded-[48px] border border-gray-800 backdrop-blur-md">
            <h2 className="text-2xl font-black text-white mb-10 uppercase italic">Campaign Briefing</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Song Identity</label>
                  <input required type="text" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="Track Name" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Artist Alias</label>
                  <input required type="text" value={formData.artistName} onChange={e => setFormData({...formData, artistName: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-electric-blue outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Broadcast Asset Link (Dropbox/S3/WAV)</label>
                <input required type="url" value={formData.songLink} onChange={e => setFormData({...formData, songLink: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="https://..." />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Target Core Regions</label>
                <div className="flex flex-wrap gap-4">
                  {['Nigeria', 'South Africa', 'Ghana', 'Kenya', 'UK Diaspora', 'North America'].map(region => (
                    <button
                      type="button"
                      key={region}
                      onClick={() => handleRegionToggle(region)}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.regions.includes(region) 
                        ? 'bg-electric-blue text-black border-electric-blue' 
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Plugger Directives</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="Target shows, personalities or specific goals..." />
              </div>

              <button type="submit" className="w-full py-5 bg-neon-purple text-white font-black rounded-2xl text-[14px] uppercase tracking-[0.5em] hover:shadow-neon-purple transition-all duration-300 border-b-6 border-violet-800">
                Proceed to Checkout
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioPluggingPage;
