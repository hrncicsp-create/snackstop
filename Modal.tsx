'use client'
import { ReactNode } from 'react'
export default function Modal({open,onClose,children}:{open:boolean;onClose:()=>void;children:ReactNode}){
  if(!open) return null
  return (<div className="fixed inset-0 z-50 grid place-items-center">
    <div className="absolute inset-0 bg-black/70" onClick={onClose}/>
    <div className="relative z-10 max-w-md w-[92%] bg-black/80 border border-white/10 rounded-2xl p-4">{children}</div>
  </div>)
}
