-- TiDB Cloud - Initialisation de la base de données
-- Exécuter ce script sur TiDB Cloud

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS diplomemmi;
USE diplomemmi;

-- Tables créées automatiquement par Hibernate lors du démarrage
-- (spring.jpa.hibernate.ddl-auto=update)

-- Pour le moment, c'est tout ce qu'il faut!
-- Hibernate va créer les tables lors du premier démarrage
