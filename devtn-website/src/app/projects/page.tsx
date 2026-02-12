import Link from "next/link";

const allProjects = [
  {
    name: "Plateforme E-learning",
    category: "EdTech",
    stack: "Next.js, Node.js, PostgreSQL",
    description: "Gestion cours, quiz, certificats et tableau de bord formateurs/apprenants.",
  },
  {
    name: "Application de Livraison",
    category: "Mobile",
    stack: "React Native, Firebase",
    description: "Tracking en temps réel, optimisation de tournée et notifications client.",
  },
  {
    name: "CRM PME",
    category: "SaaS",
    stack: "Next.js, Prisma, MySQL",
    description: "Pipeline commercial, suivi clients, KPI et rapports automatiques.",
  },
  {
    name: "Marketplace B2B",
    category: "E-commerce",
    stack: "Next.js, Stripe, PostgreSQL",
    description: "Devis, commandes en gros, facturation et espace fournisseur.",
  },
  {
    name: "Portail Client SaaS",
    category: "SaaS",
    stack: "Next.js, Node.js, Redis",
    description: "Gestion abonnements, support intégré et centre de facturation.",
  },
  {
    name: "Dashboard RH",
    category: "Enterprise",
    stack: "React, NestJS, MongoDB",
    description: "Présence, performance et exports PDF/Excel pour direction RH.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#070b14] px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-cyan-300">Tous les projets DevTN</h1>
          <Link href="/" className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-cyan-400 hover:text-cyan-300">
            Retour accueil
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {allProjects.map((project) => (
            <article key={project.name} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-cyan-300">{project.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-slate-400">Stack: {project.stack}</p>
              <p className="mt-3 text-sm text-slate-300">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
