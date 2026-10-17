import React, { useRef } from 'react';
import { Image as ImageIcon, ChevronRight, ChevronLeft, GraduationCap, Stethoscope, BookOpen, Building2, Globe2 } from 'lucide-react';
import { useRishta } from '../context/RishtaContext';

export const AppServicesGallery = () => {
  const { setActivePage, setSearchFilters, language } = useRishta();
  const scrollRef = useRef(null);

  const categories = [
    {
      id: 'doctors',
      title: language === 'ur' ? 'ڈاکٹرز و میڈیکل' : 'Doctors & Medical',
      sub: language === 'ur' ? 'MBBS, FCPS، فارماسسٹ' : 'MBBS, BDS, FCPS Specialists',
      icon: Stethoscope,
      bg: 'from-emerald-700 to-teal-800',
      categoryFilter: 'Doctors & Medical'
    },
    {
      id: 'engineers',
      title: language === 'ur' ? 'انجینئرز و آئی ٹی' : 'Engineers & Tech',
      sub: language === 'ur' ? 'سافٹ ویئر، سول، الیکٹریکل' : 'Software, AI, Civil, Telecom',
      icon: GraduationCap,
      bg: 'from-blue-700 to-indigo-900',
      categoryFilter: 'Engineers & Corporate'
    },
    {
      id: 'madaris',
      title: language === 'ur' ? 'دینی مدارس و علماء' : 'Madaris & Scholars',
      sub: language === 'ur' ? 'وفاق المدارس، عالم و فاضل' : 'Dars-e-Nizami, Aalima, Huffaz',
      icon: BookOpen,
      bg: 'from-amber-700 to-yellow-900',
      categoryFilter: 'Religious Seminaries (Madaris)'
    },
    {
      id: 'business',
      title: language === 'ur' ? 'بزنس و صنعت کار' : 'Business Families',
      sub: language === 'ur' ? 'معزز اور مستحکم خاندان' : 'Established Industrialists',
      icon: Building2,
      bg: 'from-purple-800 to-slate-900',
      categoryFilter: 'Business & Industrialists'
    },
    {
      id: 'overseas',
      title: language === 'ur' ? 'اوورسیز پاکستانی' : 'Overseas Network',
      sub: language === 'ur' ? 'برطانیہ، کینیڈا، امریکہ، گلف' : 'UK, USA, Canada, Middle East',
      icon: Globe2,
      bg: 'from-teal-800 to-slate-900',
      categoryFilter: 'Overseas Pakistani'
    }
  ];

  const handleCategoryClick = (categoryFilter) => {
    setSearchFilters(prev => ({
      ...prev,
      category: categoryFilter
    }));
    setActivePage('profiles');
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="mx-4 mt-3">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
        {/* Header matching user screenshot */}
        <div className="flex items-center justify-between">
          {/* Left: View All Pill Button */}
          <button
            onClick={() => setActivePage('profiles')}
            className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1 border border-emerald-200/60 transition-colors"
          >
            <span>{language === 'ur' ? 'تمام دیکھیں' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Right: Section Title with Image Icon */}
          <div className="flex items-center space-x-2 text-right">
            <h3 className="font-nastaliq text-sm sm:text-base font-bold text-slate-900">
              {language === 'ur' ? 'رشتہ سروسز کی تصویری جھلکیاں' : 'Featured Proposal Categories'}
            </h3>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Horizontal Category Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.categoryFilter)}
                className={`min-w-[140px] sm:min-w-[150px] p-3 rounded-2xl bg-gradient-to-br ${cat.bg} text-white shadow-md cursor-pointer hover:scale-102 active:scale-98 transition-all shrink-0 snap-start flex flex-col justify-between h-28 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                </div>

                <div>
                  <h4 className="font-nastaliq text-xs sm:text-sm font-bold leading-tight">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] text-slate-200 line-clamp-1 mt-0.5">
                    {cat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Scroll / Indicator Bar matching screenshot */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-slate-400">
          <button
            onClick={scrollLeft}
            className="p-1 hover:text-slate-800 rounded transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-slate-400 rounded-full"></div>
          </div>

          <button
            onClick={scrollRight}
            className="p-1 hover:text-slate-800 rounded transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
