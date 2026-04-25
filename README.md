# Ma Boutique

Site e-commerce construit avec Next.js 16, Supabase et Stripe.

## Fonctionnalités principales

- affichage des produits depuis Supabase
- gestion du panier avec quantité, suppression et stockage local
- validation du panier avant paiement
- checkout Stripe via API interne
- page de confirmation de commande
- page 404 personnalisée
- page de chargement `loading`

## Installation

1. Copier `.env.example` en `.env.local`
2. Remplir les variables suivantes :
   - `NEXT_PUBLIC_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`

3. Installer les dépendances :

```bash
npm install
```

4. Lancer l’application :

```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement

- `npm run build` pour compiler
- `npm run start` pour démarrer en production

## Notes

- le panier est persisté dans `localStorage`
- le checkout Stripe nécessite `STRIPE_SECRET_KEY`
- la page de succès est accessible après un paiement valide

## Ressources utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Documentation](https://stripe.com/docs/api)
