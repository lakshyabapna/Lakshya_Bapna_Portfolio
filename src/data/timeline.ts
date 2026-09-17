/**
 * LAKSHYA BAPNA — FOOTBALL SEASON & CAREER TIMELINE
 * 
 * Factual Accuracy Policy:
 * - Structure strictly follows: SCHOOL → COLLEGE → YEAR 1 → YEAR 2 → YEAR 3 / CURRENT.
 * - No unsupported claims (no hardcoded "B.Tech in CS & AI", no "Advanced AI & Full-Stack Systems", no "upcoming industry internships").
 * - Verified hackathons: Hack4Delhi (shortlisted for final round, invited to NSUT Delhi), LNMIIT Hackathon (selected for final round, invited to LNMIIT).
 * - Extensible imageUrl field ready for future photos.
 */

export interface TimelineEvent {
  id: string;
  stage: 'SCHOOL' | 'COLLEGE' | 'YEAR 1' | 'YEAR 2' | 'YEAR 3 / CURRENT';
  seasonLabel?: string;
  period: string;
  title: string;
  institutionOrEvent: string;
  summary: string;
  achievements?: string[];
  imageUrl?: string | null;
  badge?: string;
  isCurrent?: boolean;
}

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'school',
    stage: 'SCHOOL',
    seasonLabel: 'SEASON 00',
    period: '2021 – 2024',
    title: 'School Education & STEM Foundation',
    institutionOrEvent: 'MDS Public School & St. Gregorios School',
    summary: 'Completed my schooling with a strong focus on mathematics and sciences. This is where my curiosity for computers, logical problem solving and analytical thinking first took root.',
    achievements: [
      'Class XII Senior Secondary (MDS Public School)',
      'Class X Matriculation (St. Gregorios Sr. Sec. School)',
      'Built my foundational understanding of computer science and logic'
    ],
    imageUrl: null,
    badge: 'Foundation Academy'
  },
  {
    id: 'college',
    stage: 'COLLEGE',
    seasonLabel: 'SEASON 01',
    period: '2024 – 2028',
    title: 'Undergraduate Degree',
    institutionOrEvent: 'Newton School of Technology',
    summary: 'Pursuing my degree in Computer Science & AI at Newton School of Technology. Learning by building every single day through hands-on software engineering and collaborative product sprints.',
    achievements: [
      'Hands-on technical curriculum focused on modern software stacks & AI',
      'Active student developer collaborating on capstones and projects'
    ],
    imageUrl: null,
    badge: 'Academic Base'
  },
  {
    id: 'year-1',
    stage: 'YEAR 1',
    seasonLabel: 'SEASON 02',
    period: '2024 – 2025',
    title: 'First Year - Learning the Game',
    institutionOrEvent: 'Web Development & First Builds',
    summary: 'I started my development journey by learning web development and understanding how websites and applications are actually built. I spent this year getting comfortable with HTML, CSS, JavaScript and React, while learning mainly by building things myself.',
    achievements: [
      'Learned the fundamentals of web development and React.',
      'Built Traceo, FinBud and Our Shoppr.',
      'Started building complete web applications instead of only practising individual concepts.',
      'Learned through hands-on projects, debugging, and experimentation.'
    ],
    imageUrl: null,
    badge: 'First Fixtures'
  },
  {
    id: 'year-2',
    stage: 'YEAR 2',
    seasonLabel: 'SEASON 03',
    period: '2025 – 2026',
    title: 'Second Year - Intelligent Agents & Full-Stack Projects',
    institutionOrEvent: 'Hackathons, GenAI & Team Builds',
    summary: 'I started taking part in hackathons and building larger, more complex projects. This is also when I began exploring Generative AI and Large Language Models (LLMs). I worked on my first AI-focused projects, learned how to use APIs and started thinking about building complete applications instead of just isolated features.',
    achievements: [
      'Hack4Delhi - Shortlisted for the final round and invited to NSUT Delhi to present',
      'LNMIIT Hackathon - Selected as a finalist and invited to LNMIIT to pitch',
      'HackXIndia 24-Hour Hackathon - Built and pitched Civic Sense AI'
    ],
    imageUrl: null,
    badge: 'First Team'
  },
  {
    id: 'year-3-current',
    stage: 'YEAR 3 / CURRENT',
    seasonLabel: 'CURRENT CAMPAIGN',
    period: 'Current Season',
    title: 'Current Stage - AI, ML & Deeper Learning',
    institutionOrEvent: 'Continuous Craft & Building',
    summary: "I'm currently focused on building more complex AI and ML projects, deepening my understanding of these fields and working on full-stack applications that use AI in meaningful ways. This phase is about moving from introductory projects to building more robust, scalable and real-world AI-powered systems.",
    achievements: [
      'Built InterviAI - an AI-powered technical interview simulator, live on Render',
      'Engineered an Insurance Claims Adjudication pipeline using LangGraph',
      'Started diving into agentic workflows with LangGraph and CrewAI',
      'Learned how to work with large language models and started building AI-powered applications'
    ],
    imageUrl: null,
    badge: 'In Progress',
    isCurrent: true
  }
];
