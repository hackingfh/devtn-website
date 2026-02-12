import { NextResponse } from "next/server";
import { AGENTS, dispatchAgent } from "@/lib/agents";

type InputMessage = { role: "client" | "agent"; text: string };

async function askOpenAI(
  userText: string,
  agentSystemPrompt: string,
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const agentId = dispatchAgent(lastClient.text);
    const agent = AGENTS[agentId];

    const systemPrompt = `Tu es ${agent.name} (${agent.code}) de DevTN. Mission: ${agent.mission}. Réponds en français, concrètement, en 4 à 8 lignes maximum, orienté action business.`;

    const aiResponse = await askOpenAI(lastClient.text, systemPrompt);

    const fallback = `Je suis ${agent.name} (${agent.code}).\nJe prends en charge votre demande et je propose: 1) cadrage rapide, 2) plan d'action, 3) estimation budget/délai, 4) prochain rendez-vous.`;

    return NextResponse.json({
      ok: true,
      dispatcher: {
        agentId,
        agentName: agent.name,
        autonomy: agent.autonomy,
      },
      reply: aiResponse || fallback,
      mode: aiResponse ? "live-ai" : "fallback",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur serveur sur le chat." },
      { status: 500 },
    );
  }
}
