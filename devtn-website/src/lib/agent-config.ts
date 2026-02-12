import { AGENTS, AgentId } from "@/lib/agents";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
import type { AgentControlMap } from "@/lib/admin-auth";

export type AgentConfig = {
  controls: AgentControlMap;
  updatedAt: string;
};

export function defaultAgentControls(): AgentControlMap {
  return Object.keys(AGENTS).reduce((acc, key) => {
    acc[key as AgentId] = { enabled: true };
    return acc;
  }, {} as AgentControlMap);
}

export async function readAgentConfig(): Promise<AgentConfig> {
  const fallback: AgentConfig = {
    controls: defaultAgentControls(),
    updatedAt: new Date(0).toISOString(),
  };

  const cfg = await readJsonFile<AgentConfig>("agent_controls.json", fallback);
  return {
    controls: { ...defaultAgentControls(), ...(cfg.controls || {}) },
    updatedAt: cfg.updatedAt || fallback.updatedAt,
  };
}

export async function writeAgentConfig(controls: AgentControlMap) {
  const payload: AgentConfig = {
    controls,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile("agent_controls.json", payload);
  return payload;
}
