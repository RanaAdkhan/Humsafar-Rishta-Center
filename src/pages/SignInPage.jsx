import React, { useState } from 'react';
import { useRishta } from '../context/RishtaContext';
import {
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const SignInPage = () => {
  const { signInUser, setActivePage, organizationDetails, language } = useRishta();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const isUrdu = language === 'ur';

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email address or contact number.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signInUser(identifier, password);
      setLoading(false);
    }, 400);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      signInUser('0300-1234567', 'humsafar123');
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-[80vh] py-6 sm:py-10 px-3 sm:px-6 flex items-center justify-center bg-gradient-to-b from-[#F9ECF1] via-[#F0EAF6] to-[#F8EDF1] w-full max-w-full overflow-x-hidden">
      <div className="max-w-full sm:max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#f0d4dc] p-5 sm:p-8 space-y-5 overflow-hidden">
        
        {/* Header with Emblem */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-[#9D2B48]/30 shadow-md mx-auto flex items-center justify-center overflow-hidden">
            <img
              src={organizationDetails.logoMain}
              alt="Humsafar Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="font-serif-luxury text-2xl font-black text-slate-900">
            Sign In to Member Portal
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {isUrdu ? 'اپنے اکاؤنٹ میں لاگ ان کریں اور رشتے دیکھیں' : 'Access your personalized matches, interests & proposals'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          
          {/* Email or Contact Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Email or Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 0300-1234567 or email@domain.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#9D2B48] focus:ring-2 focus:ring-[#9D2B48]/20 text-xs sm:text-sm font-medium outline-none transition-all bg-slate-50/50"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Registered Pakistani contact number or email address
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("To reset password, please WhatsApp our support desk at " + organizationDetails.whatsapp)}
                className="text-[11px] text-[#9D2B48] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your confidential password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-[#9D2B48] focus:ring-2 focus:ring-[#9D2B48]/20 text-xs sm:text-sm font-medium outline-none transition-all bg-slate-50/50"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs text-slate-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#9D2B48] focus:ring-[#9D2B48]" />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#9D2B48] to-[#800000] hover:from-[#7a1e35] hover:to-[#630827] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Verifying & Signing In...' : 'Sign In to Portal'}</span>
          </button>

          {/* 1-Click Fast Demo Login for Evaluation */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Test Member Sign In (Demo Login)</span>
            </button>
          </div>
        </form>

        {/* Register CTA */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-600">
            Don't have a registered matrimonial profile yet?
          </p>
          <button
            onClick={() => setActivePage('register')}
            className="w-full py-2.5 border-1.5 border-[#9D2B48] text-[#9D2B48] hover:bg-[#9D2B48]/5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Profile Free (Register)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-500 border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Family Data Privacy</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Government Registered Bureau</span>
          </div>
        </div>

      </div>
    </div>
  );
};
