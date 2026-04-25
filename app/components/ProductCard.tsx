'use client'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  nom: string
  description: string
  prix: number
  image_url?: string
  onAddToCart?: () => void
}

export default function ProductCard({
  id,
  nom,
  description,
  prix,
  image_url,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transition duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up">
        {/* Image Container */}
        <div className="relative h-72 bg-slate-100 overflow-hidden flex items-center justify-center">
          {image_url ? (
            <img
              src={image_url}
              alt={nom}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="text-6xl animate-float">📦</div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
            Best-seller
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-slate-900 transition">
            {nom}
          </h3>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{description}</p>

          {/* Price & Button */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl font-bold text-yellow-600">{prix}€</span>
            <button
              onClick={e => {
                e.preventDefault()
                onAddToCart?.()
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-bold transition duration-300 hover:shadow-lg hover:shadow-amber-300/50 active:scale-95">
              Ajouter
            </button>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute top-2 right-2 w-12 h-12 bg-yellow-200 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition" />
      </div>
    </Link>
  )
}
