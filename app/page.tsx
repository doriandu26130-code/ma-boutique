'use client'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { useCart } from './context/CartContext'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([])
  const { addItem, count, items, removeItem, total } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const fetchProduits = async () => {
      const { data } = await supabase.from('produits').select('*').eq('actif', true)
      if (data) setProduits(data)
    }
    fetchProduits()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ma Boutique</h1>
          <button onClick={() => setCartOpen(!cartOpen)} className="relative text-gray-600 hover:text-black transition">
            🛒 Panier ({count})
          </button>
        </div>
      </header>

      {/* Panier slide */}
      {cartOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Mon Panier</h2>
            <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-black text-2xl">✕</button>
          </div>
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-12">Panier vide</p>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
                  <div>
                    <p className="font-semibold">{item.nom}</p>
                    <p className="text-gray-500 text-sm">x{item.quantite} — {(item.prix * item.quantite).toFixed(2)}€</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">🗑</button>
                </div>
              ))}
              <div className="mt-6 border-t pt-4">
                <p className="text-xl font-bold mb-4">Total : {total.toFixed(2)}€</p>
                <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  Payer maintenant
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Bienvenue sur Ma Boutique</h2>
        <p className="text-xl text-gray-300 mb-8">Les meilleurs produits au meilleur prix</p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Voir les produits
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Nos Produits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produits.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.nom} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-6xl">📦</span>
                )}
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{p.nom}</h4>
                <p className="text-gray-500 mb-4">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{p.prix}€</span>
                  <button
                    onClick={() => addItem(p)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-8">
        <p>© 2026 Ma Boutique — Tous droits réservés</p>
      </footer>
    </main>
  )
}