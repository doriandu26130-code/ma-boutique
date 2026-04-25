'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Address = {
  nom: string
  ligne1: string
  ligne2?: string
  ville: string
  codePostal: string
  pays: string
  telephone: string
}

type UserContextType = {
  email: string
  shippingAddress: Address
  billingAddress: Address
  updateEmail: (email: string) => void
  updateShipping: (address: Partial<Address>) => void
  updateBilling: (address: Partial<Address>) => void
  resetProfile: () => void
}

const defaultAddress: Address = {
  nom: '',
  ligne1: '',
  ligne2: '',
  ville: '',
  codePostal: '',
  pays: '',
  telephone: '',
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('')
  const [shippingAddress, setShippingAddress] = useState<Address>(defaultAddress)
  const [billingAddress, setBillingAddress] = useState<Address>(defaultAddress)

  useEffect(() => {
    const stored = window.localStorage.getItem('userProfile')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setEmail(parsed?.email ?? '')
        setShippingAddress(parsed?.shippingAddress ?? defaultAddress)
        setBillingAddress(parsed?.billingAddress ?? defaultAddress)
      } catch {
        setEmail('')
        setShippingAddress(defaultAddress)
        setBillingAddress(defaultAddress)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      'userProfile',
      JSON.stringify({ email, shippingAddress, billingAddress })
    )
  }, [email, shippingAddress, billingAddress])

  const updateEmail = (value: string) => {
    setEmail(value)
  }

  const updateShipping = (address: Partial<Address>) => {
    setShippingAddress(prev => ({ ...prev, ...address }))
  }

  const updateBilling = (address: Partial<Address>) => {
    setBillingAddress(prev => ({ ...prev, ...address }))
  }

  const resetProfile = () => {
    setEmail('')
    setShippingAddress(defaultAddress)
    setBillingAddress(defaultAddress)
  }

  return (
    <UserContext.Provider
      value={{
        email,
        shippingAddress,
        billingAddress,
        updateEmail,
        updateShipping,
        updateBilling,
        resetProfile,
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}
