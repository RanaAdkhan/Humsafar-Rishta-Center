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
  CheckCircle2
} from 'lucide-react';

export const HomePage = () => {
  const { setActivePage, profiles, searchFilters, setSearchFilters, organizationDetails, language } = useRishta();

  const isUrdu = language === 'ur';

  // Featured and recent profiles for homepage
  const featuredProfiles = profiles.filter(p => p.featured && p.status === 'approved').slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActivePage('profiles');
  };

  return (
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
};
