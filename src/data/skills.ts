/**
 * LAKSHYA BAPNA — SKILLS REGISTRY (PHASE 6.6 REBUILD)
 *
 * FACTUAL ACCURACY POLICY:
 * - Every skill listed here is cross-referenced against projects.ts.
 * - No invented skills, proficiency levels, or ratings.
 * - Categories reflect actual project evidence only.
 */

export type SkillCategory =
  | 'AI & Intelligence'
  | 'Languages'
  | 'Backend'
  | 'Frontend'
  | 'Data & Databases'
  | 'Deployment'
  | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  iconType: string;
  highlight?: boolean;
}

export const SKILLS_CATEGORIES: SkillCategory[] = [
  'AI & Intelligence',
  'Languages',
  'Backend',
  'Frontend',
  'Data & Databases',
  'Deployment',
  'Tools',
];

export const CURATED_SKILLS: SkillItem[] = [

  // ── AI & INTELLIGENCE ──────────────────────────────────────
  // Evidence: InterviAI, Insurance Claims, ResearchScope, Civic Sense AI
  {
    id: 'llm',
    name: 'LLMs',
    category: 'AI & Intelligence',
    description: 'Large language model integration for agentic pipelines, evaluation and multimodal reasoning.',
    iconType: 'genai',
    highlight: true,
  },
  {
    id: 'rag',
    name: 'RAG',
    category: 'AI & Intelligence',
    description: 'Retrieval-Augmented Generation with BM25Plus and semantic retrieval for policy-grounded AI systems.',
    iconType: 'rag',
    highlight: true,
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'AI & Intelligence',
    description: 'Stateful multi-node agent orchestration - InterviAI, Insurance Claims, ResearchScope.',
    iconType: 'langgraph',
    highlight: true,
  },
  {
    id: 'agentic',
    name: 'Agentic Workflows',
    category: 'AI & Intelligence',
    description: 'End-to-end autonomous pipelines with conditional routing, tool calls and human escalation.',
    iconType: 'agentic',
  },
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering',
    category: 'AI & Intelligence',
    description: 'Structured few-shot system prompts, JSON schema enforcement and chain-of-thought routing.',
    iconType: 'genai',
  },
  {
    id: 'llm-eval',
    name: 'LLM Evaluation',
    category: 'AI & Intelligence',
    description: 'Multi-dimensional competency scoring and follow-up probe generation (InterviAI).',
    iconType: 'eval',
  },

  // ── LANGUAGES ──────────────────────────────────────────────
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    description: 'Primary language for AI pipelines, backend services, data analysis and ML training.',
    iconType: 'python',
    highlight: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Languages',
    description: 'Modern ES6+ for frontend logic, async APIs and dynamic web interfaces.',
    iconType: 'javascript',
    highlight: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages',
    description: 'Type-safe component architecture used in MedSynth capstone.',
    iconType: 'typescript',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Languages',
    description: 'Relational query design, schema modeling and PostgreSQL integration.',
    iconType: 'sql',
  },
  {
    id: 'htmlcss',
    name: 'HTML / CSS',
    category: 'Languages',
    description: 'Semantic markup, responsive layouts and custom component styling.',
    iconType: 'htmlcss',
  },

  // ── BACKEND ────────────────────────────────────────────────
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend',
    description: 'High-performance async Python APIs - InterviAI, Insurance Claims, Civic Sense AI.',
    iconType: 'fastapi',
    highlight: true,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: 'Event-driven JavaScript runtime powering FinBud backend services.',
    iconType: 'nodejs',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    description: 'Lightweight REST framework for FinBud server-side routing.',
    iconType: 'express',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'Backend',
    description: 'RESTful service design, endpoint architecture and client integration - Traceo, multiple projects.',
    iconType: 'rest',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Backend',
    description: 'React framework with SSR - MedSynth (Synthetic Data Studio capstone).',
    iconType: 'nextjs',
  },

  // ── FRONTEND ───────────────────────────────────────────────
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'Component architecture, reactive state, custom hooks - 9 of 11 projects.',
    iconType: 'react',
    highlight: true,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first styling - Our Shoppr e-commerce platform.',
    iconType: 'tailwind',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Frontend',
    description: 'Fast module bundler and dev server - Our Shoppr, My Edusity App.',
    iconType: 'vite',
  },

  // ── DATA & DATABASES ───────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data & Databases',
    description: 'Relational persistence for interview transcripts and claims records - InterviAI, Insurance Claims.',
    iconType: 'postgresql',
    highlight: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Data & Databases',
    description: 'Document store for financial transactions and civic incident data - FinBud, Civic Sense AI.',
    iconType: 'mongodb',
  },
  {
    id: 'bm25',
    name: 'BM25 / BM25Plus',
    category: 'Data & Databases',
    description: 'Probabilistic retrieval engine for policy-grounded insurance claim adjudication.',
    iconType: 'bm25',
  },
  {
    id: 'mongo-agg',
    name: 'MongoDB Aggregation',
    category: 'Data & Databases',
    description: 'Server-side pipeline aggregation for monthly savings and financial metrics - FinBud.',
    iconType: 'mongodb',
  },
  {
    id: 'pandas',
    name: 'Pandas / NumPy',
    category: 'Data & Databases',
    description: 'Data wrangling, statistical analysis and EDA - British Airways, Customer Churn Intelligence.',
    iconType: 'pandas',
  },
  {
    id: 'tableau',
    name: 'Tableau',
    category: 'Data & Databases',
    description: 'Interactive dashboards for airline sentiment and banking churn visualization.',
    iconType: 'tableau',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Data & Databases',
    description: 'GAN training for synthetic healthcare data generation - MedSynth capstone.',
    iconType: 'pytorch',
  },
  {
    id: 'sklearn',
    name: 'Scikit-learn',
    category: 'Data & Databases',
    description: 'NLP topic modeling and extractive summarization pipeline - ResearchScope.',
    iconType: 'sklearn',
  },

  // ── DEPLOYMENT ─────────────────────────────────────────────
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deployment',
    description: 'Serverless frontend delivery - Traceo, FinBud, MedSynth, Civic Sense AI.',
    iconType: 'vercel',
    highlight: true,
  },
  {
    id: 'render',
    name: 'Render',
    category: 'Deployment',
    description: 'Cloud hosting for Python/FastAPI backends - InterviAI, Insurance Claims.',
    iconType: 'render',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Deployment',
    description: 'Production hosting with automated build triggers - Our Shoppr, My Edusity App.',
    iconType: 'netlify',
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'Deployment',
    description: 'Rapid interactive Python app deployment - ResearchScope research analysis platform.',
    iconType: 'streamlit',
  },

  // ── TOOLS ──────────────────────────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    description: 'Version control, atomic commits, branch management and collaborative code reviews.',
    iconType: 'git',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    description: 'Repository hosting across all 11 projects - open to public inspection.',
    iconType: 'github',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Tools',
    description: 'Image preprocessing and computer vision for civic issue detection - Civic Sense AI.',
    iconType: 'opencv',
  },
];
