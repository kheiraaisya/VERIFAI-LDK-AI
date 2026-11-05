import { CHECKLIST, type Verification } from '../../types';
export const score = (v: Verification) => { const done = CHECKLIST.filter(k => v.checklist[k]?.status === 'complete').length; return { done, total: CHECKLIST.length, value: Math.round(done / CHECKLIST.length * 100) }; };
export const scoreLabel = (n: number) => n === 100 ? 'Checklist Lengkap' : n >= 67 ? 'Cukup Lengkap' : n >= 34 ? 'Belum Memadai' : 'Minim';
export const overallStatus = (v: Verification) => { if (v.claims.length && v.claims.every(c => c.status === 'verified')) return 'Selesai'; if (v.claims.some(c => c.status === 'in_review')) return 'Dalam proses'; return 'Belum dimulai'; };
