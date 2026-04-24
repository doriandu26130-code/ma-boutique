export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ma Boutique</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">🛒 Panier (0)</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Bienvenue sur Ma Boutique</h2>
        <p className="text-xl text-gray-300 mb-8">Les meilleurs produits au meilleur prix</p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Voir les produits
        </button>
      </section>

      {/* Produits */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Nos Produits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <span className="text-gray-400 text-6xl">📦</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Produit {i}</h4>
                <p className="text-gray-500 mb-4">Description du produit {i}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">29,99€</span>
                  <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <p>© 2026 Ma Boutique — Tous droits réservés</p>
      </footer>
    </main>
  )
}