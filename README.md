# Cérémonie de Diplôme MMI - Projet Web

Ce projet est une application web pour la cérémonie de remise des diplômes des étudiants MMI.

## Technologies
- **Frontend**: ReactJS (Vite), Styled Components (Vanilla CSS Modules/Files), Axios, React Router.
- **Backend**: Java / Spring Boot 3.2.4 (Security, Web, JPA), MySQL.
- **Base de données**: MySQL.

## Fonctionnalités Implémentées
1.  **Authentification & Login**:
    -   Tout utilisateur (étudiant) a un login/mot de passe initial.
    -   À la **première connexion**, l'utilisateur est **forcé** de changer son mot de passe.
    -   Authentification sécurisée via JWT (JSON Web Tokens).

2.  **Livre d'Or**:
    -   Affichage public des messages approuvés.
    -   Formulaire pour poster un message (nécessite modération admin).

3.  **Galerie Photos**:
    -   Accessible uniquement aux utilisateurs connectés.
    -   Affichage grille responsive avec effet de zoom.

4.  **Interface Admin**:
    -   Accessible uniquement aux utilisateurs avec le rôle `ADMIN`.
    -   **Modération Livre d'Or**: Approuver ou supprimer les messages.
    -   **Gestion Galerie**: Ajouter (URL) ou supprimer des photos.
    -   **Gestion Utilisateurs**: Créer de nouveaux comptes étudiants ou admins.

## Installation et Lancement

### Prérequis
- Node.js (v18+)
- Java (JDK 17+)
- MySQL Server

### 1. Configuration Base de Données (MySQL)
Créez une base de données nommée `diplomemmi`.
Assurez-vous que votre utilisateur MySQL est `root` sans mot de passe, ou modifiez le fichier `back/src/main/resources/application.properties`.

### 2. Lancement du Backend (Spring Boot)
Dans un terminal, allez dans le dossier `back` :
```bash
cd back
./mvnw spring-boot:run
```
*Note: Un utilisateur admin par défaut est créé au démarrage : `admin` / `admin`.*

### 3. Lancement du Frontend (React)
Dans un nouveau terminal, allez dans le dossier `front` :
```bash
cd front
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.
