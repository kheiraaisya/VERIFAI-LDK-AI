export type ClaimStatus = 'unverified' | 'in_review' | 'verified' | 'disputed';
export type SourceType = 'Journal' | 'Article' | 'Book' | 'Official website' | 'Research report' | 'Other';
export type SupportStatus = 'Supports' | 'Partially Supports' | 'Contradicts' | 'Not Relevant' | 'Insufficient Evidence';
export type ChecklistStatus = 'pending' | 'complete' | 'not_applicable';
export interface Claim { id: string; text: string; type: string; status: ClaimStatus; createdAt: string; updatedAt: string }
export interface Source { id: string; title: string; authors: string; year: string; doi: string; url: string; type: SourceType; publisher: string; metadataStatus: 'unchecked'|'found'|'not_found'|'error'; metadata?: CrossrefMetadata; createdAt: string; updatedAt: string }
export interface CrossrefMetadata { title: string; authors: string; year: string; doi: string; publisher: string; url: string; titleMatch?: boolean; authorMatch?: boolean; yearMatch?: boolean }
export interface EvidenceLink { id: string; claimId: string; sourceId: string; excerpt: string; support: SupportStatus; reviewerNote: string; createdAt: string; updatedAt: string }
export interface ChecklistItem { status: ChecklistStatus; note: string; evidence: string; checkedAt?: string }
export interface ClaimAssessment { claimId: string; conclusion: string; limitations: string }
export interface VerificationEvent { id: string; at: string; message: string }
export interface Verification { id: string; title: string; topic: string; provider: string; aiContent: string; reviewDate: string; reviewerConclusion: string; limitations: string; claims: Claim[]; sources: Source[]; evidence: EvidenceLink[]; checklist: Record<string, ChecklistItem>; assessments: ClaimAssessment[]; events: VerificationEvent[]; createdAt: string; updatedAt: string }
export const CHECKLIST = ['Source Existence','Metadata Accuracy','Evidence Support','Context and Limitations','Independent Cross-checking','Human Review'] as const;
export const emptyChecklist = (): Record<string, ChecklistItem> => Object.fromEntries(CHECKLIST.map(label => [label,{status:'pending',note:'',evidence:''}]));
