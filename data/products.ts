export interface BookChapter {
  number: string;
  title: string;
  description: string;
  sampleText?: string[];
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  currency: string;
  status: 'available' | 'coming_soon';
  badge?: string;
  rating: number;
  reviewsCount: number;
  pageCount: number;
  readTime: string;
  formats: string[];
  category: 'Global Education' | 'Admissions & Strategy' | 'Master Bundles' | 'Career Frameworks';
  coverImage?: string;
  pdfUrl?: string;
  coverTheme: {
    bgGradient: string;
    accentColor: string;
    textColor: string;
    badgeBg: string;
    spineColor: string;
  };
  shortDescription: string;
  longDescription: string[];
  keyOutcomes: string[];
  targetAudience: string[];
  includedAssets: string[];
  gumroadUrl: string; // Replace with your real Gumroad checkout link
  gumroadProductId?: string;
  chapters: BookChapter[];
  faqs: ProductFAQ[];
  metaDescription: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'the-study-abroad-playbook',
    slug: 'the-study-abroad-playbook',
    title: 'The Study Abroad Playbook',
    subtitle: 'How to Win the Global Education Game, Secure High-Paying Careers & Avoid the 1-Crore Debt Trap',
    tagline: 'Synthesized from 30 years of foreign admissions counseling by Harvard alumnus Dr. Karan Gupta & Raj Shamani.',
    price: 19.00,
    originalPrice: 29.00,
    currency: 'USD',
    status: 'available',
    badge: 'Official Masterclass Edition · Instant PDF Access',
    rating: 4.98,
    reviewsCount: 384,
    pageCount: 29,
    readTime: '2 hours',
    formats: [
      'High-Resolution Master PDF (Printable Letter Full-Bleed)',
      'Interactive 3D FlipBook Access with Audio Page Dynamics',
      'The 5 Removals Diagnostic Checklist',
      'The MATCH Job Acquisition Strategy Template'
    ],
    category: 'Global Education',
    coverImage: '/study_abroad_cover.png',
    pdfUrl: '/Study_Abroad_Playbook_EBook.pdf',
    coverTheme: {
      bgGradient: 'from-[#0A192F] via-[#172A45] to-[#050E1A]',
      accentColor: '#E63946',
      textColor: '#FFFFFF',
      badgeBg: '#D4AF37',
      spineColor: '#050E1A',
    },
    shortDescription: 'The definitive strategic playbook for parents, students, and professionals navigating international admissions, post-study work realities, high-ROI degrees, and multi-crore financing.',
    longDescription: [
      'Every year, hundreds of thousands of families pledge life savings, mortgage ancestral property, or liquidize family gold with one single vision: landing a shiny corporate job in New York, London, or Toronto that instantly pays off every debt. Yet, as Dr. Karan Gupta reveals, there is never a 100% guarantee of getting a job abroad unless you approach admissions with calculated precision.',
      'Drawing on over 30 years of elite counseling and guidance to 100,000+ students admitted into Harvard, Stanford, Oxford, Cambridge, and MIT, this volume deconstructs the Indian scarcity math, dismantles visa mirages, and delivers battle-tested algorithms to avoid the 1-Crore debt trap.',
      'Inside, you will master the proprietary Five Removals Test, map your profile across the 5 Student Personas, learn how to future-proof any degree by marrying AI and data analytics, uncover India’s hidden $100B GCC goldmine, and deploy the MATCH framework to crack high-paying employment without university placement cells.'
    ],
    keyOutcomes: [
      'Execute "The Five Removals Test" to filter out brochure-selling diploma mills before spending a single rupee.',
      'Identify your exact profile category among The 5 Student Personas (from average 70% GPA to Ivy League).',
      'Deploy the UK-to-US Hybrid Degree Hack to save ₹1.5 Crores while gaining two global credentials.',
      'Avoid the "Canada & Germany Visa Trap" by anticipating the 4-phase political policy correction cycle.',
      'Future-proof degrees in marketing, psychology, finance, and biology by pairing them with quantitative AI & data modeling.',
      'Leverage non-traditional funding: 100% free Graduate Assistantships (TA/RA), need-blind aid, and cosigner-free loans.',
      'Execute the MATCH job acquisition framework to bypass HR filters and secure high-compensation international roles.'
    ],
    targetAudience: [
      'Students planning undergraduate or master\'s studies in the US, UK, Canada, Europe, or Australia.',
      'Parents contemplating education loans, ancestral property mortgages, or significant family savings deployment.',
      'Working professionals (30+) seeking a STEM-designated executive MBA pivot to \$200,000+ compensation.',
      'Undergrads wanting to avoid the generic Indian IT/placement bottleneck and build global career leverage.'
    ],
    includedAssets: [
      'The Study Abroad Playbook complete high-resolution 29-page master edition (PDF)',
      'The 5 Removals Diagnostic fillable audit worksheet (PDF)',
      'The 5 Student Personas budget, country & risk mapping matrix',
      'The MATCH Job Search prompt templates for AI-assisted technical mock interviews'
    ],
    gumroadUrl: 'https://gumroad.com/l/the-study-abroad-playbook',
    chapters: [
      {
        number: '01',
        title: 'The Brutal Reality Check',
        description: 'Indian scarcity vs. foreign unpredictability. Why degrees alone do not guarantee jobs and the stark truth of the Dundee vs. Bath case study.',
        sampleText: [
          'Dr. Karan Gupta, who has advised over 100,000 students across three decades of admissions counseling, begins with a truth that most education agents deliberately conceal: there is never a 100% guarantee of getting a job abroad.',
          '"If you are going to take a heavy loan, sell your mother’s jewelry, or mortgage your family home for an average degree at an unknown university—do not go abroad. We will find you something in India."'
        ]
      },
      {
        number: '02',
        title: 'The Five Removals Test',
        description: 'The proprietary mental filter to determine if a university is genuinely worth your life savings before spending a single dollar on application fees.',
        sampleText: [
          '1. Remove the Brochure: Strip away the glossy campus photographs and cinematic promotional videos.',
          '2. Remove the Logo: Hide the brand name. If this syllabus were offered unbranded, would the knowledge alone justify the cost?',
          '3. Remove Other People: If nobody in your social circle knew you went, would you still go?',
          '4. Remove Societal & Parental Expectations: Strip away the generational script.',
          '5. Remove the Fantasy of a Guaranteed Job: Assume zero campus placements exist.'
        ]
      },
      {
        number: '03',
        title: 'The Five Student Personas',
        description: 'Profiles, budgets, risk appetites & exact country roadmaps: Rahul (The Safe Bet), Ananya (The Risk Taker), Zara (Healthcare Hustler), Aditya (The PR Chaser), Kavya (The Prestige Hunter), and the 30+ Executive Pivot.',
        sampleText: [
          'Rahul (Safe Bet, ₹25-50L budget): Do not go abroad. Target an Indian executive MBA or private school like ISB (₹24-25 LPA CTC). Playing safe with ₹25L abroad at a mid-tier school is a high-risk trap.',
          'The UK-to-US Hybrid Hack: Do a 3-year UK bachelor\'s (~₹50L) then a 1-year US master\'s (~₹50L). Enter the US job market with dual global degrees for ₹1-1.5 Cr instead of ₹3 Cr.'
        ]
      },
      {
        number: '04',
        title: 'The Country Cycle & The Visa Mirage',
        description: 'Why immigration policies self-correct, the Canada case study (61% drop in permits), the Germany warning, and why the United States remains the uncontested leader.',
        sampleText: [
          'One of the biggest blunders international students commit is treating an immigration rule as a permanent state of nature.',
          'Phase 1: The Welcome -> Phase 2: The Saturation -> Phase 3: The Correction -> Phase 4: Flight to Quality. Only students at elite accredited universities offering high-demand STEM and healthcare disciplines continue receiving approvals.'
        ]
      },
      {
        number: '05',
        title: 'Future-Proofing Degrees With Tech & Data',
        description: 'Why pure marketing is nearly suicidal for employment, and how marrying quantitative analytics, data science, or AI infrastructure to any field secures your next decade.',
        sampleText: [
          'The Marketing Trap: Traveling abroad to study pure marketing is nearly suicidal. You cannot market local products to domestic consumers better than a native citizen.',
          'The Golden Formula: Domain + Quant / Data / AI. For example: Marketing + Econometrics, Psychology + HCI, Economics + Behavioral Data Science, Law + Legal Informatics.'
        ]
      },
      {
        number: '06',
        title: 'GCCs: India’s Hidden $100B Goldmine',
        description: 'The reverse-brain drain opportunity hiding in plain sight. Why returning to India with foreign skills offers western compensation (₹35L-₹75L+) without visa anxiety.',
        sampleText: [
          'India currently hosts over 2,100 GCCs generating annual revenues surpassing $100 Billion and employing more than 2.36 million high-skill professionals.',
          'These are not call centers; these are the core R&D, product engineering, quantitative modeling, and AI strategy hubs of Fortune 500 giants.'
        ]
      },
      {
        number: '07',
        title: 'Rankings vs. Reality: The Harvard Truth',
        description: 'Why commercial ranking tables mislead, how to audit audited employment outcome reports, and why universities sell judgment rather than free information.',
        sampleText: [
          'Ranking agencies measure metrics that often have zero relevance to your career success.',
          'The Single Source of Truth: Audited Graduate Employment Reports. Check 90-day verified placement rates, specific tier-1 employer lists, and median base compensation.'
        ]
      },
      {
        number: '08',
        title: 'The Elite Network & The Jan Koum WhatsApp Rule',
        description: 'Peer-to-peer capital, why rejection is merely an administrative point in negotiation, and the famous 120-member Harvard WhatsApp cohort override.',
        sampleText: [
          '"A denial is simply the conclusion of an initial administrative decision. It is never the end of the larger negotiation."',
          'When WhatsApp had a 100-member ceiling, Dr. Gupta emailed Jan Koum directly: "We are 120 leaders at Harvard Business School." Within 2 hours, Jan Koum replied: "Send me the names" — a custom backend override.'
        ]
      },
      {
        number: '09',
        title: 'The Root Cause: 5 Whys & The SSF Conflict',
        description: 'Solving student career paralysis via Toyota\'s 5 Whys, and decoding the Security, Status, and Freedom conflict between parents and children.',
        sampleText: [
          'Every family battle regarding study abroad is an unrecognized struggle between three core psychological currencies: Security (parents), Status (society), and Freedom (students).',
          'Dr. Gupta\'s empirical study of 801 parent-student pairs reveals how to align family goals by demonstrating that freedom produces verifiable long-term security.'
        ]
      },
      {
        number: '10',
        title: 'The Real Education ROI Equation',
        description: 'Why the traditional linear formula fails abroad, and how to measure true compounding returns: ROI = X (Tangible Output) + Y (Invisible Agency Multiplier).',
        sampleText: [
          'Flawed Linear Formula: Payback Period = (Tuition + Living) / Starting Salary. This math only works when institutions have mandatory placement cells.',
          'The Compounding ROI: X (financial packages, debt amortization) + Y (high agency, emotional resilience, ability to live alone, global network, critical judgment).'
        ]
      },
      {
        number: '11',
        title: 'Funding, Scholarships & The 3-Box Profile',
        description: 'Graduate Assistantships (TA/RA 100% tuition coverage), need-based aid, cosigner-free loans (Prodigy/MPOWER), and the 3-Box Profile (Capability, Credibility, Memorability).',
        sampleText: [
          'Lack of family money should never stop an exceptional student from studying abroad.',
          'The 3 Boxes: Box 1 (Multidimensional capability/sports/debate), Box 2 (Scholarly authority/published Scopus research), Box 3 (Unique memorability passion project).'
        ]
      },
      {
        number: '12',
        title: 'The MATCH Strategy & The Emotional Cost',
        description: 'The 5-step job hunting framework (Map Market, Assemble Evidence, Target Ecosystem, Combine AI & Human, Hone Interviews) and mastering the 58% loneliness tax.',
        sampleText: [
          'Sending 500 identical resumes on LinkedIn guarantees unemployment. Deploy the MATCH strategy from Day 1.',
          '"5 Crores or Happiness? Take the 5 Crores. Work relentlessly for four to five years, secure your financial foundation, build real capital, and then choose whatever path gives you happiness."'
        ]
      }
    ],
    faqs: [
      {
        question: 'Who authored The Study Abroad Playbook?',
        answer: 'The playbook synthesizes the strategic frameworks, counseling algorithms, and real admissions case studies of Dr. Karan Gupta (Harvard Business School alumnus, counselor to 100,000+ students across 30 years) from his in-depth masterclass dialogue with Raj Shamani.'
      },
      {
        question: 'How do I receive my book after purchase?',
        answer: 'Upon completing your secure checkout via Gumroad, you immediately receive access to download the high-resolution master PDF (Letter Full Bleed) and receive a private link to the interactive 3D browser flipbook edition.'
      },
      {
        question: 'Is this book only for students with high family budgets?',
        answer: 'Not at all. Chapters 3 and 11 specifically break down zero-collateral, cosigner-free loans (Prodigy Finance, MPOWER), 100% tuition-free Teaching & Research Assistantships (TA/RA), need-based Ivy League grants, and low-budget country strategies like the UK-to-US hybrid hack.'
      },
      {
        question: 'Does the book cover master\'s degrees and working professionals?',
        answer: 'Yes. It features dedicated sections on the "30+ Executive Pivot Playbook", STEM-designated MBAs in major financial hubs, and the $100B GCC (Global Capability Center) reverse-brain drain job market in India.'
      },
      {
        question: 'What if I am unhappy with the playbook?',
        answer: 'We provide an unconditional 30-day money-back guarantee. If you do not gain actionable, life-changing clarity for your educational strategy, email us for a full refund.'
      }
    ],
    metaDescription: 'The Study Abroad Playbook by Dr. Karan Gupta. How to win the global education game, secure high-paying careers, and avoid the 1-Crore debt trap.'
  },
  {
    id: 'the-5-removals-toolkit',
    slug: 'the-5-removals-toolkit',
    title: 'The 5 Removals & University Audit Toolkit',
    subtitle: 'The Proprietary Operational Filter Before Spending a Single Rupee Abroad',
    tagline: 'Audit university brochures, logos, career outcome reports, and hidden visa traps with mathematical precision.',
    price: 9.00,
    originalPrice: 15.00,
    currency: 'USD',
    status: 'available',
    badge: 'Essential Companion Worksheet',
    rating: 4.92,
    reviewsCount: 189,
    pageCount: 14,
    readTime: '45 mins',
    formats: [
      'Fillable PDF Audit Workbook (Interactive)',
      'The 4-Point Audited Outcome Scoring Template',
      'Visa Correction Checklist'
    ],
    category: 'Admissions & Strategy',
    coverImage: '/study_abroad_cover.png',
    pdfUrl: '/Study_Abroad_Playbook_EBook.pdf',
    coverTheme: {
      bgGradient: 'from-[#050E1A] via-[#0A192F] to-[#172A45]',
      accentColor: '#D4AF37',
      textColor: '#FFFFFF',
      badgeBg: '#E63946',
      spineColor: '#0A192F',
    },
    shortDescription: 'The step-by-step diagnostic worksheet to test any prospective foreign university before paying application fees or signing study loan agreements.',
    longDescription: [
      'Before you commit to a foreign university, you must strip away the marketing layer. The 5 Removals Toolkit gives you the exact questions, audited outcome formulas, and LinkedIn alumni verification steps to audit any college on earth.',
      'Includes fillable templates for the 4-Point University Audit (Employment at 90 days, Tier-1 employer list, median base vs bonus salary, and alumni job title verification).'
    ],
    keyOutcomes: [
      'Evaluate whether a university program provides genuine intellectual ROI or merely sells unaccredited certificates.',
      'Check whether the degree offers STEM OPT extension or leaves you vulnerable to visa deportation.',
      'Audit the true hiring partners of the institution via audited post-graduate career reports.'
    ],
    targetAudience: [
      'Applicants currently shortlisting universities in the US, UK, Canada, Australia, or Europe.',
      'Parents auditing an education consultant or agent\'s college recommendations.'
    ],
    includedAssets: [
      'Interactive Fillable Audit PDF (14 Pages)',
      'Automated Excel/Sheets University Comparison Calculator',
      'Alumni LinkedIn Outreach Scripts'
    ],
    gumroadUrl: 'https://gumroad.com/l/the-5-removals-toolkit',
    chapters: [
      {
        number: 'T1',
        title: 'The Brochure & Logo De-Biasing Matrix',
        description: 'How to separate campus marketing from genuine faculty research authority and coursework rigor.'
      },
      {
        number: 'T2',
        title: 'The 4-Point Employment Audit Framework',
        description: 'Auditing 90-day employment rates, median base compensation, and verified LinkedIn alumni trajectories.'
      },
      {
        number: 'T3',
        title: 'The Visa Policy Vulnerability Checklist',
        description: 'Evaluating post-study work stability against international macroeconomic and political cycles.'
      }
    ],
    faqs: [
      {
        question: 'Can I use this toolkit for any university in the world?',
        answer: 'Yes. The 5 Removals methodology applies to institutions in the United States, United Kingdom, Canada, Australia, Germany, Singapore, and beyond.'
      }
    ],
    metaDescription: 'The 5 Removals & University Audit Toolkit by Dr. Karan Gupta. The ultimate diagnostic checklist before spending a single rupee on foreign education.'
  },
  {
    id: 'global-career-masterclass-bundle',
    slug: 'global-career-masterclass-bundle',
    title: 'The Global Education & Career Master Bundle',
    subtitle: 'The Study Abroad Playbook + 30+ Executive Pivot Guide + The $100B GCC Playbook',
    tagline: 'The complete master suite for parents, undergraduates, and ambitious 30+ working professionals targeting global careers.',
    price: 29.00,
    originalPrice: 49.00,
    currency: 'USD',
    status: 'available',
    badge: 'Best Value · Complete Suite (Save 40%)',
    rating: 5.0,
    reviewsCount: 512,
    pageCount: 65,
    readTime: '4.5 hours',
    formats: [
      'The Complete Study Abroad Playbook (High-Res PDF)',
      'The 5 Removals Diagnostic Workbook',
      'The 30+ Executive Pivot Strategy Guide',
      'The MATCH Job Search Prompt Repository for AI'
    ],
    category: 'Master Bundles',
    coverImage: '/study_abroad_cover.png',
    pdfUrl: '/Study_Abroad_Playbook_EBook.pdf',
    coverTheme: {
      bgGradient: 'from-[#172A45] via-[#0A192F] to-[#050E1A]',
      accentColor: '#10B981',
      textColor: '#FAF7F2',
      badgeBg: '#D4AF37',
      spineColor: '#050E1A',
    },
    shortDescription: 'The all-in-one strategic bundle containing every publication, audit tool, and operational career framework from Dr. Karan Gupta’s masterclass series.',
    longDescription: [
      'The ultimate package for those who leave nothing to chance. You receive The Study Abroad Playbook, the full 5 Removals Toolkit, and the specialized guides covering executive STEM MBAs and high-growth Global Capability Centers in India.',
      'Empowers you or your child to enter the global education arena with unfair clarity, bulletproof financial planning, and a direct pipeline to high-paying international employment.'
    ],
    keyOutcomes: [
      'Complete mastery of foreign university evaluation, scholarship acquisition, and visa cycles.',
      'Executive roadmap for professionals 30+ targeting \$200,000+ career transitions.',
      'Step-by-step reverse brain-drain playbook to secure ₹35L-₹75L+ compensation packages in Indian GCCs.'
    ],
    targetAudience: [
      'Families planning a comprehensive multi-year study abroad journey.',
      'Experienced professionals seeking accelerated global career mobility.'
    ],
    includedAssets: [
      'All 3 Digital Master Publications (PDF + Web 3D FlipBook)',
      'The 5 Removals Diagnostic Excel & PDF Workbook',
      'AI Job Acquisition MATCH Prompt Pack',
      'Exclusive Access to Future Edition Revisions'
    ],
    gumroadUrl: 'https://gumroad.com/l/the-global-education-master-bundle',
    chapters: [
      {
        number: 'B1',
        title: 'The Study Abroad Playbook (Full 12 Chapters)',
        description: 'The foundational masterclass synthesis.'
      },
      {
        number: 'B2',
        title: 'The 30+ Executive Pivot Playbook',
        description: 'STEM MBAs, regional top schools, and debt amortization realities.'
      },
      {
        number: 'B3',
        title: 'The MATCH Framework & GCC Playbook',
        description: 'Cracking global jobs and dominating Fortune 500 GCC leadership.'
      }
    ],
    faqs: [
      {
        question: 'Does the bundle include everything?',
        answer: 'Yes! Purchasing the Master Bundle unlocks the complete 29-page Master Playbook, the 5 Removals Audit Toolkit, and all supplementary career frameworks.'
      }
    ],
    metaDescription: 'The Global Education & Career Master Bundle by Dr. Karan Gupta. Complete publications, audit tools, and job frameworks.'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export const FREE_RESOURCE = {
  title: 'The 5 Removals Test & Foreign University Audit Diagnostic',
  subtitle: 'A complimentary operational field guide to audit prospective foreign colleges, detect diploma mills, and evaluate true employment outcomes before spending a single rupee.',
  pdfDownloadUrl: '/Study_Abroad_Playbook_EBook.pdf',
  bullets: [
    'The 5 Removals Diagnostic: How to strip away glossy brochures, promotional videos, and brand prestige to evaluate raw curriculum authority.',
    'The 4-Point Audited Outcome Verification: How to audit verified 90-day employment percentages and median base compensation versus bonuses.',
    'The 5 Student Personas Mapping: Practical roadmap determining whether you belong in the US, UK, Europe, or should target Indian institutions.',
    'Non-Traditional Funding Vehicles: How to secure 100% free tuition through Graduate Assistantships (TA/RA) and need-based Ivy League grants.'
  ]
};
