
import React, { useState } from 'react';
import { User } from './LoginPage';

const PlaylistNetworkPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const playlists = [
    { id: '1', name: 'Afrobeats Rising', listeners: '12K', img: 'https://picsum.photos/seed/playlist1/300/300' },
    { id: '2', name: 'Amapiano High', listeners: '45K', img: 'https://picsum.photos/seed/playlist2/300/300' },
    { id: '3', name: 'TSA Fresh Finds', listeners: '8K', img: 'https://picsum.photos/seed/playlist3/300/300' },
    { id: '4', name: 'West Africa Drill', listeners: '22K', img: 'https://picsum.photos/seed/playlist4/300/300' },
  ];

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const subs = JSON.parse(localStorage.getItem('tsa-playlist-subs') || '[]');
    subs.push({
        playlistId: selectedPlaylist,
        userEmail: user?.email,
        date: new Date().toISOString(),
        status: 'Under Review'
    });
    localStorage.setItem('tsa-playlist-subs', JSON.stringify(subs));
  };

  if (isSubmitted) {
      return (
        <div className="py-24 text-center">
            <h1 className="text-4xl font-bold text-white">Submitted for Review! 🎵</h1>
            <p className="mt-4 text-gray-400">Our curators will listen to your track within 48 hours. Check your dashboard for feedback.</p>
            <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-neon-purple text-white rounded-full">Dashboard</a>
        </div>
      )
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
            TSA <span className="text-electric-blue">Playlist Network</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Get your music in front of active listeners. Submit your track for curation review on our branded playlists across Spotify and Boomplay.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {playlists.map(p => (
            <div 
              key={p.id}
              onClick={() => setSelectedPlaylist(p.name)}
              className={`group cursor-pointer bg-gray-900 rounded-xl overflow-hidden border-2 transition-all ${selectedPlaylist === p.name ? 'border-neon-purple' : 'border-transparent hover:border-gray-700'}`}
            >
              <img src={p.img} alt={p.name} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
              <div className="p-4">
                <h3 className="font-bold text-white text-sm">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.listeners} Active Monthly Listeners</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPlaylist && (
          <div className="mt-16 max-w-xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Submit for {selectedPlaylist} — $5</h2>
            <form onSubmit={handleSub} className="space-y-4">
                <input required placeholder="Song Title" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" />
                <input required placeholder="Spotify/Streaming Link" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" />
                <button className="w-full py-4 bg-electric-blue text-black font-bold rounded-xl hover:bg-white transition-colors">Pay Review Fee & Submit</button>
            </form>
            <p className="text-[10px] text-gray-600 mt-4 italic text-center">Submission does not guarantee placement. Fee covers curation time and professional feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistNetworkPage;
