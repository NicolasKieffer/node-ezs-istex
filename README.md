# Basics statements for ezs

This package cannot be used alone. EZS has to be installed.

## Usage

```js
var ezs = require('ezs');
ezs.use(require('ezs-istex'));
```
## Statements

### ISTEXDownload

*Come after : ISTEXRequest*

This plugin will download the selected file contained in the result of ISTEX API.

```js
.pipe(ezs('ISTEXDownload', {
  criteria: {                       // Criteria
    "extension": "txt",
    "original": false,
    "mimetype": "text/plain"
  },
  out: "/my/path/",                 // Output path
  key: "fulltext"                   // Which key contain the data
}))
```

### ISTEXRegroup

*Come after : ISTEXKeywords (for example)*

This plugin will transform Array into Object.

```js
.pipe(ezs('ISTEXRegroup', {
  out: "myFile.json" // Will save result here
}))
```
An array like :

```js
[
  { "id": "0", ...},
  { "id": "1", ...},
  ...
]
```

will be transformed into :

```js
{
  "0" : { "id": "0", ...},
  "1" : { "id": "1", ...},
}
```

### ISTEXGraph

*Come after : (ISTEXKeywords && ISTEXRegroup)*

This plugin create a graph document-document with keywords

```js
.pipe(ezs('ISTEXGraphs', {
  options: {
    out: graphFile // Will save result here
  }
}))
```

### ISTEXKeywords

*Come after : (ISTEXDownload)*

this plugin extract keywords of given .txt files

```js
.pipe(ezs('ISTEXKeywords', {
  out: res.out // Will save result here
}))
```