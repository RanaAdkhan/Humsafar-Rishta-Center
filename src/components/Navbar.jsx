import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Heart,
  Shield,
  Menu,
  X,
  PhoneCall,
  Users,
  Search,
  UserPlus,
  Crown,
  Sparkles,
  Building2,
  MessageCircle,
  Lock
} from 'lucide-react';

export const Navbar = () => {
  const { activePage, setActivePage, shortlist, organizationDetails } = useRishta();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Each page theme configuration
  const pageThemes = {
    home: { color: 'text-emerald-700 bg-emerald-50 border-emerald-500', dot: 'bg-emerald-600' },
    profiles: { color: 'text-blue-700 bg-blue-50 border-blue-500', dot: 'bg-blue-600' },
    register: { color: 'text-rose-700 bg-rose-50 border-rose-500', dot: 'bg-rose-600' },
    packages: { color: 'text-amber-800 bg-amber-50 border-amber-500', dot: 'bg-amber-600' },
    about: { color: 'text-teal-700 bg-teal-50 border-teal-500', dot: 'bg-teal-600' },
    stories: { color: 'text-purple-700 bg-purple-50 border-purple-500', dot: 'bg-purple-600' },
    contact: { color: 'text-sky-700 bg-sky-50 border-sky-500', dot: 'bg-sky-600' },
    shortlist: { color: 'text-orange-700 bg-orange-50 border-orange-500', dot: 'bg-orange-600' },
    admin: { color: 'text-indigo-800 bg-indigo-50 border-indigo-600', dot: 'bg-indigo-600' },
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'profiles', label: 'Find Matches', icon: Search },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'packages', label: 'Packages', icon: Crown },
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'stories', label: 'Success Stories', icon: Users },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 transition-all duration-300">
      {/* 1. Sleek Top Bar (Black & Gold Ribbon) */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-amber-500/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Security & Under Auspices */}
          <div className="flex items-center space-x-2.5 whitespace-nowrap">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-[10px]">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Protected</span>
            </span>
            <span className="text-amber-300/90 font-medium hidden sm:inline text-xs font-nastaliq">
              المکتب ایجوکیشنل فاؤنڈیشن کے زیرِ اہتمام
            </span>
          </div>

          {/* Right: Phone, WhatsApp & Staff Login */}
          <div className="flex items-center space-x-3 text-slate-300 whitespace-nowrap text-[11px]">
            <a
              href={`tel:${organizationDetails.phone}`}
              className="hover:text-amber-300 flex items-center space-x-1 transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden md:inline text-slate-400">Office:</span>
              <span className="text-white font-bold">{organizationDetails.phone}</span>
            </a>

            <span className="text-slate-700">|</span>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20proposals%20at%20Humsafar%20Rishta%20Centre`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 flex items-center space-x-1 transition-colors text-emerald-400 font-medium"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden md:inline text-slate-400">WhatsApp:</span>
              <span className="font-bold text-emerald-300">{organizationDetails.whatsapp}</span>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleNavClick('admin')}
              className="hover:text-amber-300 flex items-center space-x-1 transition-colors text-slate-400 hidden sm:flex"
              title="Official Staff Portal"
            >
              <Shield className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          {/* Left: Brand Identity */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            {/* Al-Maktab Emblem */}
            <div className="w-12 h-12 rounded-xl bg-white border border-amber-300/80 p-0.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img
                src={organizationDetails.logoAlMaktab}
                alt="Al-Maktab Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center leading-none">
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-luxury text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                  HUMSAFAR
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 whitespace-nowrap">
                  RISHTA CENTRE
                </span>
              </div>
              <span className="text-[11px] text-amber-800 font-bold tracking-tight font-nastaliq mt-1 whitespace-nowrap">
                المکتب ایجوکیشنل فاؤنڈیشن
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links (Always Single Line) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const theme = pageThemes[item.id] || pageThemes.home;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive
                      ? `${theme.color} font-bold shadow-xs`
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? '' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${theme.dot}`}></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Semi-compact Navigation for 1024px - 1279px screens */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-0.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const theme = pageThemes[item.id] || pageThemes.home;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? `${theme.color} font-bold`
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Shortlist, WhatsApp & Register) */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            {/* Shortlist Heart Button */}
            <button
              onClick={() => handleNavClick('shortlist')}
              className={`relative p-2 rounded-xl border transition-all ${
                activePage === 'shortlist'
                  ? 'bg-orange-50 border-orange-400 text-orange-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
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
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20would%20like%20to%20consult%20with%20Al-Maktab%20Humsafar%20Rishta%20Centre`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            {/* Register Free CTA Button */}
            <button
              onClick={() => handleNavClick('register')}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:shadow transition-all whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Register Free</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center space-x-1.5 lg:hidden">
            <button
              onClick={() => handleNavClick('shortlist')}
              className="p-2 rounded-xl text-slate-600 relative hover:bg-slate-100"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {shortlist.length > 0 && (
                <span className="absolute 0 top-0 right-0 bg-rose-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200 shadow-xl">
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 font-bold mb-3 flex items-center justify-between">
            <span className="font-nastaliq">المکتب ایجوکیشنل فاؤنڈیشن</span>
            <span className="text-[11px] text-slate-700 font-mono">042 36307676</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const theme = pageThemes[item.id] || pageThemes.home;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? `${theme.color} font-bold`
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full flex items-center justify-center space-x-2 bg-rose-600 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Biodata Online</span>
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
