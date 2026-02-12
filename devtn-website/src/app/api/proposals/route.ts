import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/storage";

type Proposal = {
  id: string;
  name: string;
  email: string;
  budget: string;
  timeline?: string;
  details: string;
  createdAt: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, budget, timeline, details } = body ?? {};

    if (!name || !email || !budget || !details) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 },
      );
    }

    const proposals = await readJsonFile<Proposal[]>("proposals.json", []);
    const newProposal: Proposal = {
      id: crypto.randomUUID(),
      name: String(name),
      email: String(email),
      budget: String(budget),
      timeline: timeline ? String(timeline) : undefined,
      details: String(details),
      createdAt: new Date().toISOString(),
    };

    proposals.unshift(newProposal);
    await writeJsonFile("proposals.json", proposals);

    return NextResponse.json({ ok: true, proposalId: newProposal.id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur serveur lors de l'envoi de la proposition." },
      { status: 500 },
    );
  }
}
