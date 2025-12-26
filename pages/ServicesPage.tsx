
import React from 'react';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  features: string[];
  color: string;
  href: string;
}> = ({ title, description, features, color, href }) => (
  <div className={`p-8 bg-gray-900 border border-gray-800 rounded-[32px] flex flex-col h-full hover:border-${color} transition-all group`}>
     <h3 className="text-2xl font-black text-white mb-4 uppercase italic leading-none">{title}</h3>
     <p className="text-gray-500 text-sm mb-6 flex-grow">{description}</p>
     <ul className="space-y-2 mb-8">
        {features.map((f, i) => (
            <li key={i} className="flex items-center text-xs text-gray-400">
                <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-${color}`}></span>
                {f}
            </li>
        ))}
     </ul>
     <a href={href} className={`w-full py-4 text-center text-[10px] font-black uppercase tracking-widest border border-gray-800 rounded-xl group-hover:bg-white group-hover:text-black transition-all`}>Launch Service</a>
  </div>
);

const ServicesPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-black text-white sm:text-8xl uppercase tracking-tighter italic">TSA <span className="text-neon-purple">Ecosystem</span></h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Everything an emerging artist needs to scale from locally heard to globally distributed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Digital Distro"
            description="Keep 100% of your earnings. We deliver to Spotify, Apple, and Boomplay."
            features={["Global Reach", "Unified Analytics", "Smart Links"]}
            color="neon-purple"
            href="#/pricing"
          />
          <ServiceCard
            title="TikTok Growth"
            description="Push your sounds to creators and start viral trends."
            features={["Micro-Creator Network", "Concept Strategy", "Usage Tracking"]}
            color="electric-blue"
            href="#/tiktok-growth"
          />
          <ServiceCard
            title="Radio Plugging"
            description="Active pitching to the largest Pan-African radio stations."
            features={["WhatsApp Outreach", "Spin Reports", "Interview Setup"]}
            color="neon-purple"
            href="#/radio-plugging"
          />
          <ServiceCard
            title="AI Radio"
            description="24/7 online rotation for verified TSA label artists."
            features={["Live DJ Slots", "Auto-Pilot Mixes", "Global Reach"]}
            color="white"
            href="#/ai-radio"
          />
          <ServiceCard
            title="Sync Hub"
            description="License your music for commercials and short films."
            features={["Brand Briefs", "Commission Deals", "Catalog Ingestion"]}
            color="electric-blue"
            href="#/sync-hub"
          />
          <ServiceCard
            title="PR Kit (EPK)"
            description="Professional press kits designed for industry pros."
            features={["Designer Layouts", "High-Res Hosting", "Mobile Ready"]}
            color="neon-purple"
            href="#/epk-service"
          />
          <ServiceCard
            title="Music Accelerator"
            description="6-week cohort teaching the business of music."
            features={["Expert Mentors", "Syllabus Roadmap", "A&R Demo Day"]}
            color="electric-blue"
            href="#/accelerator"
          />
           <ServiceCard
            title="Playlist Net"
            description="Submit to our internal curation team for placement."
            features={["Curation Review", "Feedback Cycle", "Targeted Genres"]}
            color="white"
            href="#/playlists"
          />
           <ServiceCard
            title="Launch Pages"
            description="One-page smart websites for your professional home."
            features={["Link-in-Bio", "Custom Templates", "EPK Integration"]}
            color="neon-purple"
            href="#/artist-launch"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
