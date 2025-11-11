import React, { useState, useEffect } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkActive = () => {
      const currentHash = window.location.hash || '#/';
      // Handle simple and complex routes (e.g., #/blog and #/blog/post-slug)
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

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void }> = ({ href, children, onClick }) => {
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
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-700 text-electric-blue' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    >
      {children}
    </a>
  );
};

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#/', label: 'Home' },
    { href: '#/about', label: 'About' },
    { href: '#/services', label: 'Services' },
    { href: '#/pricing', label: 'Pricing' },
    { href: '#/blog', label: 'Blog' },
    { href: '#/contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-neon-purple/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#/" className="text-2xl font-bold tracking-wider text-white">
              TSA <span className="text-neon-purple">Records</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
              ))}
              {isLoggedIn ? (
                <>
                  <a href="#/dashboard" className="ml-4 px-4 py-2 border border-electric-blue text-electric-blue rounded-full text-sm font-medium hover:bg-electric-blue hover:text-black transition duration-300">Dashboard</a>
                  <button onClick={onLogout} className="ml-4 px-4 py-2 border border-neon-purple text-neon-purple rounded-full text-sm font-medium hover:bg-neon-purple hover:text-black transition duration-300">Logout</button>
                </>
              ) : (
                <a href="#/login" className="ml-4 px-4 py-2 border border-electric-blue text-electric-blue rounded-full text-sm font-medium hover:bg-electric-blue hover:text-black transition duration-300">Artist Login</a>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <MobileNavLink key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</MobileNavLink>
            ))}
             {isLoggedIn ? (
                <>
                  <MobileNavLink href="#/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                  <a onClick={() => { onLogout(); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Logout</a>
                </>
              ) : (
                <MobileNavLink href="#/login" onClick={() => setIsOpen(false)}>Artist Login</MobileNavLink>
              )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;