
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/ankara/1920/1080')"}}></div>
      <div className="absolute inset-0 bg-brand-bg/80"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Connect With The Family</h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Got a demo? A question? Or just want to vibe with us? We're here for it. Drop us a line.
          </p>
        </div>
        <div className="mt-16 max-w-xl mx-auto">
          <form action="#" method="POST" className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-neon-purple sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-neon-purple sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-300">
                Message
              </label>
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-neon-purple sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-electric-blue px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
           <div className="mt-12 text-center text-gray-400">
            <p>Or email us directly at: <a href="mailto:contact@tsarecords.com" className="text-neon-purple hover:underline">contact@tsarecords.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
