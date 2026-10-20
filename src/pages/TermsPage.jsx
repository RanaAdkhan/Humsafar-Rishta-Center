import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export const TermsPage = () => {
  const { setActivePage, organizationDetails } = useRishta();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-slate-900">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Humsafar Rishta Center • Valid for all mobile & web users
            </p>
          </div>

          <button
            onClick={() => setActivePage('home')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, or accessing <strong>Humsafar Rishta Center</strong>, you confirm that you are seeking a lawful and bona fide matrimonial match according to Islamic ethics and laws of Pakistan. You agree to provide true, accurate, and up-to-date biodata particulars.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">2. Strict Prohibition on Casual Dating</h2>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1 text-amber-900">
            <strong>Zero Tolerance Policy:</strong>
            <p>
              This app is strictly NOT a dating, hookup, or friendship service. Any user attempting inappropriate conduct, harassment, commercial solicitation, or non-marital socializing will face immediate account termination and permanent ban.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">3. Family Verification Responsibility</h2>
          <p>
            While Humsafar conducts initial screening and verification of submitted contact numbers, families and guardians are advised to conduct their own independent social, criminal, and financial due diligence before solemnizing any nikah/marriage.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
          <h2 className="font-bold text-base text-slate-900">4. Contact & Support</h2>
          <p>Questions regarding our service terms may be directed to our support team:</p>
          <div className="bg-slate-50 p-4 rounded-xl space-y-1 font-mono text-xs">
            <div>Office: {organizationDetails.name}</div>
            <div>Address: {organizationDetails.address}</div>
            <div>Support Email: {organizationDetails.email}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
