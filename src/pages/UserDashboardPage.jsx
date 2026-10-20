import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import {
  LayoutDashboard,
  Sparkles,
  Heart,
  Bookmark,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Send,
  Check,
  X,
  PhoneCall,
  MessageCircle,
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
  Lock,
  LogOut,
  Edit3,
  Save,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export const UserDashboardPage = () => {
  const {
    currentUser,
    signOutUser,
    deleteUserAccount,
    profiles,
    shortlist,
    userInterests,
    sendInterest,
    respondToInterest,
    updateUserBio,
    setActivePage,
    organizationDetails
  } = useRishta();

  // 5 main tabs as written in the user's notebook
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'matches' | 'interest' | 'shortlisted' | 'profile'
  const [interestSubTab, setInterestSubTab] = useState('received'); // 'received' | 'sent'
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioForm, setBioForm] = useState({
    candidateName: currentUser?.candidateName || 'Ali Nadeem',
    age: currentUser?.age || 28,
    profession: currentUser?.profession || 'Senior Software Engineer',
    education: currentUser?.education || 'BS Computer Science (FAST-NUCES)',
    caste: currentUser?.caste || 'Arain',
    city: currentUser?.city || 'Lahore',
    expectations: 'Educated, family-oriented, practicing Muslim girl from Lahore/Islamabad.',
  });
  const [bioSavedMsg, setBioSavedMsg] = useState(false);

  // If somehow reached without login, fallback
  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-600">Please sign in to view your dashboard.</p>
        <button
          onClick={() => setActivePage('signin')}
          className="px-6 py-2.5 bg-[#9D2B48] text-white rounded-xl font-bold text-xs"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // AI matches: filter candidates of opposite gender or best matching criteria
  const aiMatches = profiles.filter(p => p.gender !== currentUser.gender || p.status === 'approved');

  // Filter interests
  const receivedInterests = userInterests.filter(i => i.direction === 'received');
  const sentInterests = userInterests.filter(i => i.direction === 'sent');

  // Shortlisted profiles
  const shortlistedProfiles = profiles.filter(p => shortlist.includes(p.id));

  const handleSaveBio = (e) => {
    e.preventDefault();
    updateUserBio(bioForm);
    setIsEditingBio(false);
    setBioSavedMsg(true);
    setTimeout(() => setBioSavedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] py-4 sm:py-6 px-2.5 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 w-full overflow-hidden">
        
        {/* Top Member Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-[#f0d4dc] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 overflow-hidden">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#9D2B48] to-[#800000] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-md border-2 border-white shrink-0">
              {currentUser.candidateName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black text-slate-900 truncate">
                  {currentUser.candidateName}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 shrink-0">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                Guardian: {currentUser.name} • Contact: {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 text-right">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Active Plan</span>
              <span className="text-xs font-black text-[#9D2B48]">{currentUser.plan}</span>
            </div>

            <button
              onClick={signOutUser}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 5 POST-LOGIN TABS (Written in diary: Dashboard, AI Matches, Interest, Shortlisted, My Profile) */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-1.5 shadow-xs border border-[#f0d4dc] grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2 w-full overflow-hidden">
          
          {/* Tab 1: Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#9D2B48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Dashboard</span>
          </button>

          {/* Tab 2: AI Matches */}
          <button
            onClick={() => setActiveTab('matches')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'matches'
                ? 'bg-[#9D2B48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">AI Matches ({aiMatches.length})</span>
          </button>

          {/* Tab 3: Interest */}
          <button
            onClick={() => setActiveTab('interest')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all relative ${
              activeTab === 'interest'
                ? 'bg-[#9D2B48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Interest ({userInterests.length})</span>
            {receivedInterests.some(i => i.status === 'pending') && (
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
            )}
          </button>

          {/* Tab 4: Shortlisted */}
          <button
            onClick={() => setActiveTab('shortlisted')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'shortlisted'
                ? 'bg-[#9D2B48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Shortlisted ({shortlistedProfiles.length})</span>
          </button>

          {/* Tab 5: My Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`col-span-2 sm:col-span-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#9D2B48] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">My Profile</span>
          </button>
        </div>

        {/* =========================================================
            TAB 1 CONTENT: DASHBOARD OVERVIEW
            ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Membership Quota & Plan Card matching Image 5 */}
            <div className="bg-gradient-to-r from-[#9D2B48] to-[#7a1e35] text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/20 text-amber-300 text-xs font-bold border border-white/20">
                    <Award className="w-3.5 h-3.5" />
                    <span>ELITE VIP PRIORITY MEMBERSHIP</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-2 text-white">
                    PKR 10,000 / 90 Days Plan Active
                  </h3>
                  <p className="text-xs text-rose-100">
                    {currentUser.planDaysLeft} days remaining of full verified matchmaking services
                  </p>
                </div>

                <button
                  onClick={() => setActivePage('packages')}
                  className="px-4 py-2 bg-white text-[#9D2B48] hover:bg-rose-50 rounded-xl font-bold text-xs shadow-md"
                >
                  View All Packages
                </button>
              </div>

              {/* Feature Highlights Grid from user screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15 text-xs text-rose-100">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>10 Interests / Day</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Message Anyone</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>AI Priority Matching</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Incognito Browsing</span>
                </div>
              </div>
            </div>

            {/* Quick Stat Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div
                onClick={() => setActiveTab('matches')}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#f0d4dc] shadow-xs cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-900">{aiMatches.length}</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Compatible AI Matches</div>
              </div>

              <div
                onClick={() => { setActiveTab('interest'); setInterestSubTab('received'); }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#f0d4dc] shadow-xs cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#9D2B48] flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-900">{receivedInterests.length}</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Interests Received</div>
              </div>

              <div
                onClick={() => { setActiveTab('interest'); setInterestSubTab('sent'); }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#f0d4dc] shadow-xs cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Send className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-900">{sentInterests.length}</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Interests Sent</div>
              </div>

              <div
                onClick={() => setActiveTab('shortlisted')}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#f0d4dc] shadow-xs cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-900">{shortlistedProfiles.length}</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Saved Shortlists</div>
              </div>
            </div>

            {/* Profile Completion Meter */}
            <div className="bg-white rounded-2xl p-5 border border-[#f0d4dc] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Biodata Completion Score</h4>
                  <p className="text-xs text-slate-500">A completed profile receives 3x more family responses</p>
                </div>
                <span className="text-sm font-black text-[#9D2B48]">{currentUser.profileCompletion}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-[#9D2B48] h-full rounded-full" style={{ width: `${currentUser.profileCompletion}%` }}></div>
              </div>
            </div>

            {/* AI Top Recommended Profiles Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
                  Recommended Compatible Proposals
                </h3>
                <button
                  onClick={() => setActiveTab('matches')}
                  className="text-xs font-bold text-[#9D2B48] hover:underline"
                >
                  View All Matches →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiMatches.slice(0, 3).map((p) => (
                  <ProfileCard key={p.id} profile={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2 CONTENT: AI MATCHES
            ========================================================= */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#f0d4dc] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>AI Smart Matchmaking Engine</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Matches automatically curated for {currentUser.candidateName} based on Maslak, Caste ({currentUser.caste}), Education and City ({currentUser.city}).
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold">
                {aiMatches.length} Matches Found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {aiMatches.map((profile) => (
                <div key={profile.id} className="relative group">
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3 CONTENT: INTEREST (Received & Sent)
            ========================================================= */}
        {activeTab === 'interest' && (
          <div className="space-y-4">
            {/* Sub-tab Switcher */}
            <div className="flex items-center space-x-2 border-b border-[#f0d4dc] pb-3">
              <button
                onClick={() => setInterestSubTab('received')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  interestSubTab === 'received'
                    ? 'bg-[#9D2B48] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Received Interests ({receivedInterests.length})
              </button>
              <button
                onClick={() => setInterestSubTab('sent')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  interestSubTab === 'sent'
                    ? 'bg-[#9D2B48] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Sent Interests ({sentInterests.length})
              </button>
            </div>

            {/* Received Interests List */}
            {interestSubTab === 'received' && (
              <div className="space-y-3">
                {receivedInterests.length > 0 ? (
                  receivedInterests.map((interest) => (
                    <div
                      key={interest.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#f0d4dc] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-rose-50 text-[#9D2B48] flex items-center justify-center font-bold">
                          <Heart className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{interest.profileName}</h4>
                          <p className="text-xs text-slate-500">{interest.details}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">Received on {interest.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        {interest.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => respondToInterest(interest.id, 'accepted')}
                              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept & Share Contact</span>
                            </button>
                            <button
                              onClick={() => respondToInterest(interest.id, 'declined')}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold"
                            >
                              Decline
                            </button>
                          </>
                        ) : interest.status === 'accepted' ? (
                          <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepted • Contact Exchanged</span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
                            Declined
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-[#f0d4dc]">
                    No received interests at the moment.
                  </div>
                )}
              </div>
            )}

            {/* Sent Interests List */}
            {interestSubTab === 'sent' && (
              <div className="space-y-3">
                {sentInterests.length > 0 ? (
                  sentInterests.map((interest) => (
                    <div
                      key={interest.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#f0d4dc] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-slate-900">{interest.profileName}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                            Sent on {interest.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{interest.details}</p>
                      </div>

                      <div>
                        {interest.status === 'accepted' ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accepted by Family!</span>
                            </span>
                            <a
                              href={`https://wa.me/${organizationDetails.whatsappClean}?text=Salam,%20I%20am%20inquiring%20about%20finalizing%20contact%20with%20${interest.profileName}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        ) : (
                          <span className="text-amber-800 text-xs font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Family Review</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-[#f0d4dc]">
                    You haven't sent any proposal interests yet. Explore AI matches to connect!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 4 CONTENT: SHORTLISTED PROFILES
            ========================================================= */}
        {activeTab === 'shortlisted' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#f0d4dc] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
                  Your Saved Shortlists
                </h3>
                <p className="text-xs text-slate-500">
                  Bookmarked proposals for private family discussion.
                </p>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold">
                {shortlistedProfiles.length} Profiles Saved
              </span>
            </div>

            {shortlistedProfiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {shortlistedProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#f0d4dc] space-y-3">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-sm">No Shortlisted Profiles Yet</h4>
                <p className="text-xs text-slate-500">
                  Tap the heart icon on any proposal card to bookmark it here.
                </p>
                <button
                  onClick={() => setActiveTab('matches')}
                  className="px-5 py-2 bg-[#9D2B48] text-white rounded-xl text-xs font-bold"
                >
                  Browse AI Matches
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 5 CONTENT: MY PROFILE (View & Edit Biodata)
            ========================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0d4dc] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
                  Candidate Matrimonial Biodata
                </h3>
                <p className="text-xs text-slate-500">
                  Official verified details displayed to matching families upon consent
                </p>
              </div>

              {!isEditingBio ? (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#9D2B48] font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : null}
            </div>

            {bioSavedMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            {!isEditingBio ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-sm text-[#9D2B48] uppercase tracking-wider">Candidate Details</h4>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">Full Name:</span>
                    <span className="font-bold text-slate-900">{bioForm.candidateName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">Age:</span>
                    <span className="font-bold text-slate-900">{bioForm.age} Years</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">Caste / Community:</span>
                    <span className="font-bold text-slate-900">{bioForm.caste}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">City / Location:</span>
                    <span className="font-bold text-slate-900">{bioForm.city}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-sm text-[#9D2B48] uppercase tracking-wider">Professional & Expectations</h4>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">Education:</span>
                    <span className="font-bold text-slate-900">{bioForm.education}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400">Profession:</span>
                    <span className="font-bold text-slate-900">{bioForm.profession}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 block mb-1">Partner Expectations:</span>
                    <span className="font-medium text-slate-800 leading-relaxed block">{bioForm.expectations}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveBio} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Candidate Name</label>
                    <input
                      type="text"
                      value={bioForm.candidateName}
                      onChange={(e) => setBioForm({ ...bioForm, candidateName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={bioForm.age}
                      onChange={(e) => setBioForm({ ...bioForm, age: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Education</label>
                    <input
                      type="text"
                      value={bioForm.education}
                      onChange={(e) => setBioForm({ ...bioForm, education: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Profession</label>
                    <input
                      type="text"
                      value={bioForm.profession}
                      onChange={(e) => setBioForm({ ...bioForm, profession: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Caste / Community</label>
                    <input
                      type="text"
                      value={bioForm.caste}
                      onChange={(e) => setBioForm({ ...bioForm, caste: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={bioForm.city}
                      onChange={(e) => setBioForm({ ...bioForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Partner Expectations</label>
                  <textarea
                    rows={3}
                    value={bioForm.expectations}
                    onChange={(e) => setBioForm({ ...bioForm, expectations: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#9D2B48] outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#9D2B48] hover:bg-[#7a1e35] text-white font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingBio(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          
            {/* Google Play Compliance: User In-App Account & Data Deletion */}
            <div className="mt-8 bg-rose-50 border border-rose-200 rounded-3xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-rose-800 font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <h4 className="text-sm">Account Privacy & Data Deletion (Google Play Compliance)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you wish to terminate your matrimonial profile and permanently remove all your saved personal data, shortlist, and interests from Humsafar Rishta Center servers, you can initiate permanent deletion below.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to permanently delete your account and all matrimonial data? This action cannot be undone.")) {
                    deleteUserAccount(currentUser?.email);
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Permanently Delete My Account & Data</span>
              </button>
            </div>
</div>
        )}

      </div>
    </div>
  );
};
