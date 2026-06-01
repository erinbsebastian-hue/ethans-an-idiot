// Raw score → scaled score lookup tables
// English: 50q, Math: 45q, Reading: 36q, Science: 40q
const RAW_TO_SCALED: Record<'english' | 'math' | 'reading' | 'science', number[]> = {
  // index = raw score (0–50)
  english: [
    1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,18,
    19,20,20,21,22,22,23,24,25,26,27,28,29,30,31,32,33,
    34,35,35,36,36,36,36,36,36,36,36,36,36,36,
  ],
  // index = raw score (0–45)
  math: [
    1,1,2,4,6,7,8,9,10,11,12,13,14,15,16,17,18,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,
    36,36,36,36,36,36,36,36,36,
  ],
  // index = raw score (0–36)
  reading: [
    1,1,3,5,7,9,11,12,13,14,15,16,17,18,19,20,21,22,23,
    24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,36,36,36,
  ],
  // index = raw score (0–40)
  science: [
    1,1,2,3,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,
    22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,
    36,36,36,36,36,
  ],
};

export const RAW_MAX = { english: 50, math: 45, reading: 36, science: 40 } as const;
export type Section = keyof typeof RAW_MAX;

export function rawToScaled(section: Section, raw: number): number {
  const table = RAW_TO_SCALED[section];
  const clamped = Math.max(0, Math.min(raw, table.length - 1));
  return table[clamped];
}

export function calcComposite(scaled: { english: number; math: number; reading: number; science?: number }): number {
  const scores = [scaled.english, scaled.math, scaled.reading];
  if (scaled.science !== undefined) scores.push(scaled.science);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

// ACT to SAT concordance data (College Board official concordance)
export interface ConversionEntry {
  act: number;
  satMin: number;
  satMax: number;
  satMid: number;
  percentile: number;
}

export const CONVERSION_TABLE: ConversionEntry[] = [
  { act: 36, satMin: 1570, satMax: 1600, satMid: 1590, percentile: 99 },
  { act: 35, satMin: 1530, satMax: 1560, satMid: 1540, percentile: 99 },
  { act: 34, satMin: 1490, satMax: 1520, satMid: 1500, percentile: 99 },
  { act: 33, satMin: 1450, satMax: 1480, satMid: 1460, percentile: 98 },
  { act: 32, satMin: 1420, satMax: 1440, satMid: 1430, percentile: 97 },
  { act: 31, satMin: 1390, satMax: 1410, satMid: 1400, percentile: 96 },
  { act: 30, satMin: 1360, satMax: 1380, satMid: 1370, percentile: 94 },
  { act: 29, satMin: 1330, satMax: 1350, satMid: 1340, percentile: 92 },
  { act: 28, satMin: 1300, satMax: 1320, satMid: 1310, percentile: 90 },
  { act: 27, satMin: 1260, satMax: 1290, satMid: 1280, percentile: 87 },
  { act: 26, satMin: 1230, satMax: 1250, satMid: 1240, percentile: 83 },
  { act: 25, satMin: 1200, satMax: 1220, satMid: 1210, percentile: 79 },
  { act: 24, satMin: 1160, satMax: 1190, satMid: 1170, percentile: 74 },
  { act: 23, satMin: 1130, satMax: 1150, satMid: 1140, percentile: 68 },
  { act: 22, satMin: 1100, satMax: 1120, satMid: 1110, percentile: 62 },
  { act: 21, satMin: 1060, satMax: 1090, satMid: 1080, percentile: 56 },
  { act: 20, satMin: 1020, satMax: 1050, satMid: 1040, percentile: 49 },
  { act: 19, satMin:  980, satMax: 1010, satMid:  990, percentile: 42 },
  { act: 18, satMin:  940, satMax:  970, satMid:  960, percentile: 35 },
  { act: 17, satMin:  900, satMax:  930, satMid:  910, percentile: 28 },
  { act: 16, satMin:  860, satMax:  890, satMid:  870, percentile: 22 },
  { act: 15, satMin:  810, satMax:  850, satMid:  830, percentile: 16 },
  { act: 14, satMin:  760, satMax:  800, satMid:  780, percentile: 11 },
  { act: 13, satMin:  700, satMax:  750, satMid:  730, percentile:  7 },
  { act: 12, satMin:  650, satMax:  690, satMid:  670, percentile:  4 },
  { act: 11, satMin:  590, satMax:  640, satMid:  620, percentile:  2 },
  { act: 10, satMin:  530, satMax:  580, satMid:  560, percentile:  1 },
  { act:  9, satMin:  470, satMax:  520, satMid:  500, percentile:  1 },
  { act:  8, satMin:  410, satMax:  460, satMid:  430, percentile:  1 },
  { act:  7, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  6, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  5, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  4, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  3, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  2, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
  { act:  1, satMin:  400, satMax:  400, satMid:  400, percentile:  1 },
];

export interface CollegeCategory {
  label: string;
  color: string;
  bgColor: string;
  actMin: number;
  actMax: number;
  description: string;
  examples: string[];
}

export const COLLEGE_CATEGORIES: CollegeCategory[] = [
  {
    label: 'Elite Range',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    actMin: 33, actMax: 36,
    description: 'Top 1–2% of test takers. Competitive for the most selective universities.',
    examples: ['MIT', 'Harvard', 'Stanford', 'Yale', 'Princeton'],
  },
  {
    label: 'Highly Competitive',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    actMin: 29, actMax: 32,
    description: 'Top 5–10%. Strong candidate for highly selective schools.',
    examples: ['UCLA', 'UC Berkeley', 'Georgetown', 'Vanderbilt', 'Tufts'],
  },
  {
    label: 'Competitive',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/40',
    actMin: 24, actMax: 28,
    description: 'Top 20–30%. Competitive for selective universities.',
    examples: ['University of Michigan', 'Ohio State', 'Penn State', 'Purdue'],
  },
  {
    label: 'Average',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/40',
    actMin: 18, actMax: 23,
    description: 'Near national average. Eligible for most state universities.',
    examples: ['Many state universities', 'Community colleges', 'Regional schools'],
  },
  {
    label: 'Below Average',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    actMin: 1, actMax: 17,
    description: 'Below national average. Consider test prep or open-enrollment schools.',
    examples: ['Open-enrollment colleges', 'Community colleges'],
  },
];

export const ACT_DISTRIBUTION = [
  { score: 1,  pct: 0.1 }, { score: 2,  pct: 0.1 }, { score: 3,  pct: 0.2 },
  { score: 4,  pct: 0.3 }, { score: 5,  pct: 0.5 }, { score: 6,  pct: 0.8 },
  { score: 7,  pct: 1.0 }, { score: 8,  pct: 1.5 }, { score: 9,  pct: 2.0 },
  { score: 10, pct: 2.5 }, { score: 11, pct: 3.0 }, { score: 12, pct: 3.5 },
  { score: 13, pct: 4.0 }, { score: 14, pct: 4.5 }, { score: 15, pct: 5.0 },
  { score: 16, pct: 5.5 }, { score: 17, pct: 6.0 }, { score: 18, pct: 6.5 },
  { score: 19, pct: 6.5 }, { score: 20, pct: 6.5 }, { score: 21, pct: 6.5 },
  { score: 22, pct: 6.0 }, { score: 23, pct: 5.5 }, { score: 24, pct: 5.0 },
  { score: 25, pct: 4.5 }, { score: 26, pct: 4.0 }, { score: 27, pct: 3.5 },
  { score: 28, pct: 3.0 }, { score: 29, pct: 2.5 }, { score: 30, pct: 2.0 },
  { score: 31, pct: 1.5 }, { score: 32, pct: 1.0 }, { score: 33, pct: 0.7 },
  { score: 34, pct: 0.4 }, { score: 35, pct: 0.2 }, { score: 36, pct: 0.1 },
];

export const SAT_DISTRIBUTION = [
  { score: '400–490', pct: 3 }, { score: '500–590', pct: 4 },
  { score: '600–690', pct: 5 }, { score: '700–790', pct: 6 },
  { score: '800–890', pct: 7 }, { score: '900–990', pct: 8 },
  { score: '1000–1090', pct: 9 }, { score: '1100–1190', pct: 10 },
  { score: '1200–1290', pct: 10 }, { score: '1300–1390', pct: 9 },
  { score: '1400–1490', pct: 8 }, { score: '1500–1600', pct: 6 },
];

export function getConversion(act: number): ConversionEntry | undefined {
  return CONVERSION_TABLE.find(e => e.act === act);
}

export function getCollegeCategory(act: number): CollegeCategory {
  return COLLEGE_CATEGORIES.find(c => act >= c.actMin && act <= c.actMax) ?? COLLEGE_CATEGORIES[4];
}

export function estimateComposite(english: number, math: number, reading: number, science: number): number {
  return Math.round((english + math + reading + science) / 4);
}
