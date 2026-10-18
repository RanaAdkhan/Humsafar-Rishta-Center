import React from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Heart,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  MessageCircle,
  Lock
} from 'lucide-react';

export const Footer = () => {
  const { setActivePage, organizationDetails } = useRishta();

  return (
    <footer className="bg-[#1f0a12] text-slate-300 border-t border-[#9D2B48]/30 text-xs">
      {/* Top Footer Banner */}
      <div className="border-b border-white/10 bg-[#16060c] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-amber-400 shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={organizationDetails.logoMain}
                alt="Humsafar Rishta Centre Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-amber-400 text-xs font-bold tracking-wider uppercase block">
                HUMSAFAR RISHTA CENTRE • TRUSTED MATRIMONIAL SERVICES
              </span>
              <span className="font-serif-luxury text-lg font-bold text-white tracking-tight">
                HUMSAFAR RISHTA CENTRE (LAHORE HEAD OFFICE)
              </span>
              <p className="text-slate-400 text-[11px]">
                True Companion for Life's Journey • Dignified & Verified Matrimonial Network
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${organizationDetails.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {organizationDetails.whatsapp}</span>
            </a>
            <button
              onClick={() => setActivePage('register')}
              className="inline-flex items-center space-x-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-xs"
            >
              <span>Register Free</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              About Humsafar
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Humsafar Rishta Centre facilitates educated, qualified matrimonial matches across all communities, castes, professions, and locations. Specialized matchmaking desks are available for religious scholars, doctors, corporate executives, and overseas Pakistani families.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
              <Lock className="w-4 h-4" />
              <span>100% Family Data Privacy & Security Guarantee</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('profiles')} className="hover:text-emerald-400 transition-colors">
                  Browse Proposals (Sapphire Directory)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('register')} className="hover:text-emerald-400 transition-colors">
                  Register Candidate Biodata
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('packages')} className="hover:text-emerald-400 transition-colors">
                  Membership Packages & Fees
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-emerald-400 transition-colors">
                  Our Mission & Values
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-emerald-400 transition-colors">
                  Office Location & Helpdesk
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin')} className="hover:text-amber-400 transition-colors">
                  Official Staff Login (Admin Portal)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Exact Address from Banner */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Official Head Office (Lahore)
            </h4>
            <div className="space-y-2 text-slate-400 text-xs leading-relaxed">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">
                    {organizationDetails.address}
                  </span>
                  <span className="text-slate-400 block text-[11px] mt-1">
                    Opposite PSO Petrol Pump, Mozang, Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Hotlines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Helpline & Hotlines
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Office Landline:</span>
                  <a href={`tel:${organizationDetails.phone}`} className="font-mono font-bold text-white hover:text-amber-300">
                    {organizationDetails.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Official WhatsApp:</span>
                  <a
                    href={`https://wa.me/${organizationDetails.whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-emerald-400 hover:underline"
                  >
                    {organizationDetails.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Working Hours: Mon - Sat (10:00 AM - 7:00 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <p>© {new Date().getFullYear()} Humsafar Rishta Centre. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>256-Bit SSL Secured • Shariah Compliant Family Privacy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
