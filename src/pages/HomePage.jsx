import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import { casteList, cityList } from '../data/initialProfiles';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Heart,
  Users,
  Award,
  Globe2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Star,
  MessageCircle,
  Clock,
  UserPlus,
  PhoneCall,
  MapPin,
  BookOpen,
  FileCheck2
} from 'lucide-react';

export const HomePage = () => {
  const { setActivePage, profiles, searchFilters, setSearchFilters, organizationDetails } = useRishta();

  // Featured and recent profiles for homepage
  const featuredProfiles = profiles.filter(p => p.featured && p.status === 'approved').slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActivePage('profiles');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Section - Emerald & Gold Theme with Official Al-Maktab Banner Integration */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative Golden Ambient Circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          {/* Top Inscription & Official Banner Showcase Card */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • المکتب ایجوکیشنل فاؤنڈیشن کے زیرِ اہتمام</span>
            </div>

            {/* Official Logos Side-by-Side */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-lg border border-amber-300">
                <img
                  src={organizationDetails.logoAlMaktab}
                  alt="Al-Maktab Educational Foundation"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-left">
                <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-widest block font-nastaliq">
                  المکتب ایجوکیشنل فاؤنڈیشن
                </span>
                <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  HUMSAFAR RISHTA CENTRE
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  زندگی کے سفر کا سچا ہمسفر • لاہور، پاکستان
                </p>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
              ہمارے ہاں ہر ذات، برادری، مسلک اور ہر شہر کے پڑھے لکھے اور کوالیفائیڈ رشتے کروائے جاتے ہیں۔ دینی مدارس سے وابستہ اور تبلیغی مزاج کے حامل افراد کے لیے خصوصی رشتہ سروسز۔
            </p>
          </div>

          {/* Official Banner Image Card Presentation */}
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-white">
            <img
              src={organizationDetails.bannerImage}
              alt="Humsafar Rishta Centre Official Banner"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Quick Contact Pill Bar */}
          <div className="max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 flex flex-wrap items-center justify-around gap-4 text-xs">
            <div className="flex items-center space-x-2 text-white">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Head Office Phone:</span>
                <span className="font-bold text-sm text-white">{organizationDetails.phone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">WhatsApp Hotline:</span>
                <span className="font-bold text-sm text-emerald-400">{organizationDetails.whatsapp}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Head Office Location:</span>
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
                  Quick Proposal Search (فلٹر برائے فوری رشتہ تلاش)
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Over 1,500+ Verified Family Profiles
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Looking For */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Looking For
                </label>
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

              {/* Caste / Community */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Caste / Community
                </label>
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

              {/* City / Country */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  City / Location
                </label>
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

              {/* Marital Status */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Status
                </label>
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

              {/* Submit Button */}
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

      {/* 2. Full Security Assurance Banner ("سیکورٹی فل رکھنی ہے") */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-amber-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5">
              <Lock className="w-4 h-4" />
              <span>Full Security & Modesty Protocol (100% مکمل رازداری و سیکورٹی)</span>
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
              <span>AL-MAKTAB VERIFIED SELECTION</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

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

      {/* 4. Official Address & Head Office Presentation */}
      <section className="py-16 bg-amber-50/50 border-t border-amber-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
              Official Head Office (لاہور ہیڈ آفس)
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
            Free online biodata registration under the auspices of Al-Maktab Educational Foundation. Speak directly with our counselor at 042 36307676.
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
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Hello%20Al-Maktab%20Humsafar,%20I%20would%20like%20to%20consult%20with%20a%20counselor`}
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
};
