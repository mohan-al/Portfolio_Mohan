export type SkillLevel = "Strong" | "Working" | "Learning";

export interface PhotoAsset {
  src: string;
  webpSrc: string;
  width: number;
  height: number;
  alt: string;
}

export interface FeatureFlags {
  showEmployerBadge: boolean;
  showInstagram: boolean;
  heroPhoto: PhotoAsset;
  aboutPhoto: PhotoAsset;
}

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  tabLabel?: string;
  items: SkillItem[];
}

export interface ArchitectureNode {
  label: string;
  sublabel: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  status?: "In Progress";
  oneLineProblem: string;
  stack: string[];
  outcomes: string[];
  githubUrl?: string;
  demoUrl?: string;
  screenshot?: string;
  detail: {
    problem: string;
    approach: string;
    architectureTitle: string;
    architectureNodes: ArchitectureNode[];
    whatILearned: string[];
  };
}

export interface DsaStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  language: string;
  submissionsPastYear: number;
  activeDays: number;
  maxStreakDays: number;
  badges: Array<{
    name: string;
    note?: string;
  }>;
  lastUpdated: string;
  profileUrl: string;
  solutionsRepoUrl: string;
  focusNote: string;
  chessNote: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  date?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  detail?: string;
  date?: string;
  credentialUrl?: string;
}

export interface SectionHeadingCopy {
  index: string;
  title: string;
  subtitle: string;
}

export interface HeroContent {
  studentLabel: string;
  roles: readonly string[];
}

export interface ContactContent {
  heading: SectionHeadingCopy;
  availability: string;
}
