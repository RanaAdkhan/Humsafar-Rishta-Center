import React, { useState, useEffect } from 'react';
import { RishtaProvider, useRishta } from './context/RishtaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppHeader } from './components/AppHeader';
import { AppBottomNav } from './components/AppBottomNav';
import { AppDrawer } from './components/AppDrawer';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { InstallAppButton } from './components/InstallAppButton';
import { Smartphone, Monitor, ArrowLeft } from 'lucide-react';

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
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [forceMode, setForceMode] = useState(null); // 'mobile' | 'desktop' | null (auto)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    const handleSwitchToApp = () => setForceMode('mobile');
    const handleSwitchToWeb = () => setForceMode('desktop');
    window.addEventListener('switch-to-app-view', handleSwitchToApp);
    window.addEventListener('switch-to-web-view', handleSwitchToWeb);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('switch-to-app-view', handleSwitchToApp);
      window.removeEventListener('switch-to-web-view', handleSwitchToWeb);
    };
  }, []);

  // Determine whether to display the mobile app layout or full desktop website
  const isMobileView = forceMode === 'mobile' || (forceMode === null && isMobileScreen);

  const renderActivePage = (isMobileLayout = false) => {
    switch (activePage) {
      case 'home':
        return <HomePage isMobileView={isMobileLayout} />;
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
        return <HomePage isMobileView={isMobileLayout} />;
    }
  };

  /* =======================================================================
     VIEW 1: MOBILE APP LAYOUT (Exact match to the user's mobile app design)
     ======================================================================= */
  if (isMobileView) {
    return (
      <div className={`min-h-screen ${!isMobileScreen ? 'bg-slate-950 py-6 px-4 flex flex-col items-center justify-center' : 'bg-slate-50'}`}>
        
        {/* On Desktop in Mobile Preview Mode: Show Return to Web Banner */}
        {!isMobileScreen && (
          <div className="mb-4 max-w-md w-full flex items-center justify-between bg-slate-900 border border-amber-400/50 rounded-2xl px-4 py-2 text-white shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
              <Smartphone className="w-4 h-4" />
              <span>📱 موبائل ایپ پریویو موڈ</span>
            </div>
            <button
              onClick={() => setForceMode('desktop')}
              className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>💻 فل ویب سائٹ</span>
            </button>
          </div>
        )}

        {/* Mobile Smartphone Shell */}
        <div className={`w-full max-w-md bg-slate-50 min-h-screen relative flex flex-col ${!isMobileScreen ? 'min-h-[850px] max-h-[92vh] rounded-[2.5rem] shadow-2xl overflow-y-auto border-[8px] border-slate-800 ring-1 ring-slate-700/50' : 'pb-16'}`}>
          
          {/* Top Curved App Header */}
          <AppHeader onOpenDrawer={() => setDrawerOpen(true)} />

          {/* Dynamic Page Content */}
          <main className="flex-1 pb-16">
            {renderActivePage(true)}
          </main>

          {/* Fixed Bottom App Navigation Bar */}
          <AppBottomNav />

          {/* Slide-out Side Drawer */}
          <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

          {/* Modals */}
          <ProfileDetailModal />
          <InstallAppButton />
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 2: FULL-WIDTH DESKTOP WEBSITE (VIP Executive Matrimonial Portal)
     ======================================================================= */
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-emerald-700 selection:text-white w-full">
      {/* Full Desktop Navigation Bar */}
      <Navbar />

      {/* Main Full-Width Content */}
      <main className="flex-grow w-full">
        {renderActivePage(false)}
      </main>

      {/* Full Desktop Footer */}
      <Footer />

      {/* Global Modals & Floating Helpers */}
      <ProfileDetailModal />
      <WhatsAppFloatingButton />
      <InstallAppButton />
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
