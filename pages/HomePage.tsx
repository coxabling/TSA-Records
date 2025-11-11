
import React from 'react';

const MusicNoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" />
    </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1.05-6.46-2.95-1.6-1.87-2.36-4.3-2.3-6.66.02-1.22.2-2.42.53-3.56.8-2.61 3.03-4.5 5.5-5.12 1.52-.38 3.09-.38 4.61.02.03-1.56.02-3.12.01-4.68-.83-.43-1.7-.74-2.46-1.22-1.78-1.16-2.9-3.23-2.89-5.46.01-.22.02-.43.03-.64.29-.01 5.82-.02 5.82-.02z"/>
  </svg>
);

const RadioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12v3m-3-9v12m-3-6v9m-3-12v6" />
    </svg>
);


const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-purple rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-electric-blue rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://picsum.photos/seed/afrobeat-artist/1920/1080')"}}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm"><MusicNoteIcon /></div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm"><TikTokIcon /></div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm"><RadioIcon /></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Your Sound. Our Continent. <span className="text-neon-purple">The</span> <span className="text-electric-blue">World</span>.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            From Afrobeats to Amapiano, Talent Showcase Africa (TSA) Records champions the authentic sounds of the continent, connecting emerging artists to global fans on Boomplay, Spotify, TikTok and beyond.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#/pricing" 
              className="w-full sm:w-auto px-8 py-4 bg-neon-purple text-white font-bold rounded-full text-lg hover:scale-105 hover:shadow-neon-purple transition-transform duration-300"
            >
              Start Your Journey
            </a>
            <a 
              href="#/about" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-electric-blue text-electric-blue font-bold rounded-full text-lg hover:scale-105 hover:bg-electric-blue hover:text-black transition-all duration-300"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;