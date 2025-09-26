import raw from '../data/stages.index.json'
import { Tip, Stage } from '../types/tips';

const STAGES: Stage[] = ['before', 'during', 'after'];

export interface UseTips {
  all: Tip[];
  byStage: Record<Stage, Tip[]>;
  stages: Stage[];
  search: (q: string) => Tip[];
  getById: (id: string) => Tip | undefined;
}

export function useTips(): UseTips {
  const all = raw as Tip[];

  const byStage = STAGES.reduce((acc, s) => {
    acc[s] = all.filter(t => t.stage === s);
    return acc;
  }, {} as Record<Stage, Tip[]>);

  function search(q: string) {
    const n = q.trim().toLowerCase();
    if (!n) return all;
    return all.filter(t => 
      (t.title + ' ' + (t.tags || []).join(' ')).toLowerCase().includes(n)
    );
  }

  function getById(id: string) {
    return all.find(t => t.id === id);
  }

  return { all, byStage, stages: STAGES, search, getById }
}