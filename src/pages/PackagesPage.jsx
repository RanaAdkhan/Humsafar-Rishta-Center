import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { packagesData } from '../data/initialProfiles';
import {
  Crown,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Award,
  Zap,
  Building2,
  Lock
} from 'lucide-react';

export const PackagesPage = () => {
  const { setActivePage, organizationDetails } = useRishta();

  const handlePackageClick = (pkg) => {
    if (pkg.action === 'register') {
      setActivePage('register');
    } else {
      const msg = encodeURIComponent(
        `Assalam-o-Alaikum Humsafar Rishta Center team, I want to subscribe to the [${pkg.name} - ${pkg.price} (${pkg.period})]. Please guide on activation.`
      );
      window.open(`https://wa.me/${organizationDetails.whatsappClean}?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 w-full overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto px-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#9D2B48]/10 text-[#9D2B48] text-xs font-bold border border-[#9D2B48]/20">
            <Award className="w-3.5 h-3.5" />
            <span>TRANSPARENT MEMBERSHIP PLANS</span>
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight break-words">
            Membership Plans & Packages
          </h1>
          <p className="font-nastaliq text-base sm:text-lg text-[#9D2B48] font-bold leading-loose break-words">
            "ممبرشپ پیکیجز • باوقار اور پرائیویسی سے بھرپور رشتوں کا انتخاب"
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words">
            Choose a plan that fits your family's matrimonial search requirements. Complete privacy, full verification, and dedicated counselor support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {packagesData.map((pkg) => {
            const isElite = pkg.id === 'elite';

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 flex flex-col justify-between relative ${
                  isElite
                    ? 'border-2 border-[#9D2B48] shadow-xl ring-2 ring-[#9D2B48]/10 -translate-y-1'
                    : 'border border-[#f0d4dc] hover:shadow-md'
                }`}
              >
                {/* Popular Badge for PKR 10,000 Elite */}
                {isElite && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#9D2B48] to-[#800000] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  {/* Title & Badge */}
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {pkg.period}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-2 border-y border-slate-100">
                    <span className="text-2xl sm:text-3xl font-black text-[#9D2B48]">
                      {pkg.price}
                    </span>
                    {pkg.price !== 'Free' && (
                      <span className="text-xs text-slate-400 font-medium ml-1">
                        / {pkg.period.split(' ')[0]} {pkg.period.split(' ')[1]}
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist (Matches user image 5) */}
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#9D2B48] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Button */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isElite
                        ? 'border-2 border-[#9D2B48] text-[#9D2B48] hover:bg-[#9D2B48] hover:text-white rounded-full'
                        : pkg.id === 'free'
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-[#9D2B48] hover:bg-[#7a1e35] text-white'
                    }`}
                  >
                    <span>{pkg.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Activation Assistance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0d4dc] shadow-sm max-w-4xl mx-auto space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                Payment Methods & Lahore Head Office Activation
              </h4>
              <p className="text-xs text-slate-500">
                EasyPaisa, JazzCash, Meezan Bank, HBL, or Direct Visit to our Lahore Safanwala Chowk Office
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-900">Meezan Bank / HBL</span>
              <span className="text-[11px] text-slate-500">Official Humsafar Account</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-900">JazzCash / EasyPaisa</span>
              <span className="text-[11px] text-slate-500 font-mono">0325 1013131</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-900">In-Person Lahore Visit</span>
              <span className="text-[11px] text-slate-500">64 Mozang Road, Lahore</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
