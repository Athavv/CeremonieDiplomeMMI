# 🚀 Setup TiDB Cloud

## 1️⃣ Créer un compte TiDB Cloud

1. Aller sur https://tidbcloud.com
2. S'inscrire gratuitement
3. Créer une nouvelle organisation

---

## 2️⃣ Créer un Cluster Serverless

1. **Type de déploiement** : Serverless (gratuit)
2. **Région** : Europe (Frankfurt)
3. **Créer le cluster**

Attendre ~2-3 minutes que le cluster démarre

---

## 3️⃣ Récupérer la Connection String

Dans la page du cluster, copier la **Connection String** :

```
Example: 
mysql://root:xxxxx@gateway01.eu-west-1.prod.tidbcloud.com:4000/diplomemmi?sslMode=verify_identity
```

Ou aller dans **"SQL Access"** et prendre **MySQL Connection**

---

## 4️⃣ Créer la base de données

```bash
# Extraire les infos de la connection string
# host: gateway01.eu-west-1.prod.tidbcloud.com
# port: 4000
# user: root (avec le mot de passe)
```

Via MySQL client:
```bash
mysql -h gateway01.eu-west-1.prod.tidbcloud.com \
      -P 4000 \
      -u root \
      -p"<password>" \
      -e "CREATE DATABASE IF NOT EXISTS diplomemmi;"
```

Ou via Workbench/DataGrip/TablePlus

---

## 5️⃣ Mettre à jour .env.local (DEV)

```env
# Pour tester localement via TiDB Cloud
SPRING_DATASOURCE_URL=jdbc:mysql://gateway01.eu-west-1.prod.tidbcloud.com:4000/diplomemmi?useSSL=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
APPLICATION_SECURITY_JWT_SECRET_KEY=4503dc4b267eb0db9bbb3ef12f64335efeddf46ed53b3327ed7cc8a7020f2cec
APPLICATION_SECURITY_JWT_EXPIRATION=86400000
```

---

## 6️⃣ Variables d'environnement sur Render

Sur le dashboard Render, ajouter:

```
SPRING_DATASOURCE_URL=jdbc:mysql://gateway01.eu-west-1.prod.tidbcloud.com:4000/diplomemmi?useSSL=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=<your-tidb-password>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
APPLICATION_SECURITY_JWT_SECRET_KEY=4503dc4b267eb0db9bbb3ef12f64335efeddf46ed53b3327ed7cc8a7020f2cec
APPLICATION_SECURITY_JWT_EXPIRATION=86400000
APPLICATION_SECURITY_JWT_REFRESH_TOKEN_EXPIRATION=604800000
SERVER_PORT=8080
```

---

## ⚠️ Important : Whitelist IP

TiDB Cloud demande de whitelist les IPs qui accèdent à la DB.

1. Aller dans cluster settings → **Networking**
2. Ajouter l'IP publique de Render
3. Ajouter votre IP locale pour les tests

**Pour Render** : Render n'a pas d'IP fixe, donc:
- Ajouter `0.0.0.0/0` (ATTENTION: sécurité risquée en prod)
- OU : Utiliser un bastion SSH (plus sûr)

---

## 🧪 Tester localement

```bash
cd back
./mvnw spring-boot:run
```

L'app se connectera directement à TiDB Cloud (via .env.local)

---

## 📊 Pricing TiDB Cloud

- **Gratuit** : Cluster Serverless avec limits
  - 5GB stockage
  - Enough pour dev/test
  
- **Production** : Passer à un cluster payant si besoin

---

## 🔧 Troubleshooting TiDB

**Erreur "Unknown host"?**
- Vérifier le hostname dans la connection string
- Vérifier la whitelist IP

**Erreur "SSL handshake failed"?**
- Ajouter `?useSSL=true` dans la connection string
- Ajouter `&serverTimezone=UTC`

**Erreur "Access denied"?**
- Vérifier le password
- Vérifier l'username format: `root@<cluster>`
