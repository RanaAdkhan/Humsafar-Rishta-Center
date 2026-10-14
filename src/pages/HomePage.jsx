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
  FileCheck2,
  GraduationCap
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
      {/* 1. Hero Section - Professional Side-by-Side 2-Column Layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative Golden Ambient Circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-10">
          {/* Side-by-Side 2-Column Layout: Text & Humsafar on Left, Image on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Column 1 (Left): "HUMSAFAR" & Professional English Presentation */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Auspices Inscription Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/50 text-amber-300 text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Official Matrimonial Rishta Portal (ہمسفر رشتہ سنٹر)</span>
              </div>

              {/* Brand Heading & Typography */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-2xl border-2 border-amber-400 shrink-0 overflow-hidden">
                  <img
                    src={organizationDetails.logoAlMaktab}
                    alt="Humsafar Rishta Centre Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wider uppercase block">
                    Humsafar Matrimonial Services
                  </span>
                  <div className="flex items-baseline space-x-3 flex-wrap">
                    <h1 className="font-serif-luxury text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
                      HUMSAFAR
                    </h1>
                    <span className="text-2xl sm:text-4xl font-nastaliq text-amber-400 font-bold" title="ہم سفر">
                      ہمسفر
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-emerald-300 tracking-wide">
                    Official Matrimonial Rishta Centre • Lahore, Pakistan
                  </p>
                </div>
              </div>

              {/* Professional Description in English */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Welcome to <strong>Humsafar Rishta Centre</strong>, Pakistan's most trusted and dignified matrimonial matching platform. Operating under strict moral and Shariah-compliant standards, we provide confidential, personalized matchmaking for educated professionals, doctors, engineers, corporate leaders, noble business families, and religious scholars across all communities and overseas Pakistanis.
              </p>

              {/* Key Pillars Grid in English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-200">
                <div className="flex items-center space-x-2.5 bg-slate-900/70 border border-emerald-500/30 px-3.5 py-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">100% Modesty & Family Privacy</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/70 border border-amber-500/30 px-3.5 py-2.5 rounded-xl">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium">Doctors & Executives Desk</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/70 border border-blue-500/30 px-3.5 py-2.5 rounded-xl">
                  <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">Deeni Madaris & Aalimat Desk</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-slate-900/70 border border-purple-500/30 px-3.5 py-2.5 rounded-xl">
                  <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-medium">Overseas Pakistani Network</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('profiles')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-xl flex items-center space-x-2 transition-all hover:scale-102"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Matches</span>
                </button>
                <button
                  onClick={() => setActivePage('register')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Register Proposal</span>
                </button>
                <a
                  href={`https://wa.me/${organizationDetails.whatsappClean}?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20matrimonial%20services%20at%20Humsafar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center space-x-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {organizationDetails.whatsapp}</span>
                </a>
              </div>
            </div>

            {/* Column 2 (Right): Humsafar Picture with Luxury Golden Frame */}
            <div className="lg:col-span-5">
              <div className="relative group max-w-lg mx-auto">
                {/* Ambient Golden Glow Effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/80 bg-slate-900">
                  {/* Card Header Ribbon */}
                  <div className="bg-slate-950 px-4 py-2.5 border-b border-amber-400/30 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>HUMSAFAR RISHTA CENTRE</span>
                    </span>
                    <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/50">
                      Official Presentation
                    </span>
                  </div>

                  {/* The Humsafar Image */}
                  <div className="bg-white p-1">
                    <img
                      src={organizationDetails.bannerImage}
                      alt="Humsafar Rishta Centre Official Image"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>

                  {/* Card Footer with Quick Contact Badges */}
                  <div className="bg-slate-950 p-3.5 border-t border-amber-400/30 text-xs text-slate-300 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono text-white font-bold text-xs">{organizationDetails.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="text-[11px] text-slate-300">Lahore Head Office</span>
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
                <span className="font-bold text-sm text-white">{organizationDetails.phone}</span>
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
                  Quick Proposal Search (فلٹر برائے فوری رشتہ تلاش)
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {profiles.length > 0 ? `${profiles.length} Verified Family Profiles` : 'Shariah-Compliant & Verified Matchmaking'}
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* Looking For */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Looking For (رشتہ)
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

              {/* Age (عمر) */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Age (عمر)
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
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="all">All Ages (تمام عمریں)</option>
                  <option value="18-25">18 - 25 Years (سال)</option>
                  <option value="26-32">26 - 32 Years (سال)</option>
                  <option value="33-40">33 - 40 Years (سال)</option>
                  <option value="40-70">40+ Years (سال)</option>
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
              No artificial or fake test proposals are hosted on this platform. Only verified matrimonial biodatas registered through Humsafar administration or the Admin Panel will be displayed.
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
};
