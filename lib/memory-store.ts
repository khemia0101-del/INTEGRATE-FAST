import type { AuditSnapshot } from "@/lib/audit";

type LeadRecord = Record<string, unknown> & { id: string; createdAt: string };
type AuditRecord = {
  id: string;
  sessionToken: string;
  status: string;
  snapshot: AuditSnapshot;
  createdAt: string;
  updatedAt: string;
} & Record<string, unknown>;
type ChatRecord = { id: string; visitorId: string; messages: unknown; createdAt: string };

const globalStore = globalThis as unknown as {
  integrateFastStore?: {
    leads: LeadRecord[];
    audits: AuditRecord[];
    chats: ChatRecord[];
  };
};

export const memoryStore =
  globalStore.integrateFastStore ??
  (globalStore.integrateFastStore = {
    leads: [],
    audits: [],
    chats: [],
  });

export function makeId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
}
