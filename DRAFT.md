# Brouillon des choses à faire

## Tâches à réaliser

* Créer le repo sur GitHub
* Créer un folder pour le front
* Créer un folder pour le back
* Utiliser postgreSQL avec un docker-compose
* Express pour le back
* Vite js pour le front
* Monorepo front + back sur GitHub
* Mettre à dispo une url de statistiques (OPEN BAR)
* Utilisation de Jest pour les tests soit sur le CRUD soit l'auth
* Faire un README.md

## Contraintes

* Faire prévaloir le code en front, le back ne sert qu'à la mise à disposition de(s) (l')API(s)
* Utiliser de la programmation fonctionnelle sur certains endroits

### Contraintes sécu

* Respect des CORS : La totalité des APIs mises à disposition par le serveur (à l'exception de l'URL de statistiques) doit être limitée à `localhost:3000`.
* Protection CSRF : les formulaires, notamment de suppression, doit être vérifiés par CSRF.
* Les CSP doivent être validées sur le site <https://csp-evaluator.withgoogle.com/>.
* Aucun risque de sécurité potentiel ou avéré ne doit être présent.
* Le système de rapport CSP doit être fonctionnel : une page dédiée doit pouvoir afficher les dernières erreurs de CSP trouvées, uniquement quand on est connecté.
* Inspirez-vous de <https://csper.io/blog/csp-report-ltering>.
* L'upload d'images ne doit pas être un vecteur d'attaque.
* Le fichier `security.txt` doit être présent

### Bonnes pratiques OWASP

* Toutes les pages doivent vérifier l'identité de la personne se connectant, pas juste le dashboard
* Les mots de passe doivent être hashés avec un algorithme de hash sécurisé (ex : `bcrypt`)
* Toutes les requêtes doivent être protégées des failles `XSS`
* Le mot de passe doit correspondre à une politique de sécurité stricte : <https://pages.nist.gov/800-63-4/sp800-63b.html#appA>

## BONUS

* Utiliser une librairie pour l'esthétique du front

## BDD

* Créer l'entité `Produit` avec les champs suivants :
  * Identifiant
  * Libellé
  * Description
  * Images (plusieurs)
  * Prix
  * Catégorie (cela peut être un simple texte)
  * created_at
  * updated_at
* Créer une table `User` :
  * id
  * email
  * password
  * token_id
  * created_at
  * updated_at
* Créer la table `Token`:
  * token
  * expired_at
  * created_at
  * updated_at

## Front

* En tant que visiteur vous pourrez :
  * Se connecter
  * S'inscrire
  * Afficher tous les produits
  * Afficher un seul produit
  * Rechercher des produits
  * Ajouter un produit au panier
  * Accéder à l'URL de statistiques

* En tant que personne connectée on pourra :
  * Visualiser son dashboard (page vide)
  * Se déconnecter
  * Ajouter un produit
  * Modifier un produit
  * Supprimer un produit

## API/Url stats

Exemple de retour de l'API/url :

```json
[
  { "nom": "Alimentation", "compte": 35 },
  { "nom": "Ameublement", "compte": 12 },
  { "nom": "Sport", "compte": 23 }
]
```
