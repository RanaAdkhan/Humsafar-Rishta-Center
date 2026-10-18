import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import { casteList, cityList } from '../data/initialProfiles';
import humsafarBannerImg from '../assets/images/humsafar_banner.png';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  MapPin,
  BookOpen,
  UserPlus,
  CheckCircle2,
  Award,
  Globe2,
  HeartHandshake
} from 'lucide-react';

export const HomePage = () => {
  const { setActivePage, profiles, searchFilters, setSearchFilters, organizationDetails, language } = useRishta();

  const isUrdu = language === 'ur';

  // Verified proposals to preview on homepage
  const previewProfiles = profiles.filter(p => p.status === 'approved').slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActivePage('profiles');
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] space-y-8 pb-12">
      
      {/* 1. Official Banner (Clean, responsive, high-resolution) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl overflow-hidden shadow-md border border-[#f0d4dc] bg-white aspect-[2.8/1] sm:aspect-[3.2/1] relative group">
          <img
            src={humsafarBannerImg}
            alt="Humsafar Rishta Center Official Banner"
            className="w-full h-full object-cover sm:object-contain bg-slate-900"
          />
        </div>
      </div>

      {/* 2. Welcome Headline, Registration Badges & Islamic Hadith on Marriage */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        
        {/* Government Registered Bureau Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#9D2B48]/30 text-[#9D2B48] text-xs font-bold shadow-xs">
          <Award className="w-4 h-4 text-[#9D2B48] shrink-0" />
          <span>Government Registered Marriage Bureau • Humsafar Rishta Center</span>
        </div>

        {/* Main Title */}
        <div className="space-y-1">
          <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            WELCOME TO HUMSAFAR RISHTA CENTER PAKISTAN
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#916c33] uppercase tracking-widest">
            Trademarks, Copyrights, Government's License & Certificates
          </p>
        </div>

        {/* Prominent Islamic Hadith on Nikah (As explicitly requested by user) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#f0d4dc] shadow-sm space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#9D2B48] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>فرمانِ رسول کریم ﷺ (حدیثِ مبارکہ برائے نکاح)</span>
          </div>

          <p className="font-nastaliq text-xl sm:text-2xl text-[#9D2B48] font-bold leading-loose text-center">
            "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي"
          </p>

          <p className="text-xs sm:text-sm text-slate-700 font-nastaliq text-center leading-relaxed max-w-xl mx-auto">
            "نکاح میری سنت ہے، اور جو میری سنت پر عمل نہ کرے وہ مجھ میں سے نہیں۔" (سنن ابن ماجہ)  
            اور رسول اللہ ﷺ نے فرمایا: "جب بندہ نکاح کر لیتا ہے تو اس نے اپنا آدھا دین مکمل کر لیا، پس باقی آدھے کے بارے میں اللہ سے ڈرے۔"
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('profiles')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9D2B48] to-[#800000] hover:from-[#7a1e35] hover:to-[#630827] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 active:scale-98 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Find Your Perfect Match (رشتے تلاش کریں)</span>
          </button>

          <button
            onClick={() => setActivePage('register')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-[#9D2B48] font-bold text-sm border border-[#9D2B48]/40 shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Free Biodata (نیا رشتہ بنائیں)</span>
          </button>
        </div>
      </section>

      {/* 3. Quick Match Search Bar (Clean, simple, dignified) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#f0d4dc]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#9D2B48] flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Quick Match Search & Proposal Filters
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              100% Shariah Verified Family Directory
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Looking For */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Looking For</label>
              <select
                value={searchFilters.gender}
                onChange={(e) => setSearchFilters({ ...searchFilters, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] outline-none"
              >
                <option value="all">All (Brides & Grooms)</option>
                <option value="female">Bride (Female Proposal)</option>
                <option value="male">Groom (Male Proposal)</option>
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Age Range</label>
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
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] outline-none"
              >
                <option value="all">All Ages</option>
                <option value="18-25">18 - 25 Years</option>
                <option value="26-32">26 - 32 Years</option>
                <option value="33-40">33 - 40 Years</option>
                <option value="40-70">40+ Years</option>
              </select>
            </div>

            {/* Caste */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Caste / Community</label>
              <select
                value={searchFilters.caste}
                onChange={(e) => setSearchFilters({ ...searchFilters, caste: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] outline-none"
              >
                {casteList.map((caste) => (
                  <option key={caste} value={caste}>{caste}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">City / Location</label>
              <select
                value={searchFilters.city}
                onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#9D2B48]/20 focus:border-[#9D2B48] outline-none"
              >
                {cityList.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Search Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[42px] bg-[#9D2B48] hover:bg-[#7a1e35] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Matches</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. 3 Simple Steps ("How It Works") */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#f0d4dc] shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#9D2B48] flex items-center justify-center font-bold text-lg shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Create Profile Free</h4>
              <p className="text-xs text-slate-500">Register your candidate details under strict privacy.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#f0d4dc] shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#9D2B48] flex items-center justify-center font-bold text-lg shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">3-Tier Verification</h4>
              <p className="text-xs text-slate-500">Telephonic & reference check before sharing proposals.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#f0d4dc] shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#9D2B48] flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Family Alliance & Nikah</h4>
              <p className="text-xs text-slate-500">Modest family meeting arrangements at Lahore Office.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Verified Proposals Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9D2B48] tracking-widest block">
              VERIFIED MATCHES
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-black text-slate-900">
              Featured Matrimonial Profiles
            </h2>
          </div>

          <button
            onClick={() => setActivePage('profiles')}
            className="text-xs font-bold text-[#9D2B48] hover:underline flex items-center space-x-1"
          >
            <span>View All Profiles ({profiles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      {/* 6. Head Office Location & Direct Contact Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0d4dc] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold text-[#916c33] uppercase tracking-wider block">
              OFFICIAL CENTRAL OFFICE (LAHORE)
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
              Humsafar Rishta Center • Lahore Office
            </h3>
            <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
              64 Mozang Road, Malik Rehmatullah Street, Near Safanwala Chowk, Opposite PSO Petrol Pump, Lahore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${organizationDetails.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 transition-colors font-mono"
            >
              <PhoneCall className="w-4 h-4 text-[#9D2B48]" />
              <span>{organizationDetails.phone}</span>
            </a>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20matrimonial%20proposals`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {organizationDetails.whatsapp}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
