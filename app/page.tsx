import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Notes from './notes/page'
import Mypage from './mypage/mypage'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div>
      <p>アイウエオ</p>
      <Notes/>
      <Mypage/>
    </div>
  )
}
