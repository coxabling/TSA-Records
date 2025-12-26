
import React from 'react';

const PlanCard: React.FC<{
    title: string;
    price: string;
    freq: string;
    features: string[];
    btnColor: string;
    popular?: boolean;
}> = ({ title, price, freq, features, btnColor, popular }) => (
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
        <button className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${btnColor}`}>Get Started</button>
    </div>
);

const PricingPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-black text-white sm:text-7xl uppercase italic tracking-tighter">Choose Your <span className="text-neon-purple">Fuel</span></h1>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto italic">Transparent pricing for distribution, promotions, and growth.</p>
        </div>

        {/* Distribution Subscriptions */}
        <div className="mb-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 text-center">Annual Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard title="Rising Star" price="$29" freq="/yr" btnColor="bg-gray-800 text-white" features={["Unlimited Distro", "1 Artist Profile", "Standard Analytics"]} />
                <PlanCard title="Afrobeat Pro" price="$79" freq="/yr" popular btnColor="bg-neon-purple text-white" features={["Everything in Rising Star", "3 Artist Profiles", "Priority Pitching", "TikTok Strategy"]} />
                <PlanCard title="Label Power" price="$249" freq="/yr" btnColor="bg-gray-800 text-white" features={["Unlimited Profiles", "Dedicated Manager", "Radio Distribution Included", "White Label Portal"]} />
            </div>
        </div>

        {/* Micro-Services Section */}
        <div className="mb-24 border-t border-gray-800 pt-24">
             <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-12 text-center">One-Time Micro-Services</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                    <h4 className="text-white font-bold mb-1">Radio Plug</h4>
                    <span className="text-neon-purple font-mono font-bold">$20</span>
                    <p className="text-[10px] text-gray-500 mt-2">Targeted pitch to 5 stations.</p>
                </div>
                <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                    <h4 className="text-white font-bold mb-1">PR Kit (EPK)</h4>
                    <span className="text-neon-purple font-mono font-bold">$40</span>
                    <p className="text-[10px] text-gray-500 mt-2">Custom design & smart-link.</p>
                </div>
                <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                    <h4 className="text-white font-bold mb-1">TikTok Spark</h4>
                    <span className="text-neon-purple font-mono font-bold">$45</span>
                    <p className="text-[10px] text-gray-500 mt-2">20 micro-creator outreach.</p>
                </div>
                <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                    <h4 className="text-white font-bold mb-1">Playlist Review</h4>
                    <span className="text-neon-purple font-mono font-bold">$5</span>
                    <p className="text-[10px] text-gray-500 mt-2">Curator feedback loop.</p>
                </div>
             </div>
        </div>

        {/* Premium Programs */}
        <div className="bg-gradient-to-br from-neon-purple to-electric-blue p-1 rounded-[40px]">
            <div className="bg-black rounded-[39px] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                    <h2 className="text-3xl lg:text-5xl font-black text-white uppercase italic leading-none mb-6">TSA Music Accelerator</h2>
                    <p className="text-lg text-gray-400 mb-8 italic">Join our next 6-week elite cohort. Limited to 20 artists per session.</p>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center text-gray-300">
                            <span className="w-1.5 h-1.5 bg-electric-blue rounded-full mr-3"></span>
                            Direct Mentorship from Label A&Rs
                        </li>
                        <li className="flex items-center text-gray-300">
                            <span className="w-1.5 h-1.5 bg-electric-blue rounded-full mr-3"></span>
                            Guaranteed Sync & Radio Pitching
                        </li>
                    </ul>
                    <a href="#/accelerator" className="px-10 py-4 bg-white text-black font-black uppercase rounded-xl hover:bg-electric-blue transition-all">Apply for $199</a>
                </div>
                <div className="flex-1 hidden lg:block">
                    <img src="https://picsum.photos/seed/accel/600/400" className="w-full rounded-3xl object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="Accelerator" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
