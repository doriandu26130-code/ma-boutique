'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabase'
import { useCart } from './context/CartContext'
import { useUser } from './context/UserContext'
import Header from './components/Header'
import HeroWave from './components/HeroWave'
import ProductCard from './components/ProductCard'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

type CartItem = Produit & { quantite: number }

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([])
  const { addItem, count, items, removeItem, clearCart, total } = useCart()
  const { email, billingAddress, shippingAddress } = useUser()
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const { data, error } = await supabase.from('produits').select('*').eq('actif', true)
        if (error) {
          setFetchError('Nos produits arrivent bientôt...')
          return
        }
        if (data) setProduits(data)
      } catch {
        setFetchError('Connexion en cours...')
      }
    }
    fetchProduits()
  }, [])

  const handlePaiement = async () => {
    if (items.length === 0) {
      setError('Votre panier est vide')
      return
    }

    if (!email || !billingAddress.ligne1 || !shippingAddress.ligne1) {
      setError('Informations de livraison manquantes')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produits: items,
          email,
          billingAddress,
          shippingAddress,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Paiement impossible')
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Redirection impossible')
      }
    } catch (err) {
      setError('Connexion perdue')
    } finally {
      setLoading(false)
    }
  }

  const increaseItem = (item: CartItem) => {
    addItem(item)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header cartCount={count} onCartClick={() => setCartOpen(true)} />

      <div className="bg-yellow-50 border-y border-yellow-200 py-3 text-center text-sm text-yellow-800">
        Nouveau : stock en temps réel, livraison express, ambiance plage et soleil.
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setCartOpen(false)} />
      )}

      <div
        className={`fixed right-0 top-16 md:top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Panier</h2>
          <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-600 text-3xl">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-slate-400 py-12">Votre panier est vide</p>
        ) : (
          <>
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-start bg-slate-50 rounded-2xl p-4 border border-slate-200 animate-fade-in-up">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.nom}</p>
                    <p className="text-sm text-slate-600">
                      {(item.prix * item.quantite).toFixed(2)}€ × {item.quantite}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-2 py-1 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm">
                      −
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantite}</span>
                    <button
                      onClick={() => increaseItem(item)}
                      className="px-2 py-1 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total :</span>
                <span className="text-yellow-600">{total.toFixed(2)}€</span>
              </div>

              {(!email || !billingAddress.ligne1 || !shippingAddress.ligne1) && (
                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                  ⚠️ Adresse de livraison requise.{' '}
                  <Link href="/account" className="underline font-semibold">
                    Compléter
                  </Link>
                </p>
              )}

              {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

              <button
                onClick={() => {
                  handlePaiement()
                }}
                disabled={loading || items.length === 0 || !email || !billingAddress.ligne1}
                className="w-full py-3 rounded-2xl font-bold text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg hover:shadow-amber-300/50">
                {loading ? '⏳ Traitement...' : '💳 Commander'}
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-semibold">
                Vider le panier
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Cart Button */}
      {!cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 md:hidden w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full shadow-lg flex items-center justify-center font-bold text-lg hover:shadow-xl z-40">
          🛒 {count}
        </button>
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-yellow-100 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-yellow-200 opacity-70 blur-2xl" />
        <div className="absolute right-16 top-28 h-24 w-24 rounded-full bg-sky-200 opacity-60 blur-3xl" />

        <div
          className="relative mx-auto max-w-7xl rounded-[2rem] overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm md:bg-white/40" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center px-6 py-16 md:px-16">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">
                ☀️ Soleil & Mer
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                Un site qui vit, un été qui donne envie d’acheter
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                Une sélection vive, des visuels de mer vrais, et un design épuré pour montrer tes produits avec style.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('products-section')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-full transition hover:shadow-lg hover:shadow-amber-300/30 active:scale-95">
                  🛍️ Voir les produits
                </button>
                <Link
                  href="/products"
                  className="px-8 py-4 border-2 border-yellow-300 text-yellow-700 font-bold rounded-full hover:bg-yellow-50 transition">
                  Toutes les catégories
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 text-center shadow-sm">
                  <p className="text-sm text-slate-500">Livraison</p>
                  <p className="text-2xl font-bold text-slate-900">Express</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-700">Sous 48h</p>
                </div>
                <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 text-center shadow-sm">
                  <p className="text-sm text-slate-500">Stock</p>
                  <p className="text-2xl font-bold text-slate-900">Réel</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-700">Mise à jour</p>
                </div>
                <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 text-center shadow-sm">
                  <p className="text-sm text-slate-500">Qualité</p>
                  <p className="text-2xl font-bold text-slate-900">Premium</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-700">Sélectionnée</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] overflow-hidden bg-white/80 shadow-2xl border border-white/80 animate-pulse-scale">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                alt="Photo de la mer"
                className="h-96 w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 -mb-1">
          <HeroWave />
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-600 font-bold uppercase tracking-widest mb-4">Catalogue</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Nos produits premium</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sélectionnés avec soin pour te garantir les meilleures produits de l'été.
            </p>
            <p className="mt-4 text-sm text-slate-500">{produits.length} produits disponibles maintenant</p>
          </div>

          {fetchError ? (
            <div className="text-center py-12 bg-red-50 rounded-3xl text-red-600 font-semibold">
              {fetchError}
            </div>
          ) : produits.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Aucun produit disponible pour le moment.</div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {produits.map((produit, idx) => (
                <div key={produit.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ProductCard
                    {...produit}
                    onAddToCart={() => {
                      addItem(produit)
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Prêt pour l'aventure ?</h2>
          <p className="text-xl text-cyan-50 mb-8">
            Rejoins des milliers de clients satisfaits et commande dès maintenant
          </p>
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full transition hover:shadow-xl hover:-translate-y-1 active:scale-95">
            Voir le catalogue complet →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-cyan-600/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Ma Boutique</h3>
              <p className="text-gray-400">Votre destination estivale de confiance depuis 2026</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-cyan-400">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-cyan-400">
                    Produits
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-cyan-400">
                    Mon compte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: info@maboutique.com</p>
              <p className="text-gray-400">Tél: +33 1 XX XX XX XX</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2026 Ma Boutique — Tous droits réservés 🌊</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
