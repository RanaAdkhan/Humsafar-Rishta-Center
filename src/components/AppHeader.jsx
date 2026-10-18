import React from 'react';
import { Globe, UserCheck, LogIn, UserPlus } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppHeader = ({ onOpenDrawer }) => {
  const { language, toggleLanguage, organizationDetails, setActivePage, currentUser } = useRishta();

  return (
    <header className="bg-gradient-to-r from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] border-b border-[#f0d4dc] text-slate-800 py-3 px-3 shadow-xs relative z-10">
      <div className="flex items-center justify-between">
        
        {/* Left: 4-Square Maroon Grid Menu Button */}
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-xl bg-white border border-[#9D2B48]/30 shadow-xs hover:bg-[#9D2B48]/5 active:scale-95 flex items-center justify-center transition-all p-2"
          aria-label="Open navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="13.5" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="2" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
            <rect x="13.5" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
          </svg>
        </button>

        {/* Center: Brand Circular Logo Emblem Badge */}
        <div
          onClick={() => setActivePage('home')}
          className="cursor-pointer group flex items-center space-x-2"
        >
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#9D2B48]/30 shadow-xs flex items-center justify-center overflow-hidden">
            <img
              src={organizationDetails.logoMain}
              alt="Humsafar Rishta Centre Official Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <h1 className="font-serif-luxury text-sm font-black text-[#9D2B48] leading-tight">
              HUMSAFAR
            </h1>
            <p className="text-[9px] text-[#916c33] font-bold uppercase tracking-wider">
              Rishta Center
            </p>
          </div>
        </div>

        {/* Right: Login and Register Buttons (Exactly as circled in screenshot) */}
        <div className="flex items-center space-x-1.5">
          {currentUser ? (
            <button
              onClick={() => setActivePage('dashboard')}
              className="h-8 px-2.5 rounded-lg bg-[#9D2B48] text-white text-[11px] font-bold flex items-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setActivePage('signin')}
                className="h-8 px-2.5 rounded-lg border border-[#9D2B48] text-[#9D2B48] bg-white text-[11px] font-bold hover:bg-[#9D2B48] hover:text-white transition-all shadow-xs"
              >
                Login
              </button>
              <button
                onClick={() => setActivePage('register')}
                className="h-8 px-2.5 rounded-lg bg-[#9D2B48] text-white text-[11px] font-bold hover:bg-[#7a1e35] transition-all shadow-xs"
              >
                Register
              </button>
            </>
          )}

          {/* Small Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-7 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-bold"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#9D2B48]" />
          </button>
        </div>

      </div>
    </header>
  );
};
