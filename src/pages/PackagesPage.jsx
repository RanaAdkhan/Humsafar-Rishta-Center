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
  ArrowRight
} from 'lucide-react';

export const PackagesPage = () => {
  const { setActivePage } = useRishta();

  const handlePackageClick = (pkg) => {
    if (pkg.action === 'register') {
      setActivePage('register');
    } else {
      const msg = encodeURIComponent(
        `Hello Humsafar Matrimonial Team, I want to enroll in the [${pkg.name} - ${pkg.price}]. Please provide payment and counselor assignment details.`
      );
      window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
    }
  };

  const faqs = [
    {
      q: "How does the Gold VIP Concierge service work?",
      a: "With Gold VIP, a dedicated Senior Matchmaker is assigned exclusively to your family. The counselor holds a detailed family consultation, searches internal databases, conducts physical verifications, and personally facilitates introductions between respected families."
    },
    {
      q: "Are photographs and phone numbers safe with Humsafar?",
      a: "Yes, 100%. We operate under strict Islamic modesty and family privacy laws. Photos and direct contact numbers are never displayed publicly on the open web. They are only exchanged in private with verified, compatible families upon mutual consent."
    },
    {
      q: "Can Overseas Pakistani families join from abroad?",
      a: "Certainly! Over 40% of our successful marriages involve overseas candidates in the UK, USA, Canada, UAE, Saudi Arabia, Australia, and Europe. Our Overseas Elite package includes video conference introductions and credential verification."
    },
    {
      q: "What if we don't find a compatible match within the initial period?",
      a: "Our Gold VIP and Overseas packages include continuous active counselor support until the proposal is formally finalized."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Imperial Gold Theme */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-800/80 border border-amber-600/50 text-amber-300 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>IMPERIAL GOLD SUITE • TRANSPARENT MEMBERSHIP PLANS</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Consultancy Packages & Plans
          </h1>
          <p className="text-amber-100 text-sm sm:text-base max-w-xl mx-auto">
            Choose the personalized matchmaking tier that matches your family's timeline, location, and privacy preferences.
          </p>
        </div>
      </div>

      {/* 2. Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl bg-white border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                pkg.popular
                  ? 'border-amber-400 shadow-xl ring-2 ring-amber-400/40 relative scale-[1.02]'
                  : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.popular && (
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-[11px] py-1 text-center uppercase tracking-wider">
                  ★ Most Popular & Recommended ★
                </div>
              )}

              {/* Package Top */}
              <div>
                <div className="p-6 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {pkg.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight mb-3">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-serif-luxury">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {pkg.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6 space-y-3.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-amber-900/10'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. VIP Guarantee Box */}
        <div className="mt-16 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Family Confidentiality Assurance</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Need Custom Matchmaking for VIP / Bureaucrat / Industrial Families?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We provide strictly off-the-record bespoke services where no biodata is ever listed online. Contact our Managing Director directly for confidential consultations.
            </p>
          </div>

          <a
            href="https://wa.me/923001234567?text=Hello%20Humsafar,%20I%20would%20like%20to%20inquire%20about%20your%20Confidential%20VIP%20Service"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect with VIP Director</span>
          </a>
        </div>

        {/* 4. Frequently Asked Questions */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-800 font-bold text-xs uppercase tracking-widest block mb-1">
              Common Inquiries
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
