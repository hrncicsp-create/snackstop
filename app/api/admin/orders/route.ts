// app/api/admin/orders/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const service = process.env.SUPABASE_SERVICE_ROLE!
const ADMIN_KEY = process.env.ADMIN_KEY!

const sbAdmin = createClient(url, service, { auth: { persistSession: false } })

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get('key')
  if (key !== ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await sbAdmin
    .from('orders')
    .select('id,status,total,created_at,payload')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ orders: data })
}

export async function POST(req: Request) {
  const key = req.headers.get('x-admin-key')
  if (key !== ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as { id: string; status: string }
  if (!body?.id || !body?.status) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const { error } = await sbAdmin.from('orders').update({ status: body.status }).eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
