# pojo-stick
:paperclip: Sync a plain-old-javascript-object with a local json file - in 1 line of code!

_This project is a work in progress. API is subject to change. PullRequests are very welcome_

## Usage

install with npm:

```
npm install --save pojo-stick
```

```js
const pojoStick = require('pojo-stick')

const obj = await pojoStick('/some/save/path')

// when I change an value under `obj`, it will automatically save to the fileSystem
obj.data = { automaticallySaves: true }

// it also works with sub-properties too
obj.data.array = []
obj.data.array.push('I can push values!')
```
