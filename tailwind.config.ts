import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors:{ night:'#07080D', ink:'#0B0E14', neon:{magenta:'#F72585',purple:'#9B5DE5',teal:'#22D3EE'} } } },
  plugins: [],
}
export default config
