'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'

export default function AccountPage() {
  const {
    email,
    shippingAddress,
    billingAddress,
    updateEmail,
    updateShipping,
    updateBilling,
    resetProfile,
  } = useUser()

  const [message, setMessage] = useState<string | null>(null)
  const [localEmail, setLocalEmail] = useState(email)
  const [localShipping, setLocalShipping] = useState(shippingAddress)
  const [localBilling, setLocalBilling] = useState(billingAddress)

  useEffect(() => {
    setLocalEmail(email)
    setLocalShipping(shippingAddress)
    setLocalBilling(billingAddress)
  }, [email, shippingAddress, billingAddress])

  const handleSave = () => {
    updateEmail(localEmail)
    updateShipping(localShipping)
    updateBilling(localBilling)
    setMessage('✓ Informations enregistrées avec succès.')
    window.setTimeout(() => setMessage(null), 3000)
  }

  const handleReset = () => {
    resetProfile()
    setMessage('⟲ Profil réinitialisé.')
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

      <div className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <p className="inline-flex items-center gap-2 justify-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700 mb-4">
              ☀️ Compte & livraison
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Mes informations de facturation et livraison
            </h1>
            <p className="text-lg text-slate-600">
              Gérez vos coordonnées pour une livraison rapide et sécurisée.
            </p>
          </div>

          {message && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 font-semibold animate-fade-in-up">
              {message}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            {/* Billing Address */}
            <div className="rounded-3xl bg-white shadow-lg p-8 border border-slate-200 animate-slide-in-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span>📋</span> Facturation
              </h2>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  value={localEmail}
                  onChange={e => setLocalEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="votre@email.com"
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Nom complet</span>
                <input
                  type="text"
                  value={localBilling.nom}
                  onChange={e => setLocalBilling({ ...localBilling, nom: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Jean Dupont"
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Adresse</span>
                <input
                  type="text"
                  value={localBilling.ligne1}
                  onChange={e => setLocalBilling({ ...localBilling, ligne1: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="123 Rue de la Plage"
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Complément</span>
                <input
                  type="text"
                  value={localBilling.ligne2}
                  onChange={e => setLocalBilling({ ...localBilling, ligne2: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Appartement 5B"
                />
              </label>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Ville</span>
                  <input
                    type="text"
                    value={localBilling.ville}
                    onChange={e => setLocalBilling({ ...localBilling, ville: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                    placeholder="Nice"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Code postal</span>
                  <input
                    type="text"
                    value={localBilling.codePostal}
                    onChange={e => setLocalBilling({ ...localBilling, codePostal: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                    placeholder="06000"
                  />
                </label>
              </div>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Pays</span>
                <input
                  type="text"
                  value={localBilling.pays}
                  onChange={e => setLocalBilling({ ...localBilling, pays: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="France"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Téléphone</span>
                <input
                  type="tel"
                  value={localBilling.telephone}
                  onChange={e => setLocalBilling({ ...localBilling, telephone: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="06 12 34 56 78"
                />
              </label>
            </div>

            {/* Shipping Address */}
            <div className="rounded-3xl bg-white shadow-lg p-8 border border-slate-200 animate-slide-in-right">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span>📦</span> Livraison
              </h2>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Nom complet</span>
                <input
                  type="text"
                  value={localShipping.nom}
                  onChange={e => setLocalShipping({ ...localShipping, nom: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Jean Dupont"
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Adresse</span>
                <input
                  type="text"
                  value={localShipping.ligne1}
                  onChange={e => setLocalShipping({ ...localShipping, ligne1: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="123 Rue de la Plage"
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Complément</span>
                <input
                  type="text"
                  value={localShipping.ligne2}
                  onChange={e => setLocalShipping({ ...localShipping, ligne2: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="Appartement 5B"
                />
              </label>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Ville</span>
                  <input
                    type="text"
                    value={localShipping.ville}
                    onChange={e => setLocalShipping({ ...localShipping, ville: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                    placeholder="Nice"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Code postal</span>
                  <input
                    type="text"
                    value={localShipping.codePostal}
                    onChange={e => setLocalShipping({ ...localShipping, codePostal: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                    placeholder="06000"
                  />
                </label>
              </div>

              <label className="block mb-5">
                <span className="text-sm font-semibold text-slate-700">Pays</span>
                <input
                  type="text"
                  value={localShipping.pays}
                  onChange={e => setLocalShipping({ ...localShipping, pays: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="France"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Téléphone</span>
                <input
                  type="tel"
                  value={localShipping.telephone}
                  onChange={e => setLocalShipping({ ...localShipping, telephone: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="06 12 34 56 78"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleSave}
              className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-full transition hover:shadow-lg hover:shadow-amber-300/50 active:scale-95">
              💾 Enregistrer mes infos
            </button>
            <button
              onClick={handleReset}
              className="px-10 py-4 border-2 border-red-400 text-red-600 font-bold rounded-full transition hover:bg-red-50">
              🗑️ Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-yellow-600/20 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 Ma Boutique — Tous droits réservés 🌊</p>
        </div>
      </footer>
    </main>
  )
}
