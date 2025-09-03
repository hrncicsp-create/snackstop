'use client'
import Image from 'next/image'
import { Item } from '@/lib/items'
export default function ProductCard({ item, onAdd, onDetails }:{ item: Item; onAdd: ()=>void; onDetails: ()=>void }){
  return (
    <div className="card overflow-hidden">
      <div className="relative w-full h-40">
        <Image src={item.img} alt={item.name} fill className="object-cover"/>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-pink-600/40 border border-pink-400/40">€{item.price.toFixed(2)}</div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div><div className="font-semibold">{item.name}</div><div className="text-xs text-white/60">~{item.etaMins} min</div></div>
        <div className="flex items-center gap-2"><button className="btn" onClick={onDetails}>Details</button><button className="btn btn-primary" onClick={onAdd}>Add</button></div>
      </div>
    </div>
  )
}
