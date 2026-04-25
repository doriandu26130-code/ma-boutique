import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ma Boutique',
  description: 'La meilleure boutique en ligne',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={geist.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}