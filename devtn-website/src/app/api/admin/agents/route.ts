import { NextResponse } from "next/server";
import { AGENTS, AgentId } from "@/lib/agents";
import { isAdminRequest, AgentControlMap } from "@/lib/admin-auth";
import { readAgentConfig, writeAgentConfig } from "@/lib/agent-config";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  const config = await readAgentConfig();
  return NextResponse.json({ ok: true, config, agents: AGENTS });
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  const body = (await req.json()) as { controls?: AgentControlMap };
  const controls = body.controls;

  if (!controls) {
    return NextResponse.json({ ok: false, error: "Controls manquants" }, { status: 400 });
  }

  const normalized = Object.keys(AGENTS).reduce((acc, key) => {
    const k = key as AgentId;
    acc[k] = { enabled: Boolean(controls?.[k]?.enabled) };
    return acc;
  }, {} as AgentControlMap);

  const saved = await writeAgentConfig(normalized);
  return NextResponse.json({ ok: true, config: saved });
}
