'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePrompt(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  // Check admin
  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).single()
  if (!roleData || roleData.role !== 'admin') return

  const prompt = formData.get('prompt') as string

  const { error } = await supabase
    .from('agent_config')
    .update({ prompt })
    .eq('id', 1)

  if (error) {
    console.error(error)
    return
  }

  revalidatePath('/admin')
}
