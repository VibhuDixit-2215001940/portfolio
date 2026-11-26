/**
 * Bulk-import LinkedIn certifications from either:
 *   1. LinkedIn Data Export `Certifications.csv`
 *   2. A JSON export array [{ name, issuer, issued, expires, credentialUrl, image }]
 *
 * Usage:
 *   node scripts/import-certs.mjs path/to/Certifications.csv
 *   node scripts/import-certs.mjs path/to/certs.json
 */
import fs from 'node:fs'
import path from 'node:path'

const inputPath = process.argv[2]
if (!inputPath) {
  console.error('Usage: node scripts/import-certs.mjs <Certifications.csv | certs.json>')
  process.exit(1)
}

const resolvedInput = path.resolve(inputPath)
if (!fs.existsSync(resolvedInput)) {
  console.error(`File not found: ${resolvedInput}`)
  process.exit(1)
}

function parseCsvLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current.trim())
  return fields
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []
  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase())
  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line)
    const row = {}
    headers.forEach((h, idx) => {
      row[h] = cols[idx] || ''
    })
    return row
  })
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

function detectCode(name, issuer) {
  const codeMatch = name.match(/\b([A-Z]{2,4}-\d{3}|CCNA|CEH|OSCP|AWS|GCP)\b/)
  if (codeMatch) return codeMatch[1]
  return (issuer || 'CERT').slice(0, 14)
}

function findMatchingImage(name, id) {
  const certDir = path.resolve('public/certificates')
  if (!fs.existsSync(certDir)) return ''
  const files = fs.readdirSync(certDir)
  const normId = id.toLowerCase()
  const normName = slugify(name)
  const match = files.find((f) => {
    const base = path.parse(f).name.toLowerCase()
    return base === normId || base === normName || normName.includes(base) || base.includes(normId)
  })
  return match ? `/certificates/${match}` : ''
}

const raw = fs.readFileSync(resolvedInput, 'utf8')
let normalized = []

if (resolvedInput.endsWith('.json')) {
  const parsed = JSON.parse(raw)
  normalized = parsed.map((item, idx) => {
    const name = item.name || item.title || `Certificate ${idx + 1}`
    const issuer = item.issuer || item.authority || 'Verified Issuer'
    const id = item.id || `${slugify(name)}-${idx + 1}`
    return {
      id,
      code: item.code || detectCode(name, issuer),
      name,
      issuer,
      issued: item.issued || item.startedOn || 'Issued',
      expires: item.expires || item.finishedOn || null,
      image: item.image || findMatchingImage(name, id),
      credentialUrl: item.credentialUrl || item.url || 'https://www.linkedin.com/in/vibhu-dixit-b42a11251/details/certifications/',
      kind: /microsoft|azure/i.test(issuer) ? 'microsoft' : 'security',
    }
  })
} else {
  const rows = parseCsv(raw)
  normalized = rows.map((r, idx) => {
    const name = r.name || `Certificate ${idx + 1}`
    const issuer = r.authority || r.issuer || 'Verified Issuer'
    const id = `${slugify(name)}-${idx + 1}`
    return {
      id,
      code: detectCode(name, issuer),
      name,
      issuer,
      issued: r['started on'] || r.issued || 'Issued',
      expires: r['finished on'] || r.expires || null,
      image: findMatchingImage(name, id),
      credentialUrl: r.url || 'https://www.linkedin.com/in/vibhu-dixit-b42a11251/details/certifications/',
      kind: /microsoft|azure/i.test(issuer) ? 'microsoft' : 'security',
    }
  })
}

const outPath = path.resolve('src/data/certificates.js')
const output = `// Auto-generated from ${path.basename(resolvedInput)} on ${new Date().toISOString()}\nexport const certificates = ${JSON.stringify(normalized, null, 2)}\n`
fs.writeFileSync(outPath, output, 'utf8')
console.log(`Imported ${normalized.length} certificates into src/data/certificates.js`)
