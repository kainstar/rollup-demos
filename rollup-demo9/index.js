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