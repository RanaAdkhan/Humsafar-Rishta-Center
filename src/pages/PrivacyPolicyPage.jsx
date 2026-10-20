import React from 'react';
import { useRishta } from '../context/RishtaContext';
import { ShieldCheck, Lock, Trash2, ArrowLeft, CheckCircle2, Mail, FileText } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const { setActivePage, organizationDetails } = useRishta();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Play Data Safety Compliant</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-slate-900">
              Privacy Policy & Data Safety
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Humsafar Rishta Center • Last Updated: October 2026
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

        {/* Section 1: Introduction */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">1. Introduction & Overview</h2>
          <p>
            Welcome to <strong>Humsafar Rishta Center</strong> ("we", "our", or "us"). We provide dignified, family-approved matrimonial matchmaking services tailored for Pakistani families locally and abroad. We understand the sensitive and sacred nature of personal matrimonial details and are committed to safeguarding your privacy under the highest digital security standards and Islamic ethics.
          </p>
        </div>

        {/* Section 2: Data Collection */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">2. Personal Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account & Contact Info:</strong> Full name, verified email address, Google account profile, and WhatsApp/phone contact numbers of candidates and parents/guardians.</li>
            <li><strong>Matrimonial Particulars:</strong> Age, gender, height, marital status, caste/community, sect/religious background, education, occupation, income bracket, and city/country of residence.</li>
            <li><strong>Family Background:</strong> Father/mother profession, sibling count, and house ownership status to assist in compatible family matchmaking.</li>
            <li><strong>Technical Diagnostics:</strong> Minimal technical information such as app crash logs and device type strictly for stability improvements (zero advertising tracking).</li>
          </ul>
        </div>

        {/* Section 3: How We Use Data */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">3. Purpose of Data Processing</h2>
          <p>We process your personal information exclusively to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Enable candidate search and matchmaking according to your specified criteria.</li>
            <li>Authenticate user logins and prevent unauthorized or fraudulent registrations.</li>
            <li>Facilitate direct parent-to-parent introductions upon mutual consent.</li>
            <li>Ensure compliance with Google Play Store policies and local safety regulations.</li>
          </ul>
        </div>

        {/* Section 4: Privacy & Protection */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-base text-slate-900">4. Privacy Default & No Third-Party Selling</h2>
          <p>
            <strong>We NEVER sell, rent, trade, or monetize your personal information</strong> with third-party advertisers or marketing data brokers. Personal photos and direct contact phone numbers remain protected behind our verified fee-gate protocol and are never exposed publicly to unverified internet crawlers.
          </p>
        </div>

        {/* Section 5: Data Deletion */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-rose-50 border border-rose-200 p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-rose-800 font-bold">
            <Trash2 className="w-4 h-4 text-rose-600" />
            <h2 className="font-bold text-sm sm:text-base">5. Right to Erasure & In-App Account Deletion</h2>
          </div>
          <p className="text-rose-900">
            In compliance with Google Play Developer Policies, all users have the right to request the permanent deletion of their account and all associated personal data at any time:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-rose-800">
            <li><strong>In-App:</strong> Navigate to your <em>Profile & Settings</em> tab and click <em>"Permanently Delete My Account & Data"</em> for instant deletion.</li>
            <li><strong>Via Email:</strong> Email our Data Protection Officer at <a href={`mailto:${organizationDetails.email}`} className="font-bold underline">{organizationDetails.email}</a> with your registered email to process full deletion within 24 hours.</li>
          </ul>
        </div>

        {/* Section 6: Contact */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6">
          <h2 className="font-bold text-base text-slate-900">6. Contact Information</h2>
          <p>For any privacy questions or data deletion requests, contact our legal desk:</p>
          <div className="bg-slate-50 p-4 rounded-xl space-y-1 font-mono text-xs">
            <div>Office: {organizationDetails.name}</div>
            <div>Address: {organizationDetails.address}</div>
            <div>Email: {organizationDetails.email}</div>
            <div>WhatsApp: {organizationDetails.whatsapp}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
