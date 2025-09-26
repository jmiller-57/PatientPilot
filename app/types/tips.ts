export type Stage = 'before' | 'during' | 'after';

export interface Tip {
  id: string;
  stage: Stage;
  category: string;
  title: string;
  body: string;
  tags?: string[];
  updatedAt: string; // ISO timestamp
}

export function isTip(v: any): v is Tip {
  return (
    v &&
    typeof v.id === 'string' &&
    ['before', 'during', 'after'].includes(v.stage) &&
    typeof v.title === 'string' &&
    typeof v.body === 'string'
  );
}