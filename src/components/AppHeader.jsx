import React from 'react';
import { Globe, UserCheck, LogIn, UserPlus } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppHeader = ({ onOpenDrawer }) => {
  const { language, toggleLanguage, organizationDetails, setActivePage, currentUser } = useRishta();

  return (
    <header className="bg-gradient-to-r from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] border-b border-[#f0d4dc] text-slate-800 py-2.5 px-2.5 shadow-xs relative z-10 w-full max-w-full overflow-hidden">
      <div className="flex items-center justify-between w-full max-w-full">
        
        {/* Left: 4-Square Maroon Grid Menu Button */}
        <button
          onClick={onOpenDrawer}
          className="w-9 h-9 rounded-xl bg-white border border-[#9D2B48]/30 shadow-xs hover:bg-[#9D2B48]/5 active:scale-95 flex items-center justify-center transition-all p-1.5 shrink-0"
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="13.5" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="2" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="13.5" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
          </svg>
        </button>

        {/* Center: Brand Circular Logo Emblem Badge */}
        <div
          onClick={() => setActivePage('home')}
          className="cursor-pointer group flex items-center space-x-1.5 min-w-0 shrink mx-1"
        >
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-[#9D2B48]/30 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={organizationDetails.logoMain}
              alt="Humsafar Rishta Centre Official Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left min-w-0">
            <h1 className="font-serif-luxury text-xs sm:text-sm font-black text-[#9D2B48] leading-tight truncate">
              HUMSAFAR
            </h1>
            <p className="text-[8px] sm:text-[9px] text-[#916c33] font-bold uppercase tracking-wider truncate">
              Rishta Center
            </p>
          </div>
        </div>

        {/* Right: Login and Register Buttons (Exactly as circled in screenshot) */}
        <div className="flex items-center space-x-1 shrink-0">
          {currentUser ? (
            <button
              onClick={() => setActivePage('dashboard')}
              className="h-7 px-2 rounded-lg bg-[#9D2B48] text-white text-[10px] font-bold flex items-center space-x-1 shrink-0"
            >
              <UserCheck className="w-3 h-3" />
              <span>Portal</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setActivePage('signin')}
                className="h-7 px-2 rounded-lg border border-[#9D2B48] text-[#9D2B48] bg-white text-[10px] sm:text-[11px] font-bold hover:bg-[#9D2B48] hover:text-white transition-all shadow-xs shrink-0"
              >
                Login
              </button>
              <button
                onClick={() => setActivePage('register')}
                className="h-7 px-2 rounded-lg bg-[#9D2B48] text-white text-[10px] sm:text-[11px] font-bold hover:bg-[#7a1e35] transition-all shadow-xs shrink-0"
              >
                Register
              </button>
            </>
          )}

          {/* Small Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0"
            title="Toggle Language"
          >
            <Globe className="w-3 h-3 text-[#9D2B48]" />
          </button>
        </div>

      </div>
    </header>
  );
};
