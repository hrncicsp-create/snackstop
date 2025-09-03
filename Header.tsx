'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
export default function Header(){
  const { toggleDrawer, count } = useCart()
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight text-lg neon-text">SnackStop</Link>
        <div className="flex items-center gap-2">
          <Link className="btn" href="/orders">Orders</Link>
          <Link className="btn" href="/profile">Profile</Link>
          <button className="btn btn-primary" onClick={toggleDrawer}>Cart ({count})</button>
        </div>
      </div>
    </div>
  )
}
