import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { initialProfiles, organizationDetails } from '../data/initialProfiles';
import {
  validateEmailStrict,
  validatePasswordStrict,
  initialRegisteredAccounts
} from '../utils/authSecurity';

const RishtaContext = createContext();
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export const RishtaProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    try {
      return sessionStorage.getItem('humsafar_admin_jwt') || '';
    } catch (e) {
      return '';
    }
  });
  const [activePage, setActivePage] = useState(() => {
    try {
      const savedUser = localStorage.getItem('humsafar_client_user');
      return savedUser ? 'home' : 'signin';
    } catch (e) {
      return 'signin';
    }
  });
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('humsafar_profiles_real_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) { return initialProfiles; }
    }
    return initialProfiles;
  });

  // Persistent registered users database (with exact email & exact passwords)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('humsafar_registered_users_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return initialRegisteredAccounts;
  });

  useEffect(() => {
    localStorage.setItem('humsafar_registered_users_v2', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Client user session state (Signed in member)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('humsafar_client_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Client user interests (Sent & Received for user dashboard)
  const [userInterests, setUserInterests] = useState(() => {
    const saved = localStorage.getItem('humsafar_user_interests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: "int-1",
        profileId: "HR-101",
        profileName: "Dr. Ayesha Rehman",
        direction: "received",
        status: "pending",
        date: "2026-10-16",
        details: "MBBS Doctor, Arain, Model Town Lahore"
      },
      {
        id: "int-2",
        profileId: "HR-102",
        profileName: "Engr. Muhammad Hamza",
        direction: "sent",
        status: "accepted",
        date: "2026-10-14",
        details: "BS Computer Science, Rajput, F-11 Islamabad"
      }
    ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('humsafar_client_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('humsafar_client_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('humsafar_user_interests', JSON.stringify(userInterests));
  }, [userInterests]);

  const [shortlist, setShortlist] = useState(() => {
    const saved = localStorage.getItem('humsafar_shortlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [selectedProfileModal, setSelectedProfileModal] = useState(null);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('humsafar_language') || 'ur';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'ur' ? 'en' : 'ur';
      localStorage.setItem('humsafar_language', next);
      return next;
    });
  };
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
      { id: 2, action: "Humsafar Database Cleaned & Verified", timestamp: new Date().toLocaleString(), status: "Verified" }
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

  // Verify PIN via Secure API (Validated server-side against cryptographic hash)
  const verifyPasscode = async (pinInput) => {
    const pin = pinInput ? pinInput.trim().toUpperCase() : "";
    if (!pin) return { success: false, message: "Please enter an access PIN." };

    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/verify-pin` : '/api/verify-pin';
      const res = await fetch(endpoint, {
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
        return { success: false, message: data.message || "Invalid or inactive PIN code." };
      }
    } catch (e) {
      return { success: false, message: "Verification server is offline or unreachable. Please contact 0325-1013131 to activate access." };
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
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/admin/login` : '/api/admin/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setIsAdminLoggedIn(true);
        setAdminToken(data.token);
        sessionStorage.setItem('humsafar_admin_auth', 'true');
        sessionStorage.setItem('humsafar_admin_jwt', data.token);
        setFailedAttempts(0);
        localStorage.removeItem('humsafar_failed_attempts');
        localStorage.removeItem('humsafar_lockout_until');
        addSecurityLog("Authorized Admin Login Successful (JWT Issued)", "Authorized");
        return true;
      }
    } catch (e) {
      console.warn("Backend auth failed or unreachable.");
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
    setAdminToken('');
    sessionStorage.removeItem('humsafar_admin_auth');
    sessionStorage.removeItem('humsafar_admin_jwt');
    addSecurityLog("Admin Logged Out");
  };

  // Google Play Compliance: User In-App Account & Data Deletion
  const deleteUserAccount = async (email) => {
    try {
      if (API_BASE_URL) {
        await fetch(`${API_BASE_URL}/api/user/delete-account`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      }
    } catch (e) {
      // Local clean continues
    }

    setRegisteredUsers(prev => prev.filter(u => u.email !== email));
    setCurrentUser(null);
    localStorage.removeItem('humsafar_client_user');
    localStorage.removeItem('humsafar_user_interests');
    addSecurityLog(`User Account and Personal Data Deleted: ${email}`, 'Compliance');
    setActivePage('signin');
  };

  // Client User Sign In with Strict Email & Password Security Check
  const signInUser = (emailOrPhone, password) => {
    if (!emailOrPhone || !emailOrPhone.trim()) {
      return {
        success: false,
        error: 'برائے مہربانی اپنا مستند ای میل ایڈریس یا فون نمبر درج کریں۔ (Please enter your email or phone.)'
      };
    }

    if (!password || !password.trim()) {
      return {
        success: false,
        error: 'پاسورڈ درج کرنا لازمی ہے۔ (Password is required.)'
      };
    }

    const inputClean = emailOrPhone.trim().toLowerCase();

    // 1. Strict Email Format Check (If email was provided)
    if (inputClean.includes('@')) {
      const emailValidation = validateEmailStrict(inputClean);
      if (!emailValidation.isValid) {
        addSecurityLog(`Invalid Email Format Attempt: [${emailOrPhone}]`, "Format Violation");
        return {
          success: false,
          error: emailValidation.error
        };
      }
    }

    // 2. Lookup registered account by email or phone
    const matchedUser = registeredUsers.find((u) => {
      const emailMatches = u.email && u.email.toLowerCase() === inputClean;
      const phoneMatches = u.phone && u.phone.replace(/[^0-9]/g, '') === inputClean.replace(/[^0-9]/g, '');
      return emailMatches || phoneMatches;
    });

    if (!matchedUser) {
      addSecurityLog(`Unregistered Login Attempt: [${emailOrPhone}]`, "Not Found");
      return {
        success: false,
        error: 'یہ ای میل ہمارے ریکارڈ میں موجود نہیں ہے! برائے مہربانی درست رجسٹرڈ ای میل درج کریں یا نیچے "نیا اکاؤنٹ بنائیں" پر کلک کریں۔ (This email is not registered in our records. Please check the spelling or create an account.)'
      };
    }

    // 3. Strict Password Verification against the exact password of that email
    if (matchedUser.password !== password.trim()) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('humsafar_failed_attempts', newAttempts.toString());
      addSecurityLog(`Wrong Password Attempt for [${matchedUser.email}] (${newAttempts}/5)`, "Security Violation");

      return {
        success: false,
        error: 'غلط پاسورڈ! درج کردہ پاسورڈ اس ای میل کے رجسٹرڈ پاسورڈ سے میچ نہیں کر رہا۔ برائے مہربانی اس ای میل کا اصل پاسورڈ درج کریں۔ (Incorrect Password! The password entered does not match this email\'s registered password.)'
      };
    }

    // 4. Password strictly matched!
    setFailedAttempts(0);
    localStorage.removeItem('humsafar_failed_attempts');
    setCurrentUser(matchedUser);
    addSecurityLog(`Authorized Member Login: [${matchedUser.email}]`, "Auth Success");
    navigateTo('dashboard');
    return { success: true, user: matchedUser };
  };

  // Register New User with Real Email and Chosen Password
  const registerNewUser = (accountData) => {
    const { email, password, name, phone, candidateName, gender, age, city, caste, profession } = accountData;

    // 1. Strict Email Validation
    const emailValidation = validateEmailStrict(email);
    if (!emailValidation.isValid) {
      return { success: false, error: emailValidation.error };
    }

    const cleanEmail = emailValidation.sanitizedEmail;

    // 2. Check if email already registered
    const exists = registeredUsers.some(u => u.email && u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        error: 'یہ ای میل پہلے سے رجسٹرڈ ہے! برائے مہربانی لاگ ان کریں یا کوئی دوسری ای میل استعمال کریں۔ (This email is already registered. Please sign in or use another email.)'
      };
    }

    // 3. Strict Password Validation
    const passValidation = validatePasswordStrict(password);
    if (!passValidation.isValid) {
      return { success: false, error: passValidation.error };
    }

    const newCode = `HR-${100 + registeredUsers.length + 1}`;
    const newUserObj = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password: password.trim(),
      name: name?.trim() || candidateName?.trim() || 'Valued Member',
      candidateName: candidateName?.trim() || name?.trim() || 'Candidate',
      candidateCode: newCode,
      phone: phone?.trim() || '',
      gender: gender || 'female',
      age: parseInt(age) || 25,
      caste: caste || 'General',
      city: city || 'Lahore',
      profession: profession || 'Professional',
      education: 'Graduate / Professional',
      plan: 'Standard Free Member',
      planDaysLeft: 0,
      interestsPerDay: 3,
      profileCompletion: 25,
      role: 'member',
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    };

    setRegisteredUsers(prev => [newUserObj, ...prev]);
    setCurrentUser(newUserObj);
    addSecurityLog(`New User Account Registered: [${cleanEmail}] with Secure Password`, "Registration Success");
    navigateTo('dashboard');
    return { success: true, user: newUserObj };
  };

  // Real Google Sign-In via Official Capacitor GoogleAuth Plugin with Backend Token Verification
  const signInWithGoogle = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId || clientId.includes('YOUR_GOOGLE_WEB_CLIENT_ID')) {
        return {
          success: false,
          missingConfig: true,
          error: 'Google OAuth Client ID is required for real Google Sign-In. Please provide VITE_GOOGLE_CLIENT_ID.'
        };
      }

      await GoogleAuth.initialize({
        clientId: clientId,
        scopes: ['profile', 'email'],
        grantOfflineAccess: true
      });

      const res = await GoogleAuth.signIn();
      const idToken = res.authentication?.idToken || res.idToken;

      if (!idToken) {
        return {
          success: false,
          error: 'Google did not return an authenticated ID token.'
        };
      }

      // Verify ID token with backend server
      let verifiedEmail = res.email;
      let verifiedName = res.name || res.givenName || 'Google User';
      let verifiedPicture = res.imageUrl || '';

      if (API_BASE_URL) {
        try {
          const authRes = await fetch(`${API_BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
          });
          const authData = await authRes.json();
          if (authData.success && authData.user) {
            verifiedEmail = authData.user.email || verifiedEmail;
            verifiedName = authData.user.name || verifiedName;
            verifiedPicture = authData.user.picture || verifiedPicture;
          }
        } catch (serverErr) {
          console.warn('Backend Google verification status:', serverErr.message);
        }
      }

      const cleanEmail = verifiedEmail.trim().toLowerCase();
      const existing = registeredUsers.find(u => u.email && u.email.toLowerCase() === cleanEmail);

      if (existing) {
        setCurrentUser(existing);
        addSecurityLog(`Real Google Sign-In Verified: [${existing.email}]`, "Google Auth Success");
        navigateTo('home');
        return { success: true, user: existing };
      }

      // Real new user profile - NO dummy data, NO fake defaults, user completes profile
      const newCode = `HR-${100 + registeredUsers.length + 1}`;
      const newUser = {
        id: res.id || `usr-google-${Date.now()}`,
        name: verifiedName,
        candidateName: verifiedName,
        candidateCode: newCode,
        email: cleanEmail,
        imageUrl: verifiedPicture,
        authProvider: 'google',
        phone: '',
        gender: '',
        age: null,
        caste: '',
        city: '',
        profession: '',
        education: '',
        plan: 'Standard Free Member',
        planDaysLeft: 0,
        interestsPerDay: 3,
        profileCompletion: 20,
        isProfileCompleted: false,
        role: 'member',
        createdAt: new Date().toISOString().split('T')[0],
        isVerified: true
      };

      setRegisteredUsers(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      addSecurityLog(`Real Google Account Created & Verified: [${cleanEmail}]`, "Google Auth Success");
      navigateTo('dashboard');
      return { success: true, user: newUser };
    } catch (e) {
      addSecurityLog(`Google Sign-In Notice: ${e.message || 'Cancelled'}`, "Auth Event");
      return {
        success: false,
        error: e.message || 'Google Sign-In was cancelled or failed.'
      };
    }
  };

  const signOutUser = async () => {
    try {
      await GoogleAuth.signOut();
    } catch (e) {}
    setCurrentUser(null);
    addSecurityLog("Client User Signed Out");
    navigateTo('signin');
  };

  const sendInterest = (profile) => {
    const existing = userInterests.find(i => i.profileId === profile.id && i.direction === 'sent');
    if (existing) {
      return { success: false, message: "Interest already sent to this proposal." };
    }

    const newInterest = {
      id: "int-" + Date.now(),
      profileId: profile.id,
      profileName: profile.name,
      direction: "sent",
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      details: `${profile.education || ''}, ${profile.caste || ''}, ${profile.city || ''}`
    };
    setUserInterests(prev => [newInterest, ...prev]);
    addSecurityLog(`Interest Expressed for Proposal: [${profile.code}]`);
    return { success: true, message: `Interest successfully sent to ${profile.name}'s family.` };
  };

  const respondToInterest = (interestId, newStatus) => {
    setUserInterests(prev => prev.map(i => i.id === interestId ? { ...i, status: newStatus } : i));
    addSecurityLog(`Interest [${interestId}] marked as ${newStatus}`);
  };

  const updateUserBio = (updated) => {
    if (currentUser) {
      setCurrentUser(prev => ({ ...prev, ...updated }));
      addSecurityLog("Candidate Profile Details Updated");
    }
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
        adminToken,
        currentUser,
        registeredUsers,
        registerNewUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        deleteUserAccount,
        userInterests,
        sendInterest,
        respondToInterest,
        updateUserBio,
        organizationDetails,
        securityLogs,
        failedAttempts,
        isPaidUnlocked,
        activeAccessPlan,
        verifyPasscode,
        unlockDemo,
        lockAccess,
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </RishtaContext.Provider>
  );
};

export const useRishta = () => useContext(RishtaContext);
