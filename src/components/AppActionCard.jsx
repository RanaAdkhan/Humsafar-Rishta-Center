import React from 'react';
import { ArrowLeft, ArrowRight, HeartHandshake, UserPlus } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppActionCard = () => {
  const { setActivePage, language } = useRishta();

  // Dynamic formatted date
  const todayDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="mx-4 -mt-6 relative z-20">
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-lg border border-slate-100 flex items-center justify-between gap-3 transition-transform hover:shadow-xl">
        {/* Left Side: Amber CTA Button with Arrow */}
        <button
          onClick={() => setActivePage('register')}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black text-xs py-2 px-3.5 sm:px-4 rounded-xl shadow-md flex items-center space-x-1.5 transition-all shrink-0"
        >
          <span>{language === 'ur' ? 'نیا رشتہ درج کریں' : 'Register Free'}</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* Right Side: Title, Current Date, and Heart Icon Badge */}
        <div className="flex items-center space-x-2.5 text-right">
          <div>
            <h4 className="font-nastaliq text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {language === 'ur' ? 'خدمتِ رشتہ، نیا رشتہ درج کریں' : 'Confidential Rishta Registration'}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {todayDate}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 shadow-inner border border-amber-200/60">
            <HeartHandshake className="w-5 h-5 text-amber-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
