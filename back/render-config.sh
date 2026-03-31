#!/bin/bash
# Script pour configurer rapidement Render avec TiDB

# Demander les infos
read -p "Entrer le mot de passe TiDB Cloud: " TIDB_PASSWORD

# Connection string
DATASOURCE_URL="jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/diplomemmi?useSSL=true&serverTimezone=UTC"
USERNAME="3T8f8xkasNvriRP.root"

echo ""
echo "========================================"
echo "🔧 Configuration Render + TiDB Cloud"
echo "========================================"
echo ""
echo "Ajouter ces variables d'environnement sur Render:"
echo ""
echo "SPRING_DATASOURCE_URL=$DATASOURCE_URL"
echo "SPRING_DATASOURCE_USERNAME=$USERNAME"
echo "SPRING_DATASOURCE_PASSWORD=$TIDB_PASSWORD"
echo "SPRING_JPA_HIBERNATE_DDL_AUTO=update"
echo "APPLICATION_SECURITY_JWT_SECRET_KEY=4503dc4b267eb0db9bbb3ef12f64335efeddf46ed53b3327ed7cc8a7020f2cec"
echo "APPLICATION_SECURITY_JWT_EXPIRATION=86400000"
echo "APPLICATION_SECURITY_JWT_REFRESH_TOKEN_EXPIRATION=604800000"
echo "SERVER_PORT=8080"
echo ""
echo "========================================"
echo ""
echo "✅ Copié ! Accédez à:"
echo "   https://render.com/dashboard"
echo "   -> CeremonieDiplomeMMI-Back"
echo "   -> Settings -> Environment"
echo ""
