
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tiers = [
    { id: 'standard', name: 'Standard Pitch', price: '£20', stations: '5 Stations', features: ['Email Pitching', 'West Africa Focus', 'Digital Delivery'] },
    { id: 'advanced', name: 'Advanced Plug', price: '£65', stations: '15 Stations', features: ['Email + WhatsApp Pitching', 'Pan-African Reach', 'Spin Tracking Report'] },
    { id: 'elite', name: 'Elite Airplay', price: '£150', stations: '40 Stations', features: ['Everything in Advanced', 'Interview Pitching', 'Chart Submission', 'Dedicated Plugger'] },
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
    setIsSubmitted(true);
    // In a real app, this would save to a DB/Trigger email
    const campaigns = JSON.parse(localStorage.getItem('tsa-campaigns') || '[]');
    campaigns.push({
      ...formData,
      tier: selectedTier,
      date: new Date().toISOString(),
      status: 'Pending Review',
      userEmail: user?.email
    });
    localStorage.setItem('tsa-campaigns', JSON.stringify(campaigns));
  };

  if (isSubmitted) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-500/20 p-4">
              <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">Campaign Received!</h1>
          <p className="mt-4 text-gray-400 text-lg">Our plugging team is reviewing your track. You will receive a notification once the first pitch is sent.</p>
          <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-electric-blue text-black font-bold rounded-full hover:bg-white transition-colors">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Radio Plugging <span className="text-electric-blue">as a Service</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400">
            Get your music heard on the airwaves that matter. Choose a micro-package and let our experts handle the pitching.
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
              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-electric-blue font-semibold text-lg mt-1">{tier.stations}</p>
              <div className="mt-4 text-3xl font-bold text-white">{tier.price}</div>
              <ul className="mt-6 space-y-3">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center text-sm text-gray-400">
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
          <div className="mt-20 max-w-3xl mx-auto bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-8">Campaign Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Song Title</label>
                  <input required type="text" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="e.g. Lagos Groove" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Artist Name</label>
                  <input required type="text" value={formData.artistName} onChange={e => setFormData({...formData, artistName: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric-blue outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Stream/Download Link (Dropbox/SoundCloud/Spotify)</label>
                <input required type="url" value={formData.songLink} onChange={e => setFormData({...formData, songLink: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="https://..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-4">Target Regions</label>
                <div className="flex flex-wrap gap-3">
                  {['Nigeria', 'South Africa', 'Ghana', 'Kenya', 'UK Diaspora', 'US College Radio'].map(region => (
                    <button
                      type="button"
                      key={region}
                      onClick={() => handleRegionToggle(region)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.regions.includes(region) 
                        ? 'bg-electric-blue text-black' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Extra Notes for the Plugger</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-electric-blue outline-none" placeholder="Any specific radio shows or personalities you're targeting?" />
              </div>

              <button type="submit" className="w-full py-4 bg-neon-purple text-white font-bold rounded-xl text-lg hover:shadow-neon-purple transition-all duration-300">
                Submit Campaign Launch
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioPluggingPage;
