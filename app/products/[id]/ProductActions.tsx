'use client'
import { useCart } from '../../context/CartContext'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

export default function ProductActions({ produit }: { produit: Produit }) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(produit)}
      className="w-full rounded-full bg-black px-6 py-4 text-white font-semibold transition hover:bg-gray-800">
      Ajouter au panier
    </button>
  )
}
