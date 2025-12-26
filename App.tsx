
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage, { UserCredentials, User } from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import RadioPluggingPage from './pages/RadioPluggingPage';
import TikTokGrowthPage from './pages/TikTokGrowthPage';
import ArtistLaunchPage from './pages/ArtistLaunchPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('tsa-currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('tsa-currentUser');
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogin = (credentials: UserCredentials, isRegister: boolean): string => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('tsa-users') || '[]');
      
      if (isRegister) {
        if (users.find(u => u.email === credentials.email)) {
          return "An account with this email already exists.";
        }
        const newUser: User = {
          artistName: credentials.artistName!,
          email: credentials.email,
          password: credentials.password,
        };
        users.push(newUser);
        localStorage.setItem('tsa-users', JSON.stringify(users));
        localStorage.setItem('tsa-currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        window.location.hash = '#/dashboard';
        return "Success";
      } else {
        const user = users.find(u => u.email === credentials.email);
        if (user && user.password === credentials.password) {
          localStorage.setItem('tsa-currentUser', JSON.stringify(user));
          setCurrentUser(user);
          window.location.hash = '#/dashboard';
          return "Success";
        }
        return "Invalid email or password.";
      }
    } catch (error) {
        console.error("Login/Register error:", error);
        return "An unexpected error occurred.";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tsa-currentUser');
    setCurrentUser(null);
    window.location.hash = '#/';
  };

  const renderPage = () => {
    const [path, param] = route.substring(2).split('/');

    if (path === 'dashboard') {
      if (currentUser) {
        return <DashboardPage user={currentUser} />;
      }
      window.location.hash = '#/login';
      return null;
    }
    
    if (path === 'login') {
         if (currentUser) {
            window.location.hash = '#/dashboard';
            return null;
         }
         return <LoginPage onLogin={handleLogin} />;
    }

    if (path === 'blog' && param) {
      return <BlogPostPage slug={param} />;
    }

    switch (`#/${path}`) {
      case '#/about': return <AboutPage />;
      case '#/services': return <ServicesPage />;
      case '#/pricing': return <PricingPage />;
      case '#/blog': return <BlogPage />;
      case '#/contact': return <ContactPage />;
      case '#/radio-plugging': return <RadioPluggingPage user={currentUser} />;
      case '#/tiktok-growth': return <TikTokGrowthPage user={currentUser} />;
      case '#/artist-launch': return <ArtistLaunchPage user={currentUser} />;
      case '#/':
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-sans">
      <Header isLoggedIn={!!currentUser} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
