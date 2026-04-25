import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const baseUrl = process.env.NEXT_PUBLIC_URL

  if (!stripeSecretKey || !baseUrl) {
    return NextResponse.json({ error: 'Configuration Stripe manquante.' }, { status: 500 })
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-04-22.dahlia',
  })

  try {
    const body = await request.json()
    const produits = body?.produits
    const email = body?.email
    const billingAddress = body?.billingAddress
    const shippingAddress = body?.shippingAddress

    if (!Array.isArray(produits) || produits.length === 0) {
      return NextResponse.json({ error: 'Aucun produit dans le panier.' }, { status: 400 })
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email client manquant.' }, { status: 400 })
    }

    if (!billingAddress?.ligne1 || !shippingAddress?.ligne1) {
      return NextResponse.json({ error: 'Adresse de facturation ou de livraison manquante.' }, { status: 400 })
    }

    const billingSummary = `${billingAddress.nom}, ${billingAddress.ligne1}${billingAddress.ligne2 ? `, ${billingAddress.ligne2}` : ''}, ${billingAddress.ville} ${billingAddress.codePostal}, ${billingAddress.pays}`
    const shippingSummary = `${shippingAddress.nom}, ${shippingAddress.ligne1}${shippingAddress.ligne2 ? `, ${shippingAddress.ligne2}` : ''}, ${shippingAddress.ville} ${shippingAddress.codePostal}, ${shippingAddress.pays}`

    const line_items = produits.map((p: any) => {
      if (
        !p ||
        typeof p.nom !== 'string' ||
        typeof p.prix !== 'number' ||
        !Number.isFinite(p.prix) ||
        p.prix <= 0 ||
        typeof p.quantite !== 'number' ||
        p.quantite <= 0 ||
        !Number.isInteger(p.quantite)
      ) {
        throw new Error('Données produit invalides')
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: p.nom,
            description: typeof p.description === 'string' ? p.description : undefined,
          },
          unit_amount: Math.round(p.prix * 100),
        },
        quantity: p.quantite,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email,
      metadata: {
        billing_address: billingSummary,
        shipping_address: shippingSummary,
      },
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erreur paiement' }, { status: 500 })
  }
}