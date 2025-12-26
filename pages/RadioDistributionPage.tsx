
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const distroOrders = JSON.parse(localStorage.getItem('tsa-radio-distro') || '[]');
    distroOrders.push({
      ...formData,
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Awaiting Station Ingestion'
    });
    localStorage.setItem('tsa-radio-distro', JSON.stringify(distroOrders));
  };

  if (isSubmitted) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold text-white">Broadcast Link Live! 📻</h1>
        <p className="mt-4 text-gray-400">Your track is now available in our private radio distribution lane. Station DJs can now pull your broadcast-ready WAV.</p>
        <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-electric-blue text-black font-bold rounded-full">Dashboard</a>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl mb-6">
              Private <span className="text-neon-purple">Radio Distribution</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Skip the streaming algorithms. Deliver high-quality, broadcast-ready files directly to the music libraries of 500+ radio stations across Africa.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <span className="text-neon-purple font-bold block mb-1">Tagged WAVs</span>
                    <span className="text-xs text-gray-500">Correct metadata for broadcast systems.</span>
                </div>
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <span className="text-electric-blue font-bold block mb-1">Clean Edits</span>
                    <span className="text-xs text-gray-500">Essential for FCC/Ofcom compliance.</span>
                </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Distribution Form — $15/Track</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Song Title" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.songTitle} onChange={e => setFormData({...formData, songTitle: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                    <input placeholder="BPM" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.bpm} onChange={e => setFormData({...formData, bpm: e.target.value})} />
                    <select className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}>
                        <option>Afrobeats</option>
                        <option>Amapiano</option>
                        <option>Gospel</option>
                        <option>Hip Hop</option>
                    </select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-700">
                    <input type="checkbox" className="w-5 h-5 accent-neon-purple" checked={formData.isClean} onChange={e => setFormData({...formData, isClean: e.target.checked})} />
                    <span className="text-sm text-gray-300">This is a Radio-Clean Edit (No profanity)</span>
                </div>
                <input required type="url" placeholder="Direct Download Link (Dropbox/G-Drive)" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.fileLink} onChange={e => setFormData({...formData, fileLink: e.target.value})} />
                <button className="w-full py-4 bg-neon-purple text-white font-bold rounded-xl hover:shadow-neon-purple transition-all">Submit for Distribution</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioDistributionPage;
