import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-xl">
        <p className="text-4xl mb-4">404</p>
        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-gray-500 mb-8">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
          Retour à la boutique
        </Link>
      </div>
    </main>
  )
}
