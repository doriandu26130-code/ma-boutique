'use client'
import Link from 'next/link'
import { useState } from 'react'

interface HeaderProps {
  cartCount: number
  onCartClick?: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-bold">☀️</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 hidden md:block">Ma Boutique</h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-700 hover:text-yellow-600 transition font-medium">
              Accueil
            </Link>
            <Link href="/products" className="text-slate-700 hover:text-yellow-600 transition font-medium">
              Produits
            </Link>
            <Link href="/account" className="text-slate-700 hover:text-yellow-600 transition font-medium">
              Mon compte
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onCartClick?.()}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              🛒 <span>{cartCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-200">
            <Link href="/" className="block py-2 text-slate-700 hover:text-yellow-600">
              Accueil
            </Link>
            <Link href="/products" className="block py-2 text-slate-700 hover:text-yellow-600">
              Produits
            </Link>
            <Link href="/account" className="block py-2 text-slate-700 hover:text-yellow-600">
              Mon compte
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
