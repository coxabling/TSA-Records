
import React, { useState } from 'react';
import { User } from './LoginPage';

const AcceleratorPage: React.FC<{ user: User | null }> = ({ user }) => {
  const syllabus = [
    { week: '01', title: 'The Foundations', topic: 'Modern distribution architecture & global ownership rights.' },
    { week: '02', title: 'Viral Dynamics', topic: 'TikTok algorithmic growth, content pillars & trend creation.' },
    { week: '03', title: 'Broadcast PR', topic: 'Strategic radio plugging & premium EPK development.' },
    { week: '04', title: 'Sync & Identity', topic: 'Monetizing sonic identity via brand narratives.' },
    { week: '05', title: 'Scale & Revenue', topic: 'Touring logic, merch frameworks & fan communities.' },
    { week: '06', title: 'The Closing Demo', topic: 'High-stakes A&R pitch to global label executives.' },
  ];

  const handleApply = () => {
    if (!user) {
        window.location.hash = '#/login';
        return;
    }
    const apps = JSON.parse(localStorage.getItem('tsa-accelerator-apps') || '[]');
    apps.push({
        status: 'Order Received',
        date: new Date().toISOString(),
        userEmail: user.email,
        tier: 'Elite Cohort #05',
        type: 'Accelerator'
    });
    localStorage.setItem('tsa-accelerator-apps', JSON.stringify(apps));
    
    window.location.hash = `#/checkout?item=${encodeURIComponent('TSA Music Accelerator (Cohort #5)')}&price=${encodeURIComponent('$199')}&type=premium`;
  };

  return (
    <div className="py-12 sm:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[200px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1 animate-in fade-in slide-in-from-left-12 duration-1000">
                <span className="px-6 py-2 bg-neon-purple/15 text-neon-purple rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block border border-neon-purple/30 shadow-lg">Stage 8: Elite Cohort</span>
                <h1 className="text-6xl font-black text-white sm:text-9xl mb-8 uppercase italic leading-none tracking-tighter">
                    Music <span className="text-neon-purple font-outline-2 text-transparent">Accelerate</span>
                </h1>
                <p className="text-2xl text-gray-500 mb-12 italic leading-relaxed max-w-xl">
                    Don't just release music. Launch a legacy. Our 6-week elite program provides the exact blueprint to transform from a local talent to a global professional powerhouse.
                </p>
                <div className="flex flex-wrap gap-6">
                    <button onClick={handleApply} className="px-12 py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.6em] rounded-3xl hover:bg-neon-purple hover:text-white transition-all shadow-2xl active:scale-95 border-b-6 border-gray-400 hover:border-neon-purple">Enroll Cohort $199</button>
                    <button className="px-12 py-7 border border-white/5 text-white font-black uppercase text-[12px] tracking-[0.6em] rounded-3xl hover:bg-white hover:text-black transition-all backdrop-blur-3xl shadow-xl">Get Full Syllabus</button>
                </div>
            </div>

            <div className="flex-1 w-full bg-white/[0.01] border border-white/10 p-12 lg:p-16 rounded-[72px] shadow-2xl relative overflow-hidden backdrop-blur-3xl animate-in fade-in slide-in-from-right-12 duration-1000">
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-[200px] -rotate-12">🚀</div>
                <h3 className="text-4xl font-black text-white uppercase italic mb-12 tracking-tighter">Strategic Roadmap</h3>
                <div className="space-y-10 relative">
                    <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-white/5"></div>
                    {syllabus.map((item, i) => (
                        <div key={i} className="flex gap-10 relative z-10 group">
                            <div className="w-14 h-14 bg-black/80 border-2 border-white/10 rounded-2xl flex items-center justify-center text-neon-purple font-black text-xl shrink-0 group-hover:border-neon-purple transition-all duration-500 shadow-xl">{item.week}</div>
                            <div>
                                <h4 className="text-xl text-white font-black uppercase italic tracking-tighter group-hover:text-neon-purple transition-colors">{item.title}</h4>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed mt-2">{item.topic}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-20 py-24 border-t border-white/5">
            <div className="text-center group">
                <div className="text-8xl font-black text-white mb-4 italic tracking-tighter group-hover:scale-110 transition-transform duration-700">120+</div>
                <div className="text-[12px] text-gray-800 font-black uppercase tracking-[0.8em]">Graduated Alumni</div>
            </div>
            <div className="text-center group">
                <div className="text-8xl font-black text-neon-purple mb-4 italic tracking-tighter group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl">15M+</div>
                <div className="text-[12px] text-gray-800 font-black uppercase tracking-[0.8em]">Network Streams</div>
            </div>
            <div className="text-center group">
                <div className="text-8xl font-black text-white mb-4 italic tracking-tighter group-hover:scale-110 transition-transform duration-700">45+</div>
                <div className="text-[12px] text-gray-800 font-black uppercase tracking-[0.8em]">Sync Deals Brokered</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcceleratorPage;
