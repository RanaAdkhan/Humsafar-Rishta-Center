import React from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  HeartHandshake,
  MapPin,
  Clock,
  PhoneCall
} from 'lucide-react';

export const AboutPage = () => {
  const { setActivePage } = useRishta();

  const offices = [
    {
      city: "Lahore Head Office",
      address: "Suite 402, Al-Hafeez Executive Tower, Main Boulevard, Gulberg III, Lahore",
      phone: "+92 42 35789123",
      timing: "10:00 AM - 7:00 PM (Mon-Sat)"
    },
    {
      city: "Islamabad Executive Branch",
      address: "Office 12, ISE Towers, Jinnah Avenue, Blue Area, Islamabad",
      phone: "+92 51 2894567",
      timing: "10:00 AM - 7:00 PM (Mon-Sat)"
    },
    {
      city: "Karachi Regional Office",
      address: "Executive Floor, Forum Mall Tower, Clifton Block 9, Karachi",
      phone: "+92 21 35876543",
      timing: "10:00 AM - 7:00 PM (Mon-Sat)"
    },
    {
      city: "London Overseas Liaison (UK)",
      address: "128 City Road, London, EC1V 2NX, United Kingdom",
      phone: "+44 20 7946 0192",
      timing: "9:00 AM - 5:00 PM GMT"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Forest Teal Theme */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-600/50 text-teal-200 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-teal-300" />
            <span>HERITAGE & INTEGRITY • ESTABLISHED 2011</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            About Humsafar Matrimonial
          </h1>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto">
            A premier consultancy dedicated to preserving traditional family dignity, modesty, and genuine connections across generations.
          </p>
        </div>
      </div>

      {/* 2. Mission & History */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block">
              Our Founding Vision
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Bridging Distances with Islamic Modesty and Family Trust
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded over 15 years ago, Humsafar Matrimonial Center was established with a singular noble mission: to rescue families from deceptive matchmaking practices and restore dignity, privacy, and authenticity to the sacred process of marriage.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike commercial dating apps or careless broker networks, we believe that marriage in our culture is not merely the union of two individuals, but the union of two respected families. Every proposal in our network is verified with thorough scrutiny.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                <span className="font-serif-luxury text-2xl font-bold text-teal-900 block">15+ Years</span>
                <span className="text-xs text-slate-600 font-medium">Of honorable matchmaking</span>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                <span className="font-serif-luxury text-2xl font-bold text-teal-900 block">100% Modesty</span>
                <span className="text-xs text-slate-600 font-medium">Strict zero public disclosure</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
              Our 4 Pillars of Excellence
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Background Verification</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Physical residence verification and direct telephonic interviews with parents.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <HeartHandshake className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Empathetic Family Counselors</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Mature, cultured advisors who understand parental sensitivities and family prestige.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Globe2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Global Expatriate Network</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Dedicated connections across the UK, USA, Canada, Gulf and Australia.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Award className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Continuous Support</h4>
                  <p className="text-xs text-slate-600 mt-0.5">We stand by families from the initial proposal introduction until the wedding is finalized.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Physical Office Network */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-1">
              Physical Presence
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
              Our Official Offices
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Families are warmly invited to visit our executive branches for in-person consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((off, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{off.city}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{off.address}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-500">
                  <p className="flex items-center space-x-1 font-medium text-teal-800">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{off.phone}</span>
                  </p>
                  <p className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{off.timing}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
