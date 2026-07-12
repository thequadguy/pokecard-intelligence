'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToCollection(card: { id: string, name: string, set: string, imageUrl: string, marketPrice: number, trend: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add to your collection.' }
  }

  const { error } = await supabase
    .from('collections')
    .insert({
      user_id: user.id,
      card_id: card.id,
      card_name: card.name,
      set_name: card.set,
      image_url: card.imageUrl,
      condition: 'Ungraded', // Default
      purchase_price: card.marketPrice // Assuming they bought at market
    })

  if (error) {
    console.error(error)
    return { error: 'Failed to add card to collection.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function addToWatchlist(card: { id: string, name: string, set: string, imageUrl: string, marketPrice: number, trend: string }, targetPrice: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add to your watchlist.' }
  }

  const { error } = await supabase
    .from('watchlists')
    .insert({
      user_id: user.id,
      card_id: card.id,
      card_name: card.name,
      set_name: card.set,
      image_url: card.imageUrl,
      target_price: targetPrice,
      alert_active: true
    })

  if (error) {
    console.error(error)
    return { error: 'Failed to add card to watchlist.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
