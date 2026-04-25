'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Produit = {
  id: string
  nom: string
  prix: number
  image_url: string
}

type CartItem = Produit & { quantite: number }

type CartContextType = {
  items: CartItem[]
  addItem: (produit: Produit) => void
  removeItem: (id: string) => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (produit: Produit) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === produit.id)
      if (existing) {
        return prev.map(i => i.id === produit.id ? { ...i, quantite: i.quantite + 1 } : i)
      }
      return [...prev, { ...produit, quantite: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const total = items.reduce((acc, i) => acc + i.prix * i.quantite, 0)
  const count = items.reduce((acc, i) => acc + i.quantite, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}