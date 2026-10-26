// Runs before `next build`. Lists which pool photos have phone-sized copies
// (made by scripts/image-sizes.py) so the image loader only asks for files that exist.
import { readdirSync, writeFileSync, existsSync } from 'node:fs'
const dir = 'public/images/pools'
const list = (w) => (existsSync(`${dir}/${w}`) ? readdirSync(`${dir}/${w}`).filter((f) => f.endsWith('.jpg')) : [])
const w1080 = new Set(list('w1080'))
const manifest = {}
for (const f of list('w640')) manifest[f.replace(/\.jpg$/, '')] = w1080.has(f) ? 2 : 1
writeFileSync('lib/image-sizes.json', JSON.stringify(manifest))
console.log(`image manifest: ${Object.keys(manifest).length} photos with phone sizes`)
