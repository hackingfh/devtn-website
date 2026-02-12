# DevTN Website

Vitrine moderne pour **DevTN** (web & mobile) avec:
- Services
- Portfolio
- Contact
- Proposition de projet (API + stockage JSON)
- Chat IA multi-agents (Dispatcher + 5 agents)

## Lancer en local

```bash
npm install
npm run dev
```

## Activer le chat IA gratuit (cloud)

Ce projet supporte **Groq** (tier gratuit) pour éviter les coûts.

1. Crée un compte: https://console.groq.com
2. Génère une clé API
3. Crée un fichier `.env.local` à la racine du projet:

```env
GROQ_API_KEY=ta_cle_api
GROQ_MODEL=llama-3.1-8b-instant

# Sécurité admin (obligatoire en production)
ADMIN_PASSWORD=change-un-mot-de-passe-fort
ADMIN_SESSION_TOKEN=genere-un-token-long-et-secret
```

Sans clé, le chat fonctionne en mode fallback intelligent.

## Déploiement internet (mobile)

Le plus simple: **Vercel** (gratuit)

1. Push GitHub (déjà fait)
2. Va sur https://vercel.com/new
3. Import `hackingfh/devtn-website`
4. Root Directory (important): `devtn-website`
5. Ajoute les variables d'environnement:
   - `GROQ_API_KEY`
   - `GROQ_MODEL` (optionnel)
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_TOKEN`
6. Deploy

Admin login: `/admin/login`

Tu obtiens un lien public utilisable depuis téléphone, même PC éteint.
