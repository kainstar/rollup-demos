import stylus from '../index.es.js'

export default {
  entry: __dirname + '/test.entry.js',
  dest:  __dirname + '/test.dist.js',
  format: 'iife',
  moduleName: 'style',
  plugins: [
    stylus({
        output: __dirname + '/dist.css'
    })
  ]
}