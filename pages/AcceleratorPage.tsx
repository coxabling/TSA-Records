
import React from 'react';
import { User } from './LoginPage';

const AcceleratorPage: React.FC<{ user: User | null }> = ({ user }) => {
  const syllabus = [
    { week: '01', title: 'The Foundations', topic: 'Modern distribution & ownership rights.' },
    { week: '02', title: 'Social Strategy', topic: 'TikTok algorithmic growth & content pillars.' },
    { week: '03', title: 'Radio & PR', topic: 'Pitching to radio stations & PR kit development.' },
    { week: '04', title: 'Sync & Brands', topic: 'Monetizing your sound beyond streams.' },
    { week: '05', title: 'Monetization Masterclass', topic: 'Merch, live touring & fan communities.' },
    { week: '06', title: 'Demo Day', topic: 'Pitch your project to the TSA A&R team.' },
  ];

  return (
    <div className="py-12 sm:py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
                <span className="px-4 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">6-Week Cohort</span>
                <h1 className="text-5xl font-black text-white sm:text-7xl mb-6 uppercase italic leading-none">Music <span className="text-neon-purple">Accelerator</span></h1>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Don't just release music. Launch a business. Our cohort-based program gives you the exact blueprint to scale from a local talent to a global professional.
                </p>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white text-black font-black uppercase rounded-xl hover:bg-electric-blue transition-all">Apply for Next Cohort</button>
                    <button className="px-8 py-4 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-all">Download Syllabus</button>
                </div>
            </div>

            <div className="flex-1 w-full bg-gray-900 border border-gray-800 p-8 rounded-[40px] shadow-2xl relative">
                <h3 className="text-2xl font-bold text-white mb-8">Program Roadmap</h3>
                <div className="space-y-6 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800"></div>
                    {syllabus.map((item, i) => (
                        <div key={i} className="flex gap-6 relative z-10">
                            <div className="w-12 h-12 bg-black border-2 border-gray-800 rounded-full flex items-center justify-center text-neon-purple font-mono font-bold shrink-0">{item.week}</div>
                            <div>
                                <h4 className="text-white font-bold">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.topic}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">120+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Graduated Artists</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">15M+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Collective Streams</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">45+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Sync Deals Brokered</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcceleratorPage;
