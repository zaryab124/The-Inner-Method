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
  category: 'Neuroscience & Performance' | 'Global Education' | 'Admissions & Strategy' | 'Master Bundles' | 'Career Frameworks';
  coverImage?: string;
  pdfUrl?: string;
  samplePdfUrl?: string;
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
  paysafeProductId: string;
  pdfFileName: string;
  chapters: BookChapter[];
  faqs: ProductFAQ[];
  metaDescription: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'the-huberman-blueprint',
    slug: 'the-huberman-blueprint',
    title: 'The Huberman Blueprint',
    subtitle: "A Neuroscientist's Complete System to Train Your Brain for Peak Performance, Unbreakable Resilience & Deep Rest",
    tagline: 'Insights from Stanford neuroscientist Dr. Andrew Huberman & Raj Shamani based on their viral masterclass dialogue.',
    price: 19.00,
    originalPrice: 29.00,
    currency: 'USD',
    status: 'available',
    badge: 'Official Masterclass Edition · Instant PDF Access',
    rating: 4.99,
    reviewsCount: 428,
    pageCount: 54,
    readTime: '3.5 hours',
    formats: [
      'High-Resolution Master PDF (Letter Full-Bleed 54 Pages)',
      'Interactive 3D FlipBook Access with Audio Dynamics',
      'The Daily Morning Stack & Evening Wind-Down Checklist',
      'The Left vs. Right Column Navy SEAL Mental Diagnostic'
    ],
    category: 'Neuroscience & Performance',
    coverImage: '/huberman_blueprint_cover.png',
    samplePdfUrl: '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf',
    pdfUrl: '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf',
    coverTheme: {
      bgGradient: 'from-[#09121D] via-[#112033] to-[#1D3147]',
      accentColor: '#E07A5F',
      textColor: '#FFFFFF',
      badgeBg: '#D4A373',
      spineColor: '#09121D',
    },
    shortDescription: 'The definitive neurochemical, physiological, and psychological system distilled from Stanford professor Dr. Andrew Huberman’s masterclass with Raj Shamani.',
    longDescription: [
      'What separates individuals who crumble under high-pressure stakes from those who execute with surgical clarity? As Stanford neuroscientist Dr. Andrew Huberman explains, high performance is not an accident of genetics—it is an engineered neurochemical cascade.',
      'Across 54 comprehensive pages, this master volume breaks down the biology of alertness, cortisol timing, proprioceptive sleep resets, non-sleep deep rest (NSDR), and the counterintuitive mechanics of choking under pressure.',
      'Inside, you will master the 10-Year Mastery Framework, deploy the Navy SEAL Left/Right Column operational exercise, build resilience through deliberate cold water and "the slightly harder thing", discover why clutch states outperform flow states, and uncover the raw personal truth behind the cost of greatness.'
    ],
    keyOutcomes: [
      'Calibrate your cortisol peak via morning sunlight and delayed caffeine to double daily focus and guarantee deep sleep.',
      'Deploy the Navy SEAL Left vs. Right Column exercise to silence rumination and ruthlessly prioritize what you control.',
      'Execute 10–30 minute Non-Sleep Deep Rest (Yoga Nidra) and proprioceptive eye-movement resets to fall asleep in under 7 minutes.',
      'Navigate the 10-Year Mastery Framework: Years 1–3 Gas Pedal, Years 4–6 Dynamic Regulation, and Years 7–10 Pro Stage.',
      'Stop choking under pressure by de-recruiting excess motor neurons and lowering artificial mental stakes.',
      'Build unbreakable courage using "The Wall Method" in cold exposure and panoramic vision resets.',
      'Harness clutch states over flow states to execute flawlessly during high-friction, unexpected life crises.'
    ],
    targetAudience: [
      'Entrepreneurs, founders, and knowledge workers seeking sustained cognitive stamina and laser focus without burnout.',
      'Students, researchers, and competitive professionals looking to eliminate brain fog, optimize sleep, and crush high-stakes deadlines.',
      'Athletes and high-performers wanting scientific protocols for recovery, dopamine calibration, and clutch execution.',
      'Anyone struggling with insomnia, afternoon fatigue, chronic anxiety, or emotional exhaustion.'
    ],
    includedAssets: [
      'The Huberman Blueprint complete high-resolution 54-page Master Publication (PDF)',
      'The Daily Morning Stack & Evening Wind-Down Checklist (PDF)',
      'The Left/Right Column Navy SEAL Mental Diagnostic Worksheet',
      'The Weekly 7-Day Performance & VO2 Max Exercise Template'
    ],
    paysafeProductId: 'TIM-PAYSAFE-HUBERMAN-2026',
    pdfFileName: 'The_Huberman_Blueprint_EBook.pdf',
    chapters: [
      {
        number: '01',
        title: 'The Cortisol Code',
        description: 'The single most important behavior for performance. High morning cortisol, low nighttime cortisol, light in eyes, hydration, and why cortisol is an energy-deploying hormone.',
        sampleText: [
          '"If I only had 5 minutes to talk to somebody, I would say: this is the best thing you can do for your health and well-being and performance. High morning cortisol, low nighttime cortisol."',
          'Cortisol’s primary job is not to deal with stress. Its main function is to deploy glucose and lipids from areas in your body that give you energy. When you spike cortisol in the morning within 30-60 minutes of waking via bright sunlight, you set a biological countdown timer for deep sleep 14 to 16 hours later.'
        ]
      },
      {
        number: '02',
        title: 'The Art of Turning Off',
        description: 'Why your off switch is your greatest weapon. Navy SEAL Andy Stumpf’s Left vs. Right Column exercise, dynamic attractor states, and the weekly zero-cortisol reset day.',
        sampleText: [
          '"The person that can turn their mind off in the final hour of their day and get the better, deeper sleep — I’m going to put all my money on that person within 5 to 10 years, far surpassing the other."',
          'Left Column: All the things that concern you (what people think, worries, algorithms). Right Column: All the things you actually control (hydration, sleep, workouts, focus). You have zero control over the left column. Stop feeding it.'
        ]
      },
      {
        number: '03',
        title: 'Yoga Nidra & The Sleep Reset',
        description: 'The no-pill protocol for deep restoration. How NSDR restores striatal dopamine, and the proprioceptive eye-movement trick that turns off body awareness.',
        sampleText: [
          '"No drug will do this, at least not in a healthy way. Any drug that takes you out of thinking and planning and just into pure sensation — that drug is going to rebound you into a rough place when you come out of it."',
          'Proprioceptive Eye Movement Reset: Keep eyes closed. Move eyes left to right, counterclockwise, clockwise, and look toward the tip of the nose with a long exhale. This disrupts your proprioceptive circuits, enabling the brain to forget body position and plunge into deep sleep.'
        ]
      },
      {
        number: '04',
        title: 'The 10-Year Mastery Framework',
        description: 'Years 1–3 Gas Pedal, Years 4–6 Dynamic Regulation, and Years 7–10+ Pro Stage. Moving from brute volume to focused intensity and deliberate recovery.',
        sampleText: [
          'Years 1–3: All Gas Pedal. Work, learn, learn, learn. Just don’t die. Find your edge. Years 4–6: Dynamic Regulation. Work around your average capacity ±2 hours to prevent autoimmune crashes. Years 7–10+: The Pro Stage. Integrating mastery with playfulness and emotional sovereignty.'
        ]
      },
      {
        number: '05',
        title: 'The Neuroscience of Choking',
        description: 'Why we freeze when the stakes are highest. Over-recruiting motor neurons, psyching ourselves out with how great it could go, and the chop wood carry water fix.',
        sampleText: [
          '"People think they’re imagining how terrible it could go. But what causes us to choke is: so much is at stake. They’re psyching themselves out with how great it could be."',
          'The antidote: Lower the stakes in your mind. Shorten the time horizon to 3 days. Chop wood, carry water.'
        ]
      },
      {
        number: '06',
        title: 'Building Courage & Resilience',
        description: 'The Wall Method in cold exposure, 3 daily mental games (10-breath morning meditation, max intensity sets, panoramic vision reset), and the slightly harder thing.',
        sampleText: [
          'The Wall Method: Don’t count down a timer in cold water. Sense when you hit the wall of wanting to exit. Stay just a bit longer. Ride the pulses of adrenaline. In real life, stress doesn’t come with a 3-minute timer.'
        ]
      },
      {
        number: '07',
        title: 'Clutch States Over Flow States',
        description: 'Why flow is only an expression of existing skills, while clutch states (forcing yourself at the edge of friction and effort) are where real neuroplasticity is forged.',
        sampleText: [
          '"Clutch states are the states of forcing oneself to do something at that edge of friction and effort. Most athletes, investors, high performers, business people live in this state 90% of their waking hours."',
          'Flow has nothing to do with learning. Plasticity requires errors. The gap between desired performance and actual performance triggers the norepinephrine that rewires brain circuitry.'
        ]
      },
      {
        number: '08',
        title: 'The Winner’s Mentality',
        description: 'Transmuting hardship into generative action. The stark rules: no self-attack, no attacking others, the Last Resort Protocol, and the Depth-Height Law.',
        sampleText: [
          '"Losers take things that happened to them and turn those thoughts and emotions into things that harm themselves or others. Winners take the things that happen to them — good or bad — and they transmute that into actions that are supportive and generative for them and for others."'
        ]
      },
      {
        number: '09',
        title: 'The Immigrant Edge & Identity',
        description: 'Why mindset beats circumstance, the paradox of too much comfort, and the daily compass question: "Am I a consumer or a creator in this moment?"',
        sampleText: [
          'Spend some time being a creator every day, and you’re going to be okay. If you’re purely a consumer every day, you’ll end up spent. Better yet: become the producer of the thing you consume the most.'
        ]
      },
      {
        number: '10',
        title: 'The Cost of Greatness',
        description: 'Holding intense emotions and relentless ambition inside the same vessel. The three times Huberman felt powerless, academic orphaning, and making peace with mortality.',
        sampleText: [
          '"I experience emotions very intensely. And I’m also very ambitious. And I have a vision of the world that I want to help contribute to creating. Holding those two things inside can be challenging — sometimes downright agony. But I look forward to the day that someone says: I heard this conversation and I went for it."'
        ]
      },
      {
        number: 'A',
        title: 'Appendix: The Complete Playbook',
        description: 'Every protocol on one page: Morning Stack (0–60 min), Weekly Exercise Template, Evening Wind-Down, and Mental Performance Tools.',
        sampleText: [
          'Morning: 5–10 min sunlight, 16–32 oz hydration, delay caffeine 90 min. Evening: dim lights, 3–5 long exhales, cool room, eye movement proprioceptive reset.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Who authored The Huberman Blueprint?',
        answer: 'This publication distills the key principles, laboratory research, and operational protocols of Stanford neuroscientist Dr. Andrew Huberman (Host of the Huberman Lab Podcast) from his viral in-depth masterclass dialogue with Raj Shamani.'
      },
      {
        question: 'How do I receive my book after purchase?',
        answer: 'Upon completing your secure payment via our private Paysafe channel (Cards, paysafecard, Skrill, or Apple/Google Pay), you instantly receive direct download access to the full 54-page Master PDF, an official VAT invoice, and encrypted lifetime digital access.'
      },
      {
        question: 'Are the protocols suitable for busy professionals and students?',
        answer: 'Yes. Most protocols require zero additional time—they optimize timing of things you already do (light exposure upon waking, hydration, caffeine timing, and sleep resets). Tools like NSDR take just 10 to 20 minutes.'
      },
      {
        question: 'Does this book include supplements and dietary advice?',
        answer: 'It covers behavioral fundamentals first (sunlight, sleep, temperature, breathing). It addresses supplement rules like why Ashwagandha should never be taken in the morning, and night-time wind-down compounds like magnesium threonate and apigenin.'
      },
      {
        question: 'What if I am unhappy with the blueprint?',
        answer: 'We provide an unconditional 30-day money-back guarantee. If you do not experience deeper rest, sharper daytime focus, and enhanced resilience, email us for a full 100% refund.'
      }
    ],
    metaDescription: "The Huberman Blueprint by Dr. Andrew Huberman & Raj Shamani. A neuroscientist's complete system to train your brain for peak performance, unbreakable resilience, and deep rest."
  },
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
    samplePdfUrl: '/samples/Study_Abroad_5_Removals_Sample_Playbook.pdf',
    pdfUrl: '/samples/Study_Abroad_5_Removals_Sample_Playbook.pdf',
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
      'Working professionals (30+) seeking a STEM-designated executive MBA pivot to $200,000+ compensation.',
      'Undergrads wanting to avoid the generic Indian IT/placement bottleneck and build global career leverage.'
    ],
    includedAssets: [
      'The Study Abroad Playbook complete high-resolution 29-page master edition (PDF)',
      'The 5 Removals Diagnostic fillable audit worksheet (PDF)',
      'The 5 Student Personas budget, country & risk mapping matrix',
      'The MATCH Job Search prompt templates for AI-assisted technical mock interviews'
    ],
    paysafeProductId: 'TIM-PAYSAFE-ABROAD-2026',
    pdfFileName: 'Study_Abroad_Playbook_EBook.pdf',
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
        answer: 'Upon completing your secure payment via our private Paysafe channel (Cards, paysafecard, Skrill, or Apple/Google Pay), you immediately receive direct download access to the high-resolution master PDF and access to your customer portal.'
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
    samplePdfUrl: '/samples/Study_Abroad_5_Removals_Sample_Playbook.pdf',
    pdfUrl: '/samples/Study_Abroad_5_Removals_Sample_Playbook.pdf',
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
    paysafeProductId: 'TIM-PAYSAFE-5REMOVALS-2026',
    pdfFileName: 'Study_Abroad_Playbook_EBook.pdf',
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
    id: 'the-complete-masterclass-bundle',
    slug: 'the-complete-masterclass-bundle',
    title: "The Dual Masterclass Collector's Edition: Mind & Global Career",
    subtitle: 'The Huberman Blueprint (54 Pages) + The Study Abroad Playbook (29 Pages) + All Toolkits',
    tagline: 'The complete master suite uniting peak brain performance, neurobiology, and elite global education strategy.',
    price: 34.00,
    originalPrice: 58.00,
    currency: 'USD',
    status: 'available',
    badge: 'Collector\'s Edition · Save 41%',
    rating: 5.0,
    reviewsCount: 592,
    pageCount: 97,
    readTime: '6.5 hours',
    formats: [
      'The Huberman Blueprint 54-Page Master Edition (PDF)',
      'The Study Abroad Playbook 29-Page Master Edition (PDF)',
      'The 5 Removals Diagnostic Excel & PDF Workbook',
      'The Navy SEAL Left/Right Column Protocol Sheet',
      'The MATCH Job Search Prompt Repository for AI'
    ],
    category: 'Master Bundles',
    coverImage: '/huberman_blueprint_cover.png',
    samplePdfUrl: '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf',
    pdfUrl: '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf',
    coverTheme: {
      bgGradient: 'from-[#09121D] via-[#112033] to-[#172A45]',
      accentColor: '#10B981',
      textColor: '#FAF7F2',
      badgeBg: '#D4AF37',
      spineColor: '#09121D',
    },
    shortDescription: 'The ultimate dual masterclass library containing both flagship publications, interactive 3D browser editions, and all operational diagnostic worksheets.',
    longDescription: [
      'The definitive collection for ambitious high-performers. You receive both full masterclass publications: Dr. Andrew Huberman’s complete system to train your brain for alertness and recovery, alongside Dr. Karan Gupta’s 30-year playbook to win international admissions and avoid the 1-Crore debt trap.',
      'Unlocks maximum mental performance, sleep restoration, and strategic career leverage in one unified package.'
    ],
    keyOutcomes: [
      'Complete mastery of neurochemical energy systems, cortisol rhythms, and non-sleep deep rest.',
      'Full command of international university selection, scholarship funding, and visa corrections.',
      'Dual access to both interactive 3D FlipBooks and printable high-resolution PDF editions.'
    ],
    targetAudience: [
      'Ambitious professionals, founders, and students who demand both biological excellence and high-ROI career strategy.',
      'Readers seeking the absolute complete library at the best possible price point.'
    ],
    includedAssets: [
      'The Huberman Blueprint (54-Page Full Master PDF)',
      'The Study Abroad Playbook (29-Page Full Master PDF)',
      'The 5 Removals Diagnostic Excel & PDF Workbook',
      'All companion audio samples and prompt libraries'
    ],
    paysafeProductId: 'TIM-PAYSAFE-BUNDLE-2026',
    pdfFileName: 'The_Huberman_Blueprint_EBook.pdf',
    chapters: [
      {
        number: 'HB',
        title: 'The Huberman Blueprint (Full 10 Chapters + Appendix)',
        description: 'Neuroscience of cortisol, NSDR, dynamic regulation, courage, and clutch states.'
      },
      {
        number: 'SA',
        title: 'The Study Abroad Playbook (Full 12 Chapters)',
        description: 'Scarcity math, 5 Removals Test, 5 Personas, and the MATCH framework.'
      },
      {
        number: 'TK',
        title: 'The 5 Removals Diagnostic Workbook & Toolkits',
        description: 'Fillable university audit templates and alumni outreach scripts.'
      }
    ],
    faqs: [
      {
        question: 'Does the bundle include both books?',
        answer: 'Yes! The Collector’s Edition includes instant access to both complete masterclass editions: The Huberman Blueprint (54 pages) and The Study Abroad Playbook (29 pages), plus all companion worksheets.'
      }
    ],
    metaDescription: "The Dual Masterclass Collector's Edition: The Huberman Blueprint and The Study Abroad Playbook. Train your brain and win the global career game."
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export const FREE_RESOURCE = {
  title: 'The Huberman Cortisol & Recovery Protocol + 5 Removals Field Guide',
  subtitle: 'A complimentary masterclass field guide featuring Stanford neuroscientist Dr. Andrew Huberman’s daily cortisol stack alongside Dr. Karan Gupta’s 5 Removals university diagnostic.',
  pdfDownloadUrl: '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf',
  bullets: [
    'The Cortisol Timing Code: How morning sunlight (5–10 min) and delayed caffeine double daytime alertness and guarantee deep nighttime sleep.',
    'The Proprioceptive Sleep Reset: The closed-eye movement protocol to shut down body awareness and drop into sleep within 7 minutes.',
    'The 5 Removals Diagnostic: How to strip away glossy college brochures, promotional videos, and brand prestige to evaluate raw curriculum authority.',
    'The 4-Point Audited Outcome Verification: How to audit verified 90-day employment percentages and median base compensation versus bonuses.'
  ]
};
