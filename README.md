# Message Board App

Message Board est une application permettant aux utilisateurs de poster des messages dans différents salons. Les utilisateurs peuvent créer des salons et consulter les messages de tous les salons.

L'application est construite en utilisant HTML, CSS et JavaScript.
### Front dévéloppé par Clément Eoche, je n'ai fait qu'une adaptation de mon back à son front

## Configuration 

Pour configurer l'application frontend, suivez ces étapes:

1. Clonez le dépôt sur votre machine locale :

```sh
git clone https://github.com/HyziOne/TestUnitaireJs.git
```

2. Installez les dépendances du projet pour les tests à l'aide de `npm` :

```sh
npm i
```

3. Installez `http-server` globalement à l'aide de `npm` :

```sh
npm install -g http-server
```

4. Démarrez le serveur de développement en exécutant la commande suivante à la racine du projet :

```sh
http-server
```

5. Ouvrez l'URL indiquée dans la console (`http://localhost:8080`) dans votre navigateur préféré.

## Fonctionnalités

- Inscription et sélection des utilisateurs
- Création et sélection des salons
- Échange de messages en temps réel entre les utilisateurs
- Stockage des sessions pour les données des utilisateurs et des salons
- Interface utilisateur moderne

## Tests

Pour exécuter les tests, suivez ces étapes :

1. Decommentez l'import axios dans le fichier `src/api/index.js` :

```js
// import axios from 'axios';
```

2. Exécutez la commande suivante à la racine du projet :

```sh
npm test
```

Assurez-vous que le serveur de développement est en cours d'exécution avant d'exécuter les tests.
# TestUnitaireJs
