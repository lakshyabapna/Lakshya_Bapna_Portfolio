/**
 * STARTING XI — FORMATION LAYOUT CONFIG
 *
 * Presentational formation data only.
 * All project content remains in src/data/projects.ts (single source of truth).
 *
 * Coordinate system:
 *   xPercent: 0 = left edge, 100 = right edge
 *   yPercent: 0 = top (attack end), 100 = bottom (GK end)
 *
 * Tactical labels are visual metaphors only.
 * Formation: 4-3-3 (LW–CF–RW forward line)
 */

export interface PitchPosition {
  projectId: string;
  pitchZone: 'forward' | 'midfield' | 'defence' | 'goalkeeper';
  tacticalLabel: string;
  xPercent: number;
  yPercent: number;
  formationIndex: number;
}

export const STARTING_XI_FORMATION: PitchPosition[] = [
  // FORWARDS — LW–CF–RW (y ≈ 20%)
  { projectId: 'traceo',                      pitchZone: 'forward',    tacticalLabel: 'LW',  xPercent: 22, yPercent: 20, formationIndex: 11 },
  { projectId: 'interviai',                   pitchZone: 'forward',    tacticalLabel: 'CF',  xPercent: 50, yPercent: 20, formationIndex: 10 },
  { projectId: 'insurance-claims-agent',      pitchZone: 'forward',    tacticalLabel: 'RW',  xPercent: 78, yPercent: 20, formationIndex: 9  },

  // MIDFIELDERS — LCM–CM–RCM (y ≈ 43%)
  { projectId: 'our-shoppr',                  pitchZone: 'midfield',   tacticalLabel: 'LCM', xPercent: 22, yPercent: 43, formationIndex: 8  },
  { projectId: 'finbud',                      pitchZone: 'midfield',   tacticalLabel: 'CM',  xPercent: 50, yPercent: 43, formationIndex: 7  },
  { projectId: 'my-edusity-app',              pitchZone: 'midfield',   tacticalLabel: 'RCM', xPercent: 78, yPercent: 43, formationIndex: 6  },

  // DEFENDERS — LB–LCB–RCB–RB (y ≈ 64%)
  { projectId: 'british-airways',             pitchZone: 'defence',    tacticalLabel: 'LB',  xPercent: 10, yPercent: 64, formationIndex: 5  },
  { projectId: 'synthetic-data-studio',       pitchZone: 'defence',    tacticalLabel: 'LCB', xPercent: 33, yPercent: 64, formationIndex: 4  },
  { projectId: 'researchscope',               pitchZone: 'defence',    tacticalLabel: 'RCB', xPercent: 67, yPercent: 64, formationIndex: 3  },
  { projectId: 'civic-sense-ai',              pitchZone: 'defence',    tacticalLabel: 'RB',  xPercent: 90, yPercent: 64, formationIndex: 2  },

  // GOALKEEPER (y ≈ 82%)
  { projectId: 'customer-churn-intelligence', pitchZone: 'goalkeeper', tacticalLabel: 'GK',  xPercent: 50, yPercent: 82, formationIndex: 1  },
];

/** Formation connection pairs for tactical SVG lines */
export const FORMATION_CONNECTIONS: Array<[string, string]> = [
  ['customer-churn-intelligence', 'synthetic-data-studio'],
  ['customer-churn-intelligence', 'researchscope'],
  ['synthetic-data-studio', 'british-airways'],
  ['researchscope', 'civic-sense-ai'],
  ['synthetic-data-studio', 'finbud'],
  ['researchscope', 'finbud'],
  ['finbud', 'our-shoppr'],
  ['finbud', 'my-edusity-app'],
  ['our-shoppr', 'traceo'],
  ['my-edusity-app', 'insurance-claims-agent'],
  ['finbud', 'interviai'],
];
