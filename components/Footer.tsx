import React from 'react';

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1.05-6.46-2.95-1.6-1.87-2.36-4.3-2.3-6.66.02-1.22.2-2.42.53-3.56.8-2.61 3.03-4.5 5.5-5.12 1.52-.38 3.09-.38 4.61.02.03-1.56.02-3.12.01-4.68-.83-.43-1.7-.74-2.46-1.22-1.78-1.16-2.9-3.23-2.89-5.46.01-.22.02-.43.03-.64.29-.01 5.82-.02 5.82-.02z"/>
  </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
);

const SpotifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.323 17.947c-.24.36-.68.48-1.04.24-2.96-1.8-6.68-2.2-11.04-1.2-.4.08-.8-.16-.88-.56-.08-.36.16-.8.56-.88 4.76-1.04 8.88-.6 12.16 1.44.36.24.48.68.24 1.04zm1.2-2.76c-.32.44-.88.6-1.32.28-3.2-1.96-7.84-2.52-12.28-1.36-.48.12-.96-.2-.12-.68.12-.48.6-.72 1.08-.6 5.04-1.24 10.08-.6 13.68 1.48.44.32.6.88.28 1.32zm.12-2.92c-3.8-2.32-10.2-2.52-14.04-1.4-.56.16-1.12-.2-1.28-.76-.16-.56.2-1.12.76-1.28 4.32-1.24 11.28-.96 15.6 1.64.52.28.72.92.44 1.44-.28.52-.92.72-1.44.44z"/>
    </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neon-purple/20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white">TSA <span className="text-neon-purple">Records</span></h3>
            <p className="mt-4 text-gray-400 text-sm">Talent Showcase Africa (TSA) Records. Empowering emerging artists from across the continent.</p>
            <div className="mt-6 flex space-x-4">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition"><span className="sr-only">TikTok</span><TikTokIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition"><span className="sr-only">Instagram</span><InstagramIcon /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition"><span className="sr-only">YouTube</span><YouTubeIcon /></a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition"><span className="sr-only">Spotify</span><SpotifyIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Navigation</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#/about" className="text-base text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#/services" className="text-base text-gray-400 hover:text-white transition">Services</a></li>
              <li><a href="#/pricing" className="text-base text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#/blog" className="text-base text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#/contact" className="text-base text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="mailto:contact@tsarecords.com" className="text-base text-gray-400 hover:text-white transition">contact@tsarecords.com</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
             <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Newsletter</h4>
             <p className="mt-4 text-gray-400 text-sm">Get the latest on artist success and music marketing.</p>
             <form className="mt-4 flex" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                <input type="email" placeholder="Your email" required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:ring-electric-blue focus:border-electric-blue text-white" />
                <button type="submit" className="px-4 py-2 bg-neon-purple text-white font-semibold rounded-r-md hover:bg-violet-500 transition">Sign Up</button>
             </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-500">&copy; {new Date().getFullYear()} TSA Records. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;