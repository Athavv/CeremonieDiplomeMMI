# 🔧 Configuration Render + TiDB Cloud

## Credentials TiDB Cloud

```
HOST: gateway01.eu-central-1.prod.aws.tidbcloud.com
PORT: 4000
USERNAME: 3T8f8xkasNvriRP.root
PASSWORD: [votre mot de passe]
DATABASE: diplomemmi (créer si n'existe pas)
```

---

## 📋 Étapes à suivre

### 1️⃣ Créer la base de données sur TiDB Cloud

**IMPORTANT** : Faire ceci AVANT de redéployer sur Render !

#### Option A : Via MySQL client (CLI)
```bash
mysql -h gateway01.eu-central-1.prod.aws.tidbcloud.com \
      -P 4000 \
      -u 3T8f8xkasNvriRP.root \
      -p \
      -e "CREATE DATABASE IF NOT EXISTS diplomemmi;"
```

#### Option B : Via GUI (Workbench, DataGrip, TablePlus, etc.)
1. Connecter à TiDB Cloud
2. Exécuter : `CREATE DATABASE IF NOT EXISTS diplomemmi;`

#### Option C : Via TiDB Cloud Web Console
1. Aller sur https://tidbcloud.com
2. Cluster → SQL Editor
3. Copier-coller : `CREATE DATABASE IF NOT EXISTS diplomemmi;`
4. Exécuter

### 2️⃣ Whitelister l'IP de Render

1. Aller sur [tidbcloud.com](https://tidbcloud.com)
2. **Cluster** → **Settings** → **Networking** → **IP Whitelist**
3. Ajouter :
   - **Pour tester** : `0.0.0.0/0` (temporaire)
   - **En production** : L'IP publique de Render (voir plus bas)
4. Appliquer / Save

⚠️ **Important** : Sans whitelist, la connexion sera refusée !

### 3️⃣ Configurer Render

1. Aller sur https://render.com → CeremonieDiplomeMMI-Back
2. **Settings** → **Environment**
3. Ajouter ces variables :

| Clé | Valeur |
|-----|--------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/diplomemmi?useSSL=true&serverTimezone=UTC` |
| `SPRING_DATASOURCE_USERNAME` | `3T8f8xkasNvriRP.root` |
| `SPRING_DATASOURCE_PASSWORD` | `[votre mot de passe TiDB]` |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` |
| `APPLICATION_SECURITY_JWT_SECRET_KEY` | `4503dc4b267eb0db9bbb3ef12f64335efeddf46ed53b3327ed7cc8a7020f2cec` |
| `APPLICATION_SECURITY_JWT_EXPIRATION` | `86400000` |
| `APPLICATION_SECURITY_JWT_REFRESH_TOKEN_EXPIRATION` | `604800000` |
| `SERVER_PORT` | `8080` |

4. Cliquer **"Save"**

### 4️⃣ Redéployer

1. Aller dans **Deploys**
2. Cliquer **"Manual Deploy"** (ou "Trigger Deploy")
3. Attendre le build (~5-10 min)

---

## ✅ Checklist avant redéploiement

- [ ] Base de données `diplomemmi` créée sur TiDB
- [ ] IP Render whitelistée sur TiDB (au minimum `0.0.0.0/0` pour test)
- [ ] Variables d'environnement ajoutées sur Render
- [ ] Vérifier que `SPRING_DATASOURCE_URL` contient le bon host/port
- [ ] Vérifier que `SPRING_DATASOURCE_USERNAME` et `PASSWORD` sont corrects

Une fois déployé :
```bash
curl https://ceremoniediplomemmi-back.onrender.com/api/health
```

Ou directement accéder à :
```
https://ceremoniediplomemmi-back.onrender.com/api
```

Vous devriez avoir une réponse (ex: 404 si pas de route, mais au moins la connexion passe !)

---

## 🛑 Troubleshooting

**"Network Adapter could not establish the connection"**
- ✅ Vérifier la DATASOURCE_URL
- ✅ Vérifier la whitelist IP sur TiDB
- ✅ Vérifier le mot de passe

**"Access denied for user"**
- ✅ Vérifier le USERNAME exact
- ✅ Vérifier le PASSWORD

**"Database does not exist"**
- ✅ Créer la DB : `CREATE DATABASE diplomemmi;`

---

## 🔐 Sécurité (après tests)

Une fois que ça marche :
1. Aller sur TiDB → Networking
2. Remplacer `0.0.0.0/0` par l'IP publique de Render
3. Ou utiliser un bastion SSH pour plus de sécurité

---

## 📊 URL finale de l'API

```
https://ceremoniediplomemmi-back.onrender.com/api
```

À utiliser dans `VITE_API_BASE_URL` sur Vercel !
