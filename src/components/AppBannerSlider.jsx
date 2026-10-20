import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';
import humsafarBannerImg from '../assets/images/humsafar_banner.png';

export const AppBannerSlider = () => {
  const { organizationDetails, language, setActivePage } = useRishta();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: 'image',
      image: humsafarBannerImg,
      alt: "Humsafar Rishta Center Official Banner",
    },
    {
      id: 2,
      type: 'custom',
      badge: language === 'ur' ? 'ڈاکٹرز و پروفیشنلز ڈیسک' : 'Doctors & Executives Desk',
      title: language === 'ur' ? 'ڈاکٹرز، انجینئرز اور اعلیٰ تعلیم یافتہ رشتے' : 'Doctors, Engineers & Qualified Executives',
      desc: language === 'ur' ? 'ایم بی بی ایس، ایف سی پی ایس، ایم ایس اور کارپوریٹ خاندانوں کے مستند رشتے' : 'Verified proposals of MBBS, FCPS, IT Specialists and noble business families.',
      phone: organizationDetails.phone,
      whatsapp: organizationDetails.whatsapp,
      theme: 'from-emerald-950 via-slate-900 to-emerald-900',
      actionText: language === 'ur' ? 'رشتے دیکھیں' : 'View Profiles'
    },
    {
      id: 3,
      type: 'custom',
      badge: language === 'ur' ? 'دینی مدارس و علماء ڈیسک' : 'Deeni Madaris & Aalimat Desk',
      title: language === 'ur' ? 'درس نظامی، عالم و فاضل اور باحجاب رشتے' : 'Madaris Scholars, Aalimat & Religious Families',
      desc: language === 'ur' ? '100% شرعی پردہ اور مکمل خاندانی رازداری کے ساتھ باوقار رشتے' : '100% Shariah-compliant matching under complete modesty and strict privacy.',
      phone: organizationDetails.phone,
      whatsapp: organizationDetails.whatsapp,
      theme: 'from-amber-950 via-slate-900 to-yellow-950',
      actionText: language === 'ur' ? 'مدارس رشتے' : 'Deeni Matches'
    },
    {
      id: 4,
      type: 'custom',
      badge: language === 'ur' ? 'اوورسیز پاکستانی نیٹ ورک' : 'Overseas Pakistani Proposals',
      title: language === 'ur' ? 'برطانیہ، امریکہ، کینیڈا اور خلیجی ممالک' : 'UK, USA, Canada, Europe & Gulf Proposals',
      desc: language === 'ur' ? 'پی آر اور نیشنلٹی ہولڈرز کے مستند اور تصدیق شدہ فیملی رشتے' : 'Direct connection with respected overseas Pakistani families worldwide.',
      phone: organizationDetails.phone,
      whatsapp: organizationDetails.whatsapp,
      theme: 'from-indigo-950 via-slate-900 to-blue-950',
      actionText: language === 'ur' ? 'اوورسیز سرچ' : 'Overseas Search'
    }
  ];

  // Auto-play slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="mx-4 mt-3">
      <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white relative group aspect-[2.1/1] sm:aspect-[2.4/1]">
        {/* Slide Display */}
        {slides.map((slide, index) => {
          if (index !== currentSlide) return null;

          if (slide.type === 'image') {
            return (
              <div
                key={slide.id}
                onClick={() => setActivePage('profiles')}
                className="w-full h-full cursor-pointer relative bg-slate-900"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover sm:object-contain bg-slate-900"
                />
              </div>
            );
          }

          return (
            <div
              key={slide.id}
              onClick={() => setActivePage('profiles')}
              className={`w-full h-full bg-gradient-to-r ${slide.theme} text-white p-4 sm:p-5 flex flex-col justify-between cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{slide.badge}</span>
                </span>
                <span className="text-[10px] text-slate-300 font-mono">042 36307676</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-nastaliq text-base sm:text-lg font-bold text-white line-clamp-1">
                  {slide.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {slide.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp: {slide.whatsapp}</span>
                </div>
                <span className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1 rounded-full shadow-xs">
                  {slide.actionText}
                </span>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center space-x-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === i ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
