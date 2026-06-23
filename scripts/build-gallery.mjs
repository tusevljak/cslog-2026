import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/slike'
const OUT = 'public/galerija'

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(SRC)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  .sort()

console.log(`Processing ${files.length} images...`)

let i = 0
for (const file of files) {
  i++
  const num = String(i).padStart(3, '0')
  const outName = `galerija-${num}.webp`
  const outPath = path.join(OUT, outName)

  if (fs.existsSync(outPath)) {
    console.log(`  ${num}. ${file} → skip (exists)`)
    continue
  }

  try {
    await sharp(path.join(SRC, file))
      .rotate() // respect EXIF orientation
      .resize(1920, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath)
    const stat = fs.statSync(outPath)
    console.log(`  ${num}. ${file} → ${outName} (${(stat.size / 1024).toFixed(0)} KB)`)
  } catch (err) {
    console.error(`  ${num}. ${file} → ERROR:`, err.message)
  }
}

console.log(`✓ Done. Output: ${OUT}/`)
