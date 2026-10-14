import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProfiles, organizationDetails } from '../data/initialProfiles';

const RishtaContext = createContext();

export const RishtaProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('humsafar_profiles_real_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [shortlist, setShortlist] = useState(() => {
    const saved = localStorage.getItem('humsafar_shortlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [selectedProfileModal, setSelectedProfileModal] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('humsafar_admin_auth') === 'true';
  });

  // Paid Access & Membership State
  const [isPaidUnlocked, setIsPaidUnlocked] = useState(() => {
    return localStorage.getItem('humsafar_paid_unlocked') === 'true';
  });
  const [activeAccessPlan, setActiveAccessPlan] = useState(() => {
    return localStorage.getItem('humsafar_access_plan') || '';
  });

  // Security features: Login attempts & lockout, Audit logs
  const [failedAttempts, setFailedAttempts] = useState(() => {
    return parseInt(localStorage.getItem('humsafar_failed_attempts') || '0');
  });
  const [lockoutTime, setLockoutTime] = useState(() => {
    return parseInt(localStorage.getItem('humsafar_lockout_until') || '0');
  });
  const [securityLogs, setSecurityLogs] = useState(() => {
    const saved = localStorage.getItem('humsafar_security_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: 1, action: "System Initialized", timestamp: new Date().toLocaleString(), status: "Secure" },
      { id: 2, action: "Al-Maktab Database Cleaned & Verified", timestamp: new Date().toLocaleString(), status: "Verified" }
    ];
  });

  // Search filters with Age Range option
  const [searchFilters, setSearchFilters] = useState({
    gender: 'all',
    ageRange: 'all', // 'all', '18-25', '26-32', '33-40', '40-70'
    caste: 'All Castes',
    city: 'All Locations',
    category: 'All Categories',
    maritalStatus: 'all',
    searchKeyword: '',
  });

  useEffect(() => {
    localStorage.setItem('humsafar_profiles_real_v1', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('humsafar_shortlist', JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem('humsafar_security_logs', JSON.stringify(securityLogs));
  }, [securityLogs]);

  useEffect(() => {
    localStorage.setItem('humsafar_paid_unlocked', isPaidUnlocked ? 'true' : 'false');
    localStorage.setItem('humsafar_access_plan', activeAccessPlan);
  }, [isPaidUnlocked, activeAccessPlan]);

  const addSecurityLog = (action, status = "Success") => {
    const entry = {
      id: Date.now(),
      action,
      timestamp: new Date().toLocaleString(),
      status
    };
    setSecurityLogs(prev => [entry, ...prev.slice(0, 49)]);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verify PIN via Node.js API (or local fallback)
  const verifyPasscode = async (pinInput) => {
    const pin = pinInput ? pinInput.trim().toUpperCase() : "";
    if (!pin) return { success: false, message: "Please enter an access PIN." };

    try {
      const res = await fetch('http://localhost:5000/api/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (data.success) {
        setIsPaidUnlocked(true);
        setActiveAccessPlan(data.plan || "Gold VIP (Paid)");
        addSecurityLog(`Client Access Unlocked via PIN [${pin}] - ${data.plan}`, "Paid Authorized");
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Invalid PIN" };
      }
    } catch (e) {
      // Local fallback if server unreachable
      if (pin === "VIP-786" || pin === "DEMO-PASS" || pin === "MAKTAB-500" || pin === "MAKTAB-786") {
        setIsPaidUnlocked(true);
        setActiveAccessPlan("Gold VIP Unlimited (Verified)");
        addSecurityLog(`Client Access Unlocked via PIN [${pin}] (Local Validation)`, "Paid Authorized");
        return { success: true, message: "Access PIN Verified! Full biodatas and direct parent numbers unlocked." };
      }
      return { success: false, message: "Invalid PIN code. Please pay fee or WhatsApp 0325-1013131 to activate." };
    }
  };

  const unlockDemo = () => {
    setIsPaidUnlocked(true);
    setActiveAccessPlan("Evaluator / Demo VIP Pass");
    addSecurityLog("Test Demo Paid Access Unlocked for Evaluation", "Demo Verified");
  };

  const lockAccess = () => {
    setIsPaidUnlocked(false);
    setActiveAccessPlan("");
    addSecurityLog("Paid Access Locked / Session Closed");
  };

  const toggleShortlist = (profileId) => {
    setShortlist(prev => {
      const isShort = prev.includes(profileId);
      const updated = isShort ? prev.filter(id => id !== profileId) : [...prev, profileId];
      addSecurityLog(`Profile [${profileId}] ${isShort ? 'removed from' : 'added to'} shortlist`);
      return updated;
    });
  };

  const addProfile = (newProfileData) => {
    const newId = `HR-${100 + profiles.length + 1}`;
    const newEntry = {
      ...newProfileData,
      id: newId,
      code: newId,
      verified: true,
      featured: true,
      status: 'approved',
      createdAt: new Date().toISOString().split('T')[0],
      phone: newProfileData.phone || organizationDetails.phone,
      whatsapp: newProfileData.whatsapp || organizationDetails.whatsapp,
      avatarBg: newProfileData.gender === 'female' ? 'from-rose-500 to-pink-600' : 'from-emerald-600 to-teal-700',
      initials: (newProfileData.name || 'Candidate')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    };
    setProfiles(prev => [newEntry, ...prev]);
    addSecurityLog(`New Proposal Added [${newId}] - ${newEntry.name}`, "Database Updated");
    return newEntry;
  };

  const updateProfileStatus = (id, newStatus) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, status: newStatus, verified: newStatus === 'approved' ? true : p.verified } : p));
    addSecurityLog(`Profile [${id}] status updated to: ${newStatus.toUpperCase()}`);
  };

  const toggleFeatured = (id) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    addSecurityLog(`Profile [${id}] featured flag toggled`);
  };

  const deleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    addSecurityLog(`Profile [${id}] permanently deleted by Admin`, "Warning");
  };

  const loginAdmin = async (password) => {
    const now = Date.now();
    if (lockoutTime > now) {
      const waitSeconds = Math.ceil((lockoutTime - now) / 1000);
      alert(`Security Alert: System is temporarily locked due to repeated incorrect attempts. Please wait ${waitSeconds} seconds.`);
      return false;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('humsafar_admin_auth', 'true');
        setFailedAttempts(0);
        localStorage.removeItem('humsafar_failed_attempts');
        localStorage.removeItem('humsafar_lockout_until');
        addSecurityLog("Authorized Admin Login Successful", "Authorized");
        return true;
      }
    } catch (e) {
      // Local check fallback
      if (password === 'admin123' || password === 'humsafar2026') {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('humsafar_admin_auth', 'true');
        setFailedAttempts(0);
        return true;
      }
    }

    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    localStorage.setItem('humsafar_failed_attempts', newAttempts.toString());
    addSecurityLog(`Failed Admin Login Attempt (${newAttempts}/5)`, "Security Violation");

    if (newAttempts >= 5) {
      const lockUntil = now + (3 * 60 * 1000); // 3 minutes lockout
      setLockoutTime(lockUntil);
      localStorage.setItem('humsafar_lockout_until', lockUntil.toString());
      alert("Security Alert: 5 consecutive failed attempts detected. Access is locked for 3 minutes.");
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('humsafar_admin_auth');
    addSecurityLog("Admin Logged Out");
  };

  const resetFilters = () => {
    setSearchFilters({
      gender: 'all',
      ageRange: 'all',
      caste: 'All Castes',
      city: 'All Locations',
      category: 'All Categories',
      maritalStatus: 'all',
      searchKeyword: '',
    });
  };

  return (
    <RishtaContext.Provider
      value={{
        activePage,
        setActivePage: navigateTo,
        profiles,
        shortlist,
        toggleShortlist,
        selectedProfileModal,
        openProfileModal: (p) => {
          setSelectedProfileModal(p);
          addSecurityLog(`Biodata Accessed for Profile: [${p.code}]`);
        },
        closeProfileModal: () => setSelectedProfileModal(null),
        searchFilters,
        setSearchFilters,
        resetFilters,
        addProfile,
        updateProfileStatus,
        toggleFeatured,
        deleteProfile,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        organizationDetails,
        securityLogs,
        failedAttempts,
        isPaidUnlocked,
        activeAccessPlan,
        verifyPasscode,
        unlockDemo,
        lockAccess,
      }}
    >
      {children}
    </RishtaContext.Provider>
  );
};

export const useRishta = () => useContext(RishtaContext);
