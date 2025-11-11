
import React from 'react';

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  borderColor: string;
}> = ({ icon, title, description, features, borderColor }) => (
  <div className={`group relative p-8 bg-gray-900/50 border ${borderColor} rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 h-full flex flex-col`}>
     <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
     <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex items-center justify-center h-16 w-16 bg-gray-800 rounded-lg mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-6 flex-grow">{description}</p>
        <ul className="space-y-3">
        {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
            <svg className="w-5 h-5 mr-3 text-electric-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            {feature}
            </li>
        ))}
        </ul>
     </div>
  </div>
);


const ServicesPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-neon-purple">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">How We Push Your Sound</p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Tools built for the modern African artist, designed to make waves globally.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.55 13.5A9.957 9.957 0 012 12c0-5.523 4.477-10 10-10 1.896 0 3.68.52 5.215 1.423M12 18c-3.09 0-5.8-1.5-7.45-3.72m12.067-1.155A9.957 9.957 0 0122 12c0 5.523-4.477 10-10 10-1.896 0-3.68-.52-5.215-1.423" /></svg>}
            title="Global Music Distribution"
            description="Get your music on platforms that matter. We deliver your tracks to Boomplay, Audiomack, Spotify, Apple Music and 150+ more, fast."
            features={["Priority Boomplay & Audiomack delivery", "Keep 100% of your rights & royalties", "Playlist pitching for Afrobeats charts", "Unified analytics dashboard"]}
            borderColor="border-neon-purple/50"
          />
          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-electric-blue" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1.05-6.46-2.95-1.6-1.87-2.36-4.3-2.3-6.66.02-1.22.2-2.42.53-3.56.8-2.61 3.03-4.5 5.5-5.12 1.52-.38 3.09-.38 4.61.02.03-1.56.02-3.12.01-4.68-.83-.43-1.7-.74-2.46-1.22-1.78-1.16-2.9-3.23-2.89-5.46.01-.22.02-.43.03-.64.29-.01 5.82-.02 5.82-.02z"/></svg>}
            title="TikTok & Reels Growth"
            description="Spark the next viral dance challenge. We connect your sound with top African influencers and use AI to predict trending movements."
            features={["Viral dance challenge campaigns", "Connect with African creators", "AI sound trend analysis", "Track your sound's virality"]}
            borderColor="border-electric-blue/50"
          />
          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" /></svg>}
            title="Continental Radio Promotion"
            description="Get your music heard on the airwaves that matter, from Lagos to Nairobi. We plug you into a network of major radio stations across the continent."
            features={["Pan-African radio network", "Targeted airplay campaigns", "Real-time spin tracking", "Get on key regional charts"]}
            borderColor="border-gray-500/50"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
