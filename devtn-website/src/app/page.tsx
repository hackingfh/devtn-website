"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "client" | "agent";
  text: string;
};

const services = [
  {
    title: "Création de sites web",
    desc: "Sites vitrines et plateformes web performantes, orientées conversion et SEO.",
  },
  {
    title: "Applications mobiles",
    desc: "Applications iOS/Android rapides, modernes et connectées à votre business.",
  },
  {
    title: "IA & Automatisation",
    desc: "Agents IA pour qualification client, support, suivi et productivité opérationnelle.",
  },
];

const featuredProjects = [
  { name: "Plateforme E-learning", tag: "EdTech", result: "+40% engagement" },
  { name: "App de Livraison", tag: "Logistique", result: "-30% temps de traitement" },
  { name: "CRM PME", tag: "SaaS", result: "+25% productivité" },
];

const showcase = [
  {
    title: "Marketplace B2B",
    summary: "Gestion fournisseurs, devis, commandes et facturation automatisée.",
  },
  {
    title: "Portail Client SaaS",
    summary: "Abonnements, facturation, support et espace client sécurisé.",
  },
  {
    title: "Dashboard RH Intelligent",
    summary: "Pilotage RH avec alertes, analytics et exports de rapports.",
  },
  {
    title: "Application de réservation",
    summary: "Réservation, paiement en ligne et notifications en temps réel.",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      text: "Bonjour 👋 Je suis l'agent IA DevTN. Décrivez votre besoin et je vous propose un plan concret.",
    },
  ]);
  const [input, setInput] = useState("");

  const [proposal, setProposal] = useState({
    name: "",
    email: "",
    budget: "",
    details: "",
    timeline: "",
  });

  const lastAgentMessage = useMemo(
    () => messages.filter((m) => m.role === "agent").at(-1)?.text,
    [messages],
  );

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const clientMessage: ChatMessage = { role: "client", text: input.trim() };
    setMessages((prev) => [...prev, clientMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, clientMessage] }),
      });

      const data = await response.json();

      const reply: ChatMessage = {
        role: "agent",
        text:
          data?.reply ||
          "Merci. Nous revenons vers vous avec un cadrage, une estimation et le prochain plan d'action.",
      };

      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Service momentanément indisponible. Réessayez dans quelques instants.",
        },
      ]);
    }

    setInput("");
  };

  const handleProposalSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proposal),
    });

    if (res.ok) {
      alert("Merci ! Votre proposition de projet a été envoyée.");
      setProposal({ name: "", email: "", budget: "", details: "", timeline: "" });
    } else {
      alert("Une erreur est survenue. Merci de réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070b14]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-cyan-400">DevTN</h1>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-cyan-400">Services</a>
            <a href="#portfolio" className="hover:text-cyan-400">Portfolio</a>
            <a href="#exemples" className="hover:text-cyan-400">Projets</a>
            <a href="#contact" className="hover:text-cyan-400">Contact</a>
            <Link href="/projects" className="hover:text-cyan-400">Tous les projets</Link>
            <Link href="/admin" className="rounded-md border border-cyan-400/40 px-3 py-1 text-cyan-300 hover:bg-cyan-400/10">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-14 px-6 py-10">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0e1628] via-[#0a1220] to-[#0a0f1a] p-8 md:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Agence digitale en Tunisie</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Nous concevons des produits web & mobile qui transforment votre business.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            DevTN combine design moderne, ingénierie solide et IA pour livrer des solutions rapides, évolutives et orientées résultats.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projet" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-[#04111f] hover:bg-cyan-300">Démarrer un projet</a>
            <Link href="/projects" className="rounded-lg border border-white/20 px-4 py-2 text-slate-200 hover:border-cyan-400 hover:text-cyan-300">Voir nos réalisations</Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-slate-400">Projets livrés</p><p className="mt-1 text-3xl font-bold text-cyan-300">120+</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-slate-400">Satisfaction client</p><p className="mt-1 text-3xl font-bold text-cyan-300">98%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-slate-400">Temps moyen de livraison MVP</p><p className="mt-1 text-3xl font-bold text-cyan-300">3-6 sem.</p>
          </div>
        </section>

        <section id="services">
          <h3 className="text-2xl font-bold">Nos services</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-semibold text-cyan-300">{service.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio">
          <h3 className="text-2xl font-bold">Portfolio</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.name} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-cyan-300">{project.tag}</p>
                <h4 className="mt-2 text-lg font-semibold">{project.name}</h4>
                <p className="mt-2 text-sm text-emerald-300">{project.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="exemples" className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold">Exemples de projets</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {showcase.map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-[#0c1324] p-5">
                <h4 className="text-lg font-semibold text-cyan-300">{item.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projet" className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold">Proposer un projet</h3>
          <form onSubmit={handleProposalSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
            <input required className="rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm" placeholder="Nom" value={proposal.name} onChange={(e) => setProposal((p) => ({ ...p, name: e.target.value }))} />
            <input type="email" required className="rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm" placeholder="Email" value={proposal.email} onChange={(e) => setProposal((p) => ({ ...p, email: e.target.value }))} />
            <select required className="rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm" value={proposal.budget} onChange={(e) => setProposal((p) => ({ ...p, budget: e.target.value }))}>
              <option value="">Budget estimé</option><option>Moins de 5 000 €</option><option>5 000 € - 15 000 €</option><option>15 000 € - 50 000 €</option><option>50 000 € et plus</option>
            </select>
            <input className="rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm" placeholder="Délai souhaité" value={proposal.timeline} onChange={(e) => setProposal((p) => ({ ...p, timeline: e.target.value }))} />
            <textarea required rows={4} className="rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm md:col-span-2" placeholder="Décrivez votre projet" value={proposal.details} onChange={(e) => setProposal((p) => ({ ...p, details: e.target.value }))} />
            <button className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-[#04111f] hover:bg-cyan-300 md:col-span-2">Envoyer la proposition</button>
          </form>
        </section>

        <section id="chat" className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold">Assistant IA DevTN</h3>
          <div className="mt-4 h-72 space-y-3 overflow-y-auto rounded-lg border border-white/10 bg-[#0b1222] p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${msg.role === "agent" ? "bg-slate-800 text-slate-200" : "ml-auto bg-cyan-400 text-[#04111f]"}`}>
                <strong className="mr-2">{msg.role === "agent" ? "Agent IA" : "Client"}</strong>{msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm" placeholder="Posez votre question..." />
            <button className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-[#04111f] hover:bg-cyan-300">Envoyer</button>
          </form>
          {lastAgentMessage && <p className="mt-3 text-xs text-slate-400">Dernière réponse: {lastAgentMessage}</p>}
        </section>

        <section id="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold">Contact</h3>
          <p className="mt-2 text-sm text-slate-300">Email: contact@devtn.tn</p>
          <p className="text-sm text-slate-300">Téléphone: +216 00 000 000</p>
          <p className="text-sm text-slate-300">Adresse: Tunis, Tunisie</p>
        </section>
      </main>
    </div>
  );
}
