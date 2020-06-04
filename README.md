# src-ctt-server

## TODO

- Déploiement après validation CI d'un merge PR
- documentation_url

### Call2Text server

Le projet est fait sur `deno` un équivalent de `node` en mieux et intégrant directement typescript.

L'objectif est de ne plus avoir de node_modules, de fournir un runtime plus secure et rapide.

C'est tout bénef pour vous vu que l'on apprend une méthode qui risque d'être beaucoup utilisée dans les entreprise d'ici quelques années.

# Projet

1. Installer l'exe `deno`

**Mac / Linux:**

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

**Windows (Powershell):**

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

> Installer aussi denon si jamais vous voulez watch les changements de fichier et reload le serveur
> `deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts`

## Extensions à configurer

Installez et activez bien les extensions vscode dans le dossier `.vscode/.extensions.json`.

On rend le dev avec deno plus confortable

use **npm**:

`npm install --save-dev typescript-deno-plugin typescript`

or use **yarn**:

`yarn add -D typescript-deno-plugin typescript`

2. Lancer le Serveur

`make start` ou `make debug`

3. En debug : **Le top**

![Debugger](docs/img/debugger.png)

# Philosophie

On reprend le patron MVC pour organiser le projet tout en mixant avec de l'organisation en nom de domaine. (Par example `transcript` est un domaine)

Voici un aperçu de l'organisation :

```
├── app.ts : fichier d'entrée pour le serveur
├── config.ts : Variables de configuration
│   ├── db (ORM dso)
│   └── env
├── controllers (TODO:orga à revoir)
│   ├── 404.ts
│   ├── errorHandler.ts
│   ├── transcriptController
│   │   └── CRUD...
│   └── authController
│       --> JWT / bcrypt
├── model (= entités)
│   ├── index.ts --> renvoyé toutes les entités construites par dso
│   ├── transcript.ts
│   └── user.ts
├── modules
│   └── ... modules à réutiliser
├── repo : Opérations complexes dans la base de donnée
│   ├── transcriptRepo.ts
│   └── userRepo.ts
├── routes
│   └── transcript.ts
├── services
│   └── transcriptService.ts
```

Des fichiers `index.ts` peuvent être placés à la racine de chaque dossier pour récupérer des variables / fonctions / classes / interfaces et les exporter pour les réutiliser plus facilement.

```js
// index.ts
export { uneVar } from './foo/uneVar.ts').
// On exporte tout ce qu'il y a dans ce fichier soit une class Class et une interface ClassInterface
export * from './foo/grosseClasse.ts').
```

```js
// j-importe.ts
import { uneVar } from './foo/index.ts').
import { Class, ClassInterface } from './foo/index.ts').
```

# Style de code

On essaie de suivre ce guide pour pas mettre du code poubelle. Petit projet ne veut pas dire apprendre à mal coder.

[Guide pour un code propre](https://github.com/goldbergyoni/nodebestpractices)

# Librairies Deno utilisés

- ORM : [Dso](https://github.com/manyuanrong/dso)
- Router : [Oak](https://deno.land/x/oak/)
- Schema API : [Jbq](https://github.com/krnik/jbq/tree/master)

# Base de donnée

Base de donnée mysql 8 à installer en local

1. Pour lancer une base de donnée en local

- Installer mysql 8 Server
  [Procédure](https://dev.mysql.com/doc/mysql/en/windows-installation.html)

Ou utiliser le mysql 8 server de wamp / xamp

- Lancer le script de création avec
  > **[Attention]** : Vos identifiants mysql peuvent changer

```sh
mysql -u root -proot < mysql/init.sql
```

` pour créer la base et l'utilisateur correspondant

2. Développement

> <span style='color:red;'><b>[WARNING]</b></span> Faire des dumps réguliers à envoyer dans sa PR pour bien garder un modèle / base consistante

3. Erreur possible

[Pb de plugin de connection](https://stackoverflow.com/questions/51179516/sequel-pro-and-mysql-connection-failed)

# Ui

On sépare dans ce projet complètement l'interface du back end pour rester sur une utilisation simple des microservices dans l'UI

Suivre ce lien vers le repo [src-ctt-ui](https://github.com/g4-dev/src-ctt-ui)

# Déploiement

`make deploy`
