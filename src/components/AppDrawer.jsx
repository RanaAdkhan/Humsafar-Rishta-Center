import React from 'react';
import {
  X,
  Home,
  Info,
  Award,
  UserPlus,
  PhoneCall,
  LogIn,
  HelpCircle,
  Database,
  MessageCircle,
  MapPin,
  Globe,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppDrawer = ({ isOpen, onClose }) => {
  const {
    activePage,
    setActivePage,
    language,
    toggleLanguage,
    organizationDetails,
    currentUser,
    signOutUser
  } = useRishta();

  if (!isOpen) return null;

  const isUrdu = language === 'ur';

  // The EXACT 7 menu items specified in the user's notebook
  const menuItems = [
    {
      id: 'home',
      label: isUrdu ? '1. ہوم (Home)' : '1. Home',
      icon: Home,
    },
    {
      id: 'about',
      label: isUrdu ? '2. ہمارے بارے میں (About us)' : '2. About us',
      icon: Info,
    },
    {
      id: 'packages',
      label: isUrdu ? '3. ممبرشپ پیکیجز (Membership Plans)' : '3. Membership Plans',
      icon: Award,
    },
    {
      id: 'register',
      label: isUrdu ? '4. نیا رشتہ بنائیں (Create Profile)' : '4. Create Profile',
      icon: UserPlus,
    },
    {
      id: 'contact',
      label: isUrdu ? '5. رابطہ کریں (Contact us)' : '5. Contact us',
      icon: PhoneCall,
    },
    {
      id: currentUser ? 'dashboard' : 'signin',
      label: currentUser
        ? (isUrdu ? '6. ڈیش بورڈ (Dashboard)' : '6. My Dashboard')
        : (isUrdu ? '6. لاگ ان (Sign in)' : '6. Sign in'),
      icon: currentUser ? UserCheck : LogIn,
    },
    {
      id: 'how-it-works',
      label: isUrdu ? '7. طریقہ کار (How it works)' : '7. How it works',
      icon: HelpCircle,
    },
    {
      id: 'admin',
      label: isUrdu ? 'ایڈمن و فیملی ریکارڈز' : 'Admin & Family Records',
      icon: Database,
    }
  ];

  const handleNav = (pageId) => {
    setActivePage(pageId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-out Drawer Container */}
      <aside className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
        
        {/* Header matching Shaadi.org.pk Maroon theme */}
        <div className="bg-gradient-to-r from-[#9D2B48] to-[#7a1e35] text-white p-5 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/20 transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="h-8 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center space-x-1.5 border border-white/20"
            >
              <span>{language === 'ur' ? 'English' : 'اردو'}</span>
              <Globe className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-amber-300 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={organizationDetails.logoMain}
                alt="Humsafar Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-serif-luxury text-base font-bold leading-tight text-white">
                HUMSAFAR
              </h2>
              <p className="text-[10px] text-amber-200 uppercase tracking-widest font-semibold">
                Rishta Center (Regd.)
              </p>
            </div>
          </div>

          {/* Logged in user snippet if any */}
          {currentUser && (
            <div className="bg-white/10 rounded-xl p-2.5 text-xs border border-white/15 flex items-center justify-between">
              <div>
                <p className="text-amber-200 text-[10px] font-semibold">Signed in as:</p>
                <p className="font-bold text-white truncate max-w-[170px]">{currentUser.name}</p>
              </div>
              <button
                onClick={signOutUser}
                className="text-[11px] bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* 7 Main Navigation Menu Options */}
        <div className="flex-1 p-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1 pb-1">
            Menu Navigation
          </p>

          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-[#9D2B48]/10 text-[#9D2B48] font-bold border border-[#9D2B48]/30 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#9D2B48]' : 'text-slate-400'}`} />
                <span className="flex-1 text-left font-medium font-nastaliq text-xs sm:text-sm leading-loose">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9D2B48]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Contact info footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center space-x-2 text-slate-800">
            <PhoneCall className="w-4 h-4 text-[#9D2B48] shrink-0" />
            <span className="font-mono font-bold">{organizationDetails.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-800">
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{organizationDetails.whatsapp}</span>
          </div>

          <div className="flex items-start space-x-2 text-[11px] text-slate-500">
            <MapPin className="w-4 h-4 text-[#9D2B48] shrink-0 mt-0.5" />
            <span>64 Mozang Road, Safanwala Chowk, Lahore</span>
          </div>

          <a
            href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20contacting%20Humsafar%20Rishta%20Center`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#9D2B48] to-[#800000] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </aside>
    </div>
  );
};
