
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-20 sm:py-32">
      <div className="relative isolate">
        <div className="absolute inset-0 overflow-hidden -z-10">
           {/* Placeholder for video background */}
           <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/african-studio/1920/1080')"}}></div>
           <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Story: From Podcast to Powerhouse</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Talent Showcase Africa (TSA) Records began as a simple idea: a podcast dedicated to uncovering the freshest sounds from emerging artists across the continent. What we found was a tidal wave of talent that needed more than just a platform—it needed a partner. So, we evolved. Today, TSA Records is a full-service label built to develop, support, and amplify the next generation of African musical superstars on the world stage.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col gap-y-8 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-neon-purple/20 transition-all duration-300 hover:border-neon-purple/50 hover:scale-105">
                <div className="text-3xl font-semibold leading-7 text-neon-purple">Our Mission</div>
                <p className="mt-2 text-base leading-7 text-gray-400">
                    To arm African artists with the tools to dominate globally. We provide powerful, transparent distribution and promotion, ensuring your music—your story—is heard from Accra to Atlanta.
                </p>
            </div>
            <div className="flex flex-col gap-y-8 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-electric-blue/20 transition-all duration-300 hover:border-electric-blue/50 hover:scale-105">
                <div className="text-3xl font-semibold leading-7 text-electric-blue">Our Vision</div>
                <p className="mt-2 text-base leading-7 text-gray-400">
                    A world where the sound of Africa is a dominant force in the global music industry. We see a future where our artists top charts, headline festivals, and build lasting legacies without compromising their roots.
                </p>
            </div>
             <div className="flex flex-col gap-y-8 p-8 bg-white/5 backdrop-blur-md rounded-2xl border-gray-500/20 transition-all duration-300 hover:border-white/50 hover:scale-105">
                <div className="text-3xl font-semibold leading-7 text-white">Our Values</div>
                <p className="mt-2 text-base leading-7 text-gray-400">
                   Authenticity is everything. Community is our strength. The Rhythm is our guide. We are partners in creativity, celebrating the heritage and innovation of African music.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;