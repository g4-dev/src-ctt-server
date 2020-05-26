# src-ctt-server

## TODO

- Déploiement après validation CI d'un merge PR

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
`deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts`


2. Lancer le Serveur

`make start` ou `make debug`

3. En debug : Ouvrir inspect tools sur chrome
   [chrome://inspect/#devices](chrome://inspect/#devices)

# Philosophie

On reprend le patron MVC pour organiser le projet tout en mixant avec de l'organisation en nom de domaine. (Par example `transcript` est un domaine)

Voici un aperçu de l'organisation :

```
├── app.ts : fichier d'entrée pour le serveur
├── config : Variables de configuration
│   ├── db.ts
│   └── env.ts
├── controllers (TODO:orga à revoir)
│   ├── 404.ts
│   ├── errorHandler.ts
│   ├── transcript
│   │   └── CRUD...
│   └── user
│       ├── add.ts
│       ├── delete.ts
│       ├── getAll.ts
│       ├── getDetails.ts
│       └── update.ts
├── model (=entités)
│   ├── transcript.ts
│   └── user.ts
├── modules
│   └── ... modules à réutiliser
├── repo : Opérations complexes dans la base de donnée
│   ├── transcript.ts
│   └── user.ts
├── routes
│   └── transcript.ts
├── services
│   └── transcriptService.ts
```

Des fichiers `index.ts` peuvent être placés à la racine de chaque dossier pour récupérer des variables / fonctions / classes / interfaces et les exporter pour les réutiliser plus facilement.

```js
// j-exporte.ts
export { uneVar } from './foo/uneVar.ts').
// On exporte tout ce qu'il y a dans ce fichier
// Une class Class et une interface ClassInterface
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
- Templating : [Denjuck](https://deno.land/x/denjucks/)

# Base de donnée

Base de donnée mysql 8 à installer en local

> **[Attention]** : Vos identifiants mysql peuvent changer

1. Pour lancer une base de donnée en local

- Installer mysql 8 Server
  [Procédure](https://dev.mysql.com/doc/mysql/en/windows-installation.html)
- Lancer le script de création avec

```sh
mysql -u root -proot < src/mysql/init.sql
```

` pour créer la base et l'utilisateur

2. Développement

> <span style='color:red;'><b>[WARNING]</b></span> Faire des dumps réguliers à envoyer dans sa PR pour bien garder un modèle / base consistante


3. Erreur possible

[Pb de plugin de connection](https://stackoverflow.com/questions/51179516/sequel-pro-and-mysql-connection-failed)

# Déploiement

`make deploy`
