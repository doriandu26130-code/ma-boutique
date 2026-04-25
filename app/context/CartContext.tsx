'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  image_url: string
}

type CartItem = Produit & { quantite: number }

type CartContextType = {
  items: CartItem[]
  addItem: (produit: Produit) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = window.localStorage.getItem('cartItems')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

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
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantite: i.quantite - 1 } : i))
        .filter(i => i.quantite > 0)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((acc, i) => acc + i.prix * i.quantite, 0)
  const count = items.reduce((acc, i) => acc + i.quantite, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}