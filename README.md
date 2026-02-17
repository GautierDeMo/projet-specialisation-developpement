# Mise en place du projet

## Gestionnaire de package

* Installation de PNPM via ce lien <https://pnpm.io/installation>
* Se rendre dans le dossier front :
  * Initialisation du front via la commande `pnpm i`
* Se rendre dans le dossier back :
  * Initialisation du back via la commande `pnpm i`

## Variables d'environnement

Modifier le fichier `.env.example` (le renommer `.env`) avec les variables suivantes :

* DATABASE_URL
  * Il faut définir le `user`, le `password`, et le nom de la `dbname`
* POSTGRES_USER
  * Mettre le même `user` que dans le `DATABASE_URL`
* POSTGRES_PASSWORD
  * Mettre le même `password` que dans le `DATABASE_URL`
* POSTGRES_DB
  * Mettre le même `dbname` que dans le `DATABASE_URL`
