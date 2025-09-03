'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart'
const items = [{id:'/',label:'Home'},{id:'/orders',label:'Orders'},{id:'/profile',label:'Profile'}]
export default function BottomNav(){
  const pathname = usePathname(); const router = useRouter(); const { toggleDrawer, count } = useCart()
  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      <div className="max-w-md mx-auto">
        <div className="mx-3 mb-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur relative">
          <div className="grid grid-cols-3">
            {items.map(it => (<button key={it.id} onClick={()=>router.push(it.id)} className={`flex flex-col items-center py-2 ${pathname===it.id?'text-white':'text-white/60'}`}><span className="text-sm">{it.label}</span></button>))}
          </div>
          <button onClick={toggleDrawer} className="absolute -top-4 right-6 bg-pink-500/20 border border-pink-400/40 px-4 py-2 rounded-xl shadow-xl">Cart ({count})</button>
        </div>
      </div>
    </div>
  )
}
