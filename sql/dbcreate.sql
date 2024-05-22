CREATE DATABASE IF NOT EXISTS ARCADIA;

CREATE TABLE IF NOT EXISTS animaux (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(32) NOT NULL,
    naissance DATE NOT NULL,
    alimentation VARCHAR(100) NULL,
    sante VARCHAR(200) NULL,
    habitat VARCHAR(32) NOT NULL,
    nomScientifique VARCHAR(50) NULL,
    descriptionScientifique VARCHAR(300) NULL,
    leSaviezVous VARCHAR(450) NULL,
    img VARCHAR(200) NOT NULL,
    dateVerif DATE NULL
);

CREATE TABLE IF NOT EXISTS commentaires (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(56) NOT NULL,
    message VARCHAR(150) NOT NULL,
    publier BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS horaires (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    jour VARCHAR(32) NOT NULL,
    heure VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS images_animaux (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    url VARCHAR(1024) NOT NULL,
    nom VARCHAR(128) NOT NULL,
    animaux_id INT NOT NULL,
    FOREIGN KEY (animaux_id) REFERENCES animaux (id)
);

CREATE TABLE IF NOT EXISTS images (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(256) NOT NULL,
    url VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    prenom VARCHAR(32),
    email VARCHAR(128) UNIQUE NOT NULL,
    mdp VARCHAR(256) NOT NULL,
    administrateur BOOLEAN NOT NULL,
    veterinaire BOOLEAN NOT NULL
);