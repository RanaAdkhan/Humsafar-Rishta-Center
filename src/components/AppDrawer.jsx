import React from 'react';
import {
  X,
  Home,
  Users,
  UserPlus,
  Database,
  Award,
  Info,
  Heart,
  PhoneCall,
  MessageCircle,
  MapPin,
  Globe,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppDrawer = ({ isOpen, onClose }) => {
  const { activePage, setActivePage, language, toggleLanguage, organizationDetails, shortlistedIds } = useRishta();

  if (!isOpen) return null;

  const isUrdu = language === 'ur';

  const menuItems = [
    { id: 'home', label: isUrdu ? 'ہوم پیج' : 'Home', icon: Home },
    { id: 'profiles', label: isUrdu ? 'تمام تصدیق شدہ رشتے' : 'Verified Proposals', icon: Users },
    { id: 'register', label: isUrdu ? 'نیا رشتہ درج کریں (مفت)' : 'Register Free Biodata', icon: UserPlus },
    { id: 'admin', label: isUrdu ? 'فیملی ریکارڈز و ڈیٹا بیس' : 'Records & Admin', icon: Database },
    { id: 'packages', label: isUrdu ? 'سروس پیکیجز' : 'Membership Packages', icon: Award },
    { id: 'shortlist', label: isUrdu ? `محفوظ رشتے (${shortlistedIds.length})` : `Shortlisted (${shortlistedIds.length})`, icon: Heart },
    { id: 'about', label: isUrdu ? 'ہمارے بارے میں' : 'About Humsafar', icon: Info },
    { id: 'contact', label: isUrdu ? 'رابطہ و ہیڈ آفس' : 'Contact & Office', icon: PhoneCall },
  ];

  const handleNav = (pageId) => {
    setActivePage(pageId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container (Sliding in) */}
      <aside className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
        {/* Drawer Header with Royal Navy brand styling */}
        <div className="bg-[#0B1E36] text-white p-5 space-y-4">
          <div className="flex items-center justify-between">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/15 transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center space-x-1.5 border border-white/15"
            >
              <span>{language === 'ur' ? 'English' : 'اردو'}</span>
              <Globe className="w-3 h-3 text-amber-300" />
            </button>
          </div>

          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-amber-400 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={organizationDetails.logoMain}
                alt="Humsafar Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-nastaliq text-xl font-bold leading-tight">
                {isUrdu ? 'ہمسفر رشتہ سنٹر' : 'Humsafar Rishta'}
              </h2>
              <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                True Companion for Life's Journey
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span className={`flex-1 text-left ${isUrdu ? 'font-nastaliq text-sm' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Official Contact Info Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center space-x-2 text-slate-800">
            <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-mono font-bold">{organizationDetails.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-800">
            <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-bold">{organizationDetails.whatsapp}</span>
          </div>

          <div className="flex items-start space-x-2 text-[11px] text-slate-500">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>64 Mozang Road, Safanwala Chowk, Lahore</span>
          </div>

          <a
            href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20contacting%20Humsafar%20Rishta%20Centre`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isUrdu ? 'واٹس ایپ پر رابطہ کریں' : 'Chat on WhatsApp'}</span>
          </a>
        </div>
      </aside>
    </div>
  );
};
