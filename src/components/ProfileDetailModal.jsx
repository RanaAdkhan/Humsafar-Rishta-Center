import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  X,
  CheckCircle2,
  Lock,
  Unlock,
  Heart,
  MessageCircle,
  MapPin,
  GraduationCap,
  Briefcase,
  Home,
  Users,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  KeyRound,
  CreditCard,
  Building,
  Check,
  AlertCircle
} from 'lucide-react';

export const ProfileDetailModal = () => {
  const {
    selectedProfileModal,
    closeProfileModal,
    shortlist,
    toggleShortlist,
    organizationDetails,
    isPaidUnlocked,
    activeAccessPlan,
    verifyPasscode,
    unlockDemo,
    lockAccess
  } = useRishta();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  if (!selectedProfileModal) return null;
  const p = selectedProfileModal;
  const isShortlisted = shortlist.includes(p.id);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setPinError('');
    setPinSuccess('');
    const res = await verifyPasscode(pinInput);
    if (res.success) {
      setPinSuccess(res.message);
      setPinInput('');
    } else {
      setPinError(res.message);
    }
  };

  const whatsappPaymentMsg = encodeURIComponent(
    `Assalam-o-Alaikum Humsafar Rishta Team, I have transferred the fee for Proposal [${p.code}: ${p.profession}, ${p.city}]. Please share my Access PIN.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 select-none">
        {/* Security Watermark Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center rotate-[-30deg] z-0">
          <span className="font-extrabold text-7xl text-slate-900 tracking-widest text-center">
            CONFIDENTIAL • HUMSAFAR RISHTA CENTER • {p.code}
          </span>
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-sm font-bold px-3 py-1 rounded-lg bg-slate-900 text-amber-300">
              {p.code}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-slate-900">
                {p.gender === 'female' ? 'Bride Proposal' : 'Groom Proposal'}
              </span>
              {isPaidUnlocked ? (
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Fee Paid • Unlocked ({activeAccessPlan || 'VIP'})</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Confidential • Fee Required</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleShortlist(p.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isShortlisted
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600'
              }`}
              title="Bookmark / Shortlist"
            >
              <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-current text-rose-600' : ''}`} />
            </button>
            <button
              onClick={closeProfileModal}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10">
          {/* Top Banner with Humsafar Organization Notice */}
          <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-amber-500/30">
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${
                  p.avatarBg || 'from-emerald-500 to-teal-700'
                } flex items-center justify-center text-white text-2xl font-bold tracking-wider shadow-inner`}
              >
                {p.initials || (p.gender === 'female' ? 'F' : 'M')}
              </div>
              <div>
                <span className="text-[11px] text-amber-300 font-bold block uppercase tracking-wider">
                  Humsafar Rishta Center • Verified Matrimonial Biodata
                </span>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {isPaidUnlocked ? p.name : `${p.gender === 'female' ? 'Bride' : 'Groom'} Candidate (${p.code})`}
                </h2>
                <p className="text-xs text-emerald-300 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{p.city}, {p.country}</span>
                  <span className="text-slate-400">•</span>
                  <span>Registered: {p.createdAt}</span>
                </p>
              </div>
            </div>

            {/* Quick Lock / Unlock Status Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-left max-w-xs text-xs text-slate-200">
              {isPaidUnlocked ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Access Granted</span>
                  </div>
                  <span className="text-[11px]">Direct family contacts & unmasked biodata available.</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Confidential Lock</span>
                  </div>
                  <span className="text-[11px]">Direct parent phone & full credentials locked. Unlock with Fee PIN below.</span>
                </div>
              )}
            </div>
          </div>

          {/* 🌟 PAYWALL GATEWAY (Visible when fee is not unlocked) */}
          {!isPaidUnlocked && (
            <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-400 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
                      Unlock Full Confidential Biodata & Direct Parent Phone Number
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Direct phone and WhatsApp numbers are accessible for genuine families through verified plans.
                    </p>
                  </div>
                </div>

                <button
                  onClick={unlockDemo}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-all shadow-xs shrink-0"
                  title="Instant Test Unlock for Evaluation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>⚡ Demo Test Unlock</span>
                </button>
              </div>

              {/* Fee Plans Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-slate-500 font-bold block text-[11px]">Single Proposal</span>
                  <span className="text-xl font-extrabold text-slate-900 block mt-0.5">Rs. 500</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">Full unmasked biodata and direct phone number for this profile.</span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-300 shadow-xs bg-amber-50/40">
                  <span className="text-blue-700 font-bold block text-[11px]">Silver Plan (15 Rishtas)</span>
                  <span className="text-xl font-extrabold text-slate-900 block mt-0.5">Rs. 7,500</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">Full details of 15 verified proposals with family consultation.</span>
                </div>

                <div className="bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 p-3.5 rounded-2xl shadow-xs font-bold">
                  <span className="text-slate-950 uppercase block text-[11px]">Gold VIP Unlimited</span>
                  <span className="text-xl font-black block mt-0.5">Rs. 15,000</span>
                  <span className="text-[11px] text-slate-900 mt-1 block">Unlimited access to all verified proposals and dedicated matchmaking.</span>
                </div>
              </div>

              {/* Enter Access PIN Form */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-3">
                <form onSubmit={handlePinSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Enter your issued Access PIN"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
                  >
                    Unlock with PIN
                  </button>
                </form>

                {pinError && (
                  <p className="text-xs text-rose-600 flex items-center space-x-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </p>
                )}
                {pinSuccess && (
                  <p className="text-xs text-emerald-700 flex items-center space-x-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinSuccess}</span>
                  </p>
                )}
              </div>

              {/* Payment Methods & WhatsApp Receipt */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="space-y-1 text-slate-700">
                  <div className="font-bold text-slate-900 flex items-center space-x-1">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Payment Methods:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    <strong>JazzCash / EasyPaisa:</strong> 0325-1013131 (Account: Humsafar Rishta Center)
                  </p>
                  <p className="text-[11px] text-slate-600">
                    <strong>Lahore Office Cash:</strong> 64 Mozang Road, Opposite PSO Pump, Lahore
                  </p>
                </div>

                <a
                  href={`https://wa.me/${organizationDetails.whatsappClean}?text=${whatsappPaymentMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all text-xs shrink-0 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Fee Receipt on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Section 1: Personal Attributes */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Personal & Demographic Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Age</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.age} Years</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Height</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.height}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Marital Status</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.maritalStatus}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Caste / Community</span>
                <span className="text-amber-900 font-bold text-sm mt-0.5 block">{p.caste}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Sect / Deeni Stance</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.sect}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Location</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.city}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Country</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.country}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Category</span>
                <span className="text-emerald-700 font-bold text-sm mt-0.5 block">{p.category || 'Verified'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Education & Career */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Academic & Professional Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Qualification / Degree</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.education}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Profession / Job</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.profession}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Monthly Income</span>
                <span className="text-emerald-700 font-bold text-sm mt-0.5 block">{p.income}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Family Background & Residence (Masked if not paid) */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-700" />
              <span>Family Background & Residence</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Father's Occupation</span>
                <span className="text-slate-900 font-medium text-sm mt-0.5 block">{p.fatherOccupation}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Mother's Details</span>
                <span className="text-slate-900 font-medium text-sm mt-0.5 block">{p.motherOccupation}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Brothers</span>
                <span className="text-slate-900 font-medium text-sm mt-0.5 block">{p.brothers}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block uppercase">Sisters</span>
                <span className="text-slate-900 font-medium text-sm mt-0.5 block">{p.sisters}</span>
              </div>

              {/* Exact Residence - Masked if not paid */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                <span className="text-slate-400 font-semibold block uppercase">Exact Residence Status</span>
                {isPaidUnlocked ? (
                  <span className="text-slate-900 font-bold text-sm mt-0.5 block">{p.housing}</span>
                ) : (
                  <span className="text-amber-800 font-semibold text-xs mt-0.5 flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>[Protected Behind Fee-Gate — Unlocked for Paid Members]</span>
                  </span>
                )}
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                <span className="text-slate-400 font-semibold block uppercase">Family Values & Deeni Environment</span>
                <span className="text-slate-800 text-sm mt-0.5 block leading-relaxed">{p.familyValues}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Direct Contact Numbers (Masked if not paid) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Direct Family Contact & WhatsApp Numbers</span>
            </h3>

            {isPaidUnlocked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                <div>
                  <span className="text-slate-500 font-semibold block">Primary Guardian Phone:</span>
                  <span className="font-mono text-base font-extrabold text-slate-900 block mt-0.5">
                    {p.phone || organizationDetails.phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Guardian WhatsApp:</span>
                  <span className="font-mono text-base font-extrabold text-emerald-700 block mt-0.5">
                    {p.whatsapp || organizationDetails.whatsapp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-amber-900 font-semibold">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Direct guardian phone and WhatsApp number available with verified access plan.</span>
                </div>
                <span className="text-slate-500 font-mono">03**-*******</span>
              </div>
            )}
          </div>

          {/* Section 5: Partner Preferences */}
          <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-600 fill-current" />
              <span>Partner Expectations & Match Criteria</span>
            </h3>
            <p className="text-slate-800 text-sm leading-relaxed font-medium">
              "{p.partnerPreferences}"
            </p>
          </div>
        </div>

        {/* Modal Footer Call to Action */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <div className="text-xs text-slate-500">
            {isPaidUnlocked ? (
              <span className="text-emerald-700 font-bold">✓ Full credentials unlocked for this session.</span>
            ) : (
              <span>Fee payment is required to unlock direct parent phone numbers.</span>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {isPaidUnlocked && (
              <button
                onClick={lockAccess}
                className="py-2.5 px-3 rounded-xl border border-rose-300 text-rose-700 font-semibold text-xs hover:bg-rose-50 transition-colors"
                title="Lock access"
              >
                Relock Access
              </button>
            )}

            <button
              onClick={closeProfileModal}
              className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}?text=${encodeURIComponent(
                `Assalam-o-Alaikum, I am inquiring regarding Proposal [${p.code} - ${p.profession}, ${p.city}]. Status: ${isPaidUnlocked ? 'Fee Paid' : 'Fee Payment Assistance'}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isPaidUnlocked ? 'Connect on WhatsApp' : 'Pay Fee via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
