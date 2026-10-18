import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  ShieldCheck,
  Heart,
  Lock,
  CheckCircle2,
  Users,
  Building2,
  PhoneCall,
  MessageCircle,
  MapPin,
  Sparkles,
  Play,
  Pause,
  Volume2,
  BookOpen,
  Award,
  Globe2
} from 'lucide-react';

export const AboutPage = () => {
  const { organizationDetails, setActivePage, language } = useRishta();
  const [isPlaying, setIsPlaying] = useState(false);
  const isUrdu = language === 'ur';

  // The 5 pillars requested by the user with 2-3 concise lines each
  const pillars = [
    {
      id: "verification",
      titleUrdu: "1. Verification before visibility (دکھانے سے پہلے مکمل تصدیق)",
      titleEn: "1. Verification Before Visibility",
      descUrdu: "ہمسفر پورٹل پر کسی بھی امیدوار کا بائیو ڈیٹا اس وقت تک شیئر نہیں کیا جاتا جب تک فون نمبر، فیملی اور شناختی کوائف کی باضابطہ تصدیق نہ ہو جائے۔ اس سے جھوٹے یا غیر سنجیدہ افراد کا مکمل خاتمہ ہوتا ہے۔",
      descEn: "Every candidate biodata undergoes telephonic and identity vetting before being presented to families. Zero tolerance for unverified or fake profiles.",
      icon: ShieldCheck
    },
    {
      id: "privacy",
      titleUrdu: "2. Privacy as the default (رازداری بطور بنیادی اصول)",
      titleEn: "2. Privacy as the Default",
      descUrdu: "امیدواروں کی تصاویر اور ذاتی فون نمبرز کبھی بھی پبلک ڈائریکٹری میں کھلے عام نشر نہیں ہوتے۔ تمام معلومات صرف سنجیدہ والدین کی باہمی رضامندی اور اجازت کے بعد ہی شیئر کی جاتی ہیں۔",
      descEn: "No candidate photos or contact numbers are displayed publicly. All exchanges occur strictly with mutual family consent under Shariah modesty.",
      icon: Lock
    },
    {
      id: "compatibility",
      titleUrdu: "3. Compatibility you can understand (سچی اور گہری مطابقت)",
      titleEn: "3. Compatibility You Can Understand",
      descUrdu: "صرف سطحی معلومات پر انحصار نہیں کیا جاتا بلکہ دینی مسلک، خاندانی اقدار، تعلیمی معیار اور سماجی مزاج کی ہم آہنگی دیکھ کر موزوں ترین رشتوں کی تجویز دی جاتی ہے۔",
      descEn: "We look beyond superficial metrics to match deep religious alignment, family culture, educational harmony, and long-term lifestyle suitability.",
      icon: Heart
    },
    {
      id: "family",
      titleUrdu: "4. Family, on your terms (خاندان کی شرائط اور وقار پر)",
      titleEn: "4. Family, On Your Terms",
      descUrdu: "نکاح کے تمام معاملات والدین اور بزرگوں کی زیرِ نگرانی مکمل عزت، شائستگی اور خاندانی وقار کے ساتھ باہمی مشاورت سے طے کروائے جاتے ہیں۔",
      descEn: "Matchmaking proceeds under the guidance of respected parents and guardians, maintaining the dignity and honor of both families throughout.",
      icon: Users
    },
    {
      id: "who-we-serve",
      titleUrdu: "5. Who we serve (ہم کن خاندانوں کی خدمت کرتے ہیں)",
      titleEn: "5. Who We Serve",
      descUrdu: "ڈاکٹرز اور میڈیکل اسپیشلسٹس، انجینئرز، کاروباری و شریف خاندان، دینی مدارس سے وابستہ علماء و باحجاب طالبات، اور دنیا بھر میں مقیم اوورسیز پاکستانی خاندان۔",
      descEn: "Doctors, Engineers, Corporate Executives, Reputed Business Families, Deeni Madaris Scholars/Aalimat, and Overseas Pakistanis worldwide.",
      icon: Globe2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Top Hero Section */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#9D2B48]/10 text-[#9D2B48] text-xs font-bold border border-[#9D2B48]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT HUMSAFAR RISHTA CENTER</span>
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            نکاح کی طرف ایک باوقار قدم
          </h1>

          <p className="text-sm sm:text-base text-[#916c33] font-bold">
            Humsafar Rishta Center • Nikah ki Taraf Ek Ba-Waqar Qadam
          </p>
        </div>

        {/* Core Mission Card (User's Exact Islamic Text) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#f0d4dc] space-y-5">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#9D2B48] flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                ہمارا مشن و اسلامی اقدار (Our Sacred Mission)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                بھروسہ، شرافت اور اسلامی قدروں کے ساتھ نکاح کی رہنمائی
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed font-nastaliq text-sm sm:text-base text-right">
            <p>
              <strong>ہمسفر رشتہ سنٹر</strong> ایک آن لائن رشتہ سروس ہے جس کا مقصد اسلامی اصولوں کی روشنی میں مناسب رشتوں کی تلاش کو آسان بنانا اور نکاح کے ذریعے خوشگوار خاندانی زندگی کی طرف رہنمائی دینا ہے۔
            </p>
            <p>
              ہم دین، حسنِ اخلاق، خاندانی پس منظر اور باہمی مناسبت کو اہمیت دیتے ہیں۔ مختلف شہروں، برادریوں اور مسالک کے افراد کے لیے مناسب رشتوں کی میچنگ میں مدد فراہم کرتے ہیں۔
            </p>
            <p>
              ہماری کوشش ہے کہ ہر شخص کی معلومات کی رازداری کا احترام کیا جائے اور رشتوں کے معاملات میں سچائی، امانت داری اور ذمہ داری کو ترجیح دی جائے۔
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-2xl border border-amber-200/60 text-slate-900 font-bold text-center">
              "ہمارا عہد: رشتوں کے سفر کو بھروسے، شرافت اور اسلامی قدروں کے ساتھ آسان بنانا۔"
            </div>
          </div>
        </div>

        {/* Lahore Marriage Bureau Philosophy & Voice Player (Image 4 from user) */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-amber-400/30">
          <div className="border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                OUR CORE PHILOSOPHY
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-black text-white mt-1">
                "Matchmaking is a responsibility, not a numbers game."
              </h3>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Humsafar Rishta Center grew out of a simple observation from decades of hands-on matchmaking: the families who found lasting, blessed marriages were never the ones who met the most people — they were the ones who met the <strong>right people</strong>, introduced with complete honesty, modesty, and context.
          </p>
        </div>

        {/* What Makes Us Different (5 Pillars with 2-3 concise lines each) */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9D2B48]">
              WHAT MAKES US DIFFERENT
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-black text-slate-900">
              ہماری سروس دوسروں سے کیوں مختلف ہے؟
            </h2>
          </div>

          <div className="space-y-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-5 border border-[#f0d4dc] shadow-xs flex items-start space-x-4 hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#9D2B48] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {pillar.titleUrdu}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-nastaliq">
                      {pillar.descUrdu}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Head Office Location & Consultation Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0d4dc] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold text-[#916c33] uppercase tracking-wider block">
              OFFICIAL CENTRAL OFFICE (LAHORE)
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
              Visit Humsafar Executive Center in Lahore
            </h3>
            <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
              Respected parents and guardians are warmly welcomed to visit our office for face-to-face consultations with senior marriage counselors.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold pt-1">
              <MapPin className="w-4 h-4 text-[#9D2B48] shrink-0" />
              <span>{organizationDetails.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${organizationDetails.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#9D2B48]" />
              <span>{organizationDetails.phone}</span>
            </a>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20want%20to%20consult%20with%20Humsafar%20Rishta%20Center`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#9D2B48] to-[#800000] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
