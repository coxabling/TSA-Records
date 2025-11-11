
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
}> = ({ plan, price, description, features, isFeatured }) => (
    <div className={`ring-1 ${isFeatured ? 'ring-neon-purple shadow-neon-purple' : 'ring-gray-700'} rounded-3xl p-8 relative flex flex-col`}>
      {isFeatured && <div className="absolute top-0 right-8 -mt-4 px-3 py-1 bg-neon-purple text-white text-sm font-semibold rounded-full">Most Popular</div>}
      <h3 className={`text-lg font-semibold leading-8 ${isFeatured ? 'text-neon-purple' : 'text-white'}`}>{plan}</h3>
      <p className="mt-4 text-sm leading-6 text-gray-400">{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-white">{price}</span>
        <span className="text-sm font-semibold leading-6 text-gray-300">/year</span>
      </p>
      <a href="#/dashboard" className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isFeatured ? 'bg-neon-purple text-white shadow-sm hover:bg-violet-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        Get Started
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
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-400">
          Whether you're dropping your first single or building an empire, we have a plan to match your ambition. No hidden fees, just pure support.
        </p>
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
        <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
            <p className="text-gray-400 mt-2">We accept international cards, PayPal, and local payment options via Flutterwave & Paystack.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
