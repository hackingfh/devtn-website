import { NextResponse } from "next/server";
import { AGENTS, AgentId, dispatchAgent } from "@/lib/agents";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
import { readAgentConfig } from "@/lib/agent-config";

type InputMessage = { role: "client" | "agent"; text: string };
type ChatLog = {
  id: string;
  userText: string;
  reply: string;
  agentId: string;
  agentName: string;
  mode: "live-ai-groq" | "fallback";
  createdAt: string;
};

async function askGroq(
  userText: string,
  agentSystemPrompt: string,
): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: "system", content: agentSystemPrompt },
        { role: "user", content: userText },
      ],
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

export async function GET() {
  const logs = await readJsonFile<ChatLog[]>("chat_logs.json", []);
  return NextResponse.json({ ok: true, logs });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: InputMessage[] };
    const messages = body.messages ?? [];
    const lastClient = [...messages].reverse().find((m) => m.role === "client");

    if (!lastClient?.text?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Message client manquant." },
        { status: 400 },
      );
    }

    const suggestedAgentId = dispatchAgent(lastClient.text);
    const config = await readAgentConfig();

    const isEnabled = (id: AgentId) => config.controls?.[id]?.enabled !== false;
    let agentId: AgentId = suggestedAgentId;

    if (!isEnabled(agentId)) {
      const fallbackEnabled = (Object.keys(AGENTS) as AgentId[]).find((id) => isEnabled(id));
      if (!fallbackEnabled) {
        return NextResponse.json({
          ok: false,
          error: "Tous les agents sont désactivés par l'administrateur.",
        }, { status: 503 });
      }
      agentId = fallbackEnabled;
    }

    const agent = AGENTS[agentId];

    const systemPrompt = `Tu es ${agent.name} (${agent.code}) de DevTN. Mission: ${agent.mission}. Réponds en français, concrètement, en 4 à 8 lignes maximum, orienté action business.`;

    const aiResponse = await askGroq(lastClient.text, systemPrompt);

    const fallback = `Je suis ${agent.name} (${agent.code}).\nJe prends en charge votre demande et je propose: 1) cadrage rapide, 2) plan d'action, 3) estimation budget/délai, 4) prochain rendez-vous.`;

    const mode = aiResponse ? "live-ai-groq" : "fallback";
    const finalReply = aiResponse || fallback;

    const logs = await readJsonFile<ChatLog[]>("chat_logs.json", []);
    logs.unshift({
      id: crypto.randomUUID(),
      userText: lastClient.text,
      reply: finalReply,
      agentId,
      agentName: agent.name,
      mode,
      createdAt: new Date().toISOString(),
    });
    await writeJsonFile("chat_logs.json", logs.slice(0, 200));

    return NextResponse.json({
      ok: true,
      dispatcher: {
        agentId,
        agentName: agent.name,
        autonomy: agent.autonomy,
      },
      reply: finalReply,
      mode,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur serveur sur le chat." },
      { status: 500 },
    );
  }
}
