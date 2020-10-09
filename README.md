# pojo-stick
:paperclip: Sync a plain-old-javascript-object (POJO) with a local json file - in 1 line of code!

_This project is a work in progress. API is subject to change. Issues, Enhancement Ideas, and Pull Requests are very welcome._

## Usage

Install with npm:

```
npm install --save pojo-stick
```

Simply require and instantiate. That's it.

```js
const pojoStick = require('pojo-stick')

const obj = await pojoStick('/some/save/path')


// EXAMPLE:
// when I change an value under `obj`, it will automatically save to the fileSystem
obj.data = { automaticallySaves: true }

// it also works with sub-properties too
obj.data.array = []
obj.data.array.push('I can push values!')
```

Or more concisely:

```js
const data = await require('pojo-stick')('/path/to/save/data')
```

Next time you run your program, the object returned from `pojoStick` will retain whatever state it was in from the previous run. So you can get on with your program - not stress about making sure your data gets saved.
