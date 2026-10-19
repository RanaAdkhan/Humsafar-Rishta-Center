import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const ContactPage = () => {
  const { organizationDetails } = useRishta();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: '',
    phone: '',
    lookingFor: 'Bride',
    city: 'Lahore',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Humsafar Rishta Team, I am submitting an inquiry. Name: ${inquiry.name}, Phone: ${inquiry.phone}, Looking for: ${inquiry.lookingFor}, City: ${inquiry.city}. Note: ${inquiry.message}`
    );
    window.open(`https://wa.me/${organizationDetails.whatsappClean}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full max-w-full overflow-x-hidden">
      {/* 1. Header Banner - Shaadi Maroon Theme */}
      <div className="bg-gradient-to-r from-[#9D2B48] via-[#800000] to-[#630827] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 relative overflow-hidden w-full max-w-full">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-2.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-rose-100 text-xs font-semibold">
            <PhoneCall className="w-3.5 h-3.5 text-rose-200" />
            <span>DIRECT ADVISOR HELPLINE • HUMSAFAR RISHTA CENTRE</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight break-words">
            Contact & Head Office Location
          </h1>
          <p className="text-rose-100 text-xs sm:text-base max-w-xl mx-auto leading-relaxed break-words">
            Get in touch with our marriage advisors or visit our official executive center on Mozang Road, Lahore for confidential consultations.
          </p>
        </div>
      </div>

      {/* 2. Form & Contacts Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-sm w-full overflow-hidden">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest block">
                HUMSAFAR RISHTA CENTRE • TRUSTED MATRIMONIAL SERVICES
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-1">
                Send a Confidential Proposal Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your contact details remain strictly confidential and protected under our family privacy guarantee.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-slate-900 text-lg">Thank You for Reaching Out!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                  Your inquiry has been directed to our Senior Counselor desk at 64 Mozang Road, Lahore. You will receive a response on WhatsApp or call shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. Malik Muhammad (Parent / Guardian)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                      placeholder="e.g. +92 325 1013131"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Seeking Proposal For
                    </label>
                    <select
                      value={inquiry.lookingFor}
                      onChange={(e) => setInquiry({ ...inquiry, lookingFor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                    >
                      <option value="Bride">Bride (Larki ka Rishta)</option>
                      <option value="Groom">Groom (Larke ka Rishta)</option>
                      <option value="Deeni Madaris">Deeni Madaris / Aalima / Aalim</option>
                      <option value="Tablighi Mindset">Tablighi Mindset Match</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    City / Country of Residence
                  </label>
                  <input
                    type="text"
                    value={inquiry.city}
                    onChange={(e) => setInquiry({ ...inquiry, city: e.target.value })}
                    placeholder="e.g. Lahore / Islamabad / Overseas UK / UAE"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Requirements & Expectations
                  </label>
                  <textarea
                    rows="3"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="Describe caste, qualification, or religious preferences (e.g. Looking for a doctor or Madaris graduate...)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Humsafar Counselor</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Details & Hotlines */}
          <div className="lg:col-span-5 space-y-6">
            {/* Official Head Office Card */}
            <div className="bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 text-white p-7 rounded-3xl shadow-xl space-y-4 border border-amber-400/40">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-white p-1 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={organizationDetails.logoAlMaktab}
                    alt="Humsafar Rishta Centre Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Head Office Address</h3>
                  <span className="text-amber-300 text-xs">Official Headquarters</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <p className="text-slate-200 font-semibold leading-relaxed">
                  {organizationDetails.address}
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Opposite PSO Petrol Pump, Mozang, Lahore, Pakistan
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Landline Helpline:</span>
                  <a href={`tel:${organizationDetails.phone}`} className="font-mono font-bold text-amber-300 text-sm hover:underline">
                    {organizationDetails.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">WhatsApp Official:</span>
                  <a
                    href={`https://wa.me/${organizationDetails.whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-emerald-400 text-sm hover:underline"
                  >
                    {organizationDetails.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Timings and Visiting Info */}
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-700" />
                <span>Office Hours & Consultations</span>
              </h3>

              <div className="space-y-3 text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Monday - Saturday:</span>
                  <span className="font-bold text-slate-900">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Sunday:</span>
                  <span className="font-bold text-emerald-700">By Prior Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Nearest Landmark:</span>
                  <span className="font-semibold text-slate-900">Opposite PSO Petrol Pump</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Family meetings are arranged in private, respectful conference chambers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
