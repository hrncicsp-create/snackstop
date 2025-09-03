'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
type AuthCtx = { user: any | null, loading: boolean }
const Ctx = createContext<AuthCtx>({ user: null, loading: false })
export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<any|null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    if(!supabase){ setLoading(false); return }
    supabase.auth.getUser().then(({ data }) => { setUser(data.user ?? null); setLoading(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null) })
    return () => { sub?.subscription.unsubscribe() }
  },[])
  return <Ctx.Provider value={{ user, loading }}>{children}</Ctx.Provider>
}
export function useAuth(){ return useContext(Ctx) }
