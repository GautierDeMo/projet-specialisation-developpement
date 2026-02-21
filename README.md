# Mise en place du projet

## Prérequis

- **PNPM** : [Installation](https://pnpm.io/installation)
- **Docker** : Pour PostgreSQL
- **Node.js 24+**
- **OpenSSL** : Pour les certificats SSL (Windows : `choco install openssl`)
- **Git Bash** (Windows uniquement) : ⚠️ **PowerShell ne fonctionne PAS** avec devcert

### ⚠️ Important Windows

Le projet utilise `devcert` pour générer des certificats SSL locaux. **Utilisez Git Bash**, pas PowerShell !

**Solutions compatibles :**

- ✅ **Git Bash** (recommandé) - Installé avec [Git for Windows](https://git-scm.com/download/win)
- ✅ WSL (Windows Subsystem for Linux)
- ❌ PowerShell (ne fonctionne pas)

---

## 🚀 Installation rapide

### Méthode automatique (recommandée)

```bash
# 1. Installer OpenSSL (Windows uniquement)
choco install openssl

# 2. Installer les dépendances (depuis Git Bash sur Windows)
pnpm install

# 3. Configurer les .env (voir section ci-dessous)

# 4. Lancer tout
pnpm start
```

**Lors du premier lancement :**

- Windows demandera d'autoriser l'installation de la CA locale → **Cliquer "Oui"**
- devcert demandera un mot de passe → Choisir n'importe quel mot de passe (ex: `devcert123`)

---

## 📋 Installation détaillée

### 1. Installer OpenSSL (Windows uniquement)

```bash
choco install openssl
```

Fermez et rouvrez votre terminal (Git Bash) après l'installation.

### 2. Installer les dépendances

**Depuis la racine du projet (avec Git Bash sur Windows) :**

```bash
pnpm install
```

Cette commande :

- ✅ Installe les dépendances du workspace (root, back, front)
- ✅ Génère le client Prisma (`prisma generate`)
- ✅ Applique le patch devcert pour Node.js 24+
- ✅ Génère les certificats SSL automatiquement

### 3. Configurer les variables d'environnement

#### Fichier `.env` (racine du projet)

Copier `.env.example` en `.env` :

```env
POSTGRES_USER=devuser
POSTGRES_PASSWORD=devpassword
POSTGRES_DB=devdb
```

#### Fichier `back/.env`

Copier `back/.env.example` en `back/.env` :

```env
DATABASE_URL="postgresql://devuser:devpassword@localhost:5432/devdb?schema=public"
ACCESS_SECRET_KEY="your-super-secret-access-key-change-me"
REFRESH_SECRET_KEY="your-super-secret-refresh-key-change-me"
PORT=3000
```

⚠️ **Utiliser les mêmes valeurs** que dans le `.env` racine pour PostgreSQL

💡 **Générer des clés sécurisées :**

```bash
openssl rand -base64 32  # Pour ACCESS_SECRET_KEY
openssl rand -base64 32  # Pour REFRESH_SECRET_KEY
```

#### Fichier `front/.env`

Copier `front/.env.example` en `front/.env` :

```env
# Host du backend (sans protocole)
# Le protocole (http/https) est détecté automatiquement
VITE_BACKEND_HOST=localhost:3000
```

**Le protocole est détecté automatiquement :**

- Frontend HTTPS → Backend HTTPS
- Frontend HTTP → Backend HTTP

Pas besoin de changer cette valeur selon le mode !

### 4. Appliquer les migrations Prisma

```bash
cd back
pnpm prisma migrate dev
```

Ou laisser `pnpm start` les appliquer automatiquement.

### 5. Lancer le projet

```bash
pnpm start
```

**Note :** Le mot de passe devcert sera redemandé au lancement du backend.

---

## 🔒 HTTPS / Certificats SSL

Le projet utilise **devcert** pour activer HTTPS en développement local.

### Avec certificats SSL (mode par défaut)

```
✅ Backend HTTPS : https://localhost:3000 🔒
✅ Frontend HTTPS : https://localhost:5000 🔒
```

Un cadenas 🔒 apparaîtra dans la barre d'adresse du navigateur.

**Le protocole est détecté automatiquement** - pas besoin de configuration manuelle !

### Sans certificats (fallback HTTP)

Si la génération échoue, le projet fonctionne en HTTP :

```
⚠️  Backend HTTP : http://localhost:3000
⚠️  Frontend HTTP : http://localhost:5000
```

**Le protocole est toujours détecté automatiquement** - backend et frontend restent synchronisés !

---

## 📦 Commandes utiles

### Lancement

```bash
pnpm start           # BDD + Backend + Frontend (tout lancer)
pnpm dev             # Backend + Frontend (sans BDD)
pnpm db:start        # Lancer uniquement PostgreSQL
pnpm db:stop         # Arrêter PostgreSQL
pnpm db:reset        # ⚠️ Réinitialiser la BDD (supprime les données)
```

### Backend

```bash
cd back
pnpm dev             # Lancer le backend en mode développement
pnpm test            # Lancer les tests
pnpm seed            # Peupler la BDD avec des données de test
```

### Frontend

```bash
cd front
pnpm dev             # Lancer le frontend en mode développement
pnpm build           # Build de production
pnpm preview         # Prévisualiser le build
```

### Base de données (Prisma)

```bash
pnpm prisma:studio   # Interface graphique Prisma
pnpm prisma:migrate  # Créer/appliquer une migration
pnpm prisma:seed     # Peupler la BDD avec des données de test (produits)
pnpm db:reset       # Supprimer et recréer la BDD

# Ou depuis back/
cd back
pnpm prisma generate # Régénérer le client Prisma
pnpm prisma migrate dev --name nom_migration  # Créer une migration
pnpm prisma db push  # Push le schéma sans migration
pnpm prisma studio   # Ouvrir Prisma Studio
pnpm seed            # Peupler la BDD avec des données de test
```

#### 🌱 Seed

La commande `pnpm prisma:seed` injecte des données de test dans la base de données.
Elle ajoute des Produits qui permettent d'avoir les statistiques demandées.

**Quand l'utiliser :**

```bash
# Après avoir appliqué les migrations
pnpm prisma:migrate dev
pnpm prisma:seed    # Injecter les données de test
```

---

## 🔧 Dépannage

### Erreur "sh not found" ou "OpenSSL not found"

**Cause :** Vous êtes sur PowerShell ou OpenSSL n'est pas installé

**Solution :**

1. Installer OpenSSL : `choco install openssl`
2. Fermer PowerShell
3. Ouvrir **Git Bash**
4. Relancer `pnpm install`

### Erreur "devcert password"

**Solution :** Taper le mot de passe choisi lors de `pnpm install` (ex: `devcert123`)

Ce mot de passe sert à chiffrer les certificats locaux et sera redemandé à chaque lancement.

### Popup "Installer certificat" ne s'affiche pas

```bash
rm -rf .cert/       # Supprimer les certificats existants
pnpm install        # Régénérer
```

Cliquer **"Oui"** quand Windows demande l'autorisation.

### Navigateur affiche "Non sécurisé" en HTTPS

**Cause :** Certificat refusé ou expiré

**Solution :**

```bash
rm -rf .cert/       # Supprimer et régénérer
pnpm install
```

Autoriser l'installation de la CA quand demandé.

### Passer en HTTP (désactiver HTTPS)

```bash
rm -rf .cert/
pnpm start
```

Le projet démarrera automatiquement en HTTP. Le frontend s'adaptera automatiquement.

### Erreur "Prisma Client is not generated"

```bash
cd back
pnpm prisma generate
```

### La base de données ne démarre pas

```bash
docker ps           # Vérifier que Docker tourne
pnpm db:stop
pnpm db:start
```

### Erreur de connexion Prisma

- Vérifier que Docker tourne : `docker ps`
- Vérifier que le container PostgreSQL est lancé
- Vérifier `DATABASE_URL` dans `back/.env` (mêmes valeurs que `.env` racine)
- Réappliquer les migrations : `cd back && pnpm prisma migrate dev`

### Port 3000 ou 5000 déjà utilisé

```bash
# Trouver le processus
lsof -i :3000  # ou :5000

# Tuer le processus
kill -9 <PID>
```

Windows :

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 🛡️ Sécurité

Le projet implémente les mesures de sécurité suivantes :

- ✅ **HTTPS** avec certificats SSL locaux (devcert)
- ✅ **HSTS** (HTTP Strict Transport Security) - Force HTTPS pendant 1 an
- ✅ **CSP** (Content Security Policy) stricte avec nonces dynamiques
- ✅ **Trusted Types** - Protection XSS DOM
- ✅ **CORS** configuré et restreint
- ✅ **security.txt** (RFC 9116) : `/.well-known/security.txt`
- ✅ **Détection automatique du protocole** - Frontend et backend toujours synchronisés

**Score de sécurité : 100/100**

**Documentation complète :** [`docs/SECURITY_TESTS.md`](./docs/SECURITY_TESTS.md)

---

## 🧪 Tests de sécurité

Voir le guide complet : [`docs/SECURITY_TESTS.md`](./docs/SECURITY_TESTS.md)

**Tests rapides :**

1. **HSTS** : DevTools → Network → Headers → `Strict-Transport-Security`
2. **CSP** : Lancer les tests XSS depuis la console (voir doc)
3. **Trusted Types** : Vérifier `require-trusted-types-for 'script'` dans CSP
4. **security.txt** : `https://localhost:5000/.well-known/security.txt`

---

## 📁 Structure du projet

```
projet-specialisation-developpement/
├── back/                   # Backend Express + Prisma
│   ├── src/
│   │   ├── config/         # Configurations (CORS, SSL)
│   │   ├── middlewares/    # Middlewares (HSTS, erreurs)
│   │   ├── routes/         # Routes API
│   │   └── main.js         # Point d'entrée
│   ├── prisma/             # Schéma et migrations
│   └── .env                # Variables d'environnement backend
├── front/                  # Frontend Vite + Vanilla JS
│   ├── public/
│   │   └── .well-known/
│   │       └── security.txt
│   ├── src/
│   │   ├── config/         # Configuration SSL & API
│   │   ├── pages/          # Pages de l'app
│   │   └── utils/          # Utilitaires (Trusted Types)
│   ├── vite.config.js      # Config Vite avec HTTPS et CSP
│   └── .env                # Variables d'environnement frontend
├── docs/                   # Documentation
│   └── SECURITY_TESTS.md   # Guide des tests de sécurité
├── scripts/                # Scripts utilitaires
│   └── fix-devcert.js      # Patch devcert pour Node.js 24+
├── .cert/                  # Certificats SSL (ignoré par Git)
├── .env                    # Config PostgreSQL
├── docker-compose.yml      # Configuration Docker PostgreSQL
└── package.json            # Scripts du monorepo
```

---

## 📚 Stack technique

- **Backend** : Node.js 24, Express 5, Prisma ORM
- **Frontend** : Vite 7, Vanilla JavaScript, Tailwind CSS 4
- **Base de données** : PostgreSQL 15
- **Sécurité** : devcert, HSTS, CSP, Trusted Types, CORS
- **Outils** : Docker, pnpm workspaces, concurrently, nodemon

---

## 👥 Équipe

| Nom                       |
|:--------------------------|
| Solène Gouin              |
| Jérémy Duflot             |
| Mickaël Desclaux-Arramond |
| Gautier De Mauroy         |

---
