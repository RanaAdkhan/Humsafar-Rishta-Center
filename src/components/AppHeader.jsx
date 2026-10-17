import React from 'react';
import { Menu, Globe } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppHeader = ({ onOpenDrawer }) => {
  const { language, toggleLanguage, organizationDetails, setActivePage } = useRishta();

  return (
    <header className="bg-[#0B1E36] text-white pt-5 pb-9 px-4 rounded-b-[2.5rem] shadow-xl relative z-10">
      {/* Top Controls: Menu Button (Left), Logo & Titles (Center), Language Pill (Right) */}
      <div className="flex items-center justify-between">
        {/* Left: Rounded Square Menu Hamburger Button */}
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all shadow-xs"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Center: Brand Circular Logo Emblem Badge */}
        <div
          onClick={() => setActivePage('home')}
          className="cursor-pointer group flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-amber-400 shadow-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src={organizationDetails.logoMain}
              alt="Humsafar Rishta Centre Official Emblem"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right: Language Switcher Pill */}
        <button
          onClick={toggleLanguage}
          className="h-9 px-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold flex items-center space-x-1.5 backdrop-blur-md border border-white/15 transition-all shadow-xs"
          title="Toggle Language"
        >
          <span>{language === 'ur' ? 'English' : 'اردو'}</span>
          <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        </button>
      </div>

      {/* Brand Name Typography */}
      <div className="text-center mt-3 space-y-0.5">
        <h1 className="font-nastaliq text-2xl sm:text-3xl font-black text-white tracking-wide drop-shadow-sm">
          {language === 'ur' ? 'ہمسفر رشتہ سنٹر' : 'Humsafar Rishta Centre'}
        </h1>
        <p className="text-xs text-slate-300 font-medium tracking-wider">
          Humsafar Matrimonial Services (Regd.)
        </p>
      </div>
    </header>
  );
};
