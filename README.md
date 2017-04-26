# Basics statements for ezs

This package cannot be used alone. EZS has to be installed.

## Usage

```js
var ezs = require('ezs');
ezs.use(require('ezs-istex'));
```


## Statements

###ISTEXDownload

Ce plugin récupère les hits (résultats de la requête à l'API ISTEX), puis télécharge les fichiers selon les critères demandé.  

```js
.pipe(ezs('ISTEXDownload', {
  criteria: {                       // Criteria
    "extension": "txt",
    "original": false,
    "mimetype": "text/plain"
  },
  out: "/my/path/",                 // Output path
  key: "fulltext"                   // Which key contain all data
}))
```