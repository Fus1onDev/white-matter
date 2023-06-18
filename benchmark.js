const { Suite } = require('benchmark')
const grayMatter = require('gray-matter')
const whiteMatter = require('./dist').default

const suite = new Suite()

const markdown = '---\nfoo: bar\nbaz: qux\n---\n# Hello World\n\nThis is a test.'

console.log('Examples:')
console.log('gray-matter:', grayMatter(markdown))
console.log('white-matter:', whiteMatter(markdown))

suite
  .add('gray-matter', () => {
    grayMatter(markdown)
  })
  .add('white-matter', () => {
    whiteMatter(markdown)
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true })
