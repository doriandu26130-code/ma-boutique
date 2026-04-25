import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'

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
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}