# src-ctt-server

### Call2Text server

Le projet est fait sur `deno` un équivalent de `node` en mieux et intégrant directement typescript.

L'objectif est de ne plus avoir de node_modules, de fournir un runtime plus secure et rapide.

C'est tout bénef pour vous vu que l'on apprend une méthode qui risque d'être beaucoup utilisée dans les entreprise d'ici quelques années.

# Projet

1. Project environment

`yarn global add prettier eslint @typescript-eslint`

or

`npm install -g prettier eslint @typescript-eslint`

2. Installer l'exe `deno`

**Mac / Linux:**

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

**Windows (Powershell):**

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

3. Lancer le Serveur

`make start` ou `make debug`

4. En debug : Ouvrir inspect tools sur chrome
   ...

# Philosophie

On reprend le patron MVC pour organiser le projet tout en mixant avec de l'organisation en nom de domaine. (Par example `transcript` est un domaine)

Voici un aperçu de l'organisation :

```
├── app.ts : fichier d'entrée pour le serveur
├── config : Variables de configuration
│   ├── database.ts
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

# Style de code

On essaie de suivre ce guide pour pas mettre du code poubelle. Petit projet ne veut pas dire apprendre à mal coder.

[Guide pour un code propre](https://github.com/goldbergyoni/nodebestpractices)

# Librairies Deno utilisés

- ORM : [Dso](https://github.com/manyuanrong/dso)
- Router : [Oak](https://deno.land/x/oak/)
- Templating : [Denjuck](https://deno.land/x/denjucks/)

# Base de donnée

> base de donnée mysql 8 à installer en local

0. <span style='color:red;'><b>[WARNING]</b></span> Faire des dumps réguliers à envoyer dans sa PR pour bien garder un modèle consistant

1. Pour lancer une base de donnée en local

- Installer mysql 8 Server
  [Procédure](https://dev.mysql.com/doc/mysql/en/windows-installation.html)
- Lancer le script `mysql/init.sql` pour créer la base

2. Erreur possible

[Pb de plugin de connection](https://stackoverflow.com/questions/51179516/sequel-pro-and-mysql-connection-failed)

# Déploiement

`make deploy`

TODO : Déploiement après validation de la CI après un merge
