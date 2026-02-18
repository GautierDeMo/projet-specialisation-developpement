# Mise en place du projet

## Gestionnaire de package

* Installation de PNPM via ce lien <https://pnpm.io/installation>



# 1. Installer toutes les dépendances

### Méthode rapide (recommandée)

pnpm install

### Méthode manuelle

* Se rendre dans le dossier `front` :
  * Initialisation du front via la commande `pnpm install`
* Se rendre dans le dossier `back` :
  * Initialisation du back via la commande `pnpm install`

###  2. Configurer les variables d'environnement (voir ci-dessous)

###  3. Lancer tout (BDD + Backend + Frontend)
pnpm start

L'application sera accessible sur :
* **Frontend** : http://localhost:3000
* **Backend** : http://localhost:5000

## Variables d'environnement

### Fichier `.env` (à la racine du projet)

Copier le fichier `.env.example` et le renommer en `.env`, puis modifier :
```env
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db>
```

### Fichier `back/.env`

Copier le fichier `back/.env.example` et le renommer en `back/.env`, puis modifier :

* `DATABASE_URL` : URL de connexion PostgreSQL
  * Format : `postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public`
  * ⚠️ Utiliser les **mêmes valeurs** que dans le `.env` racine
  * Exemple : `postgresql://devuser:devpassword@localhost:5432/devdb?schema=public`
```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
JWT_SECRET=dev_secret_change_in_production
PORT=5000
```

### Fichier `front/.env`

Copier le fichier `front/.env.example` et le renommer en `front/.env` :
```env
VITE_API_URL=http://localhost:5000
```

## Base de données

La base de données PostgreSQL tourne dans Docker. Les migrations Prisma créent automatiquement les tables.

### Avec `pnpm start` (automatique)
```bash
pnpm start
```

Cette commande :
1. ✅ Démarre PostgreSQL dans Docker
2. ✅ Lance le backend (qui applique les migrations au démarrage)
3. ✅ Lance le frontend

### Manuellement
```bash
# Démarrer PostgreSQL
docker compose up -d

# Vérifier que PostgreSQL est bien lancé
docker ps

# Vous devriez voir : postgres-projet-specialisation-developpement

# Appliquer les migrations
cd back
pnpm prisma migrate dev

## Commandes utiles

### Lancement
```bash
# Lancer tout (BDD + Backend + Frontend)
pnpm start

# Lancer uniquement Backend + Frontend
pnpm dev

# Lancer uniquement la BDD
pnpm db:start

# Arrêter la BDD
pnpm db:stop
```

### Base de données
```bash
# Ouvrir Prisma Studio (interface graphique)
pnpm prisma:studio

# Appliquer les migrations
pnpm prisma:migrate

# Réinitialiser la BDD (⚠️ supprime toutes les données)
pnpm db:reset
```

## Dépannage

### La base de données ne démarre pas
```bash
# Vérifier que Docker est bien lancé
docker ps

# Relancer la BDD
pnpm db:stop
pnpm db:start
```

### Erreur de connexion Prisma

* Vérifier que la BDD est bien lancée : `docker ps`
* Vérifier que le `DATABASE_URL` dans `back/.env` correspond aux valeurs du `.env` racine
* Réappliquer les migrations : `cd back && pnpm prisma migrate dev`

### Erreur "VITE_API_URL is not defined"

* Vérifier que le fichier `front/.env` existe
* Vérifier qu'il contient bien `VITE_API_URL=http://localhost:5000`
* Relancer le frontend : `Ctrl+C` puis `pnpm start`

## Stack technique

* **Backend** : Node.js, Express, Prisma
* **Frontend** : Vite, Vanilla JavaScript, Tailwind CSS
* **Base de données** : PostgreSQL 15
* **Outils** : Docker, pnpm workspaces, concurrently

## Équipe

| Nom   ||
| :----- | :---------------------------------------------------------------------- |
| Solène Gouin |
| Jérémy Duflot |                          
| Mickaël Desclaux-Arramond |  
| Gautier De Mauroy |