
import React, { useState, useEffect } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkActive = () => {
      const currentHash = window.location.hash || '#/';
      const baseHref = href.split('/')[0];
      const currentBase = currentHash.split('/')[0];
      setIsActive(currentHash === href || (baseHref.length > 2 && currentBase === baseHref));
    };
    checkActive();
    window.addEventListener('hashchange', checkActive);
    return () => window.removeEventListener('hashchange', checkActive);
  }, [href]);

  return (
    <a 
      href={href} 
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive ? 'text-electric-blue scale-110' : 'text-gray-300 hover:text-white hover:scale-105'}`}
    >
      {children}
    </a>
  );
};

const Header: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    { href: '#/radio-plugging', label: 'Radio Plugging' },
    { href: '#/tiktok-growth', label: 'TikTok Growth' },
    { href: '#/artist-launch', label: 'Artist Pages' },
    { href: '#/radio-distribution', label: 'Radio Distro' },
    { href: '#/playlists', label: 'Playlist Network' },
    { href: '#/ai-radio', label: 'AI Radio' },
    { href: '#/epk-service', label: 'EPK Kits' },
    { href: '#/sync-hub', label: 'Sync Hub' },
    { href: '#/accelerator', label: 'Accelerator' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#/" className="text-2xl font-black tracking-tighter text-white uppercase italic">
              TSA <span className="text-neon-purple">Recs</span>
            </a>
          </div>
          
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-1">
              <NavLink href="#/">Home</NavLink>
              <NavLink href="#/about">About</NavLink>
              
              <div className="relative group" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
                <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white flex items-center">
                  Services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showServices && (
                  <div className="absolute left-0 mt-0 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-4 grid grid-cols-1 gap-2 z-50">
                    {serviceLinks.map(link => (
                      <a key={link.href} href={link.href} className="px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{link.label}</a>
                    ))}
                  </div>
                )}
              </div>

              <NavLink href="#/pricing">Pricing</NavLink>
              <NavLink href="#/community">Community</NavLink>
              <NavLink href="#/blog">Blog</NavLink>
              
              {isLoggedIn ? (
                <div className="flex items-center ml-6 border-l border-white/10 pl-6 gap-3">
                  <a href="#/dashboard" className="px-4 py-1.5 bg-electric-blue text-black rounded-lg text-xs font-bold uppercase tracking-wider">Dashboard</a>
                  <button onClick={onLogout} className="text-xs text-gray-500 hover:text-white">Logout</button>
                </div>
              ) : (
                <a href="#/login" className="ml-6 px-4 py-1.5 border border-neon-purple text-neon-purple rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neon-purple hover:text-white transition-all">Artist Login</a>
              )}
            </div>
          </div>

          <div className="xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-gray-950 border-b border-gray-800 p-6 space-y-4">
            <a href="#/" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#/services" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#/pricing" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#/community" className="block text-lg font-bold" onClick={() => setIsOpen(false)}>Community</a>
            {isLoggedIn ? (
                <a href="#/dashboard" className="block text-lg font-bold text-electric-blue" onClick={() => setIsOpen(false)}>Dashboard</a>
            ) : (
                <a href="#/login" className="block text-lg font-bold text-neon-purple" onClick={() => setIsOpen(false)}>Login</a>
            )}
        </div>
      )}
    </header>
  );
};

export default Header;
