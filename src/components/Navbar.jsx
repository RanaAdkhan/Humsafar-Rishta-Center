import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Heart,
  Shield,
  Menu,
  X,
  PhoneCall,
  Search,
  UserPlus,
  Crown,
  Building2,
  MessageCircle,
  Lock,
  Home,
  Database,
  Smartphone,
  PlusCircle
} from 'lucide-react';

export const Navbar = () => {
  const { activePage, setActivePage, shortlist, organizationDetails } = useRishta();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profiles', label: 'Find Matches', icon: Search },
    { id: 'admin', label: 'Records & Add Proposal', icon: Database },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'packages', label: 'Packages', icon: Crown },
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'stories', label: 'Stories', icon: Heart },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 transition-all duration-300 w-full overflow-hidden">
      {/* 1. Sleek Top Bar (Black & Gold Luxury Ribbon) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Security & Slogan */}
          <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-semibold text-[10px]">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span>100% Confidential & Secure</span>
            </span>
            <span className="text-amber-300 font-semibold hidden md:inline text-xs">
              Humsafar Rishta Centre • True Companion for Life's Journey
            </span>
          </div>

          {/* Right: Phone, WhatsApp & Staff Login */}
          <div className="flex items-center space-x-3 whitespace-nowrap text-[11px] shrink-0">
            <a
              href={`tel:${organizationDetails.phone}`}
              className="hover:text-amber-300 flex items-center space-x-1 transition-colors text-slate-300"
            >
              <PhoneCall className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden sm:inline text-slate-400">Office:</span>
              <span className="text-white font-bold font-mono">{organizationDetails.phone}</span>
            </a>

            <span className="text-slate-700">|</span>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20matrimonial%20services%20at%20Humsafar%20Rishta%20Centre`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 flex items-center space-x-1 transition-colors text-emerald-400 font-medium"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline text-slate-400">WhatsApp:</span>
              <span className="font-bold">{organizationDetails.whatsapp}</span>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleNavClick('admin')}
              className="hover:text-amber-300 flex items-center space-x-1.5 transition-colors text-amber-300 font-bold bg-amber-500/15 border border-amber-400/40 px-2.5 py-0.5 rounded-lg"
              title="Official Records & Proposal Portal"
            >
              <Database className="w-3 h-3 text-amber-400 shrink-0" />
              <span>📋 Records & Proposal Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Left: Brand Identity */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            {/* Humsafar Official Emblem */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200 shadow-sm p-1 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img
                src={organizationDetails.logoMain}
                alt="Humsafar Rishta Centre Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-serif-luxury text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                HUMSAFAR
              </span>
              <span className="text-[10px] tracking-widest uppercase font-extrabold text-emerald-700 whitespace-nowrap">
                RISHTA CENTRE
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links (Balanced & Professional) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-[13px] transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Shortlist, WhatsApp & Register) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Shortlist Heart Button */}
            <button
              onClick={() => handleNavClick('shortlist')}
              className={`relative p-2 rounded-xl border transition-all ${
                activePage === 'shortlist'
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600'
              }`}
              title="View Shortlisted Profiles"
            >
              <Heart className="w-4 h-4 fill-current text-rose-500" />
              {shortlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {shortlist.length}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20would%20like%20to%20consult%20with%20Humsafar%20Rishta%20Centre`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Records / Add Rishta Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden lg:inline-flex items-center space-x-1.5 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl shadow-xs border border-amber-400/40 transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>+ Add Proposal / Records</span>
            </button>

            {/* Small App Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-humsafar-install-modal'))}
              className="hidden sm:inline-flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-2 rounded-xl transition-all whitespace-nowrap"
              title="Install Mobile App"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>App</span>
            </button>

            {/* Register Free CTA Button */}
            <button
              onClick={() => handleNavClick('register')}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Register Free</span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile / Tablet Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-3 bg-slate-900 rounded-xl text-xs text-white font-bold mb-3 flex items-center justify-between">
            <span className="text-amber-300 font-bold">Humsafar Rishta Centre • Lahore</span>
            <span className="text-[11px] text-slate-300 font-mono">042 36307676</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold text-sm shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 text-sm font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2 sm:hidden">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-800 to-teal-800 text-amber-300 py-2.5 rounded-xl font-bold text-xs shadow-sm border border-amber-400/30"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>📋 Records & Proposal Portal</span>
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Register Biodata Online</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-humsafar-install-modal'));
              }}
              className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>📲 Install Mobile App</span>
            </button>
            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {organizationDetails.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
