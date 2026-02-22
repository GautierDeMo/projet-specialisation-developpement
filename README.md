# Mise en place du projet

## Prérequis

- **PNPM** : [Installation](https://pnpm.io/installation)
- **Docker** : Pour PostgreSQL
- **Node.js 24+**
- **OpenSSL** : Pour les certificats SSL (Windows : `choco install openssl`)
- **Git Bash** (Windows uniquement) : ⚠️ **PowerShell ne fonctionne PAS** avec devcert

---

## 🚀 Installation rapide

### Méthode automatique (recommandée)

> A la racine du projet :

```bash
# 1. Installer OpenSSL (Windows uniquement)
choco install openssl

# 2. Installer les dépendances (depuis Git Bash sur Windows)
pnpm install

# 3. Configurer les .env (voir la section de l'installation détaillée ci-dessous)

# 4. Générer la BDD, son client, et la peupler
cd back/
npx prisma migrate dev
npx prisma generate
pnpm seed

# 5. Lancer tout
cd ..
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
- ✅ Applique le patch devcert pour Node.js 24+
- ✅ Génère les certificats SSL automatiquement

### 3. Configurer les variables d'environnement

#### Fichier `.env` (racine du projet)

Dupliquer le fichier `.env.example` en `.env`et choisir ses propres variables d'environnement :

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=db
```

#### Fichier `back/.env`

Dupliquer le fichier `back/.env.example` en `back/.env`et choisir ses propres variables d'environnement :
> Bien faire attention à utiliser les mêmes variables que dans votre `.env` à la racine pour le `DATABASE_URL`
>
> Ainsi qu'à faire correspondre votre variable `FRONT_PORT` avec la variable `PORT` dans le `.env` du front

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
ACCESS_SECRET_KEY="your-super-secret-access-key-change-me"
REFRESH_SECRET_KEY="your-super-secret-refresh-key-change-me"
CSRF_SECRET="your-super-secret-csrf-key-change-me"
PORT=3000
FRONT_PORT=5000
```

💡 **Si vous voulez générer des clés sécurisées :**

```bash
openssl rand -base64 32  # Pour ACCESS_SECRET_KEY
openssl rand -base64 32  # Pour REFRESH_SECRET_KEY
openssl rand -base64 32  # Pour CSRF_SECRET
```

#### Fichier `front/.env`

Dupliquer le fichier `front/.env.example` en `front/.env` et choisir ses propres variables d'environnement :
> Pensez à faire correspondre votre variable `PORT` avec la variable `FRONT_PORT` dans le `.env` du back

```env
VITE_API_URL=localhost:3000 // sans le protocole (http/https)
PORT=5000
```

### 4. Appliquer les migrations Prisma

> Depuis le répertoire `back/`

```bash
npx prisma migrate dev ## Pour créer la BDD avec les migrations automatiquement
npx prisma generate
pnpm seed # Pour peupler la bdd
```

### 5. Lancer le projet depuis la racine du projet

```bash
pnpm start
```

Cette commande :

- ✅ Démarre PostgreSQL avec Docker
- ✅ Lance le backend (port 3000)
- ✅ Lance le frontend (port 5000)

**Note :** Le mot de passe devcert sera redemandé au lancement du backend.

### 6. (Firefox) Approuver les certificats SSL sur le Front ET le Back

> Lorsque l'on essaiera de s'inscrire sur l'application web Front, il se peut qu'une erreur intervienne liée au CORS.
>
> Dans ce cas là, il faudra se rendre sur l'application web Back, afin d'approuver le certificat SSL de cet url pour que
> l'appel fait depuis le Front sur l'application du Back soit autorisé.
>
> Pour l'approuver il faudra seulement faire en sorte de cliquer sur "Je connais les risques", ou "Se rendre quand même
> sur le site", lorsque vous tenterez d'accéder à l'application (Front ou Back d'ailleurs).
>
> Normalement Chrome fonctionne sans avoir besoin de réaliser ces actions.

---

## 🔒 HTTPS / Certificats SSL

Le projet utilise **devcert** pour activer HTTPS en développement local.

---

## 📦 Commandes utiles

### Lancement (depuis la racine)

```bash
pnpm start           # BDD + Backend + Frontend (tout lancer)
pnpm dev             # Backend + Frontend (sans BDD)
pnpm db:start        # Lancer uniquement PostgreSQL
pnpm db:stop         # Arrêter PostgreSQL
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
pnpm seed            # Peupler la BDD avec des données de test (produits)
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
docker ps           # Vérifier que Docker et votre BDD tourne
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

Ou changer la valeur du port dans le .env

---

## 🛡️ Sécurité

Le projet implémente les mesures de sécurité suivantes :

- ✅ **HTTPS** avec certificats SSL locaux (devcert)
- ✅ **HSTS** (HTTP Strict Transport Security) - Force HTTPS pendant 1 an
- ✅ **CSP (Content Security Policy)** :
  - Utilisation de **Nonces** dynamiques pour chaque requête.
  - 💡 _Note : la directive `'strict-dynamic'` est volontairement omise pour assurer la compatibilité avec le
      chargement de modules ES en cascade de Vite en mode développement._
- ✅ **Protection CSRF** : Implémentation du pattern **Double Submit Cookie** via `csrf-csrf` (v4).
  - Tokens avec une durée de validité de **30 minutes**.
  - Rejet systématique des requêtes non autorisées (Erreur 403).
- ✅ **Trusted Types** - Protection XSS au niveau du DOM.
- ✅ **Gestion des Cookies** : Flags `HttpOnly`, `SameSite: Strict` et `Secure` (activé dynamiquement via détection TLS).
- ✅ **CORS** configuré et restreint aux domaines autorisés (sauf `/api/stats`).
- ✅ **security.txt** (RFC 9116) : `/.well-known/security.txt`
- ✅ **Hashage des mots de passe** avec bcrypt
- ✅ **Validation des entrées** avec Zod

> **Score de sécurité : 100/100**

**Documentation complète :** [`SECURITY_TESTS.md`](./SECURITY_TESTS.md)

---

## 🧪 Tests de sécurité

Voir le guide complet : [`SECURITY_TESTS.md`](./SECURITY_TESTS.md)

**Tests rapides :**

1. **HSTS** : DevTools → Network → Headers → `Strict-Transport-Security`
2. **CSP** : Lancer les tests XSS depuis la console (voir doc)
3. **Trusted Types** : Vérifier `require-trusted-types-for 'script'` dans CSP
4. **security.txt** : `https://localhost:5000/.well-known/security.txt`

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
| Gautier de Mauroy         |

---
