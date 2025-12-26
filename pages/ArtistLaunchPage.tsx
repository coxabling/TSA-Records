
import React, { useState } from 'react';
import { User } from './LoginPage';

interface ArtistLaunchPageProps {
  user: User | null;
}

const ArtistLaunchPage: React.FC<ArtistLaunchPageProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    bio: '',
    instagram: '',
    spotify: '',
    youtube: '',
    bookingEmail: user?.email || '',
    template: 'Sleek Dark'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const pages = JSON.parse(localStorage.getItem('tsa-artist-pages') || '[]');
    pages.push({
      ...formData,
      artistName: user?.artistName || 'Artist',
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Building'
    });
    localStorage.setItem('tsa-artist-pages', JSON.stringify(pages));
  };

  if (isSubmitted) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold text-white">Mini-Site is Cooking! 🍳</h1>
        <p className="mt-4 text-gray-400 text-lg">Our design team is setting up your professional home. You'll get your smart-link within 48 hours.</p>
        <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-neon-purple text-white font-bold rounded-full">Dashboard</a>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
              Artist <span className="text-electric-blue">Launch Pages</span>
            </h1>
            <p className="mt-6 text-xl text-gray-400">
              One link to rule them all. A professional, high-converting mini-site for your Bio, Music, EPK, and Socials.
            </p>
            <div className="mt-10 bg-gray-900 border border-gray-800 p-8 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-6">Build Yours Now — £25/year</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea required placeholder="Brief Artist Bio..." rows={3} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                <input type="text" placeholder="Instagram URL" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                <input type="text" placeholder="Spotify URL" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.spotify} onChange={e => setFormData({...formData, spotify: e.target.value})} />
                <select className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})}>
                    <option>Sleek Dark</option>
                    <option>Neon Pulse</option>
                    <option>Afro-Vibrant</option>
                </select>
                <button className="w-full py-4 bg-electric-blue text-black font-bold rounded-xl hover:bg-white transition-colors">Generate My Page</button>
              </form>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-electric-blue/20 blur-3xl -z-10"></div>
            <div className="bg-gray-950 border-[8px] border-gray-900 rounded-[40px] shadow-2xl p-6 h-[600px] w-[300px] mx-auto relative overflow-hidden">
                {/* Phone Preview UI */}
                <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-8"></div>
                <div className="w-20 h-20 bg-neon-purple rounded-full mx-auto mb-4"></div>
                <div className="h-4 w-32 bg-gray-800 rounded mx-auto mb-2"></div>
                <div className="h-3 w-48 bg-gray-900 rounded mx-auto mb-10"></div>
                
                <div className="space-y-3">
                    <div className="h-10 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center text-[10px] text-gray-500">Listen on Spotify</div>
                    <div className="h-10 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center text-[10px] text-gray-500">Watch on YouTube</div>
                    <div className="h-10 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center text-[10px] text-gray-500">Book Now</div>
                </div>
                
                <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="text-[10px] text-gray-700">Powered by TSA Records</span>
                </div>
            </div>
            <p className="text-center mt-6 text-gray-500 text-sm">Preview: Sleek Dark Template</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistLaunchPage;
