# Tacos & Smash — Meknès

Site web officiel du restaurant **Tacos & Smash** à Meknès. Commande en ligne via WhatsApp, configurateur de tacos, menu complet.

⭐ 4,8 / 5 (220 avis Google) — Original French Food.

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- Zustand (panier)
- Prisma (schema prêt pour Supabase)

## Démarrage

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000.

## Commandes

Les commandes sont envoyées directement au restaurant via **WhatsApp** au +212 678-630651. Aucun paiement en ligne — **cash à la livraison**.

## Déploiement

Déployé sur **Vercel**. Les variables d'environnement sont optionnelles — le site fonctionne sans base de données (les commandes vont au WhatsApp). Voir `.env.example` pour les variables liées à l'admin.

## Voir aussi
- [CLAUDE.md](./CLAUDE.md) — specs complètes du projet
