
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tiers = [
    { id: 'lite', name: 'Lite Spark', price: '£45', creators: '20 Micro-Creators', features: ['Sound Optimization', 'Basic Outreach', '1-Week Campaign'] },
    { id: 'pro', name: 'Pro Viral', price: '£120', creators: '50 Mid-Tier Creators', features: ['Meme/Dance Concept', 'Creator Management', '2-Week Campaign', 'Usage Analytics'] },
    { id: 'elite', name: 'Elite Takeover', price: '£350', creators: '100+ Influencers', features: ['Custom Dance Challenge', 'Top Tier Outreach', 'Dedicated Account Manager', 'Viral Guaranteed Retries'] },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return alert('Select a growth tier first.');
    setIsSubmitted(true);
    const growthOrders = JSON.parse(localStorage.getItem('tsa-tiktok-orders') || '[]');
    growthOrders.push({
      ...formData,
      tier: selectedTier,
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Awaiting Creators'
    });
    localStorage.setItem('tsa-tiktok-orders', JSON.stringify(growthOrders));
  };

  if (isSubmitted) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold text-white">Let's Go Viral! 🚀</h1>
        <p className="mt-4 text-gray-400">Your TikTok Growth campaign is being queued. We're matching your sound with the best creators.</p>
        <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-electric-blue text-black font-bold rounded-full">Dashboard</a>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
            TikTok <span className="text-neon-purple">Sound Growth</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Turn your track into a viral sound. We push your music to a curated network of micro-influencers to spark a trend.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-8 rounded-3xl cursor-pointer border-2 transition-all ${selectedTier === tier.id ? 'border-neon-purple bg-neon-purple/10' : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}
            >
              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-electric-blue font-bold text-lg mt-1">{tier.creators}</p>
              <div className="text-3xl font-bold text-white mt-4">{tier.price}</div>
              <ul className="mt-6 space-y-2">
                {tier.features.map(f => (
                  <li key={f} className="text-sm text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-2"></span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {selectedTier && (
          <div className="mt-16 max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Campaign Brief</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">Song Title</label>
                <input required type="text" className="w-full mt-2 bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-neon-purple" placeholder="Vibe City" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">TikTok Sound Link</label>
                <input required type="url" className="w-full mt-2 bg-black border border-gray-700 rounded-lg p-3 text-white" placeholder="https://vm.tiktok.com/..." value={formData.soundLink} onChange={e => setFormData({...formData, soundLink: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Concept / Challenge Idea</label>
                <textarea required rows={3} className="w-full mt-2 bg-black border border-gray-700 rounded-lg p-3 text-white" placeholder="What should people do to your song? (e.g. A fit-check, dance, or meme)" value={formData.concept} onChange={e => setFormData({...formData, concept: e.target.value})} />
              </div>
              <button className="w-full py-4 bg-neon-purple text-white font-bold rounded-xl hover:shadow-neon-purple transition-all">Launch Growth Campaign</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokGrowthPage;
