import foo from './lib'

var EXAMPLES = {
    string: 'string',
    number: 1,
    boolean: true
}

for (var type in EXAMPLES) {
    var element = EXAMPLES[type];        
    foo(element)
}

if (DEVELOPMENT) {
    console.log('处于开发环境')
} else {
    console.log('处于生产环境')
}

var version = '{{VERSION}}'
console.log('版本 v' + version)