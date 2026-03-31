# Cérémonie de Remise des Diplômes — MMI 2022–2025

## Vue d'ensemble

**CeremonieDiplomeMMI** est une application web complète conçue pour accompagner la cérémonie de remise des diplômes de la promotion MMI 2022–2025 de l'Université Gustave Eiffel. Première édition exclusive 100 % dédiée à cette promotion, l'événement se déroule le **vendredi 3 avril à l'Espace Caravelle, Théâtre Chenonceau, Meaux** (200 places).

Le site offre une expérience élégante et animée aux diplômés et à leurs proches, avec un espace administrateur pour piloter l'événement en temps réel.

**🌐 Application en ligne :** [https://ceremonie-diplome-mmi.vercel.app](https://ceremonie-diplome-mmi.vercel.app)

---

## Fonctionnalités

### Espace Public

- **Page d'accueil** — Présentation de l'événement avec animations GSAP et smooth scroll Lenis.
- **Planning de la soirée** — Programme détaillé de la cérémonie (arrivée, remise des diplômes, cocktail dinatoire).
- **Livre d'Or** — Les invités peuvent laisser un message et une photo souvenir prise directement depuis la caméra. Affichage des messages avec lightbox animée.
- **Connexion** — Authentification sécurisée par JWT pour accéder aux espaces privés.

### Espace Diplômé (connecté)

- **Galerie Photo** — Galerie privée accessible uniquement aux utilisateurs connectés. Affichage en grille responsive, téléchargement des photos.
- **Changement de mot de passe à la première connexion** — Chaque diplômé reçoit un compte avec mot de passe temporaire et est contraint de le personnaliser dès sa première connexion.

### Espace Administrateur

- **Dashboard Admin** — Vue d'ensemble et navigation vers tous les outils de gestion.
- **Gestion du Livre d'Or** — Modération et suppression des messages.
- **Gestion de la Galerie** — Upload, visualisation et suppression de photos.
- **Gestion des Utilisateurs** — Création, modification et suppression des comptes diplômés et administrateurs.

### Animations & Expérience Utilisateur

- **Preloader GSAP** — Écran de chargement animé avec révélation du logo.
- **Transitions de pages** — Grille de 15×15 carrés bleus animés depuis le centre (curtain animation) entre chaque navigation.
- **Smooth Scroll** — Défilement fluide via Lenis sur toutes les pages publiques.
- **Curseur personnalisé** — Double anneau animé via Framer Motion sur desktop.
- **Boutons magnétiques** — Effet d'attraction du curseur sur les CTA principaux.
- **Marquee** — Texte défilant infini sur certaines sections.

---

## Technologies Utilisées

### Frontend

| Technologie | Usage |
|---|---|
| React 19 + Vite 7 | Framework principal + build tool |
| React Router DOM 7 | Routage SPA |
| Tailwind CSS 4 | Styling utilitaire |
| Framer Motion 11 | Animations déclaratives (cards, modales, transitions) |
| GSAP 3 + @gsap/react | Animations avancées (preloader, page transitions) |
| Lenis 1 | Smooth scroll |
| Axios | Requêtes HTTP vers l'API |
| Lucide React | Icônes |
| Ant Design 6 | Composants UI pour l'interface admin |
| Chart.js + react-chartjs-2 | Graphiques dans le dashboard admin |
| JSZip + file-saver | Export et téléchargement de la galerie |

### Backend

| Technologie | Usage |
|---|---|
| Spring Boot 3.2.4 (Java 21) | Framework API REST |
| Spring Security + JWT | Authentification et contrôle d'accès par rôles (RBAC) |
| Spring Data JPA + Hibernate | ORM et accès base de données |
| Lombok | Réduction du boilerplate Java |
| MySQL Connector | Driver base de données |
| Maven | Gestion des dépendances |

### Base de données & Hébergement

| Service | Rôle |
|---|---|
| TiDB Cloud (compatible MySQL) | Base de données hébergée |
| Vercel | Hébergement frontend |
| Render | Hébergement backend (Docker) |

---

## Structure du Projet

```
CeremonieDiplomeMMI/
├── front/                          # Frontend React
│   ├── src/
│   │   ├── api/                    # Services Axios (guestbook, gallery, user)
│   │   ├── components/
│   │   │   ├── admin/              # Layouts et formulaires admin
│   │   │   └── common/             # Composants partagés
│   │   │       ├── Preloader.jsx         # Écran de chargement GSAP
│   │   │       ├── PageTransition.jsx    # Curtain animation GSAP
│   │   │       ├── SmoothScroll.jsx      # Wrapper Lenis
│   │   │       ├── CustomCursor.jsx      # Curseur personnalisé
│   │   │       ├── DynamicWaveButton.jsx # Bouton effet liquide
│   │   │       ├── MagneticButton.jsx    # Bouton magnétique
│   │   │       └── Marquee.jsx           # Texte défilant
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Gestion de l'authentification globale
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Page d'accueil
│   │   │   ├── Planning.jsx        # Programme de la soirée
│   │   │   ├── Guestbook.jsx       # Livre d'or public
│   │   │   ├── Gallery.jsx         # Galerie privée
│   │   │   ├── Login.jsx           # Connexion
│   │   │   ├── ChangePassword.jsx  # Changement de mot de passe (1ère connexion)
│   │   │   └── admin/              # Pages admin (dashboard, users, gallery, guestbook)
│   │   └── App.jsx                 # Routing + wrappers animations globaux
│   └── package.json
│
└── back/                           # Backend Spring Boot
    └── src/main/java/mmi/ceremonie/diplome/
        ├── controller/             # Endpoints REST
        │   ├── AuthenticationController.java
        │   ├── GuestbookController.java
        │   ├── GalleryController.java
        │   ├── FileController.java
        │   └── UserController.java
        ├── model/                  # Entités JPA
        │   ├── User.java
        │   ├── GuestbookMessage.java
        │   └── GalleryImage.java
        ├── repository/             # Interfaces Spring Data
        ├── service/                # Logique métier
        │   ├── AuthenticationService.java
        │   └── FileStorageService.java
        ├── security/               # JWT + Spring Security
        │   ├── SecurityConfiguration.java
        │   ├── JwtService.java
        │   └── JwtAuthenticationFilter.java
        └── config/                 # Initialisation et configuration
            ├── DataInitializer.java
            └── ApplicationConfig.java
```

---

## Installation

### Prérequis

- Node.js v18+
- Java JDK 21
- Maven
- MySQL ou accès TiDB Cloud

### 1. Configuration Backend

Créez le fichier `back/src/main/resources/application.properties` ou configurez les variables d'environnement :

```env
SPRING_DATASOURCE_URL=jdbc:mysql://<host>/<db>?characterEncoding=UTF-8&useUnicode=true&useSSL=true
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
APPLICATION_SECURITY_JWT_SECRET_KEY=<clé_jwt_64_chars>
APPLICATION_SECURITY_JWT_EXPIRATION=86400000
```

### 2. Lancement du Backend

```bash
cd back
./mvnw spring-boot:run
```

Un compte administrateur par défaut est créé automatiquement au démarrage :
- **Login :** `admin` — **Mot de passe :** `admin`

L'API est disponible sur `http://localhost:8080/api`.

### 3. Configuration Frontend

Créez `front/.env.local` :

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4. Lancement du Frontend

```bash
cd front
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

---

## API — Principaux Endpoints

### Public (sans authentification)

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/authenticate` | Connexion, retourne un JWT |
| `GET` | `/api/public/guestbook` | Liste des messages du livre d'or |
| `POST` | `/api/public/guestbook` | Poster un message |
| `GET` | `/api/files/{subdir}/{filename}` | Servir un fichier uploadé |

### Authentifié (JWT requis)

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gallery` | Récupérer les images de la galerie |
| `POST` | `/api/files/upload/gallery` | Uploader une photo |
| `PUT` | `/api/users/change-password` | Changer son mot de passe |
| `GET` | `/api/users/me` | Profil de l'utilisateur connecté |

### Admin uniquement

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/guestbook` | Tous les messages (avec non publiés) |
| `DELETE` | `/api/guestbook/{id}` | Supprimer un message |
| `GET` | `/api/users` | Liste de tous les utilisateurs |
| `POST` | `/api/auth/register` | Créer un compte |
| `DELETE` | `/api/users/{id}` | Supprimer un utilisateur |

---

## Contexte du Projet

Ce site a été conçu et développé dans le cadre du **Projet Tutoré N°5** de la licence MMI (Métiers du Multimédia et de l'Internet) de l'Université Gustave Eiffel — IUT de Meaux.

### L'événement

- **Lieu :** Espace Caravelle, Théâtre Chenonceau — 10 rue Winston Churchill, 77100 Meaux
- **Capacité :** 200 places
- **Invités attendus :** ~57 personnes (32 diplômés + 25 accompagnateurs)
- **Taux de réponse formulaire :** 88,9 % (32/36 diplômés)
- **Budget prévisionnel :** 1 844,20 €

### Répartition des rôles

| Membre | Rôle |
|---|---|
| **Abi VIGNESWARAN** | Chef de projet, Développement front-end, Maquette UI/UX, Affiche & signalétique |
| **Aathavan THEVAKUMAR** | Lead développeur, Développement back-end, Formulaire d'inscription |
| **Oscar BAER** | Lead communication, Développement back-end, Gestion budget |
| **Saffana SALAOUDINE** | Lead recherche prestataire, Développement back-end, Gestion budget |

---

## Liens Utiles

- **🌐 Site en ligne :** [https://ceremonie-diplome-mmi.vercel.app](https://ceremonie-diplome-mmi.vercel.app)
- **⚙️ API Backend :** [https://ceremoniediplomemmiback.onrender.com](https://ceremoniediplomemmiback.onrender.com)
- **🎨 Maquette Figma :** Disponible dans les ressources du projet
- **📋 Repo Frontend :** [https://github.com/Athavv/CeremonieDiplomeMMI-Front](https://github.com/Athavv/CeremonieDiplomeMMI-Front)
- **📋 Repo Backend :** [https://github.com/Athavv/CeremonieDiplomeMMI-Back](https://github.com/Athavv/CeremonieDiplomeMMI-Back)

---

*Projet académique — Promotion MMI 2022–2025 — Université Gustave Eiffel, IUT de Meaux*
