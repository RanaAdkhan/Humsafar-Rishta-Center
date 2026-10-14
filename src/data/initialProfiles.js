import logoAlMaktab from '../assets/images/al_maktab_logo.png';
import bannerImage from '../assets/images/humsafar_banner.png';
import logoHumsafar from '../assets/images/humsafar_logo.png';

export const organizationDetails = {
  name: "Humsafar Rishta Centre",
  urduName: "ہمسفر رشتہ سنٹر",
  parentOrg: "Al-Maktab Educational Foundation",
  urduParentOrg: "المکتب ایجوکیشنل فاؤنڈیشن کے زیرِ اہتمام",
  tagline: "Auspicious & Dignified Matrimonial Matchmaking",
  motto: "زندگی کے سفر کا سچا ہمسفر",
  phone: "042 36307676",
  phoneDisplay: "042 36307676",
  whatsapp: "+92 325 1013131",
  whatsappClean: "923251013131",
  email: "info@humsafarrishta.com",
  address: "64 Mozang Road, Malik Rehmatullah Street, Near Safanwala Chowk, Opposite PSO Petrol Pump, Lahore",
  urduAddress: "64 مزنگ روڈ، ملک رحمت اللہ سٹریٹ، نزد صفاں والا چوک، بالمقابل پی ایس او پٹرول پمپ، لاہور",
  bannerImage: bannerImage,
  logoAlMaktab: logoAlMaktab,
  logoHumsafar: logoHumsafar,
  specialties: [
    "Educated & Qualified proposals across all Castes, Communities & Sects",
    "Specialized services for Religious Seminaries (Madaris / Dars-e-Nizami / Aalima)",
    "Candidates with Tablighi & Deeni religious mindset",
    "Doctors, Engineers, Corporate Executives & Businessmen",
    "Overseas Pakistani matrimonial network"
  ]
};

// Clean database: Only user-provided and admin-entered verified proposals will be added here
export const initialProfiles = [];

export const casteList = [
  "All Castes",
  "Rajput",
  "Arain",
  "Jatt",
  "Syed",
  "Sheikh",
  "Mughal",
  "Awan",
  "Butt / Kashmiri",
  "Malik",
  "Niazi / Pathan",
  "Gujjar",
  "Qureshi",
  "Abbasi",
  "Ansari",
  "Memon",
  "Other Castes"
];

export const cityList = [
  "All Locations",
  "Lahore, Pakistan",
  "Islamabad, Pakistan",
  "Rawalpindi, Pakistan",
  "Karachi, Pakistan",
  "Faisalabad, Pakistan",
  "Sialkot, Pakistan",
  "Gujranwala, Pakistan",
  "Multan, Pakistan",
  "Peshawar, Pakistan",
  "London, UK",
  "Toronto, Canada",
  "Dubai, UAE",
  "Riyadh, Saudi Arabia"
];

export const categoriesList = [
  "All Categories",
  "Deeni Madaris & Islamic Studies",
  "Tablighi & Practicing Mindset",
  "Educated & Professional",
  "Business & Commerce",
  "Overseas Expatriate"
];

export const packagesData = [
  {
    id: "free",
    name: "Standard Biodata Listing",
    price: "Free",
    period: "Lifetime Access",
    badge: "Basic",
    color: "slate",
    features: [
      "Online Biodata Registration in Directory",
      "Confidential Profile Code (e.g. HR-100)",
      "Access to browse verified proposals",
      "Basic WhatsApp support desk (+92 325 1013131)",
      "Strict photo & family privacy shield"
    ],
    buttonText: "Register Biodata Free",
    action: "register"
  },
  {
    id: "silver",
    name: "Silver Executive Match",
    price: "PKR 7,500",
    period: "3 Months Direct Service",
    badge: "Popular Choice",
    color: "blue",
    features: [
      "15 Verified Handpicked Proposals shared",
      "Guidance from senior Al-Maktab matchmaker",
      "Direct family phone number exchanges upon mutual consent",
      "Photo exchange with strict Shar'i permission",
      "Priority WhatsApp inquiry response (+92 325 1013131)",
      "Proposal replacement guarantee"
    ],
    buttonText: "Choose Silver Plan",
    action: "whatsapp"
  },
  {
    id: "gold",
    name: "Gold VIP Concierge",
    price: "PKR 15,000",
    period: "6 Months Comprehensive Care",
    badge: "Most Recommended",
    color: "amber",
    popular: true,
    features: [
      "Unlimited Verified & Curated Proposals",
      "Dedicated Senior Matchmaker assigned",
      "Physical Background Verification in Lahore & major cities",
      "In-person Family Meeting arrangements at Al-Maktab Office",
      "Deeni & Noble Family Special Focus",
      "Full VIP Confidentiality & Zero Public Disclosure",
      "Continuous support until Rishta is finalized"
    ],
    buttonText: "Enroll in Gold VIP",
    action: "whatsapp"
  },
  {
    id: "overseas",
    name: "Overseas Elite Global",
    price: "$150 / £120",
    period: "International Full Service",
    badge: "Overseas Special",
    color: "emerald",
    features: [
      "Specialized in UK, USA, Canada, UAE & Europe",
      "Citizenship, PR & Valid Visa Holders network",
      "Timezone-friendly Video Call coordinations",
      "Background verification for overseas families",
      "Direct WhatsApp VIP Line: +92 325 1013131"
    ],
    buttonText: "Join Overseas Elite",
    action: "whatsapp"
  }
];

export const successStories = [];
