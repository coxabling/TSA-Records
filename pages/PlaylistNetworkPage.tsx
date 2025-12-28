
import React, { useState } from 'react';
import { User } from './LoginPage';

const PlaylistNetworkPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const playlists = [
    { id: '1', name: 'Afrobeats Rising', listeners: '12K', img: 'https://picsum.photos/seed/playlist1/300/300' },
    { id: '2', name: 'Amapiano High', listeners: '45K', img: 'https://picsum.photos/seed/playlist2/300/300' },
    { id: '3', name: 'TSA Fresh Finds', listeners: '8K', img: 'https://picsum.photos/seed/playlist3/300/300' },
    { id: '4', name: 'West Africa Drill', listeners: '22K', img: 'https://picsum.photos/seed/playlist4/300/300' },
  ];

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const subs = JSON.parse(localStorage.getItem('tsa-playlist-subs') || '[]');
    subs.push({
        playlistId: selectedPlaylist,
        userEmail: user?.email,
        date: new Date().toISOString(),
        status: 'Order Received',
        type: 'Playlist'
    });
    localStorage.setItem('tsa-playlist-subs', JSON.stringify(subs));
    window.location.hash = `#/checkout?item=${encodeURIComponent('Playlist Review: ' + selectedPlaylist)}&price=${encodeURIComponent('$5')}&type=service`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue/5 rounded-full blur-[150px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl font-black text-white sm:text-8xl uppercase italic tracking-tighter">
            Playlist <span className="text-electric-blue font-outline-1 text-transparent">Uplink</span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto italic font-medium">
            Bridge the gap between your master recordings and active listeners. Submit for professional curation review on our elite branded networks.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {playlists.map(p => (
            <div 
              key={p.id}
              onClick={() => setSelectedPlaylist(p.name)}
              className={`group cursor-pointer bg-white/[0.02] rounded-[48px] overflow-hidden border-2 transition-all duration-500 shadow-2xl ${selectedPlaylist === p.name ? 'border-neon-purple ring-8 ring-neon-purple/5' : 'border-white/5 hover:border-white/20'}`}
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-black text-white text-xl uppercase italic tracking-tighter">{p.name}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">{p.listeners} Global Monthly Listeners</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPlaylist && (
          <div className="mt-24 max-w-2xl mx-auto bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-12 lg:p-16 rounded-[64px] shadow-2xl animate-in zoom-in duration-700">
            <h2 className="text-3xl font-black text-white mb-10 uppercase italic tracking-tighter">Curation Review Request: <span className="text-neon-purple">{selectedPlaylist}</span></h2>
            <form onSubmit={handleSub} className="space-y-8">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Official Asset Title</label>
                    <input required placeholder="Song Title" className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] ml-4">Master Link (Spotify/Apple/Audiomack)</label>
                    <input required placeholder="Streaming / Private Link URL" className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-neon-purple outline-none transition-all" />
                </div>
                <button className="w-full py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.6em] rounded-3xl hover:bg-electric-blue hover:text-black transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-electric-blue">Authorize $5 Review Fee</button>
            </form>
            <p className="text-[10px] text-gray-800 mt-8 italic text-center font-black uppercase tracking-[0.2em]">Curation submission covers strategic review time. Placement is merit-based upon A&R validation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistNetworkPage;
