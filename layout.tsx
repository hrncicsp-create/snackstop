import './globals.css'
import { CartProvider } from '@/lib/cart'
import { AuthProvider } from '@/lib/auth'
export const metadata = { title:'SnackStop', description:'Cravings don’t sleep.' }
export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (<html lang="en"><body><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></body></html>)
}
