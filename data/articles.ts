export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'the-myth-of-multitasking-and-attention-residue',
    title: 'The Myth of Multitasking: Why Context Switching Decimates Deep Thought',
    subtitle: 'Understanding attention residue and how micro-distractions cost up to 40% of cognitive bandwidth.',
    publishedAt: 'October 8, 2026',
    readTime: '6 min read',
    category: 'Cognitive Science',
    summary: 'When you quickly glance at an email while drafting a memo, your brain does not instantaneously switch tasks. A shadow of your working memory remains anchored to the previous context.',
    content: [
      'Modern digital interfaces have convinced us that consciousness is like a computer operating system—capable of smoothly running dozens of background processes in parallel. But neurobiology reveals a starkly different reality.',
      'Dr. Sophie Leroy coined the term "attention residue" to describe the cognitive drag that occurs when you switch from Task A to Task B. Even if you only glanced at an incoming Slack message for four seconds, a portion of your executive prefrontal network remains locked in thinking about that message.',
      'The result is a subtle, insidious mental exhaustion. At the end of an eight-hour workday spent toggling between browser tabs, you feel deeply drained, yet struggle to point to any singular, high-leverage accomplishment.',
      'To counter attention residue, we must transition from continuous reactive availability to "batched asynchronous sprints". In this article, we outline the exact boundaries required to reclaim unbroken cognitive depth.'
    ],
    keyTakeaways: [
      'Switching between tasks leaves residual mental activation that degrades working memory.',
      'The sensation of being productive while multitasking is a dopamine illusion.',
      'Structuring work into 90-minute isolated intervals yields 3x higher cognitive synthesis.'
    ]
  },
  {
    slug: 'the-neurobiology-of-dopamine-fasting',
    title: 'Dopamine Baselines: Why Modern Convenience Has Made Effort Feel Painful',
    subtitle: 'A clinical perspective on why our thresholds for boredom have collapsed and how to safely recalibrate.',
    publishedAt: 'September 24, 2026',
    readTime: '8 min read',
    category: 'Neuroscience',
    summary: 'Dopamine is not the molecule of pleasure; it is the molecule of pursuit. When endless novelty is available at zero friction, deep work becomes physiologically intolerable.',
    content: [
      'In hunter-gatherer environments, high-dopamine rewards (dense calories, social validation, novel tools) required substantial physical and cognitive investment. The brain was calibrated for friction.',
      'Today, high-stimulation algorithms deliver continuous micro-peaks of dopamine with zero metabolic effort. In response, your neuroreceptors downregulate to protect against over-stimulation.',
      'When your dopamine receptors downregulate, your baseline drops. Activities that naturally produce moderate dopamine—such as reading a complex monograph, practicing an instrument, or drafting an essay—suddenly feel excruciatingly boring.',
      'We do not recommend extreme, monastic isolation. Instead, we advocate for "Stimulus Sanctuaries": deliberate daily periods where the nervous system is allowed to experience silence and boredom.'
    ],
    keyTakeaways: [
      'Constant novelty induces receptor downregulation, increasing subjective boredom.',
      'Boredom is not a void; it is the fertile soil where independent creativity germinates.',
      'A 48-hour digital friction protocol can restore sensitivity to deep intellectual pursuits.'
    ]
  },
  {
    slug: 'rewriting-internal-scripts-through-somatic-awareness',
    title: 'Why Rational Insight Alone Fails to Break Deep Behavioral Loops',
    subtitle: 'Connecting cognitive reframing with nervous system safety to dissolve chronic stress patterns.',
    publishedAt: 'September 12, 2026',
    readTime: '7 min read',
    category: 'Emotional Regulation',
    summary: 'You can read ten books on emotional regulation and still snap during an argument. Here is why the body must feel safe before the rational mind can make new choices.',
    content: [
      'Most personal development advice operates exclusively from the "top down": it assumes that by thinking better thoughts or repeating affirmations, your behavior will follow. Yet when triggered, the sympathetic nervous system activates faster than conscious cognition.',
      'The amygdala perceives social vulnerability or conflict as a threat to physical survival. Blood flow shifts away from the prefrontal cortex toward survival motor centers. In this hyper-aroused state, rational advice is inaccessible.',
      'True transformation requires "bottom-up" regulation. Before we can reframe a thought, we must soothe the somatic contraction in the chest, throat, or gut. Only when autonomic safety is restored can new neural pathways take root.',
      'In our upcoming workbook, Understand Your Patterns, we introduce the 3-step Somatic Interception sequence used by clinical trauma therapists.'
    ],
    keyTakeaways: [
      'Emotional triggers fire at physiological speeds before logical cognition intervenes.',
      'Top-down positive thinking collapses under acute sympathetic arousal.',
      'Somatic settling creates the necessary physiological pause to make a conscious choice.'
    ]
  }
];
