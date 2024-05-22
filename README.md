## Project setup
```
npm install
```

### Run
```
nodemon server.js
```
# Déploiement Local de l'Application

Cette documentation explique comment déployer localement l’application web Arcadia pour laquelle deux repositories ont été créés : un pour le back-end (Node.js avec Express.js) et un pour le front-end (React.js avec Tailwind CSS).

## Prérequis

- [Node.js](https://nodejs.org/) (v14 ou plus récent)
- [npm](https://www.npmjs.com/get-npm) (installé avec Node.js)

## Installation de Node.js et npm

Si vous n'avez pas encore Node.js et npm installés, téléchargez et installez-les depuis [nodejs.org](https://nodejs.org/). Cela installera également npm.

## Cloner les repositories

Commencez par cloner les deux repositories :


### Cloner le repository du back-end
```
git clone https://github.com/username/backend-repo.git
```
### Cloner le repository du front-end
```
git clone https://github.com/username/frontend-repo.git
```
## Configuration du back-end : 
### Accéder au répertoire du back-end
```
cd backend-repo
```

### Installer les dépendances : 
```
npm install
npm install express cors
npm install -g nodemon
```

### Lancer le serveur back-end : 
```
npm run start
```

Le back-end devrait tourner sur http://localhost:8080 🙂


## Configuration du front-end : 
### Accéder au répertoire front end 
```
cd frontend-repo
```

## Installer les dépendances : 
```
npm install
```

## Installer tailwind css : 
```
npm install -D tailwindcss
```

## Lancer la partie front-end : 
```
npm run start
```

Le front-end devrait tourner sur http://localhost:3000 🙂
