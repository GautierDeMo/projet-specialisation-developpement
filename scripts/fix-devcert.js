import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔧 Fixing devcert for Node.js 24+...\n')

const files = [
  path.join(__dirname, '../back/node_modules/devcert/dist/platforms/win32.js'),
  path.join(__dirname, '../front/node_modules/devcert/dist/platforms/win32.js'),
]

function fixFile(filepath) {
  if (!fs.existsSync(filepath)) {
    console.log(
      `⚠️  ${path.relative(process.cwd(), filepath)} not found, skipping...`
    )
    return false
  }

  try {
    let content = fs.readFileSync(filepath, 'utf8')

    // Vérifier si déjà patché
    if (content.includes('createCipheriv') && content.includes('scryptSync')) {
      console.log(`✅ ${path.relative(process.cwd(), filepath)} already fixed`)
      return true
    }

    // Remplacer la méthode encrypt
    content = content.replace(
      /encrypt\(text, key\) \{[\s\S]*?let cipher = crypto_1\.default\.createCipher\('aes256', new Buffer\(key\)\);[\s\S]*?return cipher\.update\(text, 'utf8', 'hex'\) \+ cipher\.final\('hex'\);[\s\S]*?\}/,
      `encrypt(text, key) {
        const algorithm = 'aes-256-cbc';
        const derivedKey = crypto_1.default.scryptSync(key, 'devcert-salt', 32);
        const iv = Buffer.alloc(16, 0);
        let cipher = crypto_1.default.createCipheriv(algorithm, derivedKey, iv);
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    }`
    )

    // Remplacer la méthode decrypt
    content = content.replace(
      /decrypt\(encrypted, key\) \{[\s\S]*?let decipher = crypto_1\.default\.createDecipher\('aes256', new Buffer\(key\)\);[\s\S]*?return decipher\.update\(encrypted, 'hex', 'utf8'\) \+ decipher\.final\('utf8'\);[\s\S]*?\}/,
      `decrypt(encrypted, key) {
        const algorithm = 'aes-256-cbc';
        const derivedKey = crypto_1.default.scryptSync(key, 'devcert-salt', 32);
        const iv = Buffer.alloc(16, 0);
        let decipher = crypto_1.default.createDecipheriv(algorithm, derivedKey, iv);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }`
    )

    fs.writeFileSync(filepath, content)
    console.log(`✅ ${path.relative(process.cwd(), filepath)} fixed!`)
    return true
  } catch (error) {
    console.error(`❌ Error fixing ${filepath}:`, error.message)
    return false
  }
}

let success = true
files.forEach((file) => {
  if (!fixFile(file)) {
    success = false
  }
})

if (success) {
  console.log('\n✅ devcert is ready! You can now run: pnpm start\n')
} else {
  console.log(
    '\n⚠️  Some files could not be fixed. You may need to run this script again after installing dependencies.\n'
  )
}
