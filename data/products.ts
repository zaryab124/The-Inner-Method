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
  category: 'Focus & Productivity' | 'Cognitive Psychology' | 'Master Bundles' | 'Emotional Regulation';
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
  gumroadUrl: string; // The user will plug in their real Gumroad checkout link here
  gumroadProductId?: string;
  chapters: BookChapter[];
  faqs: ProductFAQ[];
  metaDescription: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-focus-reset',
    slug: 'the-focus-reset',
    title: 'The Focus Reset',
    subtitle: 'A Cognitive Protocol for Reclaiming Attention, Deep Work, and Digital Clarity',
    tagline: 'Break free from chronic dopamine fragmentation and cultivate 4 hours of uninterrupted daily depth.',
    price: 14.00,
    originalPrice: 19.00,
    currency: 'USD',
    status: 'available',
    badge: 'Bestseller · 30% Off Launch',
    rating: 4.9,
    reviewsCount: 142,
    pageCount: 164,
    readTime: '3.5 hours',
    formats: ['Interactive PDF', 'EPUB (Kindle/Apple Books)', 'Printable Worksheets (A4/Letter)', '3 Guided Audio Protocols'],
    category: 'Focus & Productivity',
    coverTheme: {
      bgGradient: 'from-[#2A3B32] via-[#1E2B24] to-[#151D18]',
      accentColor: '#B0C3B4',
      textColor: '#FAF7F2',
      badgeBg: '#4F6555',
      spineColor: '#1A241F',
    },
    shortDescription: 'A modern, science-grounded operating manual for professionals, writers, and knowledge workers struggling with cognitive scatter, distraction loops, and shallow fatigue.',
    longDescription: [
      'In an attention economy designed to monetize your cognitive vulnerability, willpower is the wrong tool. The Focus Reset is not another productivity hack list. It is a systematic framework rooted in prefrontal cortex regulation, dopamine baseline restoration, and deliberate work rituals.',
      'Drawing on clinical neurobiology and behavioral psychology, this book deconstructs why modern knowledge workers feel perpetually busy yet strategically stagnant. You will learn how to design an environment where concentration is the default state rather than an exhausting uphill battle.',
      'Includes fillable reflection prompts, environment audit templates, and step-by-step cognitive friction exercises designed to return hours of high-value cognitive output to your week.'
    ],
    keyOutcomes: [
      'Understand the 3 neurological stages of attentional capture and how to break micro-distractions.',
      'Implement the "Attention Firewall" method to eliminate reactive morning phone checks.',
      'Structure high-yield 90-minute ultradian work blocks without afternoon crashes.',
      'Overcome cognitive resistance and procrastination when initiating complex creative or analytical tasks.',
      'Rebalance dopamine baselines through low-stimulus evenings and restored sleep architecture.'
    ],
    targetAudience: [
      'Knowledge workers and software creators struggling with fragmented context-switching.',
      'Writers, researchers, and students needing prolonged periods of unbroken concentration.',
      'Entrepreneurs feeling overwhelmed by endless notifications and shallow operational fire drills.'
    ],
    includedAssets: [
      'The Focus Reset complete digital book (EPUB + high-res PDF)',
      'The 14-Day Attention Protocol Worksheet (Fillable PDF)',
      'Digital Environment Architecture Checklist',
      '3 Audio Priming Tracks for Deep Work sessions (High-bitrate MP3)'
    ],
    // EDITABLE: Replace with your actual Gumroad link e.g. "https://username.gumroad.com/l/focus-reset"
    gumroadUrl: 'https://gumroad.com/l/the-focus-reset-placeholder',
    chapters: [
      {
        number: '01',
        title: 'The Neurological Anatomy of Scatter',
        description: 'Why the modern attention crisis is structural, not a failure of individual character or discipline.',
        sampleText: [
          'Attention is the bedrock currency of consciousness. When you surrender your attentional faculty to algorithms optimized for novelty generation, you do not simply lose minutes—you surrender your capacity for coherent long-term thought.',
          'Consider the prefrontal cortex as a spotlight with a finite thermal battery. Each notification, tab switch, and passive scroll drains this reserve, forcing the brain into a state of low-grade vigilance known as continuous partial attention.',
          'The first step toward radical focus is not tightening your jaw; it is systematically lowering the sensory noise of your physical and digital terrain.'
        ]
      },
      {
        number: '02',
        title: 'The Dopamine Baseline & The Novelty Loop',
        description: 'How rapid reward spikes erode deep satisfaction, and how to safely reset baseline neurochemistry.',
        sampleText: [
          'When we refresh our inbox or social feeds, we are operating within a variable reward schedule identical to a slot machine. The anticipation of information releases more dopamine than the information itself.',
          'Over weeks of high-frequency stimulation, your baseline dopamine receptors downregulate. Everyday deep tasks—reading dense research, debugging code, drafting strategic memos—begin to feel excruciatingly boring by comparison.',
          'Here we introduce the 72-Hour Stimulus Plateau: a low-friction method to restore sensitivity to quiet, high-leverage work.'
        ]
      },
      {
        number: '03',
        title: 'The Ultradian Rhythm & Energy Architecture',
        description: 'Aligning difficult cognitive tasks with your biological 90-minute focus windows.',
        sampleText: [
          'The human nervous system does not operate as a linear machine. Our biology pulses in roughly 90 to 120-minute cycles known as ultradian rhythms.',
          'Pushing through the natural trough at the end of a cycle with caffeine and sugar induces adrenal fatigue and cognitive brain fog. We explore the 15-minute Non-Sleep Deep Rest (NSDR) reset technique.'
        ]
      },
      {
        number: '04',
        title: 'Designing The Frictionless Sanctuary',
        description: 'Physical workspace ergonomics and digital firewalls that make distraction physically inconvenient.',
        sampleText: [
          'Behavioral architecture dictates habit formation far more than motivation. If your phone sits within visual periphery, tests show a measurable reduction in working memory capacity—even when turned face-down.',
          'We establish the "Two-Room Protocol" and digital isolation sandboxes.'
        ]
      },
      {
        number: '05',
        title: 'The Deep Work Ignition Ritual',
        description: 'A 5-minute pre-session ritual that eliminates procrastination and activates alpha brainwave states.',
        sampleText: [
          'Resistance is highest in the first three minutes of any cognitively demanding endeavor. By standardizing your auditory cues, sensory triggers, and micro-intentions, you bypass the amygdala panic response.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I receive the files after purchase?',
        answer: 'Immediately upon checkout through our secure payment partner Gumroad, you will receive an instant download link on screen and via email. You can read the PDF on any device or send the EPUB to your Kindle or Apple Books.'
      },
      {
        question: 'Can I read this on Kindle, iPad, or mobile?',
        answer: 'Yes! You receive both a beautifully typeset EPUB file (perfect for Kindle, Apple Books, and Kobo) and an interactive PDF designed with comfortable typography for laptops and tablets.'
      },
      {
        question: 'What if the guide does not work for me?',
        answer: 'We provide a complete 30-day money-back guarantee. If you implement the exercises and do not feel a noticeable improvement in your daily focus, simply email us or submit a refund request on Gumroad for a full, hassle-free refund.'
      }
    ],
    metaDescription: 'Reclaim your attention and cultivate deep work with The Focus Reset. Science-backed digital book and companion audio exercises for knowledge workers.'
  },
  {
    id: 'prod-understand-patterns',
    slug: 'understand-your-patterns',
    title: 'Understand Your Patterns',
    subtitle: 'Deconstructing Emotional Triggers, Internal Scripts, and Mental Loops',
    tagline: 'Stop repeating the reactive behaviors you swore you had outgrown. A clinical guide to self-investigation.',
    price: 24.00,
    originalPrice: 29.00,
    currency: 'USD',
    status: 'available',
    badge: 'Popular Framework',
    rating: 4.95,
    reviewsCount: 98,
    pageCount: 212,
    readTime: '4.5 hours',
    formats: ['Interactive PDF', 'EPUB', 'Cognitive Journal Prompts', 'Self-Inquiry Audio Guide'],
    category: 'Cognitive Psychology',
    coverTheme: {
      bgGradient: 'from-[#3B2C27] via-[#2B201C] to-[#1A1412]',
      accentColor: '#E8B6A2',
      textColor: '#FAF7F2',
      badgeBg: '#C76F51',
      spineColor: '#261B17',
    },
    shortDescription: 'A practical, compassionate psychological roadmap for understanding your subconscious defense mechanisms, interpersonal triggers, and core narratives.',
    longDescription: [
      'Why do intelligent, self-aware individuals repeatedly fall into the same emotional traps—people-pleasing, defensive withdrawal, catastrophic thinking, or sudden burnout?',
      'Because insight alone does not rewrite somatic conditioning. Understand Your Patterns bridges the gap between theoretical psychology and daily behavioral change.',
      'Synthesizing cognitive behavioral therapy (CBT), internal family systems (IFS), and attachment theory, this workbook guides you through forensic self-investigation without self-judgment.'
    ],
    keyOutcomes: [
      'Map your personal "Trigger-Script-Reaction" loops and catch reactive episodes in real time.',
      'Dismantle the subconscious beliefs formed in early environments that no longer serve you.',
      'Build compassionate emotional boundaries without guilt, anxiety, or passive aggression.',
      'Develop somatic grounding tools to calm autonomic nervous system arousal during conflict.'
    ],
    targetAudience: [
      'Individuals who feel emotionally reactive in relationships or professional settings.',
      'High-achievers paralyzed by imposter feelings and compulsive perfectionism.',
      'Anyone undergoing personal transition seeking clarity on their true internal motivations.'
    ],
    includedAssets: [
      'Understand Your Patterns digital book (EPUB + PDF)',
      'The Pattern Decoder: 30-Day Guided Reflective Journal (Fillable PDF)',
      'Somatic Grounding Audio Exercise (15-min guided session)'
    ],
    // EDITABLE: Replace with your actual Gumroad link e.g. "https://username.gumroad.com/l/understand-patterns"
    gumroadUrl: 'https://gumroad.com/l/understand-your-patterns-placeholder',
    chapters: [
      {
        number: '01',
        title: 'The Origin of The Invisible Script',
        description: 'How early emotional survival strategies become adult psychological prison cells.',
        sampleText: [
          'No psychological defense mechanism emerges out of irrationality. Every pattern you currently struggle with—over-explaining, withdrawing, hyper-vigilance—was once a brilliant, adaptive solution to an environment you could not control.',
          'The tragedy is not that we developed these defenses. The tragedy is that we continue to wear armor long after the battle has ended.',
          'To change a pattern, we must first honor the protective intention behind it.'
        ]
      },
      {
        number: '02',
        title: 'Forensic Trigger Mapping',
        description: 'Catching the split-second gap between stimulus and emotional cascade.',
        sampleText: [
          'Between stimulus and response there is a space. In that space lies our power to choose our response. In our response lies our growth and our freedom.',
          'We introduce the 4-Stage Somatic Heat Check to identify physiological activation before cognitive distortion begins.'
        ]
      },
      {
        number: '03',
        title: 'Internal Dialogue & The Critical Voice',
        description: 'Translating harsh self-criticism into actionable, boundary-informed clarity.',
        sampleText: [
          'Notice the tone of your internal narrator. Is it a patient mentor or an anxious drill sergeant? The inner critic is almost always a terrified guardian attempting to prevent external rejection through preemptive self-flagellation.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Is this book suitable if I have never attended therapy?',
        answer: 'Yes, absolutely. It is written in accessible, non-academic language while remaining clinically precise. It acts as an empowering self-directed workbook.'
      },
      {
        question: 'Can I print the workbook sheets?',
        answer: 'Yes! All worksheets are formatted for both digital fillable PDF use and crisp standard A4/US Letter home printing.'
      }
    ],
    metaDescription: 'Deconstruct your subconscious emotional triggers, mental loops, and relationship patterns with Understand Your Patterns. Comprehensive digital guide.'
  },
  {
    id: 'prod-growth-toolkit',
    slug: 'the-personal-growth-toolkit',
    title: 'The Personal Growth Toolkit',
    subtitle: 'The Complete Digital Library & Guided System',
    tagline: 'Every book, guided audio protocol, and reflection template in one unified master collection.',
    price: 39.00,
    originalPrice: 68.00,
    currency: 'USD',
    status: 'available',
    badge: 'Best Value Bundle · Save 42%',
    rating: 4.98,
    reviewsCount: 310,
    pageCount: 420,
    readTime: 'Full Curriculum',
    formats: ['All Books in PDF & EPUB', '8 Guided Audio Protocols', 'Fillable Notion Workspace', 'Printable Binder Templates'],
    category: 'Master Bundles',
    coverTheme: {
      bgGradient: 'from-[#1E252E] via-[#141A22] to-[#0D1219]',
      accentColor: '#D2D5DC',
      textColor: '#FAF7F2',
      badgeBg: '#3D3F43',
      spineColor: '#161C24',
    },
    shortDescription: 'The comprehensive flagship bundle containing The Focus Reset, Understand Your Patterns, plus exclusive bonus audio workshops and lifelong curriculum updates.',
    longDescription: [
      'For readers committed to holistic cognitive mastery, emotional resilience, and deep productivity. The Personal Growth Toolkit unites our entire published digital catalog at a substantial bundled discount.',
      'Includes both full-length books, interactive workbooks, 8 companion audio sessions, and our customizable Daily Cognitive Architecture template compatible with Notion, GoodNotes, and physical printing.',
      'Purchasing the Toolkit also grants free access to all future revisions and supplementary exercise packs released for these titles.'
    ],
    keyOutcomes: [
      'Master both external cognitive performance (deep work, focus) and internal emotional harmony (pattern recognition, boundary setting).',
      'Deploy the full 90-day personal transformation curriculum at your own measured pace.',
      'Access audio guides designed to accompany morning focus planning and evening somatic unwinding.',
      'Lifetime digital updates for all included titles.'
    ],
    targetAudience: [
      'Committed lifelong learners seeking a unified, rigorous self-development system.',
      'Coaches, leaders, and mentors seeking structured frameworks to share with clients.',
      'Gift givers looking for an inspiring, premium digital package.'
    ],
    includedAssets: [
      'The Focus Reset (Complete Book + Audio + Templates)',
      'Understand Your Patterns (Complete Book + Audio + Templates)',
      'Bonus: The Cognitive Architecture Notion Workspace',
      'Bonus: 8 Guided Deep Focus & Somatic Calming Audio Tracks (MP3)',
      'Lifetime digital updates & customer priority support'
    ],
    // EDITABLE: Replace with your actual Gumroad link e.g. "https://username.gumroad.com/l/personal-growth-toolkit"
    gumroadUrl: 'https://gumroad.com/l/the-personal-growth-toolkit-placeholder',
    chapters: [
      {
        number: 'Curriculum I',
        title: 'Cognitive Architecture & Attention Mastery',
        description: 'Complete contents of The Focus Reset with advanced deep-work scheduling protocols.'
      },
      {
        number: 'Curriculum II',
        title: 'Emotional Deconstruction & Script Rewriting',
        description: 'Complete contents of Understand Your Patterns with relational communication guides.'
      },
      {
        number: 'Curriculum III',
        title: 'The Integrated Daily Operating System',
        description: 'Unifying daily micro-habits, evening cognitive audits, and weekly momentum retrospectives.'
      }
    ],
    faqs: [
      {
        question: 'Will I receive future updates if new chapters are added?',
        answer: 'Yes! When we update any of the included titles or release new templates, you will automatically receive an email with updated download links at no additional charge.'
      },
      {
        question: 'Can I access this on multiple personal devices?',
        answer: 'Yes, your single-user license allows you to download and sync the files across your personal laptop, tablet, phone, and e-reader.'
      }
    ],
    metaDescription: 'The Inner Method Personal Growth Toolkit: The master bundle including all digital books, audio protocols, and habit architecture templates at 42% savings.'
  },
  {
    id: 'prod-anxiety-antidote',
    slug: 'the-anxiety-antidote',
    title: 'The Anxiety Antidote',
    subtitle: 'Somatic & Cognitive Nervous System Regulation',
    tagline: 'Moving beyond anxious rumination through vagus nerve toning and cognitive defusion.',
    price: 22.00,
    currency: 'USD',
    status: 'coming_soon',
    badge: 'Coming Soon · Winter 2026',
    rating: 5.0,
    reviewsCount: 0,
    pageCount: 190,
    readTime: 'In Production',
    formats: ['PDF', 'EPUB', 'Somatic Breathwork Companion'],
    category: 'Emotional Regulation',
    coverTheme: {
      bgGradient: 'from-[#2F3C33] via-[#212A24] to-[#161C18]',
      accentColor: '#8DA693',
      textColor: '#FAF7F2',
      badgeBg: '#3E5043',
      spineColor: '#1B221D',
    },
    shortDescription: 'An upcoming release investigating the intersection of autonomic nervous system physiology, vagal tone, and intrusive thoughts.',
    longDescription: [
      'Currently in final editorial review. This book explores how physiological state informs mental stories, providing concrete somatic tools to soothe physical hyperarousal before attempting cognitive reframing.'
    ],
    keyOutcomes: [
      'Master the Physiological Sigh and Vagal Nerve reset drills.',
      'Learn cognitive defusion techniques to detach from persistent intrusive thoughts.',
      'Design an evening somatic wind-down protocol to combat 3 AM sleep waking.'
    ],
    targetAudience: [
      'Individuals dealing with persistent low-grade anxiety, muscle tension, or mental loops.'
    ],
    includedAssets: [
      'Complete Digital Book upon release',
      'Early access chapter preview for mailing list subscribers'
    ],
    gumroadUrl: '#',
    chapters: [
      {
        number: '01',
        title: 'State Dictates Story',
        description: 'Why you cannot reason with a dysregulated nervous system.'
      }
    ],
    faqs: [],
    metaDescription: 'Upcoming publication: The Anxiety Antidote by The Inner Method. Somatic and cognitive approaches to nervous system peace.'
  }
];

export const FREE_RESOURCE = {
  id: 'free-focus-guide',
  title: '7 Practical Exercises for Better Focus',
  subtitle: 'A 24-page science-backed field guide to eliminating cognitive friction and reclaiming 2 hours of depth every day.',
  readTime: '20 min read',
  pageCount: 24,
  format: 'High-Resolution PDF',
  coverTheme: {
    bgGradient: 'from-[#4F6555] via-[#3E5043] to-[#212A24]',
    accentColor: '#D1DDD3',
    textColor: '#FAF7F2',
  },
  bullets: [
    'Exercise 1: The 3-Minute Sensory Baseline Reset (Calm adrenaline immediately)',
    'Exercise 2: The Physical Phone Quarantine Protocol (Restore working memory)',
    'Exercise 3: The Dopamine Menu Technique (Replace doomscrolling with replenishing breaks)',
    'Exercise 4: The 50/10 Ultradian Focus Pacing Grid',
    'Exercise 5: Cognitive Defusion for Task Resistance',
    'Exercise 6: Low-Stimulus Evening Decompression Sequence',
    'Exercise 7: The Sunday Cognitive Armor Weekly Review'
  ]
};
