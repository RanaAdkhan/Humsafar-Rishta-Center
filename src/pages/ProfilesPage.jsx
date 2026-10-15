import React, { useState, useMemo } from 'react';
import { useRishta } from '../context/RishtaContext';
import { ProfileCard } from '../components/ProfileCard';
import { casteList, cityList } from '../data/initialProfiles';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Users,
  CheckCircle2,
  X,
  ChevronDown
} from 'lucide-react';

export const ProfilesPage = () => {
  const { profiles, searchFilters, setSearchFilters, resetFilters } = useRishta();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Filter logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Must be approved to be publicly viewable
      if (p.status !== 'approved') return false;

      // Gender filter
      if (searchFilters.gender !== 'all' && p.gender !== searchFilters.gender) {
        return false;
      }

      // Caste filter
      if (searchFilters.caste !== 'All Castes' && !p.caste.toLowerCase().includes(searchFilters.caste.split(' ')[0].toLowerCase())) {
        return false;
      }

      // City filter
      if (searchFilters.city !== 'All Locations') {
        const cityKey = searchFilters.city.split(',')[0].trim().toLowerCase();
        if (!p.city.toLowerCase().includes(cityKey) && !p.country.toLowerCase().includes(cityKey)) {
          return false;
        }
      }

      // Marital status
      if (searchFilters.maritalStatus !== 'all' && !p.maritalStatus.toLowerCase().includes(searchFilters.maritalStatus.toLowerCase())) {
        return false;
      }

      // Age range filter
      if (searchFilters.ageRange && searchFilters.ageRange !== 'all') {
        const parts = searchFilters.ageRange.split('-');
        const rMin = parseInt(parts[0], 10) || 18;
        const rMax = parseInt(parts[1], 10) || 100;
        if (p.age < rMin || p.age > rMax) {
          return false;
        }
      } else {
        const min = parseInt(searchFilters.minAge) || 18;
        const max = parseInt(searchFilters.maxAge) || 70;
        if (p.age < min || p.age > max) {
          return false;
        }
      }

      // Keyword search (name, code, profession, education, location)
      if (searchFilters.searchKeyword.trim() !== '') {
        const query = searchFilters.searchKeyword.toLowerCase();
        const matches =
          p.code.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.profession.toLowerCase().includes(query) ||
          p.education.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.caste.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    });
  }, [profiles, searchFilters]);

  // Sorting
  const sortedProfiles = useMemo(() => {
    const list = [...filteredProfiles];
    if (sortBy === 'ageAsc') {
      return list.sort((a, b) => a.age - b.age);
    }
    if (sortBy === 'ageDesc') {
      return list.sort((a, b) => b.age - a.age);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    // Default: featured first, then newest
    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [filteredProfiles, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Banner - Sapphire Blue Theme */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600/50 text-blue-200 text-xs font-semibold mb-3">
                <Search className="w-3.5 h-3.5 text-blue-300" />
                <span>SAPPHIRE DIRECTORY • VERIFIED PROPOSALS</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Browse Matrimonial Proposals
              </h1>
              <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
                Explore handpicked, verified biodatas of Doctors, Engineers, Corporate Professionals and Business Families.
              </p>
            </div>

            {/* Quick Keyword Search Box in Hero */}
            <div className="w-full md:w-80 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center">
              <Search className="w-5 h-5 text-blue-200 ml-3" />
              <input
                type="text"
                placeholder="Search by ID, Job, Caste..."
                value={searchFilters.searchKeyword}
                onChange={(e) => setSearchFilters({ ...searchFilters, searchKeyword: e.target.value })}
                className="w-full bg-transparent text-white placeholder-blue-200/70 text-sm px-3 py-2 focus:outline-none"
              />
              {searchFilters.searchKeyword && (
                <button
                  onClick={() => setSearchFilters({ ...searchFilters, searchKeyword: '' })}
                  className="p-1 text-blue-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content & Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-28 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-blue-700" />
                  <span className="font-bold text-slate-900 text-sm">Filter Proposals</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Gender</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  {['all', 'female', 'male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSearchFilters({ ...searchFilters, gender: g })}
                      className={`text-xs py-1.5 rounded-lg font-semibold transition-all capitalize ${
                        searchFilters.gender === g
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {g === 'all' ? 'All' : g === 'female' ? 'Bride' : 'Groom'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                  Age Range
                </label>
                <select
                  value={searchFilters.ageRange || 'all'}
                  onChange={(e) => {
                    const val = e.target.value;
                    let min = 18;
                    let max = 70;
                    if (val === '18-25') { min = 18; max = 25; }
                    else if (val === '26-32') { min = 26; max = 32; }
                    else if (val === '33-40') { min = 33; max = 40; }
                    else if (val === '40-70') { min = 40; max = 70; }
                    setSearchFilters({ ...searchFilters, ageRange: val, minAge: min, maxAge: max });
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600 mb-2"
                >
                  <option value="all">All Ages</option>
                  <option value="18-25">18 - 25 Years</option>
                  <option value="26-32">26 - 32 Years</option>
                  <option value="33-40">33 - 40 Years</option>
                  <option value="40-70">40+ Years</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="18"
                    max="60"
                    value={searchFilters.minAge}
                    onChange={(e) => setSearchFilters({ ...searchFilters, minAge: e.target.value, ageRange: 'custom' })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Min Age"
                  />
                  <input
                    type="number"
                    min="18"
                    max="70"
                    value={searchFilters.maxAge}
                    onChange={(e) => setSearchFilters({ ...searchFilters, maxAge: e.target.value, ageRange: 'custom' })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Max Age"
                  />
                </div>
              </div>

              {/* Caste / Community Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Caste / Community</label>
                <select
                  value={searchFilters.caste}
                  onChange={(e) => setSearchFilters({ ...searchFilters, caste: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {casteList.map((caste) => (
                    <option key={caste} value={caste}>{caste}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Location / City</label>
                <select
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Marital Status Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Marital Status</label>
                <select
                  value={searchFilters.maritalStatus}
                  onChange={(e) => setSearchFilters({ ...searchFilters, maritalStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="all">All Marital Statuses</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Profiles Area */}
          <main className="flex-1">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-slate-900 text-sm">
                  Showing <span className="text-blue-700">{sortedProfiles.length}</span> Verified Proposals
                </span>
                {searchFilters.gender !== 'all' && (
                  <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full capitalize">
                    {searchFilters.gender === 'female' ? 'Brides' : 'Grooms'}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                  className="lg:hidden flex items-center space-x-1.5 py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500 font-medium hidden sm:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="recommended">Recommended & Featured</option>
                    <option value="newest">Recently Registered</option>
                    <option value="ageAsc">Age: Youngest First</option>
                    <option value="ageDesc">Age: Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown if open */}
            {filterDrawerOpen && (
              <div className="lg:hidden bg-white p-5 rounded-2xl border border-blue-200 shadow-md mb-6 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">Filters</span>
                  <button onClick={resetFilters} className="text-xs text-blue-600 font-semibold">
                    Reset All
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Gender</label>
                    <select
                      value={searchFilters.gender}
                      onChange={(e) => setSearchFilters({ ...searchFilters, gender: e.target.value })}
                      className="w-full p-2 border rounded-xl"
                    >
                      <option value="all">All</option>
                      <option value="female">Bride</option>
                      <option value="male">Groom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Caste</label>
                    <select
                      value={searchFilters.caste}
                      onChange={(e) => setSearchFilters({ ...searchFilters, caste: e.target.value })}
                      className="w-full p-2 border rounded-xl"
                    >
                      {casteList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">City</label>
                    <select
                      value={searchFilters.city}
                      onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                      className="w-full p-2 border rounded-xl"
                    >
                      {cityList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Status</label>
                    <select
                      value={searchFilters.maritalStatus}
                      onChange={(e) => setSearchFilters({ ...searchFilters, maritalStatus: e.target.value })}
                      className="w-full p-2 border rounded-xl"
                    >
                      <option value="all">Any Status</option>
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Age Range</label>
                    <select
                      value={searchFilters.ageRange || 'all'}
                      onChange={(e) => {
                        const val = e.target.value;
                        let min = 18;
                        let max = 70;
                        if (val === '18-25') { min = 18; max = 25; }
                        else if (val === '26-32') { min = 26; max = 32; }
                        else if (val === '33-40') { min = 33; max = 40; }
                        else if (val === '40-70') { min = 40; max = 70; }
                        setSearchFilters({ ...searchFilters, ageRange: val, minAge: min, maxAge: max });
                      }}
                      className="w-full p-2 border rounded-xl"
                    >
                      <option value="all">All Ages</option>
                      <option value="18-25">18 - 25 Years</option>
                      <option value="26-32">26 - 32 Years</option>
                      <option value="33-40">33 - 40 Years</option>
                      <option value="40-70">40+ Years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Grid */}
            {sortedProfiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {sortedProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">No Matching Proposals Found</h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  We couldn't find profiles matching your exact filter criteria. Try broadening your caste, city or age filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs hover:bg-blue-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
