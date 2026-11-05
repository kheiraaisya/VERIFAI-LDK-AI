import { STORAGE_KEY, STORAGE_VERSION } from './storageKeys';
import { migrate, type StoredData } from './storageMigration';
import type { Verification } from '../../types';
export const newId = () => crypto.randomUUID();
export const readAll = (): Verification[] => {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return []; return migrate(JSON.parse(raw)).verifications; }
  catch (error) { console.error('LocalStorage tidak dapat dibaca', error); return []; }
};
export const writeAll = (verifications: Verification[]) => {
  try { const data: StoredData = { version: STORAGE_VERSION, verifications }; localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); window.dispatchEvent(new Event('verifai-storage')); return true; }
  catch (error) { console.error('LocalStorage gagal disimpan', error); throw new Error('Penyimpanan browser penuh atau tidak tersedia. Ekspor backup sebelum melanjutkan.'); }
};
export const importBackup = (text: string) => { const data = migrate(JSON.parse(text)); writeAll(data.verifications); return data.verifications; };
export const exportBackup = () => JSON.stringify({version: STORAGE_VERSION, verifications: readAll()}, null, 2);
