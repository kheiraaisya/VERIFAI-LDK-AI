import { STORAGE_VERSION } from './storageKeys';
import type { Verification } from '../../types';
export interface StoredData { version: number; verifications: Verification[] }
export const migrate = (raw: unknown): StoredData => {
  if (!raw || typeof raw !== 'object') throw new Error('Format backup tidak valid.');
  const candidate = raw as Partial<StoredData>;
  if (!Array.isArray(candidate.verifications)) throw new Error('Data verifikasi tidak ditemukan.');
  if (candidate.version !== STORAGE_VERSION) throw new Error('Versi data tidak didukung.');
  return { version: STORAGE_VERSION, verifications: candidate.verifications as Verification[] };
};
