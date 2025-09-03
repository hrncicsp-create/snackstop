'use client'
import { useEffect, useState } from 'react'

type Order = { id: string; status: string; total: number; created_at: string; payload: any }
const nextStatuses = ['placed','preparing','dispatched','delivered']

export default function Admin() {
  const [key, setKey] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const k = localStorage.getItem('snackstop_admin_key') || ''
    if (k) { setKey(k); load(k) }
  }, [])

  async function load(k: string) {
    setLoading(true); setError(null)
    const res = await fetch(`/api/admin/orders?key=${encodeURIComponent(k)}`)
    if (!res.ok) { setError('Invalid admin key'); setLoading(false); return }
    const data = await res.json()
    setOrders(data.orders || []); setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify({ id, status })
    })
    if (!res.ok) { alert('Update failed'); return }
    setOrders(o => o.map(it => it.id === id ? { ...it, status } : it))
  }

  return (
    <div className="min-h-screen bg-[#07080D] text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-xl font-semibold">Admin — Orders</div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-3">
          <div className="text-sm text-white/70 mb-2">Enter Admin Key</div>
          <div className="flex gap-2">
            <input className="flex-1 bg-transparent border border-white/20 rounded-xl px-3 py-2"
              placeholder="ADMIN_KEY" value={key}
              onChange={e=>setKey(e.target.value)} />
            <button className="border rounded-xl px-3 py-2" onClick={() => { localStorage.setItem('snackstop_admin_key', key); load(key) }}>
              Unlock
            </button>
          </div>
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>

        <div className="mt-4">
          {loading && <div className="text-white/60">Loading…</div>}
          {!loading && orders.length === 0 && <div className="text-white/60">No orders yet.</div>}
          <div className="space-y-2">
            {orders.map(o => (
              <div key={o.id} className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">#{o.id.slice(0,8)} — €{Number(o.total).toFixed(2)}</div>
                    <div className="text-xs text-white/60">{new Date(o.created_at).toLocaleString()}</div>
                  </div>
                  <div className="text-sm">{o.status}</div>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {nextStatuses.map(s => (
                    <button key={s}
                      className={`border rounded-xl px-2 py-1 text-xs ${o.status===s ? 'bg-white/20' : ''}`}
                      onClick={()=>updateStatus(o.id, s)}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
