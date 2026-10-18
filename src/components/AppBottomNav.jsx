import React from 'react';
import { Home, Users, PlusCircle, Database, PhoneCall, Sparkles } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppBottomNav = () => {
  const { activePage, setActivePage, language } = useRishta();

  const isUrdu = language === 'ur';

  const navItems = [
    {
      id: 'home',
      label: isUrdu ? 'ہوم' : 'Home',
      icon: Home,
    },
    {
      id: 'profiles',
      label: isUrdu ? 'رشتے' : 'Proposals',
      icon: Users,
    },
    {
      id: 'register',
      label: isUrdu ? 'نیا رشتہ' : 'Add Rishta',
      icon: PlusCircle,
      isCenter: true,
    },
    {
      id: 'admin',
      label: isUrdu ? 'ریکارڈز' : 'Records',
      icon: Database,
    },
    {
      id: 'contact',
      label: isUrdu ? 'رابطہ' : 'Contact',
      icon: PhoneCall,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-md border-t border-[#f0d4dc] shadow-[0_-5px_25px_rgba(157,43,72,0.1)] px-2 py-1.5 flex items-center justify-around sm:rounded-t-3xl">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => setActivePage('register')}
                className="relative -top-5 flex flex-col items-center group focus:outline-none cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#9D2B48] via-[#800000] to-[#630827] text-white flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-105 active:scale-95 transition-all">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-black text-[#9D2B48] font-nastaliq -mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#9D2B48] font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-[#9D2B48]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#9D2B48]"></span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 ${isUrdu ? 'font-nastaliq' : 'font-semibold'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
