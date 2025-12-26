
import React, { useState } from 'react';
import { User } from './LoginPage';

const AcceleratorPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [isApplied, setIsApplied] = useState(false);
  const syllabus = [
    { week: '01', title: 'The Foundations', topic: 'Modern distribution & ownership rights.' },
    { week: '02', title: 'Social Strategy', topic: 'TikTok algorithmic growth & content pillars.' },
    { week: '03', title: 'Radio & PR', topic: 'Pitching to radio stations & PR kit development.' },
    { week: '04', title: 'Sync & Brands', topic: 'Monetizing your sound beyond streams.' },
    { week: '05', title: 'Monetization Masterclass', topic: 'Merch, live touring & fan communities.' },
    { week: '06', title: 'Demo Day', topic: 'Pitch your project to the TSA A&R team.' },
  ];

  const handleApply = () => {
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const apps = JSON.parse(localStorage.getItem('tsa-accelerator-apps') || '[]');
    apps.push({
        status: 'Application Pending',
        date: new Date().toISOString(),
        userEmail: user.email,
        tier: 'Cohort #4'
    });
    localStorage.setItem('tsa-accelerator-apps', JSON.stringify(apps));
    setIsApplied(true);
  };

  if (isApplied) {
    return (
        <div className="py-24 text-center">
            <h1 className="text-4xl font-black text-white">Application Received! 🚀</h1>
            <p className="mt-4 text-gray-400">Our mentors will review your artist profile. You will receive an interview request within 5 working days.</p>
            <a href="#/dashboard" className="mt-8 inline-block px-8 py-3 bg-neon-purple text-white font-bold rounded-full">Dashboard</a>
        </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
                <span className="px-4 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">6-Week Elite Cohort</span>
                <h1 className="text-5xl font-black text-white sm:text-7xl mb-6 uppercase italic leading-none">Music <span className="text-neon-purple">Accelerator</span></h1>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    Don't just release music. Launch a business. Our cohort-based program gives you the exact blueprint to scale from a local talent to a global professional.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={handleApply} className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-electric-blue transition-all">Apply for Next Cohort</button>
                    <button className="px-10 py-5 border border-gray-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-800 transition-all">Get Syllabus</button>
                </div>
            </div>

            <div className="flex-1 w-full bg-gray-900 border border-gray-800 p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl">🚀</div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-10">Program Roadmap</h3>
                <div className="space-y-8 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800/50"></div>
                    {syllabus.map((item, i) => (
                        <div key={i} className="flex gap-8 relative z-10 group">
                            <div className="w-12 h-12 bg-black border-2 border-gray-800 rounded-2xl flex items-center justify-center text-neon-purple font-mono font-bold shrink-0 group-hover:border-neon-purple transition-colors">{item.week}</div>
                            <div>
                                <h4 className="text-white font-bold group-hover:text-neon-purple transition-colors">{item.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{item.topic}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-gray-800">
            <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 italic">120+</div>
                <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Graduated Artists</div>
            </div>
            <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 italic">15M+</div>
                <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Collective Streams</div>
            </div>
            <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 italic">45+</div>
                <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Sync Deals Brokered</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcceleratorPage;
