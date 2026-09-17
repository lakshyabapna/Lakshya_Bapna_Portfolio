/**
 * LAKSHYA BAPNA — PERSONAL PROFILE & BRAND IDENTITY
 * 
 * Policy:
 * - Natural, human language only.
 * - No fake ratings, no fake statistics, no invented personal hobbies.
 * - Clean editable fields for future personal details.
 */

export interface ProfileData {
  name: string;
  role: string;
  shortTagline: string;
  avatarUrl?: string | null;
  bioParagraphs: string[];
  education: string;
  currentFocus: string;
  location?: string;
  matchStatus: string;
  links: {
    github: string;
    linkedin: string;
    dvaPortfolio: string;
    resumeUrl: string | null;
    email: string;
  };
  coreStrengths: {
    name: string;
    description: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'Lakshya Bapna',
  role: 'AI / Full-Stack Developer',
  shortTagline: 'A builder, learner and sports enthusiast who loves turning ideas into real-world products.',
  avatarUrl: '/assets/player/Theplayercard.jpeg',
  education: 'Newton School of Technology',
  currentFocus: 'AI, Full-Stack Development & Building Useful Products',
  location: 'India',
  matchStatus: 'Open to Opportunities',
  bioParagraphs: [
    "Hi! I'm Lakshya Bapna, an undergraduate at Newton School of Technology (2024–2028). I enjoy building products, exploring new technologies and solving real problems, whether it's working on an AI agent, a web app or just a small tool that makes life easier.",
    "When I'm not coding, you'll probably find me watching or playing sports. I love cricket, football and badminton. Sports have taught me a lot about discipline, teamwork and staying consistent, which also reflects in how I approach my work.",
    "I'm also a big fan of travelling, exploring new places, cultures and food always gives me a fresh perspective. I enjoy music, good conversations and learning about different fields beyond tech.",
    "I'm always open to learning, collaborating and working on interesting ideas. If you think we can build something cool together or just want to have a chat, feel free to reach out!"
  ],
  links: {
    github: 'https://github.com/lakshyabapna',
    linkedin: 'https://www.linkedin.com/in/lakshya-bapna-73bb50323/',
    dvaPortfolio: 'https://lakshyabapna.github.io/DVA-Portfolio/#',
    resumeUrl: '/Lakshya_Bapna_Resume.pdf',
    email: 'lakshyabapna03@gmail.com'
  },
  coreStrengths: [
    { name: 'AI & Agents', description: 'Building with LLMs, LangGraph, and real-world AI use cases.' },
    { name: 'Full-Stack', description: 'React, Node.js, modern web apps and scalable architectures.' },
    { name: 'Problem Solving', description: 'Breaking down complex problems and finding practical solutions.' },
    { name: 'Rapid Execution', description: 'Hackathons, fast iteration and turning ideas into products.' }
  ]
};
