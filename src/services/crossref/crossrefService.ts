import type { CrossrefMetadata } from '../../types';
export async function lookupDoi(doi: string, signal?: AbortSignal): Promise<CrossrefMetadata | null> {
  const normalized = doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  if (!/^10\.\d{4,9}\/\S+$/i.test(normalized)) throw new Error('Format DOI tidak valid.');
  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(normalized)}`, {signal, headers:{Accept:'application/json'}});
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Crossref tidak merespons (${response.status}).`);
  const data = await response.json() as {message: Record<string, unknown>}; const m = data.message;
  const names = Array.isArray(m.author) ? (m.author as {given?:string,family?:string}[]).map(a => [a.given,a.family].filter(Boolean).join(' ')).join(', ') : '';
  const title = Array.isArray(m.title) ? String((m.title as unknown[])[0] ?? '') : '';
  const issued = m.issued as { 'date-parts'?: number[][] } | undefined;
  return {title, authors:names, year:String(issued?.['date-parts']?.[0]?.[0] ?? ''), doi:String(m.DOI ?? normalized), publisher:String(m.publisher ?? ''), url:String(m.URL ?? '')};
}
export const compareMetadata = (metadata: CrossrefMetadata, source: {title:string;authors:string;year:string}) => ({...metadata, titleMatch:metadata.title.trim().toLowerCase() === source.title.trim().toLowerCase(), authorMatch:metadata.authors.toLowerCase().includes(source.authors.trim().toLowerCase()) || source.authors.trim().toLowerCase().includes(metadata.authors.toLowerCase()), yearMatch:metadata.year === source.year});
