# 🌱 GreenMarket

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://green-market-v1.vercel.app)
[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://urlr.me/rVRZQ4)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-90+-00C853?style=for-the-badge&logo=lighthouse&logoColor=white)](./docs/lighthouse/)

**Plateforme e-commerce éco-responsable • ECF2 - RNCP 37674**

_Mise en relation de producteurs locaux et de consommateurs_

[🌐 Démo](https://green-market-virid.vercel.app) • [🎨 Maquette](https://urlr.me/rVRZQ4) • [📊 Lighthouse](./docs/lighthouse/)

---

## 📖 À propos

**GreenMarket** est une plateforme permettant de mettre en relation des **producteurs locaux** et des **consommateurs**. Les producteurs publient leurs produits, les clients passent commande via la plateforme.

Ce dépôt contient le **back-end complet** (API REST Symfony) ainsi que le **front-end** (React), le tout orchestré via **Docker**.

**📅 Rendu** : 20 avril 2026 • **Soutenance** : 21 avril 2026

---

## ✨ Fonctionnalités

- 👤 **Gestion des utilisateurs** — Inscription, connexion, rôles (admin / producer / client)
- 🛒 **Catalogue produits** — Consultation publique, création réservée aux producteurs
- 📦 **Commandes** — Création et consultation, total calculé côté serveur
- 🔐 **Authentification JWT** — Routes protégées selon le rôle
- 🏠 **Front React** — Hero, catalogue, fiche produit, responsive
- ♿ **Accessible** — RGAA niveau AA
- ⚡ **Optimisé** — Lighthouse ≥ 90

---

## 🛠️ Technologies

![Symfony](https://img.shields.io/badge/Symfony-000000?style=for-the-badge&logo=symfony&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

| Couche           | Technologie              |
| ---------------- | ------------------------ |
| Back-end         | Symfony 7, Doctrine ORM  |
| Base de données  | MySQL 8.0                |
| Authentification | LexikJWT + bcrypt        |
| Front-end        | React 18, Vite (Node 21) |
| Containerisation | Docker + Docker Compose  |

---

## 📁 Structure du projet

```
backend/                    # API Symfony (PHP 8.3 + Apache)
├── src/
│   ├── Controller/
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   ├── ProductController.php
│   │   └── OrderController.php
│   ├── Entity/
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Order.php
│   │   └── OrderItem.php
│   ├── Repository/
│   └── DataFixtures/
│       └── AppFixtures.php
├── config/
│   └── packages/
│       ├── security.yaml
│       └── lexik_jwt_authentication.yaml
├── migrations/
├── docker-entrypoint.sh
├── Dockerfile
├── .env
└── composer.json
frontend/                   # App React (Node 21 + Vite)
├── src/
│   ├── components/
│   ├── pages/
├── public/
└── Dockerfile
docs/
├── lighthouse/
└── merise/
docker-compose.yaml
.env                        # Variables Docker Compose (racine)
README.md
```

---

## 🚀 Installation & Lancement

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2
- Git

> ⚠️ **Aucune installation locale de PHP, Node ou MySQL n'est nécessaire.** Tout tourne dans Docker.

---

### 1 — Cloner le dépôt

```bash
git clone https://github.com/VialsShiny/green-market.git
cd green-market
```

---

### 2 — Configurer les variables d'environnement

Le `docker-compose.yaml` s'appuie sur un fichier `.env` à la **racine du projet**. Crée-le :

```bash
cp .env.example .env
```

Contenu du `.env` racine (lu par Docker Compose) :

```env
# MySQL — doit correspondre à DATABASE_URL dans backend/.env.local
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=greenmarket
MYSQL_USER=greenmarket
MYSQL_PASSWORD=greenmarket
MYSQL_HOST=db
```

Ensuite, configure les variables Symfony :

```bash
cp backend/.env backend/.env.local
```

Contenu de `backend/.env.local` :

```env
APP_ENV=dev
APP_SECRET=changeme_une_chaine_de_32_caracteres

# Correspond aux variables Docker Compose
DATABASE_URL="mysql://greenmarket:greenmarket@db:3306/greenmarket?serverVersion=8.0&charset=utf8mb4"

# Clés JWT (générées à l'étape 4)
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=votre_passphrase_secrete
```

---

### 3 — Lancer Docker

```bash
docker compose up -d --build
```

Les 4 services démarrent :

| Conteneur            | URL                   | Description          |
| -------------------- | --------------------- | -------------------- |
| `green_market`       | http://localhost:5173 | App React (Vite)     |
| `symfony_app`        | http://localhost:8000 | API Symfony (Apache) |
| `symfony_db`         | localhost:3306        | MySQL 8.0            |
| `symfony_phpmyadmin` | http://localhost:8080 | Interface BDD        |

> 💡 **PhpMyAdmin** : identifiants `user` / `password`

---

### 4 — Initialiser le back-end Symfony

Le `docker-entrypoint.sh` peut déjà automatiser certaines étapes au démarrage. Si ce n'est pas le cas, exécute manuellement :

```bash
# Entrer dans le conteneur back-end
docker compose exec backend bash

# Installer les dépendances PHP
composer install

# Générer les clés JWT (une seule fois)
php bin/console lexik:jwt:generate-keypair

# Créer la base de données
php bin/console doctrine:database:create --if-not-exists

# Exécuter les migrations
php bin/console doctrine:migrations:migrate --no-interaction

# Charger les données de test
php bin/console doctrine:fixtures:load --no-interaction

exit
```

> 💡 **Tout en une commande** depuis l'hôte :
>
> ```bash
> docker compose exec backend bash -c "
>   composer install &&
>   php bin/console lexik:jwt:generate-keypair --overwrite &&
>   php bin/console doctrine:database:create --if-not-exists &&
>   php bin/console doctrine:migrations:migrate --no-interaction &&
>   php bin/console doctrine:fixtures:load --no-interaction
> "
> ```

---

### 5 — Vérifier que tout fonctionne

```bash
# Statut des conteneurs
docker compose ps

# Test rapide de l'API (retourne la liste des produits)
curl http://localhost:8000/api/products
```

---

### Arrêter les conteneurs

```bash
# Arrêter sans supprimer les données
docker compose down

# Arrêter ET réinitialiser la base de données
docker compose down -v
```

---

## 🔌 Endpoints de l'API

> **Base URL** : `http://localhost:8000/api`
>
> Les routes protégées requièrent le header : `Authorization: Bearer <token>`

### 🔐 Authentification

| Méthode | Route            | Auth | Code  |
| ------- | ---------------- | ---- | ----- |
| `POST`  | `/auth/register` | ❌   | `201` |
| `POST`  | `/auth/login`    | ❌   | `200` |

**POST `/auth/register`** — Body :

```json
{
    "firstname": "Alice",
    "lastname": "Martin",
    "email": "alice@example.com",
    "password": "Password123!",
    "role": "client"
}
```

Réponse `201` :

```json
{
    "id": 1,
    "firstname": "Alice",
    "lastname": "Martin",
    "email": "alice@example.com",
    "role": "client"
}
```

**POST `/auth/login`** — Body :

```json
{
    "email": "alice@example.com",
    "password": "Password123!"
}
```

Réponse `200` :

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."
}
```

---

### 👥 Utilisateurs

| Méthode | Route        | Auth | Rôle requis         | Code  |
| ------- | ------------ | ---- | ------------------- | ----- |
| `GET`   | `/users`     | ✅   | `admin`             | `200` |
| `GET`   | `/users/:id` | ✅   | Lui-même ou `admin` | `200` |

Réponse `/users` :

```json
[
    {
        "id": 1,
        "firstname": "Alice",
        "lastname": "Martin",
        "email": "alice@example.com",
        "role": "client"
    }
]
```

---

### 🛒 Produits

| Méthode | Route           | Auth | Rôle requis           | Code  |
| ------- | --------------- | ---- | --------------------- | ----- |
| `GET`   | `/products`     | ❌   | —                     | `200` |
| `GET`   | `/products/:id` | ❌   | —                     | `200` |
| `POST`  | `/products`     | ✅   | `producer` ou `admin` | `201` |

Réponse `/products` — Format [Fake Store API](https://fakestoreapi.com/docs) :

```json
[
    {
        "id": 1,
        "title": "Tomates Bio",
        "price": 2.5,
        "description": "Tomates bio du jardin",
        "category": "Alimentation",
        "image": null,
        "rating": {"rate": 0, "count": 0}
    }
]
```

**POST `/products`** — Body :

```json
{
    "title": "Tomates Bio",
    "price": 2.5,
    "description": "Tomates bio du jardin",
    "category": "Alimentation",
    "image": "https://example.com/tomates.jpg"
}
```

---

### 📦 Commandes

| Méthode | Route         | Auth | Rôle requis                      | Code  |
| ------- | ------------- | ---- | -------------------------------- | ----- |
| `GET`   | `/orders`     | ✅   | Ses commandes (`admin` = toutes) | `200` |
| `GET`   | `/orders/:id` | ✅   | Propriétaire ou `admin`          | `200` |
| `POST`  | `/orders`     | ✅   | Tout utilisateur authentifié     | `201` |

**POST `/orders`** — Body :

```json
{
    "products": [
        {"productId": 1, "quantity": 4},
        {"productId": 3, "quantity": 1}
    ]
}
```

Réponse `201` :

```json
{
    "id": 1,
    "userId": 1,
    "date": "2026-04-20",
    "products": [
        {"productId": 1, "quantity": 4},
        {"productId": 3, "quantity": 1}
    ],
    "total": 16.9
}
```

> ⚠️ Ne jamais envoyer `total` dans le body — il est **toujours calculé côté serveur** à partir des prix en base.

---

## ⚠️ Codes HTTP

| Code  | Signification     | Déclencheur                                            |
| ----- | ----------------- | ------------------------------------------------------ |
| `200` | Succès            | GET réussi, login réussi                               |
| `201` | Créé              | Register, création produit/commande                    |
| `400` | Données invalides | Champ manquant, email dupliqué, prix ≤ 0, quantité ≤ 0 |
| `401` | Non authentifié   | Token absent, invalide ou expiré                       |
| `403` | Accès interdit    | Rôle insuffisant                                       |
| `404` | Introuvable       | Utilisateur, produit ou commande inexistant            |
| `500` | Erreur serveur    | Exception non gérée                                    |

Format uniforme des erreurs :

```json
{"error": "Message d'erreur explicite"}
```

---

## 🔐 Sécurité

### Authentification JWT

- Token retourné au login, valable **1 heure**
- À envoyer dans chaque requête protégée :
    ```
    Authorization: Bearer <token>
    ```
- Configurable dans `config/packages/lexik_jwt_authentication.yaml`

### Mots de passe

- Hashés avec **bcrypt** via `UserPasswordHasherInterface` de Symfony
- Jamais stockés en clair, jamais retournés dans les réponses API

### Gestion des rôles

| Rôle       | Permissions                                              |
| ---------- | -------------------------------------------------------- |
| `client`   | Consulter les produits, créer/voir ses propres commandes |
| `producer` | Tout ce que `client` peut + créer des produits           |
| `admin`    | Accès complet — tous les users, produits et commandes    |

### Validation des entrées

- Champs obligatoires vérifiés côté serveur
- Format email validé
- Prix strictement positif (`> 0`)
- Stock non négatif (`≥ 0`)
- Quantités de commande strictement positives (`> 0`)
- Email unique à l'inscription

---

## 🔒 RGPD

### Données personnelles stockées

| Donnée                   | Finalité                      | Conservation    |
| ------------------------ | ----------------------------- | --------------- |
| Nom                      | Identification                | Durée du compte |
| Email                    | Connexion, identifiant unique | Durée du compte |
| Mot de passe hashé       | Authentification              | Durée du compte |
| Rôle                     | Contrôle d'accès              | Durée du compte |
| Référence unique (`ref`) | Traçabilité interne           | Durée du compte |
| Historique commandes     | Suivi des achats              | Durée du compte |

### Mesures de protection

- Mots de passe **hashés avec bcrypt** (irréversible)
- Tokens JWT **éphémères** (expiration 1h)
- Aucune donnée sensible retournée dans les réponses API
- Routes personnelles protégées par **JWT + contrôle de rôle**

### Droit à la suppression

Pour demander la suppression de ses données, l'utilisateur contacte l'administrateur. La suppression entraîne :

1. Suppression du compte utilisateur
2. Anonymisation ou suppression des commandes associées
3. Suppression des produits créés (si rôle `producer`)

---

## 🧪 Données de test (Fixtures)

Chargées via `php bin/console doctrine:fixtures:load` :

| Rôle       | Email                | Mot de passe    |
| ---------- | -------------------- | --------------- |
| `admin`    | admin@example.com    | `Admin1234!`    |
| `producer` | producer@example.com | `Producer1234!` |
| `client`   | alice@example.com    | `Password123!`  |
| `client`   | bob@example.com      | `Bob1234!`      |

Produits créés par le producteur :

| Produit           | Prix    | Stock | Catégorie    |
| ----------------- | ------- | ----- | ------------ |
| Tomates Bio       | 2,50 €  | 100   | Alimentation |
| Miel Artisanal    | 12,00 € | 50    | Alimentation |
| Fromage de Chèvre | 6,90 €  | 30    | Alimentation |

Commande d'exemple associée à **Alice** : 4× Tomates Bio + 1× Fromage de Chèvre = **17,00 €**

---

## 📊 Scores Lighthouse

| Accessibilité | Best Practices |    SEO     |
| :-----------: | :------------: | :--------: |
|  **98**/100   |  **100**/100   | **93**/100 |

> Rapports complets dans `/docs/lighthouse/`

---

## 👨‍💻 Auteur

**Thibault** · EDEN School · RNCP 37674

[![GitHub](https://img.shields.io/badge/GitHub-@VialsShiny-181717?style=flat&logo=github)](https://github.com/VialsShiny)

---

<div align="center">

**ECF2 — EDEN School**

_Avril 2026_

</div>
