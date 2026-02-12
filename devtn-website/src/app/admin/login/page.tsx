"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data?.ok) {
      setError(data?.error || "Connexion refusée");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070b14] px-6 text-slate-100">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold text-cyan-300">Connexion Admin</h1>
        <p className="mt-2 text-sm text-slate-300">Accès réservé au propriétaire DevTN.</p>
        <input
          type="password"
          className="mt-5 w-full rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
        <button
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-[#04111f] hover:bg-cyan-300 disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Entrer"}
        </button>
      </form>
    </main>
  );
}
