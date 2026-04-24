export default function Success() {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
          <p className="text-gray-500 mb-8">Merci pour votre achat. Vous recevrez un email de confirmation.</p>
          <a href="/" className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
            Retour à la boutique
          </a>
        </div>
      </main>
    )
  }