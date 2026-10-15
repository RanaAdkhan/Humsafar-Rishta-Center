import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { organizationDetails } from '../data/initialProfiles';

export const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show prompt after 3 seconds if not dismissed
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('humsafar_app_prompt_dismissed');
      if (!dismissed && !isInstalled) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("iPhone / iPad پر ایپ انسٹال کرنے کے لیے: نیچے سفاری کے Share بٹن ⎋ پر کلک کریں اور 'Add to Home Screen' [+] منتخب کریں۔");
    } else {
      alert("موبائل براؤزر کے اوپر 3 ڈاٹس مینیو (⋮) پر کلک کر کے 'Install app' یا 'Add to Home Screen' منتخب کریں۔");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('humsafar_app_prompt_dismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-400/40 text-white rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-amber-400/60 shrink-0 overflow-hidden shadow-md">
              <img
                src={organizationDetails.logoMain}
                alt="Humsafar App Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-bold text-sm text-white">Humsafar Mobile App</h4>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  Fast
                </span>
              </div>
              <p className="text-[11px] text-amber-300 font-nastaliq">
                ہمسفر رشتہ سنٹر آفیشل ایپ
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          اپنے موبائل میں ہمسفر رشتہ سنٹر کی باقاعدہ ایپ انسٹال کریں اور نئے رشتوں کے فوری الرٹس پائیں۔
        </p>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install App (موبائل میں انسٹال کریں)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
