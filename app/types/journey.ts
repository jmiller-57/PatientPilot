export interface Tip {
  id: string;
  title: string;
  body: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Substage {
  id: string;
  title: string;
  description: string;
  painPoints: string[];
  tips: Tip[];
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  substages: Substage[];
}

export interface PatientJourneyData {
  stages: Stage[];
  metadata: {
    version: string;
    lastUpdated: string;
    source: string;
    totalStages: number;
    totalSubstages: number;
  };
}
