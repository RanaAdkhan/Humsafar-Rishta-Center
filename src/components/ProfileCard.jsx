import React from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Heart,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Briefcase,
  Home,
  MessageCircle,
  Eye,
  ShieldCheck,
  Sparkles,
  Lock,
  BookOpen
} from 'lucide-react';

export const ProfileCard = ({ profile }) => {
  const { shortlist, toggleShortlist, openProfileModal, organizationDetails } = useRishta();
  const isShortlisted = shortlist.includes(profile.id);

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Humsafar Rishta Centre, I am inquiring regarding Proposal Code: [${profile.code} - ${profile.profession}, ${profile.city}]. Please share verified family details.`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none">
      {/* Top Header Card */}
      <div>
        <div className="p-5 pb-4 border-b border-slate-100 relative bg-gradient-to-b from-slate-50/70 to-white">
          <div className="flex items-start justify-between gap-3">
            {/* Avatar & Badges */}
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${
                    profile.avatarBg || 'from-emerald-600 to-teal-700'
                  } flex items-center justify-center text-white font-bold text-lg shadow-md tracking-wider`}
                >
                  {profile.initials || (profile.gender === 'female' ? 'F' : 'M')}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-200"
                  title="Photo & Contact protected under strict family privacy protocol"
                >
                  <Lock className="w-3 h-3 text-emerald-700" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-amber-300">
                    {profile.code}
                  </span>
                  {profile.verified && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  )}
                  {profile.featured && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mt-1 group-hover:text-emerald-800 transition-colors">
                  {profile.gender === 'female' ? 'Bride Proposal' : 'Groom Proposal'} • {profile.age} Yrs
                </h3>
                <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.city}, {profile.country}</span>
                </p>
              </div>
            </div>

            {/* Shortlist Heart Button */}
            <button
              onClick={() => toggleShortlist(profile.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                isShortlisted
                  ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
              title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-current text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Key Quick Pill Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">
              Height: {profile.height}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 font-bold text-amber-900 border border-amber-200">
              {profile.caste}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 font-medium text-emerald-800">
              {profile.sect}
            </span>
            {profile.category && (
              <span className="px-2.5 py-1 rounded-lg bg-teal-50 font-medium text-teal-800 border border-teal-200">
                {profile.category}
              </span>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-start space-x-2.5">
            <GraduationCap className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Education</span>
              <p className="font-medium text-slate-800 text-xs sm:text-sm line-clamp-1">{profile.education}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Briefcase className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Profession</span>
              <p className="font-medium text-slate-800 text-xs sm:text-sm line-clamp-1">{profile.profession}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Home className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Residence Status</span>
              <p className="text-xs text-slate-700 line-clamp-1">{profile.housing}</p>
            </div>
          </div>

          {/* Looking for Box */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-xs">
            <span className="font-bold text-slate-900 block mb-1">Partner Preference:</span>
            <p className="text-slate-600 line-clamp-2 leading-relaxed">
              {profile.partnerPreferences}
            </p>
          </div>
        </div>
      </div>

      {/* Card Action Buttons with Security Notice */}
      <div className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openProfileModal(profile)}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-600" />
            <span>Full Biodata</span>
          </button>

          <a
            href={`https://wa.me/${organizationDetails.whatsappClean}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400 pt-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Humsafar Verified • Contact details kept confidential</span>
        </div>
      </div>
    </div>
  );
};
