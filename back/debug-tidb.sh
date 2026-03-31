#!/bin/bash
# Debug script pour vérifier la connexion TiDB

echo "🔍 Vérification de la connexion TiDB Cloud..."
echo ""

# Test 1 : Ping
echo "1️⃣ Test de connexion au host TiDB..."
if ping -c 1 gateway01.eu-central-1.prod.aws.tidbcloud.com > /dev/null 2>&1; then
    echo "✅ Host accessible"
else
    echo "❌ Host NON accessible - vérifier la connectivité réseau"
fi

echo ""

# Test 2 : Connexion MySQL
echo "2️⃣ Test de connexion MySQL..."
read -sp "Entrer le mot de passe TiDB: " TIDB_PASSWORD
echo ""

mysql -h gateway01.eu-central-1.prod.aws.tidbcloud.com \
      -P 4000 \
      -u 3T8f8xkasNvriRP.root \
      -p"$TIDB_PASSWORD" \
      -e "SELECT DATABASE();" 2>&1 | head -5

if [ $? -eq 0 ]; then
    echo "✅ Connexion MySQL OK"
else
    echo "❌ Connexion MySQL échouée"
    echo "   Vérifier: username, password, whitelist IP"
fi

echo ""

# Test 3 : Base de données
echo "3️⃣ Vérification de la base de données..."
mysql -h gateway01.eu-central-1.prod.aws.tidbcloud.com \
      -P 4000 \
      -u 3T8f8xkasNvriRP.root \
      -p"$TIDB_PASSWORD" \
      -e "SHOW DATABASES LIKE 'diplomemmi';" 2>&1 | grep diplomemmi

if [ $? -eq 0 ]; then
    echo "✅ Base 'diplomemmi' existe"
else
    echo "❌ Base 'diplomemmi' N'existe PAS"
    echo "   Créer avec: CREATE DATABASE IF NOT EXISTS diplomemmi;"
fi

echo ""
echo "========================================"
echo "💡 Si des erreurs, vérifier sur Render:"
echo "   Dashboard → Settings → Environment"
echo "========================================"
