import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Heart,
  PhoneCall,
  Search,
  UserPlus,
  Crown,
  Building2,
  MessageCircle,
  Lock,
  Home,
  Database,
  Globe,
  UserCheck,
  LogIn,
  Info,
  HelpCircle,
  Menu
} from 'lucide-react';

export const Navbar = ({ onOpenDrawer }) => {
  const {
    activePage,
    setActivePage,
    shortlist,
    organizationDetails,
    language,
    toggleLanguage,
    currentUser,
    signOutUser
  } = useRishta();

  const isUrdu = language === 'ur';

  // 7 core menu items
  const navItems = [
    { id: 'home', label: isUrdu ? 'ہوم' : 'Home' },
    { id: 'about', label: isUrdu ? 'ہمارے بارے میں' : 'About Us' },
    { id: 'packages', label: isUrdu ? 'پیکیجز' : 'Membership Plans' },
    { id: 'register', label: isUrdu ? 'نیا رشتہ بنائیں' : 'Create Profile' },
    { id: 'how-it-works', label: isUrdu ? 'طریقہ کار' : 'How It Works' },
    { id: 'contact', label: isUrdu ? 'رابطہ' : 'Contact Us' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm border-b border-[#f0d4dc] transition-all duration-300 w-full bg-gradient-to-r from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1]">
      {/* 1. Top Announcement Strip (like Shaadi.org.pk preTopHeader) */}
      <div className="bg-[#f3e3e6] border-b border-[#e8ccd3] text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Security & Slogan */}
          <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#9D2B48]/10 border border-[#9D2B48]/30 text-[#9D2B48] font-bold text-[10px]">
              <Lock className="w-2.5 h-2.5 text-[#9D2B48] shrink-0" />
              <span>Government Registered Marriage Bureau</span>
            </span>
            <span className="text-[#916c33] font-bold hidden md:inline text-xs">
              پاکستان کی سب سے بااعتماد رشتہ سروس • Pakistan's Most Trusted Matchmaking Network
            </span>
          </div>

          {/* Right: Phone, WhatsApp & Language */}
          <div className="flex items-center space-x-3 whitespace-nowrap text-[11px] shrink-0">
            <a
              href={`tel:${organizationDetails.phone.replace(/\s+/g, '')}`}
              className="text-slate-700 hover:text-[#9D2B48] flex items-center space-x-1 transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#9D2B48] shrink-0" />
              <span className="hidden sm:inline text-slate-500">Office:</span>
              <span className="font-bold font-mono">{organizationDetails.phone}</span>
            </a>

            <span className="text-slate-300">|</span>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20matrimonial%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline text-slate-500">WhatsApp:</span>
              <span className="font-bold">{organizationDetails.whatsapp}</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hover:text-[#9D2B48] flex items-center space-x-1 text-slate-700 text-[11px] font-bold bg-white/60 px-2 py-0.5 rounded-md border border-slate-300 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-[#9D2B48] shrink-0" />
              <span>{language === 'ur' ? 'English' : 'اردو'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Grid Icon Left, Logo Center, Login/Register Right) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: 4-Square Grid Menu Button (Exactly like Shaadi.org.pk circled button) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenDrawer}
              className="w-10 h-10 rounded-xl bg-white border border-[#9D2B48]/30 shadow-xs hover:bg-[#9D2B48]/5 active:scale-95 flex items-center justify-center transition-all cursor-pointer p-2"
              title="Open Navigation Menu"
              aria-label="Open Menu"
            >
              {/* Iconic 4-Square Maroon Grid Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
                <rect x="13.5" y="2" width="9" height="9" rx="2" fill="#9D2B48"/>
                <rect x="2" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
                <rect x="13.5" y="13.5" width="9" height="9" rx="2" fill="#9D2B48"/>
              </svg>
            </button>

            {/* Brand Logo & Name */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#9D2B48]/20 shadow-xs p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={organizationDetails.logoMain}
                  alt="Humsafar Rishta Center Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-center leading-tight">
                <span className="font-serif-luxury text-base sm:text-xl font-black text-[#9D2B48] tracking-tight whitespace-nowrap">
                  HUMSAFAR
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-extrabold text-[#916c33] whitespace-nowrap">
                  Rishta Center (Regd.)
                </span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#9D2B48] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:text-[#9D2B48] hover:bg-white/80 font-semibold'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Login & Register Buttons (Exactly as circled in user screenshot) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* If user is signed in */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="px-3 py-1.5 rounded-lg bg-[#9D2B48] text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs hover:bg-[#7a1e35] transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{currentUser.name.split(' ')[0]} (Dashboard)</span>
                  <span className="sm:hidden">Dashboard</span>
                </button>

                <button
                  onClick={signOutUser}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* If guest user: Show Login & Register buttons */
              <div className="flex items-center space-x-2">
                {/* 1. Login Button */}
                <button
                  onClick={() => handleNavClick('signin')}
                  className="px-3 sm:px-4 py-1.5 rounded-lg border border-[#9D2B48] text-[#9D2B48] bg-white hover:bg-[#9D2B48] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Sign in
                </button>

                {/* 2. Register Button */}
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-3 sm:px-4 py-1.5 rounded-lg bg-[#9D2B48] hover:bg-[#7a1e35] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
