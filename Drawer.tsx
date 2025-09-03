'use client'
import { ReactNode } from 'react'
export default function Drawer({ open, onClose, children }:{ open:boolean; onClose: ()=>void; children: ReactNode }){
  return (<>
    {open && <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose}/>}
    <div className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ${open?'translate-y-0':'translate-y-full'}`}>
      <div className="max-w-md mx-auto bg-black/80 backdrop-blur border-t border-white/10 rounded-t-2xl p-4">{children}</div>
    </div>
  </>)
}
