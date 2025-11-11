import React, { useState, useEffect } from 'react';
import { User } from './LoginPage';

// This helps TypeScript understand the global Recharts object from the CDN
declare global {
  interface Window {
    Recharts: any;
  }
}

interface DashboardPageProps {
  user: User;
}

const streamsData = [
  { name: 'Jan', streams: 4000 },
  { name: 'Feb', streams: 3000 },
  { name: 'Mar', streams: 5000 },
  { name: 'Apr', streams: 4500 },
  { name: 'May', streams: 6000 },
  { name: 'Jun', streams: 5800 },
  { name: 'Jul', streams: 7200 },
];

const topTracksData = [
  { name: 'Vibe Check', streams: 45000 },
  { name: 'Lagos Sun', streams: 38000 },
  { name: 'Amapiano Love', streams: 32000 },
  { name: 'Jozi Night', streams: 25000 },
  { name: 'Accra Groove', streams: 18000 },
];

const regionalData = [
  { name: 'Nigeria', value: 400 },
  { name: 'South Africa', value: 300 },
  { name: 'Ghana', value: 200 },
  { name: 'Kenya', value: 150 },
  { name: 'Diaspora', value: 250 },
];
const COLORS = ['#8A2BE2', '#00BFFF', '#32CD32', '#FFD700', '#FF4500'];

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [rechartsLoaded, setRechartsLoaded] = useState(false);

  useEffect(() => {
    // Check if Recharts is already available
    if (window.Recharts) {
      setRechartsLoaded(true);
      return;
    }

    // If not, poll for it. This handles the async script loading from the CDN.
    const intervalId = setInterval(() => {
      if (window.Recharts) {
        setRechartsLoaded(true);
        clearInterval(intervalId);
      }
    }, 100); // Check every 100ms

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Gracefully handle the case where the Recharts CDN script hasn't loaded yet.
  if (!rechartsLoaded) {
    return (
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-white">Loading Analytics...</h1>
            <p className="mt-4 text-lg text-gray-400">Preparing your performance dashboard.</p>
        </div>
      </div>
    );
  }

  // Now that we've confirmed Recharts exists, we can safely destructure its components.
  const { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = window.Recharts;
  
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome back, <span className="text-neon-purple">{user.artistName}</span>!
        </h1>
        <p className="mt-4 text-lg text-gray-400">Here's a look at how your music is performing.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Total Streams (All Time)</h3>
                <p className="mt-2 text-3xl font-bold text-white">1.2M</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Monthly Listeners</h3>
                <p className="mt-2 text-3xl font-bold text-electric-blue">89.4K</p>
            </div>
             <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Royalties (This Month)</h3>
                <p className="mt-2 text-3xl font-bold text-white">$1,450</p>
            </div>
             <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Playlist Adds</h3>
                <p className="mt-2 text-3xl font-bold text-neon-purple">32</p>
            </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Streams Over Time */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Streams Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={streamsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Line type="monotone" dataKey="streams" stroke="#8A2BE2" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Tracks */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Top Tracks</h2>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTracksData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} cursor={{fill: 'rgba(0, 191, 255, 0.1)'}} />
                    <Bar dataKey="streams" fill="#00BFFF" />
                </BarChart>
            </ResponsiveContainer>
          </div>
          
           {/* Regional Popularity */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Regional Popularity</h2>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={regionalData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                         {regionalData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;