
import React, { useState } from 'react';

const AIRadioPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  const schedule = [
    { time: '08:00', title: 'Afrobeats Morning Mix', dj: 'Auto-Pilot' },
    { time: '12:00', title: 'Lagos to Accra Lunch', dj: 'DJ Tunde' },
    { time: '16:00', title: 'TSA Fresh Finds', dj: 'New Music Monday' },
    { time: '20:00', title: 'Late Night Amapiano', dj: 'Soweto Steppers' },
  ];

  return (
    <div className="py-12 sm:py-20 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Player Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-[40px] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <span className="flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-500 rounded-full text-xs font-bold animate-pulse">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  LIVE ON AIR
                </span>
              </div>

              <div className="mt-12 text-center">
                <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-3xl bg-gradient-to-tr from-neon-purple to-electric-blue flex items-center justify-center p-1 mb-8 shadow-2xl group-hover:rotate-3 transition-transform">
                    <img src="https://picsum.photos/seed/currenttrack/400/400" className="w-full h-full object-cover rounded-[20px]" alt="Current Track" />
                </div>
                <h2 className="text-3xl font-black text-white">Vibe Check (Remix)</h2>
                <p className="text-xl text-gray-500 font-medium mt-1">TSA Artist Showcase</p>

                {/* Simulated Visualizer */}
                <div className="flex items-center justify-center gap-1 h-12 mt-8">
                    {[...Array(15)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 bg-electric-blue rounded-full transition-all duration-300"
                          style={{ 
                            height: isPlaying ? `${Math.random() * 100}%` : '10%',
                            transitionDelay: `${i * 50}ms`
                          }}
                        ></div>
                    ))}
                </div>

                {/* Controls */}
                <div className="mt-12 flex items-center justify-center gap-8">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                        {isPlaying ? (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </button>
                </div>

                <div className="mt-8 max-w-xs mx-auto flex items-center gap-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    <input type="range" className="flex-1 accent-electric-blue h-1 bg-gray-800 rounded-full appearance-none" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Coming Up Next</h3>
                <div className="space-y-4">
                    {schedule.map((item, i) => (
                        <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-neon-purple font-mono text-xs">{item.time}</div>
                            <div>
                                <div className="text-sm font-bold text-white leading-none">{item.title}</div>
                                <div className="text-[10px] text-gray-500 mt-1">Host: {item.dj}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-3xl p-6 text-center">
                <h3 className="text-white font-bold mb-2">Want to Play Here?</h3>
                <p className="text-sm text-gray-400 mb-6">TSA Artists get priority rotation slots. Join the label today.</p>
                <a href="#/pricing" className="block w-full py-3 bg-neon-purple text-white font-bold rounded-xl text-sm hover:scale-105 transition-transform">Get Promoted</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIRadioPage;
