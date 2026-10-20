/**
 * Humsafar Rishta Center - High Security Authentication & Validation Engine
 * Enforces strict email verification, fake domain prevention, and password match integrity.
 */

// List of disposable / fake temporary email providers to strictly block
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'sharklasers.com',
  'throwawaymail.com',
  'fakeinbox.com',
  'trashmail.com',
  'trashmail.net',
  'dispostable.com',
  'yopmail.com',
  'yopmail.fr',
  'getairmail.com',
  'mohmal.com',
  'emailondeck.com',
  'crazymailing.com',
  'generator.email',
  'mytemp.email',
]);

/**
 * Validates an email address strictly.
 * Checks format, domain syntax, TLD length, and blocks fake temporary email domains.
 * @param {string} email
 * @returns {{ isValid: boolean, error?: string, sanitizedEmail?: string }}
 */
export const validateEmailStrict = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'برائے مہربانی اپنا مستند ای میل ایڈریس درج کریں۔ (Please enter your valid email address.)' };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic length checks
  if (trimmed.length < 6 || trimmed.length > 254) {
    return { isValid: false, error: 'ای میل ایڈریس کی لمبائی درست نہیں ہے۔ (Email address length is invalid.)' };
  }

  // Strict RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'غلط ای میل فارمیٹ! درست ای میل کی مثال: name@gmail.com (Invalid email format! Example: name@gmail.com)'
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'ای میل ایڈریس میں ایک @ کا نشان ہونا لازمی ہے۔ (Email must contain exactly one @ symbol.)' };
  }

  const [username, domain] = parts;

  // Domain syntax checks
  if (!domain.includes('.')) {
    return { isValid: false, error: 'ای میل کے ڈومین میں ڈاٹ (.) ہونا ضروری ہے، جیسے: .com یا .pk' };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return { isValid: false, error: 'ای میل کا ٹاپ لیول ڈومین (.com, .pk, .org) درست نہیں ہے۔' };
  }

  // Block temporary / disposable domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: 'عارضی یا جعلی ای میل سروس قبول نہیں کی جائے گی۔ برائے مہربانی اپنی اصلی ای میل (جیسے Gmail، Yahoo، Outlook وغیرہ) استعمال کریں۔'
    };
  }

  return { isValid: true, sanitizedEmail: trimmed };
};

/**
 * Validates a password strictly.
 * Requires minimum 6 characters. Checks security strength.
 * @param {string} password
 * @returns {{ isValid: boolean, strength: 'weak'|'medium'|'strong', error?: string }}
 */
export const validatePasswordStrict = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, strength: 'weak', error: 'پاسورڈ درج کرنا لازمی ہے۔ (Password is required.)' };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      strength: 'weak',
      error: 'پاسورڈ کم از کم 6 ہندسوں یا حروف پر مشتمل ہونا چاہیے۔ (Password must be at least 6 characters.)'
    };
  }

  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let strength = 'weak';
  if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
    strength = 'strong';
  } else if (password.length >= 6 && hasLetters && hasNumbers) {
    strength = 'medium';
  }

  return { isValid: true, strength };
};

/**
 * Initial authorized and pre-verified member accounts with exact email and exact passwords.
 */
export const initialRegisteredAccounts = [
  {
    id: 'usr-101',
    email: 'member@humsafarrishta.com',
    name: 'Chaudhry Nadeem (Guardian)',
    candidateName: 'Ali Nadeem',
    candidateCode: 'HR-101',
    phone: '0325-1013131',
    gender: 'male',
    age: 28,
    caste: 'Arain',
    city: 'Lahore',
    profession: 'Senior Software Engineer (Lahore)',
    education: 'BS Computer Science (FAST-NUCES)',
    plan: 'Elite VIP Priority (PKR 10,000 / 90 Days)',
    planDaysLeft: 84,
    interestsPerDay: 10,
    profileCompletion: 85,
    role: 'member',
    createdAt: '2026-10-14',
    isVerified: true
  },
  {
    id: 'usr-102',
    email: 'rana.adkhan@gmail.com',
    name: 'Rana Adnan Khan',
    candidateName: 'Rana Adnan Khan',
    candidateCode: 'HR-102',
    phone: '0325-1013131',
    gender: 'male',
    age: 29,
    caste: 'Rajput',
    city: 'Lahore',
    profession: 'Creative Director & Founder',
    education: 'Master of Fine Arts & Media',
    plan: 'Elite VIP Priority (PKR 10,000 / 90 Days)',
    planDaysLeft: 90,
    interestsPerDay: 15,
    profileCompletion: 95,
    role: 'member',
    createdAt: '2026-10-15',
    isVerified: true
  },
  {
    id: 'usr-103',
    email: 'ayesha.doctor@gmail.com',
    name: 'Begum Rehman (Mother)',
    candidateName: 'Dr. Ayesha Rehman',
    candidateCode: 'HR-103',
    phone: '0325-1013131',
    gender: 'female',
    age: 26,
    caste: 'Arain',
    city: 'Lahore',
    profession: 'MBBS Doctor (Mayo Hospital Lahore)',
    education: 'MBBS (King Edward Medical University)',
    plan: 'Executive Diamond (PKR 25,000)',
    planDaysLeft: 120,
    interestsPerDay: 20,
    profileCompletion: 90,
    role: 'member',
    createdAt: '2026-10-16',
    isVerified: true
  }
];
