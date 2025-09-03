'use client'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'
export default function Account(){
  const { user } = useAuth()
  async function signOut(){ if(supabase){ await supabase.auth.signOut(); window.location.href='/' } }
  return (<div className="min-h-screen text-white pb-28"><Header/><main className="max-w-md mx-auto px-4"><div className="card p-4 mt-4">
    {!user && <div>Not signed in. <a className="underline" href="/login">Login</a></div>}
    {user && (<div><div className="text-lg font-semibold">Welcome</div><div className="text-white/70 text-sm">{user.email}</div><a className="btn mt-3" href="/orders">View Orders</a><button className="btn mt-3" onClick={signOut}>Sign out</button></div>)}
  </div></main><BottomNav/></div>)
}
