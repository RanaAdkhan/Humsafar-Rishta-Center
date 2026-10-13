import React from 'react';
import { RishtaProvider, useRishta } from './context/RishtaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Page components
import { HomePage } from './pages/HomePage';
import { ProfilesPage } from './pages/ProfilesPage';
import { RegisterPage } from './pages/RegisterPage';
import { PackagesPage } from './pages/PackagesPage';
import { AboutPage } from './pages/AboutPage';
import { StoriesPage } from './pages/StoriesPage';
import { ContactPage } from './pages/ContactPage';
import { ShortlistPage } from './pages/ShortlistPage';
import { AdminPage } from './pages/AdminPage';

const AppContent = () => {
  const { activePage } = useRishta();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'profiles':
        return <ProfilesPage />;
      case 'register':
        return <RegisterPage />;
      case 'packages':
        return <PackagesPage />;
      case 'about':
        return <AboutPage />;
      case 'stories':
        return <StoriesPage />;
      case 'contact':
        return <ContactPage />;
      case 'shortlist':
        return <ShortlistPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-700 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      <Footer />
      <ProfileDetailModal />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <RishtaProvider>
      <AppContent />
    </RishtaProvider>
  );
}
