import Link from 'next/link'

export default function Success() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-slate-200">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Commande confirmée !</h1>
          <p className="text-lg text-slate-600 mb-4">
            Votre paiement a bien été reçu. Nous préparons votre commande avec soin.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
            <p className="text-sm text-yellow-800">
              📧 Un récapitulatif de votre commande a été envoyé à votre adresse email. Si vous ne voyez pas l'email, vérifiez vos indésirables.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-full transition hover:shadow-lg hover:shadow-amber-300/50 active:scale-95">
              🏠 Retour à l'accueil
            </Link>
            <Link
              href="/products"
              className="block w-full px-8 py-4 border-2 border-yellow-300 text-yellow-700 font-bold rounded-full hover:bg-yellow-50 transition">
              🛍️ Continuer les achats
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-8">
            Pour toute question, contactez-nous à support@maboutique.com
          </p>
        </div>
      </div>
    </main>
  )
}
