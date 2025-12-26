
import React from 'react';

const CheckIcon = () => (
    <svg className="h-6 w-5 flex-none text-electric-blue" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l5 5l10 -10"></path>
    </svg>
);

const PricingCard: React.FC<{
  plan: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  ctaText?: string;
  href?: string;
}> = ({ plan, price, description, features, isFeatured, ctaText = "Get Started", href = "#/dashboard" }) => (
    <div className={`ring-1 ${isFeatured ? 'ring-neon-purple shadow-neon-purple' : 'ring-gray-700'} rounded-3xl p-8 relative flex flex-col`}>
      {isFeatured && <div className="absolute top-0 right-8 -mt-4 px-3 py-1 bg-neon-purple text-white text-sm font-semibold rounded-full">Most Popular</div>}
      <h3 className={`text-lg font-semibold leading-8 ${isFeatured ? 'text-neon-purple' : 'text-white'}`}>{plan}</h3>
      <p className="mt-4 text-sm leading-6 text-gray-400">{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-white">{price}</span>
        <span className="text-sm font-semibold leading-6 text-gray-300">/year</span>
      </p>
      <a href={href} className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isFeatured ? 'bg-neon-purple text-white shadow-sm hover:bg-violet-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        {ctaText}
      </a>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>
    </div>
);

const MicroCard: React.FC<{
    name: string;
    price: string;
    stations: string;
    features: string[];
}> = ({ name, price, stations, features }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-electric-blue transition-colors group">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <span className="text-electric-blue font-bold">{price}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">{stations}</p>
        <ul className="mt-4 space-y-2 text-xs text-gray-500">
            {features.map(f => <li key={f} className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-neon-purple mr-2"></span>{f}</li>)}
        </ul>
        <a href="#/radio-plugging" className="mt-6 block w-full py-2 bg-gray-800 text-white text-center text-sm font-bold rounded-lg group-hover:bg-electric-blue group-hover:text-black transition-colors">Launch Now</a>
    </div>
);

const PricingPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-neon-purple">Our Plans</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Packages for Your Hustle
          </p>
        </div>

        {/* Traditional Subscription Plans */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <PricingCard
            plan="Rising Star"
            price="$29"
            description="For the emerging artist ready to get their sound out to the world."
            features={[
              'Unlimited Distribution',
              '1 Artist Profile',
              'Boomplay & Audiomack Priority',
              'Monthly Royalty Payouts'
            ]}
            isFeatured={false}
          />
          <PricingCard
            plan="Afrobeat Pro"
            price="$79"
            description="For the serious artist aiming for viral hits and continental reach."
            features={[
              'Everything in Rising Star',
              'TikTok & Reels Growth Suite',
              'Afrobeats Playlist Pitching',
              '3 Artist Profiles'
            ]}
            isFeatured={true}
          />
          <PricingCard
            plan="Empire Builder"
            price="$249"
            description="The complete package for labels and artist managers scaling their roster."
            features={[
              'Everything in Afrobeat Pro',
              'Continental Radio Promotion',
              'Dedicated Support Manager',
              'Unlimited Artist Profiles'
            ]}
            isFeatured={false}
          />
        </div>

        {/* NEW: Radio Plugging Micro-Packages */}
        <div className="mt-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Radio Plugging Micro-Packages</h2>
                <p className="mt-4 text-gray-400">One-time fees to get your single pitched to our curated radio network.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MicroCard 
                    name="The Starter" 
                    price="£20" 
                    stations="5 Priority Stations" 
                    features={['Email Pitching', 'West Africa Coverage', 'Delivery Confirmation']} 
                />
                <MicroCard 
                    name="Continental" 
                    price="£65" 
                    stations="15 Top Stations" 
                    features={['Email + WhatsApp Pitching', 'Pan-African Coverage', 'Basic Airplay Report']} 
                />
                <MicroCard 
                    name="Elite Plug" 
                    price="£150" 
                    stations="40+ Global Stations" 
                    features={['High-Level Plugging', 'Interview Opportunities', 'Full Tracking Analytics']} 
                />
            </div>
        </div>

        <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
            <p className="text-gray-400 mt-2">We accept international cards, PayPal, Flutterwave & Paystack.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
