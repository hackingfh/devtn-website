import type { AgentId } from "@/lib/agents";

export const ADMIN_COOKIE = "devtn_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "devtn-admin-123";
}

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || "devtn-session-token-change-me";
}

export function isAdminRequest(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = getAdminSessionToken();
  return cookieHeader.split(";").some((entry) => {
    const [k, v] = entry.trim().split("=");
    return k === ADMIN_COOKIE && decodeURIComponent(v || "") === token;
  });
}

export type AgentControlMap = Record<AgentId, { enabled: boolean }>;
