import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import { AppActionCard } from '../components/AppActionCard';
import { AppBannerSlider } from '../components/AppBannerSlider';
import { AppServicesGallery } from '../components/AppServicesGallery';
import { casteList, cityList } from '../data/initialProfiles';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  MapPin,
  BookOpen,
  UserPlus,
  PlusCircle,
  CheckCircle2,
  GraduationCap,
  Globe2,
  FileCheck2,
  Smartphone
} from 'lucide-react';

export const HomePage = ({ isMobileView }) => {
  const { setActivePage, profiles, searchFilters, setSearchFilters, organizationDetails, language } = useRishta();

  const isUrdu = language === 'ur';

  // Featured and recent profiles for homepage
  const featuredProfiles = profiles.filter(p => p.featured && p.status === 'approved').slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActivePage('profiles');
  };

  /* =======================================================================
     MOBILE APP HOME CONTENT (Matching the user's mobile app screenshot)
     ======================================================================= */
  const renderMobileAppHome = () => (
    <div className="space-y-4 pb-6">
      {/* 1. Overlapping Quick Action Card */}
      <AppActionCard />

      {/* 2. Banner Carousel Slider with official numbers */}
      <AppBannerSlider />

      {/* 3. Horizontal Categories Showcase Card ("رشتہ سروسز کی تصویری جھلکیاں") */}
      <AppServicesGallery />

      {/* 4. Quick Match Proposal Search Card */}
      <div className="mx-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Search className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className={`text-sm font-bold text-slate-900 ${isUrdu ? 'font-nastaliq' : ''}`}>
                {isUrdu ? 'تلاش و فلٹرز' : 'Quick Match Search'}
              </h3>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              {profiles.length} {isUrdu ? 'مستند رشتے' : 'Profiles'}
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-2.5">
            {/* Gender / Looking For */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  {isUrdu ? 'رشتہ برائے' : 'Looking For'}
                </label>
                <select
                  value={searchFilters.gender}
                  onChange={(e) => setSearchFilters({ ...searchFilters, gender: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">{isUrdu ? 'تمام رشتے' : 'All Proposals'}</option>
                  <option value="female">{isUrdu ? 'دلہن (خاتون)' : 'Bride (Female)'}</option>
                  <option value="male">{isUrdu ? 'دولہا (مرد)' : 'Groom (Male)'}</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  {isUrdu ? 'عمر کی حد' : 'Age Range'}
                </label>
                <select
                  value={searchFilters.ageRange || 'all'}
                  onChange={(e) => {
                    const val = e.target.value;
                    let min = 18;
                    let max = 70;
                    if (val === '18-25') { min = 18; max = 25; }
                    else if (val === '26-32') { min = 26; max = 32; }
                    else if (val === '33-40') { min = 33; max = 40; }
                    else if (val === '40-70') { min = 40; max = 70; }
                    setSearchFilters({ ...searchFilters, ageRange: val, minAge: min, maxAge: max });
                  }}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">{isUrdu ? 'تمام عمر' : 'All Ages'}</option>
                  <option value="18-25">18 - 25 {isUrdu ? 'سال' : 'Years'}</option>
                  <option value="26-32">26 - 32 {isUrdu ? 'سال' : 'Years'}</option>
                  <option value="33-40">33 - 40 {isUrdu ? 'سال' : 'Years'}</option>
                  <option value="40-70">40+ {isUrdu ? 'سال' : 'Years'}</option>
                </select>
              </div>
            </div>

            {/* Caste and City */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  {isUrdu ? 'برادری / کاسٹ' : 'Caste'}
                </label>
                <select
                  value={searchFilters.caste}
                  onChange={(e) => setSearchFilters({ ...searchFilters, caste: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {casteList.map((caste) => (
                    <option key={caste} value={caste}>{caste}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  {isUrdu ? 'شہر' : 'City'}
                </label>
                <select
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>{isUrdu ? 'رشتے تلاش کریں' : 'Find Matching Profiles'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 5. Featured Proposals Showcase */}
      <div className="mx-4 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActivePage('profiles')}
            className="text-xs font-bold text-emerald-800 flex items-center space-x-1 hover:underline"
          >
            <span>{isUrdu ? 'تمام دیکھیں' : 'View All'} ({profiles.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-1.5 text-right">
            <h3 className={`text-sm font-bold text-slate-900 ${isUrdu ? 'font-nastaliq' : ''}`}>
              {isUrdu ? 'منتخب تصدیق شدہ رشتے' : 'Featured Verified Profiles'}
            </h3>
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
        </div>

        {featuredProfiles.length > 0 ? (
          <div className="space-y-3">
            {featuredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {isUrdu ? 'تمام رشتے ایڈمن پینل سے تصدیق کے بعد یہاں ظاہر ہوتے ہیں۔' : 'Verified proposals will appear here.'}
            </p>
            <button
              onClick={() => setActivePage('register')}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs"
            >
              {isUrdu ? '+ نیا رشتہ رجسٹر کریں' : '+ Register Rishta'}
            </button>
          </div>
        )}

        <button
          onClick={() => setActivePage('profiles')}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all"
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>{isUrdu ? 'تمام رشتے براؤز کریں' : 'Browse All Verified Proposals'}</span>
        </button>
      </div>

      {/* 6. Security and Modesty Trust Banner */}
      <div className="mx-4">
        <div className="bg-gradient-to-br from-[#0B1E36] to-slate-900 text-white rounded-2xl p-4 shadow-sm border border-amber-400/30 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className={`text-xs font-bold text-white ${isUrdu ? 'font-nastaliq text-sm' : ''}`}>
                {isUrdu ? '100% شرعی پردہ اور مکمل خاندانی رازداری' : '100% Shariah Modesty & Family Privacy'}
              </h4>
              <p className="text-[10px] text-amber-300">
                {isUrdu ? 'پبلک میں کسی امیدوار کی تصویر نشر نہیں کی جاتی' : 'Photos are never displayed publicly'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-white/10">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isUrdu ? 'شناختی کارڈ ویریفائیڈ' : 'CNIC Verified'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isUrdu ? 'ٹیلیفونک تصدیق' : 'Telephonic Check'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isUrdu ? 'مدارس و علماء ڈیسک' : 'Madaris Desk'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isUrdu ? 'اوورسیز پاکستانی' : 'Overseas Pakistani'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Head Office Contact Card */}
      <div className="mx-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                {isUrdu ? 'مرکزی دفتر' : 'Head Office'}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                {organizationDetails.address}
              </h4>
              <p className="text-[11px] text-slate-500 font-nastaliq mt-0.5">
                {organizationDetails.urduAddress}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <MapPin className="w-5 h-5 text-rose-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs">
            <a
              href={`tel:${organizationDetails.phone.replace(/\s+/g, '')}`}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-mono">{organizationDetails.phone}</span>
            </a>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20Humsafar%20Rishta%20Centre`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  /* =======================================================================
     DESKTOP WEB HOME CONTENT (Full-Width VIP Professional Website)
     ======================================================================= */
  const renderDesktopWebHome = () => (
    <div className="w-full bg-slate-50">
      {/* 1. Hero Section - Executive VIP Matrimonial Presentation */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#06241b] to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 Cols: Narrative & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-amber-400/40 text-amber-300 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>OFFICIAL VERIFIED MATRIMONIAL NETWORK • PAKISTAN & OVERSEAS</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  Sacred Matrimonial Alliances Built on Trust & Honor
                </h1>
                <p className="text-xl sm:text-2xl text-amber-300 font-bold pt-1">
                  Humsafar Rishta Centre • True Companion for Life's Journey
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Welcome to <strong>Humsafar Rishta Centre</strong>, Pakistan's most trusted and dignified marriage matchmaking organization. We facilitate confidential matrimonial connections for educated professionals, doctors, engineers, corporate executives, noble business families, and religious Madaris scholars under complete modesty and strict family privacy.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-200">
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-emerald-500/30 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">100% Modesty & Strict Family Privacy</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-amber-500/30 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium">Doctors & Executives Desk</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-blue-500/30 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">Deeni Madaris & Aalimat Desk</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-purple-500/30 px-3.5 py-2.5 rounded-xl backdrop-blur-sm">
                  <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-medium">Overseas Pakistani Network</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('profiles')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-xl flex items-center space-x-2 transition-all hover:scale-102"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Matches</span>
                </button>
                <button
                  onClick={() => setActivePage('register')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Register Free Biodata</span>
                </button>
                <button
                  onClick={() => setActivePage('admin')}
                  className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-amber-300 font-bold text-sm border border-amber-400/40 flex items-center space-x-2 transition-all shadow-md"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>+ Add Proposal / Records</span>
                </button>
                <a
                  href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20matrimonial%20services%20at%20Humsafar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center space-x-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {organizationDetails.whatsapp}</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Brand Card */}
            <div className="lg:col-span-5">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 via-emerald-500/30 to-amber-400/30 rounded-3xl blur-2xl opacity-60"></div>

                <div className="relative bg-slate-900/95 border border-amber-400/40 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5 text-center">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                    <span className="inline-flex items-center space-x-1.5 text-amber-300 font-bold">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>OFFICIAL EMBLEM</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold">
                      100% Shariah Verified
                    </span>
                  </div>

                  <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 bg-white p-2 transform group-hover:scale-102 transition duration-300">
                    <img
                      src={organizationDetails.logoMain}
                      alt="Humsafar Rishta Centre Official Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                      HUMSAFAR RISHTA CENTRE
                    </h3>
                    <p className="text-amber-300 text-sm font-semibold uppercase tracking-wider">
                      True Companion for Life's Journey
                    </p>
                  </div>

                  <div className="bg-slate-950/90 rounded-2xl p-3.5 border border-white/10 text-xs text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono text-white font-bold">{organizationDetails.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Executive Center</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 text-slate-400 text-[11px] pt-1 border-t border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>64 Mozang Road, Safanwala Chowk, Lahore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Contact Bar */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 flex flex-wrap items-center justify-around gap-4 text-xs">
            <div className="flex items-center space-x-2 text-white">
              <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Landline Support:</span>
                <span className="font-bold text-sm text-white font-mono">{organizationDetails.phone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">WhatsApp Hotline:</span>
                <span className="font-bold text-sm text-emerald-400">{organizationDetails.whatsapp}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Head Office Lahore:</span>
                <span className="font-semibold text-slate-200 text-xs">64 Mozang Road, Safanwala Chowk, Lahore</span>
              </div>
            </div>
          </div>

          {/* Quick Search Widget */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/90 text-slate-800">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Quick Proposal Search & Filters
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {profiles.length > 0 ? `${profiles.length} Verified Family Profiles` : 'Shariah-Compliant & Verified Matchmaking'}
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Looking For</label>
                <select
                  value={searchFilters.gender}
                  onChange={(e) => setSearchFilters({ ...searchFilters, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">All (Brides & Grooms)</option>
                  <option value="female">Bride (Female Proposal)</option>
                  <option value="male">Groom (Male Proposal)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Age Range</label>
                <select
                  value={searchFilters.ageRange || 'all'}
                  onChange={(e) => {
                    const val = e.target.value;
                    let min = 18;
                    let max = 70;
                    if (val === '18-25') { min = 18; max = 25; }
                    else if (val === '26-32') { min = 26; max = 32; }
                    else if (val === '33-40') { min = 33; max = 40; }
                    else if (val === '40-70') { min = 40; max = 70; }
                    setSearchFilters({ ...searchFilters, ageRange: val, minAge: min, maxAge: max });
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">All Ages</option>
                  <option value="18-25">18 - 25 Years</option>
                  <option value="26-32">26 - 32 Years</option>
                  <option value="33-40">33 - 40 Years</option>
                  <option value="40-70">40+ Years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Caste / Community</label>
                <select
                  value={searchFilters.caste}
                  onChange={(e) => setSearchFilters({ ...searchFilters, caste: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {casteList.map((caste) => (
                    <option key={caste} value={caste}>{caste}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">City / Location</label>
                <select
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Status</label>
                <select
                  value={searchFilters.maritalStatus}
                  onChange={(e) => setSearchFilters({ ...searchFilters, maritalStatus: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">Any Status</option>
                  <option value="Never Married">Never Married (Single)</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-[42px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Matches</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Security Assurance Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-amber-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5">
              <Lock className="w-4 h-4" />
              <span>Full Security & Modesty Protocol (100% Confidentiality & Data Security)</span>
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
              Family Data Privacy & Shariah-Compliant Security Shield
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              We understand that matrimonial biodatas are sacred family trusts. Our platform enforces high-grade security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">No Public Photos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Photos are never shown in public directories. Exchanged privately only with verified families upon mutual parent consent.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">3-Tier Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero fake accounts. Telephonic interview, CNIC verification, and family reference check for every proposal.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Deeni & Madaris Desk</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialized section for religious scholars (Ulema, Aalimat, Huffaz) and families with a Tablighi/Deeni disposition.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Encrypted Audit Logs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every bio-data access is tracked with immutable security logs to prevent misuse or unauthorized scraping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Verified Proposals Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>HUMSAFAR VERIFIED SELECTION</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
              Featured Matrimonial Proposals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Carefully vetted proposals of Doctors, Engineers, Corporate Executives, Deeni Madaris scholars, and Respected Families.
            </p>
          </div>

          <button
            onClick={() => setActivePage('profiles')}
            className="inline-flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm group"
          >
            <span>Explore All Proposals ({profiles.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {featuredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-emerald-100 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
              Humsafar Verified Proposals Portal Active
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Only verified matrimonial biodatas registered through Humsafar administration or the Admin Panel are displayed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActivePage('register')}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all"
              >
                + Register Rishta Proposal
              </button>
              <button
                onClick={() => setActivePage('admin')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Admin Panel Login
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => setActivePage('profiles')}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>View All Verified Match Proposals</span>
          </button>
        </div>
      </section>

      {/* 4. Head Office Address & Deeni Section */}
      <section className="py-16 bg-amber-50/50 border-t border-amber-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
              Official Head Office (Lahore Central Office)
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 leading-tight">
              Visit Our Executive Center in Lahore
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Respected families are warmly invited to visit our official premises for face-to-face consultations, bio-data registration, and confidential matching under the guidance of seasoned counselors.
            </p>

            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    {organizationDetails.address}
                  </span>
                  <span className="text-slate-500 font-nastaliq text-xs block mt-1">
                    {organizationDetails.urduAddress}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-slate-700">
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>Landline: <strong>{organizationDetails.phone}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp: <strong>{organizationDetails.whatsapp}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-emerald-900 via-emerald-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold">
              Specialized Services for Deeni Madaris & Tablighi Mindsets
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              We specialize in connecting families affiliated with religious seminaries (Dars-e-Nizami, Aalima, Aalim) and Islamic practicing backgrounds with mutual respect and complete Shar'i modesty.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${organizationDetails.whatsappClean}?text=Salam,%20I%20am%20interested%20in%20Deeni%20Madaris%20and%20Tablighi%20mindset%20proposals`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Deeni Matchmaking Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight">
            Register Your Candidate Biodata with Full Security & Trust
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Free online biodata registration with complete privacy and Shariah-compliant dignity. Speak directly with our counselor at 042 36307676.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('register')}
              className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Biodata Free</span>
            </button>
            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Hello%20Humsafar%20Rishta%20Centre,%20I%20would%20like%20to%20consult%20with%20a%20counselor`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Counselor ({organizationDetails.whatsapp})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <>
      {isMobileView ? renderMobileAppHome() : renderDesktopWebHome()}
    </>
  );
};
