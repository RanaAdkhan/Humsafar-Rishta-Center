import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import { casteList, cityList } from '../data/initialProfiles';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export const RegisterPage = () => {
  const { addProfile, setActivePage } = useRishta();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedCode, setSubmittedCode] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    name: '',
    gender: 'female',
    age: '25',
    height: "5' 4\"",
    maritalStatus: 'Never Married',
    religion: 'Islam',
    sect: 'Sunni Hanafi',
    caste: 'Rajput',
    city: 'Lahore',
    country: 'Pakistan',

    // Step 2: Academic & Career
    education: '',
    institution: '',
    profession: '',
    jobCompany: '',
    income: '',

    // Step 3: Family
    fatherOccupation: '',
    motherOccupation: 'Homemaker',
    brothers: '1 Brother',
    sisters: '1 Sister',
    housing: 'Personal Own House',
    familyValues: 'Religious and moderate educated family',

    // Step 4: Partner Preferences & Contact
    partnerPreferences: '',
    contactPerson: 'Father',
    phone: '',
    whatsapp: '',
    agreeTerms: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.profession) {
      alert('Please fill out the required candidate name, profession, and WhatsApp number.');
      return;
    }

    const created = addProfile({
      ...formData,
      age: parseInt(formData.age) || 25,
      housing: formData.housing || 'Own Residence',
    });

    setSubmittedCode(created.code);
  };

  const copyToClipboard = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Crimson Ruby Theme */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-pink-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-800/80 border border-rose-600/50 text-rose-200 text-xs font-semibold">
            <UserPlus className="w-3.5 h-3.5 text-rose-300" />
            <span>CRIMSON SUITE • 100% CONFIDENTIAL REGISTRATION</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Register Candidate Biodata
          </h1>
          <p className="text-rose-100 text-sm sm:text-base max-w-xl mx-auto">
            Fill out candidate credentials with complete privacy. Our senior matchmaking counselor will review and contact you on WhatsApp.
          </p>
        </div>
      </div>

      {/* 2. Main Form Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submittedCode ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-700">Registration Complete</span>
              <h2 className="font-serif-luxury text-3xl font-bold text-slate-900">
                Biodata Received Successfully!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Your profile has been securely recorded. Our verification desk will review and reach out to your WhatsApp number shortly.
              </p>
            </div>

            {/* Profile Code Badge */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 max-w-sm mx-auto">
              <span className="text-xs text-slate-500 uppercase font-semibold block mb-1">Your Assigned Profile Code</span>
              <div className="flex items-center justify-center space-x-3">
                <span className="font-mono text-3xl font-extrabold text-slate-900 tracking-wider">
                  {submittedCode}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/923001234567?text=${encodeURIComponent(
                  `Hello Humsafar Team, I have registered my biodata with Profile Code: [${submittedCode}]. Please confirm verification.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Verification Team on WhatsApp</span>
              </a>

              <button
                onClick={() => setActivePage('profiles')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                Browse Other Proposals
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8">
            {/* Step Indicator Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className={currentStep >= 1 ? 'text-rose-700 font-bold' : ''}>1. Personal</span>
                <span className={currentStep >= 2 ? 'text-rose-700 font-bold' : ''}>2. Education & Career</span>
                <span className={currentStep >= 3 ? 'text-rose-700 font-bold' : ''}>3. Family</span>
                <span className={currentStep >= 4 ? 'text-rose-700 font-bold' : ''}>4. Preferences & Contact</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-600 to-rose-700 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Personal Attributes */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="font-bold text-slate-900 text-lg">Personal Details</h2>
                    <p className="text-xs text-slate-500">Candidate identification and demographics</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Ayesha Khan (Kept Confidential)"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      >
                        <option value="female">Female (Bride Proposal)</option>
                        <option value="male">Male (Groom Proposal)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Age (Years) *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="70"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Height *
                      </label>
                      <input
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="e.g. 5' 5&quot;"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Marital Status *
                      </label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      >
                        <option value="Never Married">Never Married (Single)</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Khula">Khula</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Religion & Sect
                      </label>
                      <input
                        type="text"
                        name="sect"
                        value={formData.sect}
                        onChange={handleChange}
                        placeholder="e.g. Sunni Hanafi / Shia Ithna Ashari / Ahl-e-Hadith"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Caste / Community *
                      </label>
                      <select
                        name="caste"
                        value={formData.caste}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      >
                        {casteList.filter(c => c !== 'All Castes').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Lahore / Islamabad / London"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g. Pakistan / United Kingdom / Canada"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic & Career */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="font-bold text-slate-900 text-lg">Education & Professional Career</h2>
                    <p className="text-xs text-slate-500">Academic degrees, employment, and income details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Highest Qualification / Degree *
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g. MBBS / MS Software Engineering / CA / MBA"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        University / Educational Institution
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="e.g. NUST / KEMU / LUMS / Punjab University"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Current Profession / Job Title *
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        placeholder="e.g. Senior Medical Officer / Software Architect / Business Owner"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Employer / Company Name
                      </label>
                      <input
                        type="text"
                        name="jobCompany"
                        value={formData.jobCompany}
                        onChange={handleChange}
                        placeholder="e.g. Shifa Hospital / Tech Firm / Family Business"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Monthly Income (Approximate)
                      </label>
                      <input
                        type="text"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        placeholder="e.g. PKR 250,000 / month or £4,000 / month"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Family Background */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="font-bold text-slate-900 text-lg">Family Background & Residence</h2>
                    <p className="text-xs text-slate-500">Parental profession, siblings, and residence status</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Father's Profession
                      </label>
                      <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        placeholder="e.g. Retired Govt Grade-20 / Businessman / Advocate"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Mother's Details
                      </label>
                      <input
                        type="text"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                        placeholder="e.g. Homemaker / School Principal"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Brothers (Status)
                      </label>
                      <input
                        type="text"
                        name="brothers"
                        value={formData.brothers}
                        onChange={handleChange}
                        placeholder="e.g. 1 Brother (Married, Engineer)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Sisters (Status)
                      </label>
                      <input
                        type="text"
                        name="sisters"
                        value={formData.sisters}
                        onChange={handleChange}
                        placeholder="e.g. 2 Sisters (Both Married)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Residence / House Details
                      </label>
                      <input
                        type="text"
                        name="housing"
                        value={formData.housing}
                        onChange={handleChange}
                        placeholder="e.g. 1 Kanal Own House in DHA Lahore / 10 Marla House"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Family Values & Culture
                      </label>
                      <textarea
                        name="familyValues"
                        value={formData.familyValues}
                        onChange={handleChange}
                        rows="2"
                        placeholder="e.g. Respectable, practicing Muslims, educated and cultured family background."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Partner Expectations & Contact Details */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="font-bold text-slate-900 text-lg">Partner Preferences & Confidential Contact</h2>
                    <p className="text-xs text-slate-500">Specify match criteria and emergency guardian contact</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Desired Partner Requirements & Expectations *
                      </label>
                      <textarea
                        name="partnerPreferences"
                        value={formData.partnerPreferences}
                        onChange={handleChange}
                        rows="3"
                        required
                        placeholder="Describe expectations (e.g. Looking for a doctor or engineer from a noble family, age 26-30, based in Lahore or Islamabad...)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Contact Person's Relation
                        </label>
                        <select
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-rose-600 focus:outline-none"
                        >
                          <option value="Self">Candidate (Self)</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          placeholder="e.g. +92 300 1234567"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Direct Calling Phone Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 0321-7654321"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Privacy Pledge Checkbox */}
                    <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-slate-700 space-y-2">
                      <label className="flex items-start space-x-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                          className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                        />
                        <span>
                          I confirm that all submitted particulars are authentic. I agree that photos and personal contact numbers will be maintained under strict privacy and shared only upon mutual consent.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Candidate Biodata</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
