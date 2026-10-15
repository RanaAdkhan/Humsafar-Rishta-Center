import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { organizationDetails } from '../data/initialProfiles';

export const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen to custom event to open modal from anywhere (e.g., Navbar)
    const openHandler = () => setShowModal(true);
    window.addEventListener('open-humsafar-install-modal', openHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('open-humsafar-install-modal', openHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowModal(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("iPhone / iPad پر ایپ انسٹال کرنے کے لیے: نیچے سفاری کے Share بٹن ⎋ پر کلک کریں اور 'Add to Home Screen' [+] منتخب کریں۔");
    } else {
      alert("موبائل براؤزر کے اوپر 3 ڈاٹس مینیو (⋮) پر کلک کر کے 'Install app' یا 'Add to Home Screen' منتخب کریں۔");
    }
  };

  if (isInstalled) return null;

  return (
    <>
      {/* 1. Small, Discreet Floating Button (Never blocks page content) */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 z-40 bg-slate-900/90 hover:bg-slate-950 text-amber-300 border border-amber-400/50 shadow-xl px-3 py-2 rounded-full flex items-center space-x-2 text-xs font-bold hover:scale-105 transition-all group backdrop-blur-md"
        title="Install Humsafar Mobile App"
        aria-label="Install Humsafar Mobile App"
      >
        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Smartphone className="w-3.5 h-3.5" />
        </span>
        <span className="hidden sm:inline text-white font-medium">Install App</span>
        <span className="text-[10px] text-amber-400 font-nastaliq hidden md:inline">ایپ</span>
      </button>

      {/* 2. Clean Modal Dialog (Only appears when user explicitly clicks button) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-400/40 text-white rounded-3xl p-6 shadow-2xl max-w-sm w-full space-y-4 relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-amber-400 shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={organizationDetails.logoMain}
                  alt="Humsafar App Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Humsafar Mobile App</h3>
                <p className="text-xs text-amber-300 font-nastaliq">
                  ہمسفر رشتہ سنٹر آفیشل ایپ
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              اپنے موبائل میں باقاعدہ ایپ انسٹال کریں اور نئے رشتوں کے فوری الرٹس حاصل کریں۔
            </p>

            {/* Action Button */}
            <button
              onClick={handleInstallClick}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Install App (موبائل میں انسٹال کریں)</span>
            </button>

            <div className="text-[11px] text-slate-400 bg-slate-800/60 p-2.5 rounded-xl space-y-1">
              <p className="text-amber-300 font-semibold font-nastaliq">طریقہ کار:</p>
              <p>• اینڈرائڈ پر اوپر براؤزر مینو (⋮) سے <b>Install app</b> دبائیں۔</p>
              <p>• آئی فون پر سفاری کے نیچے Share بٹن ⎋ سے <b>Add to Home Screen</b> دبائیں۔</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
