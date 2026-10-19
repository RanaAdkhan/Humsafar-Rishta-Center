import React from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  UserPlus,
  Search,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Lock,
  PhoneCall,
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorksPage = () => {
  const { setActivePage, organizationDetails, language } = useRishta();
  const isUrdu = language === 'ur';

  const steps = [
    {
      number: "01",
      title: isUrdu ? "مفت بائیو ڈیٹا رجسٹریشن (Create Profile)" : "Step 1: Create Confidential Profile",
      desc: isUrdu
        ? "امیدوار یا والدین آسانی کے ساتھ اپنی بنیادی معلومات، دینی مسلک، تعلیم، پیشہ اور جیون ساتھی کی توقعات درج کرتے ہیں۔"
        : "Register your candidate profile online with educational, family, and religious preferences under complete privacy.",
      icon: UserPlus,
      badge: "Free & Fast"
    },
    {
      number: "02",
      title: isUrdu ? "تصدیق و اسمارٹ میچنگ (Verification & AI Matching)" : "Step 2: 3-Tier Verification & Matching",
      desc: isUrdu
        ? "ہمارا دفتر ٹیلیفونک اور خاندانی تصدیق کے بعد آپ کے معیار کے عین مطابق موزوں اور مستند رشتے آپ کے سامنے لاتا ہے۔"
        : "Our Lahore counselors verify the biodata telephonically before presenting curated, compatible family proposals.",
      icon: ShieldCheck,
      badge: "100% Shariah Verified"
    },
    {
      number: "03",
      title: isUrdu ? "باہمی رابطہ و نکاح (Family Meeting & Nikah)" : "Step 3: Dignified Family Alliance & Nikah",
      desc: isUrdu
        ? "دونوں خاندانوں کی باہمی رضامندی پر رابطہ نمبرز کا تبادلہ یا ہمارے لاہور ایگزیکٹو آفس میں باوقار ملاقات کا اہتمام کیا جاتا ہے۔"
        : "Upon mutual parental consent, direct contact is coordinated or meetings arranged at our Lahore office leading to Nikah.",
      icon: HeartHandshake,
      badge: "Sacred Alliance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 w-full overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto px-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#9D2B48]/10 text-[#9D2B48] text-xs font-bold border border-[#9D2B48]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT MATCHMAKING PROCESS</span>
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-4xl font-black text-slate-900 break-words">
            How Humsafar Rishta Center Works
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words">
            A dignified, simple, and Shariah-compliant 3-step journey from proposal registration to a successful, happy Nikah.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#f0d4dc] hover:shadow-md transition-shadow relative flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#9D2B48]/20 font-serif">
                    {step.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#9D2B48] text-[10px] font-bold border border-rose-200">
                    {step.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9D2B48] to-[#7a1e35] text-white flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] text-[#9D2B48] font-bold space-x-1">
                  <span>Guaranteed Privacy</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="bg-gradient-to-r from-[#9D2B48] to-[#7a1e35] text-white rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
            Ready to Find Your Life Companion?
          </h2>
          <p className="text-rose-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Begin with a free profile registration or consult directly with our experienced counselors at our Lahore office.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('register')}
              className="px-6 py-3 rounded-xl bg-white text-[#9D2B48] hover:bg-rose-50 font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Create Profile Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20want%20to%20learn%20how%20Humsafar%20works`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Counselor ({organizationDetails.whatsapp})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
