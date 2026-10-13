import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { successStories } from '../data/initialProfiles';
import {
  Users,
  Heart,
  Sparkles,
  Quote,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const StoriesPage = () => {
  const { setActivePage } = useRishta();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Royal Purple Theme */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/80 border border-purple-600/50 text-purple-200 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-purple-300 fill-current" />
            <span>ROYAL PURPLE SUITE • REAL COUPLE JOURNEYS</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Blessed Unions & Success Stories
          </h1>
          <p className="text-purple-100 text-sm sm:text-base max-w-xl mx-auto">
            Read how thousands of respectable families found their ideal life partners through our dedicated matchmaking team.
          </p>
        </div>
      </div>

      {/* 2. Success Stories Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                    {story.badge}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{story.date}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <Quote className="w-8 h-8 text-purple-300 mb-2" />
                  <p className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    "{story.quote}"
                  </p>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {story.story}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{story.couple}</h4>
                  <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    <span>{story.location}</span>
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  ✓
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-xl">
          <Sparkles className="w-10 h-10 text-amber-300 mx-auto" />
          <h2 className="font-serif-luxury text-3xl font-bold">
            May Allah Bless Your Search with Happiness
          </h2>
          <p className="text-purple-200 text-xs sm:text-sm max-w-lg mx-auto">
            Take the first step today. Register your candidate profile or contact our marriage advisors for confidential assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActivePage('register')}
              className="bg-white hover:bg-slate-100 text-purple-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Register Candidate Profile
            </button>
            <button
              onClick={() => setActivePage('profiles')}
              className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all"
            >
              Search Compatible Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
