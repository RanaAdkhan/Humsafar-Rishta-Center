import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import {
  Heart,
  Search,
  MessageCircle,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ShortlistPage = () => {
  const { profiles, shortlist, setActivePage } = useRishta();

  const shortlistedProfiles = profiles.filter(p => shortlist.includes(p.id));

  const allCodes = shortlistedProfiles.map(p => p.code).join(', ');
  const batchWhatsAppMsg = encodeURIComponent(
    `Hello Humsafar Matrimonial Team, I have shortlisted following proposal codes: [${allCodes}]. Please share full verification details and family introductions.`
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Coral & Sunset Theme */}
      <div className="bg-gradient-to-r from-orange-950 via-orange-900 to-amber-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-800/80 border border-orange-600/50 text-orange-200 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-orange-300 fill-current" />
            <span>CORAL SUITE • SAVED CANDIDATE PROPOSALS</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Your Shortlisted Proposals
          </h1>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto">
            Review and compare your selected matrimonial matches. Inquire about multiple profiles together directly via WhatsApp.
          </p>
        </div>
      </div>

      {/* 2. Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {shortlistedProfiles.length > 0 ? (
          <div className="space-y-8">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  You have <span className="text-orange-600">{shortlistedProfiles.length}</span> saved proposals
                </span>
                <p className="text-xs text-slate-500">
                  Ready to proceed? Send this complete shortlist to our counselor.
                </p>
              </div>

              <a
                href={`https://wa.me/923001234567?text=${batchWhatsAppMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire All Saved via WhatsApp</span>
              </a>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortlistedProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-5 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl font-serif-luxury">
              No Proposals Shortlisted Yet
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              While browsing proposals in our directory, click the heart icon on any card to save it here for family discussion and review.
            </p>
            <button
              onClick={() => setActivePage('profiles')}
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Browse Proposals Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
