
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-repeat" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/aztec.png')"}}></div>
      <div className="max-w-md w-full space-y-8 bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-neon-purple/20 z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Artist Hub Login' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-electric-blue hover:text-blue-400">
              {isLogin ? 'join the family' : 'login to your account'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
                <div>
                  <label htmlFor="artist-name" className="sr-only">Artist Name</label>
                  <input id="artist-name" name="artist-name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-neon-purple focus:border-neon-purple focus:z-10 sm:text-sm" placeholder="Artist Name" />
                </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-neon-purple focus:border-neon-purple focus:z-10 sm:text-sm`} placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-neon-purple focus:border-neon-purple focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-neon-purple focus:ring-electric-blue border-gray-600 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400"> Remember me </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-electric-blue hover:text-blue-400"> Forgot your password? </a>
              </div>
            </div>
          )}

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neon-purple hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-purple transition-colors">
              {isLogin ? 'Sign in' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
