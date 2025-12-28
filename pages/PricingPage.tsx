
import React from 'react';

const PlanCard: React.FC<{
    title: string;
    price: string;
    freq: string;
    features: string[];
    btnColor: string;
    popular?: boolean;
    isLoggedIn: boolean;
}> = ({ title, price, freq, features, btnColor, popular, isLoggedIn }) => (
    <div className={`p-8 bg-gray-900 border ${popular ? 'border-neon-purple shadow-neon-purple' : 'border-gray-800'} rounded-[32px] flex flex-col relative`}>
        {popular && <span className="absolute top-0 right-10 -mt-3 px-3 py-1 bg-neon-purple text-white text-[9px] font-black uppercase rounded-full">Most Popular</span>}
        <h3 className="text-2xl font-black text-white uppercase italic mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-black text-white">{price}</span>
            <span className="text-gray-600 text-xs">{freq}</span>
        </div>
        <ul className="space-y-3 mb-10 flex-grow">
            {features.map((f, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-center">
                    <svg className="w-3 h-3 mr-2 text-electric-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    {f}
                </li>
            ))}
        </ul>
        <a 
          href={isLoggedIn ? `#/checkout?item=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&type=subscription` : "#/login"} 
          className={`w-full py-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest ${btnColor}`}
        >
          {isLoggedIn ? "Upgrade Plan" : "Join Now"}
        </a>
    </div>
);

const PricingPage: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('tsa-currentUser') || 'null');
  const isLoggedIn = !!currentUser;

  return (
    <div className="py-24 sm:py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-black text-white sm:text-7xl uppercase italic tracking-tighter">Artist <span className="text-neon-purple">Fuel</span></h1>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto italic">Transparent pricing for distribution, promotions, and global scaling.</p>
        </div>

        {/* Distribution Subscriptions */}
        <div className="mb-24">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-10 text-center">Annual Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard isLoggedIn={isLoggedIn} title="Rising Star" price="$29" freq="/yr" btnColor="bg-gray-800 text-white hover:bg-white hover:text-black transition-all" features={["Unlimited Distro", "1 Artist Profile", "Standard Analytics"]} />
                <PlanCard isLoggedIn={isLoggedIn} title="Afrobeat Pro" price="$79" freq="/yr" popular btnColor="bg-neon-purple text-white hover:scale-105 transition-all" features={["Everything in Rising Star", "3 Artist Profiles", "Priority Pitching", "TikTok Strategy"]} />
                <PlanCard isLoggedIn={isLoggedIn} title="Label Power" price="$249" freq="/yr" btnColor="bg-gray-800 text-white hover:bg-white hover:text-black transition-all" features={["Unlimited Profiles", "Dedicated Manager", "Radio Distribution Included", "White Label Portal"]} />
            </div>
        </div>

        {/* Micro-Services Section */}
        <div className="mb-24 border-t border-gray-800 pt-24">
             <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-12 text-center">Targeted Micro-Growth</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Radio Plug', val: '$20', desc: '5 station targeted pitch', href: '#/radio-plugging' },
                    { label: 'PR Kit (EPK)', val: '$40', desc: 'Custom design & hosting', href: '#/epk-service' },
                    { label: 'TikTok Spark', val: '$45', desc: '20 micro-creator push', href: '#/tiktok-growth' },
                    { label: 'Review Fee', val: '$5', desc: 'Playlist curator feedback', href: '#/playlists' }
                ].map(service => (
                    <a key={service.label} href={service.href} className="bg-gray-900 p-8 rounded-[32px] border border-gray-800 hover:border-neon-purple transition-all group">
                        <h4 className="text-white font-bold mb-1 uppercase text-sm">{service.label}</h4>
                        <span className="text-neon-purple font-mono font-black text-xl">{service.val}</span>
                        <p className="text-[10px] text-gray-600 mt-3 font-bold uppercase tracking-wider group-hover:text-gray-400">{service.desc}</p>
                    </a>
                ))}
             </div>
        </div>

        {/* Premium Programs */}
        <div className="bg-white p-1 rounded-[48px]">
            <div className="bg-black rounded-[47px] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="text-3xl lg:text-6xl font-black text-white uppercase italic leading-none mb-8">TSA Music Accelerator</h2>
                    <p className="text-lg text-gray-500 mb-10 italic leading-relaxed">Join our next 6-week elite cohort. Limited to 20 artists per session for max individual attention.</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        <li className="flex items-center text-gray-400 text-sm">
                            <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-3"></span>
                            A&R Mentorship
                        </li>
                        <li className="flex items-center text-gray-400 text-sm">
                            <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-3"></span>
                            Sync Placement Briefs
                        </li>
                    </ul>
                    <a href={isLoggedIn ? `#/checkout?item=${encodeURIComponent('Music Accelerator')}&price=${encodeURIComponent('$199')}&type=premium` : '#/login'} className="inline-block px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-neon-purple hover:text-white transition-all">Enroll for $199</a>
                </div>
                <div className="flex-1 hidden lg:block grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/accel/800/600" className="w-full rounded-[32px] object-cover" alt="Accelerator" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
