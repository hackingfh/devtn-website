"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "client" | "agent";
  text: string;
};

const services = [
  {
    title: "Développement Web",
    desc: "Sites vitrines, apps métiers et plateformes e-commerce rapides, sécurisées et optimisées SEO.",
  },
  {
    title: "Développement Mobile",
    desc: "Applications iOS/Android fluides avec une expérience utilisateur moderne et une architecture scalable.",
  },
  {
    title: "Maintenance & Évolution",
    desc: "Améliorations continues, monitoring, correction de bugs et accompagnement long terme.",
  },
];

const portfolio = [
  {
    name: "Plateforme E-learning",
    stack: "Next.js, Node.js, PostgreSQL",
    impact: "+40% d'engagement utilisateur",
  },
  {
    name: "App Mobile de Livraison",
    stack: "React Native, Firebase",
    impact: "-30% de temps de traitement",
  },
  {
    name: "CRM pour PME",
    stack: "Next.js, Prisma, MySQL",
    impact: "+25% de productivité équipe",
  },
];

const aiAgents = [
  {
    code: "العين",
    title: "Agent Intelligence",
    autonomy: "95%",
    role: "Analyse complète du prospect: secteur, concurrence, stack actuelle, budget estimatif et style de communication.",
  },
  {
    code: "الحارس",
    title: "Agent Qualification",
    autonomy: "98%",
    role: "Qualification automatique des leads entrants (formulaire, WhatsApp, messages) avec scoring 0-100.",
  },
  {
    code: "الصياد",
    title: "Agent Outreach",
    autonomy: "90%",
    role: "Campagnes sortantes personnalisées, relances intelligentes et apprentissage basé sur les réponses.",
  },
  {
    code: "المفاوض",
    title: "Agent Closer",
    autonomy: "85%",
    role: "Préparation d'offres sur mesure, réponses aux objections et négociation des opportunités sérieuses.",
  },
  {
    code: "الحاضن",
    title: "Agent Customer Success",
    autonomy: "95%",
    role: "Suivi post-livraison, fidélisation, upsell et détection proactive des risques de churn.",
  },
];

const roadmap = [
  { phase: "Semaine 1-2", label: "Entraînement", autonomy: "~50%" },
  { phase: "Semaine 3-4", label: "Confiance conditionnelle", autonomy: "~70%" },
  { phase: "Mois 2", label: "Stabilisation", autonomy: "~85%" },
  { phase: "Mois 3", label: "Autonomie avancée", autonomy: "90-95%" },
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      text: "Bonjour 👋 Je suis l'agent IA de DevTN. Décrivez votre besoin et je vous aide à cadrer le projet.",
    },
  ]);
  const [input, setInput] = useState("");

  const [proposal, setProposal] = useState({
    name: "",
    email: "",
    budget: "",
    details: "",
  });

  const lastAgentMessage = useMemo(
    () => messages.filter((m) => m.role === "agent").at(-1)?.text,
    [messages],
  );

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const clientMessage: ChatMessage = { role: "client", text: input.trim() };

    const autoReply: ChatMessage = {
      role: "agent",
      text: "Merci pour votre message. Notre Dispatcher va orienter votre demande vers l'agent IA adapté puis vous recevrez un plan d'action clair (scope, délai, budget).",
    };

    setMessages((prev) => [...prev, clientMessage, autoReply]);
    setInput("");
  };

  const handleProposalSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Merci ! Votre proposition de projet a bien été envoyée à DevTN.");
    setProposal({ name: "", email: "", budget: "", details: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight text-cyan-400">DevTN</h1>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-cyan-400">Services</a>
            <a href="#portfolio" className="hover:text-cyan-400">Portfolio</a>
            <a href="#agents" className="hover:text-cyan-400">Équipe IA</a>
            <a href="#projet" className="hover:text-cyan-400">Proposer un projet</a>
            <a href="#chat" className="hover:text-cyan-400">Chat IA</a>
            <a href="#contact" className="hover:text-cyan-400">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-10">
        <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">Agence Web, Mobile & IA</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight">DevTN construit vos produits digitaux et automatise votre performance commerciale.</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Nous combinons ingénierie web/mobile et orchestration d&apos;agents IA pour accélérer la croissance et améliorer l&apos;efficacité opérationnelle.
          </p>
        </section>

        <section id="services">
          <h3 className="text-2xl font-bold">Services</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <h4 className="text-lg font-semibold text-cyan-400">{service.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio">
          <h3 className="text-2xl font-bold">Portfolio</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {portfolio.map((project) => (
              <article key={project.name} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <h4 className="text-lg font-semibold">{project.name}</h4>
                <p className="mt-2 text-sm text-slate-400">Stack: {project.stack}</p>
                <p className="mt-1 text-sm text-emerald-400">Impact: {project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="agents" className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">🧠 Équipe IA commerciale (5 agents + Dispatcher)</h3>
          <p className="mt-2 text-sm text-slate-300">
            Modèle inspiré de votre organisation cible: 5 agents spécialisés qui collaborent via un <strong>Dispatcher</strong> central pour atteindre 90-95% d&apos;autonomie.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {aiAgents.map((agent) => (
              <article key={agent.code} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold text-cyan-400">{agent.title}</h4>
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">Autonomie {agent.autonomy}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">Nom codé: {agent.code}</p>
                <p className="mt-3 text-sm text-slate-300">{agent.role}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-cyan-500/30 bg-slate-950 p-5">
            <h4 className="text-lg font-semibold text-cyan-300">🎮 Dispatcher (Manager de tâches)</h4>
            <p className="mt-2 text-sm text-slate-300">
              Il reçoit chaque événement client, priorise (urgent / important / normal), assigne le bon agent et suit l&apos;exécution pour éviter les conflits ou la surcharge.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {roadmap.map((step) => (
              <div key={step.phase} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                <p className="text-xs text-slate-400">{step.phase}</p>
                <p className="text-sm font-semibold">{step.label}</p>
                <p className="text-sm text-emerald-400">{step.autonomy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projet" className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">Proposer un projet</h3>
          <p className="mt-2 text-sm text-slate-300">Parlez-nous de votre besoin. Notre équipe vous répond avec une proposition adaptée.</p>

          <form onSubmit={handleProposalSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Nom"
              value={proposal.name}
              onChange={(e) => setProposal((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="email"
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Email"
              value={proposal.email}
              onChange={(e) => setProposal((p) => ({ ...p, email: e.target.value }))}
            />
            <select
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={proposal.budget}
              onChange={(e) => setProposal((p) => ({ ...p, budget: e.target.value }))}
            >
              <option value="">Budget estimé</option>
              <option>Moins de 5 000 €</option>
              <option>5 000 € - 15 000 €</option>
              <option>15 000 € - 50 000 €</option>
              <option>50 000 € et plus</option>
            </select>
            <input
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Délai souhaité"
            />
            <textarea
              required
              rows={4}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm md:col-span-2"
              placeholder="Décrivez votre projet"
              value={proposal.details}
              onChange={(e) => setProposal((p) => ({ ...p, details: e.target.value }))}
            />
            <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400 md:col-span-2">
              Envoyer la proposition
            </button>
          </form>
        </section>

        <section id="chat" className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">Chat avec nos agents IA</h3>
          <p className="mt-2 text-sm text-slate-300">
            Nos agents IA expliquent leurs rôles, collectent vos besoins et préparent le brief pour l&apos;équipe DevTN.
          </p>

          <div className="mt-4 h-72 space-y-3 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${msg.role === "agent" ? "bg-slate-800 text-slate-200" : "ml-auto bg-cyan-500 text-slate-950"}`}>
                <strong className="mr-2">{msg.role === "agent" ? "Agent IA" : "Client"}</strong>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Posez votre question..."
            />
            <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400">Envoyer</button>
          </form>

          {lastAgentMessage && <p className="mt-3 text-xs text-slate-400">Dernière réponse agent : {lastAgentMessage}</p>}
        </section>

        <section id="contact" className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">Contact</h3>
          <p className="mt-2 text-sm text-slate-300">Email: contact@devtn.tn</p>
          <p className="text-sm text-slate-300">Téléphone: +216 00 000 000</p>
          <p className="text-sm text-slate-300">Adresse: Tunis, Tunisie</p>
        </section>
      </main>
    </div>
  );
}
