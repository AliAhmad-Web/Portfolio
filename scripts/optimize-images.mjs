/**
 * Convert public raster images to WebP + AVIF at display-appropriate sizes.
 * Run: node scripts/optimize-images.mjs
 */
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const MAX_WIDTH = {
  'team-banner.jpg': 1920,
  'quizApp.png': 1400,
  'project-eliteflow.png': 1400,
  'project-scrs.png': 1400,
  'ali-ahmad.png': 612,
  'ali-ahmad-team.jpg': 640,
  'muhammad-mustansar-riaz.jpg': 640,
  'shahzaib-akram.jpg': 640,
  'muhammad-waqas.jpg': 640,
  'muhammad-farooq-latif.jpg': 640,
  'muhammad-nasar-farid.jpg': 640,
}

function maxWidthFor(relPath, name) {
  if (relPath.startsWith('reviews/')) return 96
  if (MAX_WIDTH[name]) return MAX_WIDTH[name]
  if (name.startsWith('project-')) return 1400
  return 1600
}

async function walk(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full, rel)))
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push({ full, rel, name: entry.name })
    }
  }
  return files
}

async function convertFile(file) {
  const widthCap = maxWidthFor(file.rel, file.name)
  const image = sharp(file.full, { failOn: 'none' })
  const meta = await image.metadata()
  const width = meta.width && meta.width > widthCap ? widthCap : meta.width
  const base = file.full.replace(/\.(png|jpe?g)$/i, '')

  const pipeline = () => {
    const next = sharp(file.full, { failOn: 'none' })
    return width && meta.width && width < meta.width ? next.resize({ width, withoutEnlargement: true }) : next
  }

  await pipeline().webp({ quality: 76, effort: 5 }).toFile(`${base}.webp`)
  await pipeline().avif({ quality: 48, effort: 5 }).toFile(`${base}.avif`)

  const webp = await sharp(`${base}.webp`).metadata()
  const avif = await sharp(`${base}.avif`).metadata()
  return {
    rel: file.rel,
    from: meta.size,
    webp: webp.size,
    avif: avif.size,
    width: webp.width,
  }
}

const files = await walk(publicDir)
const results = []
for (const file of files) {
  results.push(await convertFile(file))
}

for (const row of results.sort((a, b) => a.rel.localeCompare(b.rel))) {
  const fromKb = ((row.from || 0) / 1024).toFixed(1)
  const webpKb = (row.webp / 1024).toFixed(1)
  const avifKb = (row.avif / 1024).toFixed(1)
  console.log(`${row.rel} ${fromKb}KB -> webp ${webpKb}KB / avif ${avifKb}KB (${row.width}w)`)
}
