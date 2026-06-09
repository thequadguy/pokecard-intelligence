export interface GradeInput {
  surface: number;   // 1-10
  corners: number;   // 1-10
  edges: number;     // 1-10
  centering: number; // 1-10
}

export interface GradeResult {
  numericGrade: number;
  label: string;
  breakdown: GradeInput;
  confidence: number;
}

export class GradingEngine {
  gradeCard(input: GradeInput): GradeResult {
    const { surface, corners, edges, centering } = input;
    const weighted = (surface * 0.35) + (corners * 0.3) + (edges * 0.2) + (centering * 0.15);
    const numeric = Math.round(weighted * 10) / 10;
    return {
      numericGrade: numeric,
      label: this.toLabel(numeric),
      breakdown: input,
      confidence: this.confidence(input),
    };
  }

  private toLabel(score: number): string {
    if (score >= 9.5) return 'PSA 10 - Gem Mint';
    if (score >= 9.0) return 'PSA 9 - Mint';
    if (score >= 8.0) return 'PSA 8 - NM-MT';
    if (score >= 7.0) return 'PSA 7 - NM';
    if (score >= 6.0) return 'PSA 6 - EX-MT';
    if (score >= 5.0) return 'PSA 5 - EX';
    if (score >= 4.0) return 'PSA 4 - VG-EX';
    return 'PSA 3 or below - VG/Poor';
  }

  private confidence(input: GradeInput): number {
    const vals = Object.values(input);
    const variance = vals.reduce((s, v) => s + Math.pow(v - 8, 2), 0) / vals.length;
    return Math.max(0.5, 1 - variance / 50);
  }
}
