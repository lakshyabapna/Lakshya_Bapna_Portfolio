
import interviaiImg from '../assets/Project_profile/InterviAI.webp';
import insuranceAgentImg from '../assets/Project_profile/insurance-agent-ai.webp';
import traceoImg from '../assets/Project_profile/Traceo.webp';
import finbudImg from '../assets/Project_profile/finbud.webp';
import ourShopperImg from '../assets/Project_profile/OurShopper.webp';
import myEdusityImg from '../assets/Project_profile/MyEdusity.webp';
import researchScopeImg from '../assets/Project_profile/ResearchScope.webp';
import medSynthImg from '../assets/Project_profile/MedSynth.webp';
import civicSenseImg from '../assets/Project_profile/CivicSensiAI.webp';
import britishAirwaysImg from '../assets/Project_profile/BritishAirways.webp';
import customerChurnImg from '../assets/Project_profile/Customer_churn.webp';

export interface ProjectItem {
  id: string;
  name: string;
  kitNumber: string; // e.g. '#10', '#07'
  tacticalRole: string; // e.g. 'CAM / Playmaker', 'CF / Finisher', 'CDM / Anchor'
  category: 'live' | 'dva' | 'hackathon';
  isStartingXI: boolean;
  isLive: boolean;
  isCollaborative: boolean;
  tagline: string | null;
  description: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  contributionsNote?: string;
  imageUrl?: string | null;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'interviai',
    name: 'InterviAI',
    kitNumber: '#10',
    tacticalRole: 'CAM / Playmaker',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Adaptive AI technical interview platform with voice interaction, real-time follow-ups, and structured competency evaluation.',
    description: 'Ingests candidate resumes to conduct customized technical interviews matching target roles. A LangGraph state machine evaluates answers across 5 dimensions, dynamically triggers follow-up probes when scores drop below threshold, and transcribes voice input in real time. Persists transcripts and multi-dimensional skill gap reports in PostgreSQL.',
    technologies: ['Python', 'FastAPI', 'React', 'LangGraph', 'PostgreSQL'],
    githubUrl: 'https://github.com/lakshyabapna/InterviAI.git',
    liveUrl: 'https://interviai-frontend.onrender.com/',
    imageUrl: interviaiImg
  },
  {
    id: 'insurance-claims-agent',
    name: 'Insurance Claims Adjudication Agent',
    kitNumber: '#09',
    tacticalRole: 'CF / Intelligent Execution',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Autonomous agentic claims adjudication pipeline with policy-grounded BM25Plus retrieval and human reviewer escalation.',
    description: 'Automates insurance claim evaluations against complex policy coverage and exclusion clauses while preserving complete auditability. Implements a multi-node LangGraph pipeline that extracts claim facts, queries policy text with BM25Plus retrieval, grades clause relevance, and computes coverage decisions. Routes edge cases to human review.',
    technologies: ['Python', 'FastAPI', 'React', 'LangGraph', 'PostgreSQL'],
    githubUrl: 'https://github.com/lakshyabapna/insurance-claims-adjudication-agent',
    liveUrl: 'https://insurance-claims-frontend-6cwb.onrender.com/',
    imageUrl: insuranceAgentImg
  },
  {
    id: 'traceo',
    name: 'Traceo',
    kitNumber: '#07',
    tacticalRole: 'LW / Real-time Tracer',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Order shipment observability and tracking platform with authenticated customer order lifecycle management.',
    description: 'Provides end-to-end customer order lifecycle visibility with protected routing. Integrates RESTful order retrieval services allowing users to track package logistics across statuses, inspect detailed item breakdowns, and execute in-app cancellation workflows with reactive state updates.',
    technologies: ['React', 'JavaScript', 'REST APIs', 'CSS'],
    githubUrl: 'https://github.com/lakshyabapna/Traceo.git',
    liveUrl: 'https://traceo.vercel.app/',
    imageUrl: traceoImg
  },
  {
    id: 'finbud',
    name: 'FinBud',
    kitNumber: '#08',
    tacticalRole: 'CM / Tactical Engine',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Full-stack personal finance platform for transaction tracking, analytics, budgeting, and financial reporting.',
    description: 'Enables users to manage personal income and expenses within a secure environment. Features full CRUD operations across categories, dashboard telemetry comparing daily burn rates, MongoDB server-side aggregation pipelines for monthly savings metrics, and interactive visualizations.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/lakshyabapna/FinBud.git',
    liveUrl: 'https://fin-bud-two.vercel.app/',
    imageUrl: finbudImg
  },
  {
    id: 'our-shoppr',
    name: 'Our Shoppr',
    kitNumber: '#06',
    tacticalRole: 'LCM / Commerce Core',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Modern responsive e-commerce web platform featuring dynamic catalog filtering and real-time cart state orchestration.',
    description: 'A multi-category online retail interface supporting categorical routing across Men, Women, and Kids collections. Utilizes centralized shopping cart state synchronization with real-time quantity adjustments, subtotal calculations, and responsive mobile-optimized checkout layouts.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/lakshyabapna/Ecommerce.git',
    liveUrl: 'https://ourshopper.netlify.app/',
    imageUrl: ourShopperImg
  },
  {
    id: 'my-edusity-app',
    name: 'My Edusity App',
    kitNumber: '#11',
    tacticalRole: 'RCM / Dynamic Platform',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: false,
    tagline: 'Interactive educational portal showcase with programmatic smooth-scroll navigation and modular program galleries.',
    description: 'A university landing and academic exploration web application designed for prospective students. Built with React and Vite, featuring smooth sectional scroll navigation, dynamic modal video player integration, animated student testimonials, and academic program catalogs.',
    technologies: ['React', 'JavaScript', 'Vite', 'CSS'],
    githubUrl: 'https://github.com/lakshyabapna/My_Edusity_App.git',
    liveUrl: 'https://jade-raindrop-b0e6ac.netlify.app/',
    imageUrl: myEdusityImg
  },
  {
    id: 'researchscope',
    name: 'ResearchScope',
    kitNumber: '#05',
    tacticalRole: 'RCB / GenAI Intelligence',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: true,
    tagline: 'Dual-mode intelligent research analysis platform bridging classical statistical NLP with autonomous agentic research workflows.',
    description: 'A dual-paradigm scientific synthesis platform. Features an offline statistical NLP pipeline for topic modeling and extractive summarization, alongside an autonomous LangGraph agent that conducts live web searches, synthesizes structured literature reviews, and exports branded PDF dossiers.',
    technologies: ['Python', 'Streamlit', 'LangGraph', 'Scikit-learn'],
    githubUrl: 'https://github.com/Kushal425/GENai_SecA_P1.git',
    liveUrl: 'https://researchscopegenai.streamlit.app/',
    contributionsNote: 'Collaborative GenAI Course Project (Team of 3)',
    imageUrl: researchScopeImg
  },
  {
    id: 'synthetic-data-studio',
    name: 'Synthetic Data Studio (MedSynth)',
    kitNumber: '#04',
    tacticalRole: 'LCB / Data Foundation',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: true,
    tagline: 'Privacy-first synthetic healthcare data generation platform using Generative Adversarial Networks (GANs).',
    description: 'Addresses the shortage of training data in healthcare AI by generating statistically identical, PHI-scrubbed synthetic medical cohorts without exposing real patient health information. Features a decoupled API architecture polymorphically instantiating ImageGAN and TabularGAN.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Python', 'PyTorch'],
    githubUrl: 'https://github.com/adityamathur5836/SD_Capstone.git',
    liveUrl: 'https://sdcapstone.vercel.app/',
    contributionsNote: 'Software Engineering Capstone Team Project',
    imageUrl: medSynthImg
  },
  {
    id: 'civic-sense-ai',
    name: 'Civic Sense AI',
    kitNumber: '#03',
    tacticalRole: 'RB / Community Defender',
    category: 'live',
    isStartingXI: true,
    isLive: true,
    isCollaborative: true,
    tagline: 'Multimodal AI platform for automated urban civic issue detection, legal categorization, and citizen grievance logging.',
    description: 'Engineered during the 24-hour HackXIndia Hackathon to automate reporting of civic hazards. Combines image preprocessing and OCR with multimodal LLMs to automatically classify municipal violations (e.g. road damage, illegal waste dumping) and map incidents to legal penal codes.',
    technologies: ['React', 'FastAPI', 'Python', 'OpenCV', 'MongoDB'],
    githubUrl: 'https://github.com/jaiswalsachin49/HackXIndia-Hackathon-2026.git',
    liveUrl: 'https://hack-x-india-hackathon-2026-rho.vercel.app/',
    contributionsNote: 'HackXIndia 24-Hour Hackathon Build (Team Project)',
    imageUrl: civicSenseImg
  },
  {
    id: 'british-airways',
    name: 'British Airways Review & Predictive Insights',
    kitNumber: '#15',
    tacticalRole: 'LB / Analytical Anchor',
    category: 'dva',
    isStartingXI: true,
    isLive: false,
    isCollaborative: false,
    tagline: 'Comprehensive customer sentiment analysis, route satisfaction metrics, and flight booking predictive modeling.',
    description: 'Analyzes end-to-end commercial aviation passenger satisfaction across thousands of verified British Airways customer reviews. Utilizes Python and Tableau to investigate feedback trends across cabin classes, aircraft types, and route networks.',
    technologies: ['Python', 'Pandas', 'Tableau', 'EDA'],
    githubUrl: 'https://github.com/lakshyabapna/British-Airways.git',
    liveUrl: null,
    imageUrl: britishAirwaysImg
  },
  {
    id: 'customer-churn-intelligence',
    name: 'Customer Churn Intelligence',
    kitNumber: '#12',
    tacticalRole: 'GK / Data Foundation',
    category: 'dva',
    isStartingXI: true,
    isLive: false,
    isCollaborative: true,
    tagline: 'Banking customer retention analytics and behavioral churn driver identification across retail banking portfolios.',
    description: 'Identifies financial and demographic indicators driving account closures across 10,000 retail banking customers. Evaluates churn propensity against credit score, balance tiers, and engagement through exploratory statistical analysis and interactive Tableau dashboards.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Tableau'],
    githubUrl: 'https://github.com/lakshyabapna/SectionA_G9_Customer_Churn_Intelligence.git',
    liveUrl: null,
    contributionsNote: 'DVA Capstone 2 Team Project (Dataset Sourcing, ETL & Cleaning, Tableau Dashboard)',
    imageUrl: customerChurnImg
  },
  {
    id: 'dva-capstone-group-15',
    name: 'DVA Capstone Group 15',
    kitNumber: '#14',
    tacticalRole: 'Tactical Substitute / Data Pipeline',
    category: 'dva',
    isStartingXI: false,
    isLive: false,
    isCollaborative: true,
    tagline: 'Comprehensive data analysis capstone system',
    description: null,
    technologies: ['DVA', 'Data Science', 'Analytics'],
    githubUrl: 'https://github.com/makeprodigy/DVA-capstone-group-15',
    liveUrl: null,
    contributionsNote: 'Group Capstone Project'
  },
  {
    id: 'mind-the-product',
    name: 'Mind the Product — IIT Roorkee',
    kitNumber: '#17',
    tacticalRole: 'Tournament Striker / Product Innovation',
    category: 'hackathon',
    isStartingXI: false,
    isLive: false,
    isCollaborative: true,
    tagline: 'Product challenge submission for IIT Roorkee',
    description: null,
    technologies: ['Product Strategy', 'Prototyping'],
    githubUrl: 'https://github.com/lakshyabapna/MTP.git',
    liveUrl: null,
    contributionsNote: 'IIT Roorkee Hackathon Submission'
  }
];
