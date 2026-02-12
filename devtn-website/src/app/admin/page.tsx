"use client";

import { useEffect, useMemo, useState } from "react";

type Proposal = {
  id: string;
  name: string;
  email: string;
  budget: string;
  timeline?: string;
  details: string;
  createdAt: string;
};

type ChatLog = {
  id: string;
  userText: string;
  reply: string;
  agentId: string;
  agentName: string;
  mode: "live-ai-groq" | "fallback";
  createdAt: string;
};

type AgentControlMap = Record<string, { enabled: boolean }>;

const adminAgents = [
  { id: "intelligence", name: "Agent Intelligence", expectedTask: "Analyse du prospect" },
  { id: "qualification", name: "Agent Qualification", expectedTask: "Qualification des leads" },
  { id: "outreach", name: "Agent Outreach", expectedTask: "Relances et suivi" },
  { id: "closer", name: "Agent Closer", expectedTask: "Offres et négociation" },
  { id: "success", name: "Agent Customer Success", expectedTask: "Suivi post-livraison" },
];

export default function AdminPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [controls, setControls] = useState<AgentControlMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, cRes, aRes] = await Promise.all([
          fetch("/api/proposals"),
          fetch("/api/chat"),
          fetch("/api/admin/agents"),
        ]);

        if (aRes.status === 401) {
          window.location.href = "/admin/login";
          return;
        }

        const pData = await pRes.json();
        const cData = await cRes.json();
        const aData = await aRes.json();

        setProposals(pData?.proposals || []);
        setLogs(cData?.logs || []);
        setControls(aData?.config?.controls || {});
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const saveControls = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ controls }),
    });
    setSaving(false);

    if (!res.ok) {
      alert("Erreur lors de la sauvegarde.");
      return;
    }

    alert("Contrôle des agents mis à jour.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const agentStats = useMemo(() => {
    return adminAgents.map((agent) => {
      const count = logs.filter((l) => l.agentId === agent.id).length;
      const enabled = controls?.[agent.id]?.enabled ?? true;
      return {
        ...agent,
        count,
        enabled,
        status: enabled ? (count > 0 ? "Actif" : "Prêt") : "Désactivé",
      };
    });
  }, [logs, controls]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">Admin DevTN</h1>
              <p className="mt-2 text-sm text-slate-300">
                Espace privé: vous seul contrôlez l&apos;activation des agents IA.
              </p>
            </div>
            <button onClick={logout} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-rose-400 hover:text-rose-300">
              Déconnexion
            </button>
          </div>
        </header>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Contrôle des agents</h2>
            <button
              disabled={saving}
              onClick={saveControls}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {agentStats.map((agent) => (
              <article key={agent.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-cyan-300">{agent.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs ${agent.status === "Désactivé" ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                    {agent.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">Mission: {agent.expectedTask}</p>
                <p className="mt-1 text-xs text-slate-400">Interactions traitées: {agent.count}</p>

                <label className="mt-3 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agent.enabled}
                    onChange={(e) =>
                      setControls((prev) => ({
                        ...prev,
                        [agent.id]: { enabled: e.target.checked },
                      }))
                    }
                  />
                  Activer cet agent
                </label>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Propositions clients</h2>
          {loading ? (
            <p className="mt-3 text-sm text-slate-400">Chargement...</p>
          ) : proposals.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Aucune proposition pour le moment.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {proposals.slice(0, 20).map((p) => (
                <article key={p.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm"><strong>{p.name}</strong> — {p.email}</p>
                  <p className="text-xs text-slate-400">Budget: {p.budget} | Délai: {p.timeline || "Non précisé"}</p>
                  <p className="mt-2 text-sm text-slate-300">{p.details}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Dernières conversations IA</h2>
          {loading ? (
            <p className="mt-3 text-sm text-slate-400">Chargement...</p>
          ) : logs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Aucune conversation enregistrée.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {logs.slice(0, 20).map((log) => (
                <article key={log.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">
                    {new Date(log.createdAt).toLocaleString()} • {log.agentName} • {log.mode}
                  </p>
                  <p className="mt-2 text-sm text-cyan-300">Client: {log.userText}</p>
                  <p className="mt-2 text-sm text-slate-300">Agent: {log.reply}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
