
import React from 'react';
import { User } from './LoginPage';

const CommunityPage: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <div className="py-12 sm:py-20 bg-brand-bg relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-blue rounded-full blur-[120px]"></div>
        </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white sm:text-7xl mb-6 uppercase tracking-tighter">TSA <span className="text-neon-purple">Insider</span></h1>
          <p className="text-2xl text-gray-300 font-medium">The Private Music Business Community.</p>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto italic">Access promo alerts, industry feedback, and early opportunities on WhatsApp/Telegram.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Basic Alerts</h3>
                <p className="text-4xl font-black text-neon-purple mb-4">$5<span className="text-sm text-gray-600">/mo</span></p>
                <ul className="text-sm text-gray-500 space-y-3 mb-8">
                    <li>Submission Deadlines</li>
                    <li>Industry News Flashes</li>
                    <li>Standard Community Chat</li>
                </ul>
                <button className="mt-auto w-full py-3 border border-gray-700 rounded-xl font-bold text-white hover:bg-white hover:text-black transition-all">Join Alert Group</button>
            </div>

            <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center scale-105 shadow-2xl relative">
                <div className="absolute top-0 right-10 -mt-4 px-4 py-1 bg-neon-purple text-white text-[10px] font-black uppercase tracking-widest rounded-full">High Value</div>
                <div className="w-16 h-16 bg-neon-purple/10 rounded-full flex items-center justify-center mb-6">
                   <svg className="w-8 h-8 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Inner Circle</h3>
                <p className="text-4xl font-black text-black mb-4">$15<span className="text-sm text-gray-400">/mo</span></p>
                <ul className="text-sm text-gray-600 space-y-3 mb-8">
                    <li>1-on-1 Profile Review</li>
                    <li>Direct Demo Feedback</li>
                    <li>Exclusive Sync Briefs</li>
                    <li>Accelerator Early Access</li>
                </ul>
                <button className="mt-auto w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-neon-purple transition-all">Join Inner Circle</button>
            </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <h4 className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-6">Real Results</h4>
            <div className="flex -space-x-4 mb-4">
                {[...Array(6)].map((_, i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-brand-bg object-cover" alt="User" />
                ))}
            </div>
            <p className="text-gray-400 text-sm">Join 800+ artists already scaling their music with TSA Insider.</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
