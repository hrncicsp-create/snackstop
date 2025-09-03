'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ITEMS, type Item } from '@/lib/items'
import { ReactNode } from 'react'
import Drawer from '@/components/Drawer'
type Line = { item: Item; qty: number; addons: {id:string;name:string;price:number}[] }
type Store = { lines: Line[]; drawer: boolean; toggleDrawer: ()=>void; add: (item: Item, addons?: Line['addons']) => void; dec: (i:number)=>void; clear: ()=>void }
export const useCartStore = create<Store>()(persist((set, get)=>({
  lines: [], drawer:false,
  toggleDrawer: ()=> set(s=>({drawer:!s.drawer})),
  add: (item, addons=[])=> set(s=>{
    const idx = s.lines.findIndex(l => l.item.id===item.id && JSON.stringify(l.addons)===JSON.stringify(addons))
    if(idx>=0){ const copy=[...s.lines]; copy[idx]={...copy[idx], qty: copy[idx].qty+1}; return {lines:copy} }
    return {lines:[...s.lines, {item, qty:1, addons}]}
  }),
  dec: (i)=> set(s=>{ const copy=[...s.lines]; if(copy[i].qty>1) copy[i].qty--; else copy.splice(i,1); return {lines:copy} }),
  clear: ()=> set({lines:[]})
}),{name:'snackstop-cart'}))
export function useCart(){
  const { lines, drawer, toggleDrawer, add, dec, clear } = useCartStore()
  const subtotal = lines.reduce((s,l)=> s + l.qty * (l.item.price + l.addons.reduce((a,b)=>a+b.price,0)), 0)
  const delivery = subtotal > 15 ? 0 : 2.5
  const total = subtotal + delivery
  const count = lines.reduce((s,l)=> s + l.qty, 0)
  return { lines, subtotal, delivery, total, count, drawer, toggleDrawer, add, dec, clear }
}
export function CartProvider({children}:{children:ReactNode}){
  const { drawer, toggleDrawer, lines, subtotal, delivery, total, dec, add, clear } = useCart()
  return (<>
    {children}
    <Drawer open={drawer} onClose={toggleDrawer}>
      <div className="flex items-center justify-between"><div className="text-lg font-semibold">Your Cart</div><div className="text-sm text-white/60">Free delivery over €15</div></div>
      <div className="mt-3 space-y-2">
        {lines.length===0 && <div className="text-white/60">Your cart is empty.</div>}
        {lines.map((l,i)=>(<div key={i} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
          <div><div className="font-medium">{l.item.name} <span className="text-white/50">× {l.qty}</span></div>{l.addons.length>0 && <div className="text-xs text-white/60">+ {l.addons.map(a=>a.name).join(', ')}</div>}</div>
          <div className="flex items-center gap-2"><button className="btn" onClick={()=>dec(i)}>-</button><button className="btn" onClick={()=>add(l.item,l.addons)}>+</button></div>
        </div>))}
      </div>
      <div className="mt-4 border-t border-white/10 pt-3 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{delivery===0?'Free':`€${delivery.toFixed(2)}`}</span></div>
        <div className="flex justify-between font-semibold text-base"><span>Total</span><span>€{total.toFixed(2)}</span></div>
        <a className="btn btn-primary w-full mt-3 text-center" href="/checkout">Checkout</a>
      </div>
    </Drawer>
  </>)
}
