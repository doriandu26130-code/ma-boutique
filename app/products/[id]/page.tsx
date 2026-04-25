import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import ProductActions from './ProductActions'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('produits')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="font-bold text-slate-900 hidden md:inline">Ma Boutique</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/products" className="text-slate-700 hover:text-yellow-600 font-semibold">
              ← Catalogue
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-100 shadow-2xl animate-slide-in-left">
              {data.image_url ? (
                <img src={data.image_url} alt={data.nom} className="w-full h-96 object-cover" />
              ) : (
                <div className="flex h-96 items-center justify-center text-6xl">📦</div>
              )}
            </div>

            {/* Details */}
            <div className="animate-slide-in-right">
              <p className="text-cyan-600 font-bold uppercase tracking-widest mb-2">Produit</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">{data.nom}</h1>

              <div className="mb-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="text-4xl font-bold text-yellow-600">{data.prix}€</p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-10">{data.description}</p>

              <div className="space-y-4 mb-8">
                <ProductActions produit={data} />
                <Link
                  href="/products"
                  className="block w-full py-4 text-center border-2 border-yellow-300 text-yellow-700 font-bold rounded-2xl hover:bg-yellow-50 transition">
                  Voir d'autres produits
                </Link>
              </div>

              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-sm text-green-800">
                  ✓ Livraison gratuite à partir de 50€ | ✓ Retours gratuits | ✓ Paiement sécurisé
                </p>
              </div>
            </div>
          </div>
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
