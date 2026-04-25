import Link from 'next/link'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

export default async function ProductsPage() {
  const { data: produits, error } = await supabase
    .from('produits')
    .select('*')
    .eq('actif', true)

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-16 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-cyan-600 font-bold uppercase mb-4">Catalogue</p>
          <h1 className="text-4xl font-bold mb-6">Erreur de chargement</h1>
          <p className="text-gray-600 mb-8">Impossible de charger les produits pour le moment.</p>
          <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="font-bold text-slate-900 hidden md:inline">Ma Boutique</span>
          </Link>
          <Link href="/" className="text-slate-700 hover:text-yellow-600 font-semibold">
            ← Accueil
          </Link>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-yellow-600 font-bold uppercase tracking-widest mb-4">Catalogue complet</p>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Tous les produits</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvre notre sélection complète de produits premium pour un été lumineux et raffiné.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-600" />
              {produits?.length ? `${produits.length} produits en stock` : 'Chargement des produits...'}
            </div>
          </div>

          {produits && produits.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {produits.map((produit: Produit, idx: number) => (
                <div key={produit.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ProductCard {...produit} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cyan-50 rounded-3xl">
              <p className="text-2xl text-gray-500">Aucun produit disponible</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-cyan-600/20">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 Ma Boutique — Tous droits réservés 🌊</p>
        </div>
      </footer>
    </main>
  )
}
