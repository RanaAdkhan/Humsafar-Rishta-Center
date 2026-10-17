import React, { useState } from 'react';
import { RishtaProvider, useRishta } from './context/RishtaContext';
import { AppHeader } from './components/AppHeader';
import { AppBottomNav } from './components/AppBottomNav';
import { AppDrawer } from './components/AppDrawer';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { InstallAppButton } from './components/InstallAppButton';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-900 sm:py-6 sm:px-4 flex items-center justify-center selection:bg-amber-500 selection:text-slate-950">
      {/* Mobile Smartphone Frame Container */}
      <div className="w-full max-w-md bg-slate-50 min-h-screen sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-y-auto sm:border-[8px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700/50">
        
        {/* Mobile App Curved Header */}
        <AppHeader onOpenDrawer={() => setDrawerOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 pb-20">
          {renderActivePage()}
        </main>

        {/* Fixed Mobile Bottom Navigation Bar */}
        <AppBottomNav />

        {/* Slide-out Mobile Drawer */}
        <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Global Modals & Install Helper */}
        <ProfileDetailModal />
        <InstallAppButton />
      </div>
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
