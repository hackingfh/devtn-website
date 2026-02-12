export type AgentId =
  | "intelligence"
  | "qualification"
  | "outreach"
  | "closer"
  | "success";

export const AGENTS: Record<
  AgentId,
  { name: string; code: string; autonomy: string; mission: string }
> = {
  intelligence: {
    name: "Agent Intelligence",
    code: "العين",
    autonomy: "95%",
    mission:
      "Analyse les prospects: secteur, concurrence, maturité digitale, contraintes et opportunités.",
  },
  qualification: {
    name: "Agent Qualification",
    code: "الحارس",
    autonomy: "98%",
    mission:
      "Qualifie les leads entrants et assigne un score de priorité business.",
  },
  outreach: {
    name: "Agent Outreach",
    code: "الصياد",
    autonomy: "90%",
    mission:
      "Génère des suivis et relances personnalisés selon le contexte client.",
  },
  closer: {
    name: "Agent Closer",
    code: "المفاوض",
    autonomy: "85%",
    mission:
      "Prépare la stratégie d'offre, répond aux objections et propose des alternatives.",
  },
  success: {
    name: "Agent Customer Success",
    code: "الحاضن",
    autonomy: "95%",
    mission:
      "Assure le suivi post-livraison, la fidélisation et les opportunités d'upsell.",
  },
};

export function dispatchAgent(message: string): AgentId {
  const text = message.toLowerCase();

  if (/(prix|devis|offre|négociation|negociation|contrat|budget)/.test(text)) {
    return "closer";
  }

  if (/(support|maintenance|suivi|amélioration|amelioration|problème|probleme)/.test(text)) {
    return "success";
  }

  if (/(lead|qualification|rdv|rendez-vous|score|formulaire)/.test(text)) {
    return "qualification";
  }

  if (/(campagne|email|outreach|prospection|relance)/.test(text)) {
    return "outreach";
  }

  return "intelligence";
}
