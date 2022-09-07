# white-matter

white-matter is an alternative library to [`gray-matter`](https://github.com/jonschlinkert/gray-matter), that includes minimal functionality.

If a yaml syntax error occurs in the `js-yaml` used internally, this returns an empty yaml object.

## Install

```
npm install white-matter
```

## Usage

The basic usage is the same as for `gray-matter`, but no advanced options exist now.

```js
const matter = require('white-matter');

console.log(matter('---\ntitle: Front Matter\n---\nThis is content.'));

// -> { content: 'This is content.', data: { title: 'Front Matter' } }
```