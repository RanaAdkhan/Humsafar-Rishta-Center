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
import { Smartphone, Monitor } from 'lucide-react';

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
import { SignInPage } from './pages/SignInPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

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
      case 'signin':
        return <SignInPage />;
      case 'dashboard':
        return <UserDashboardPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
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
      <div className={`min-h-screen ${!isMobileScreen ? 'bg-slate-900 py-6 px-4 flex flex-col items-center justify-center' : 'bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1]'}`}>
        
        {/* On Desktop in Mobile Preview Mode: Show Return to Web Banner */}
        {!isMobileScreen && (
          <div className="mb-4 max-w-md w-full flex items-center justify-between bg-white border border-[#9D2B48]/30 rounded-2xl px-4 py-2.5 shadow-lg">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#9D2B48]">
              <Smartphone className="w-4 h-4" />
              <span>📱 موبائل ایپ پریویو موڈ</span>
            </div>
            <button
              onClick={() => setForceMode('desktop')}
              className="flex items-center space-x-1.5 px-3 py-1 bg-[#9D2B48] hover:bg-[#7a1e35] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>💻 فل ویب سائٹ</span>
            </button>
          </div>
        )}

        {/* Mobile Smartphone Shell */}
        <div className={`w-full max-w-md bg-white min-h-screen relative flex flex-col ${!isMobileScreen ? 'min-h-[850px] max-h-[92vh] rounded-[2.5rem] shadow-2xl overflow-y-auto border-[8px] border-slate-800 ring-1 ring-slate-700/50' : 'pb-16'}`}>
          
          {/* Top Curved App Header with Grid Menu & Login/Register */}
          <AppHeader onOpenDrawer={() => setDrawerOpen(true)} />

          {/* Dynamic Page Content */}
          <main className="flex-1 pb-16">
            {renderActivePage(true)}
          </main>

          {/* Fixed Bottom App Navigation Bar */}
          <AppBottomNav />

          {/* Slide-out Side Drawer with 7 core menu options */}
          <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

          {/* Modals */}
          <ProfileDetailModal />
          <InstallAppButton />
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 2: FULL-WIDTH DESKTOP WEBSITE (Shaadi.org.pk Theme & Executive Design)
     ======================================================================= */
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] selection:bg-[#9D2B48] selection:text-white w-full">
      {/* Full Desktop Navigation Bar with 4-square grid menu & Login/Register */}
      <Navbar onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Main Full-Width Content */}
      <main className="flex-grow w-full">
        {renderActivePage(false)}
      </main>

      {/* Full Desktop Footer */}
      <Footer />

      {/* Slide-out Side Drawer (now functional on desktop too when grid icon clicked!) */}
      <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

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
