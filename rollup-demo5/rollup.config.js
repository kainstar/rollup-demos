import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default [{
  entry: 'index_cjs.js',
  format: 'iife',
  dest: './js/dist_cjs.js',
  plugins: [
    commonjs()
  ]
},{
  entry: 'index_module.js',
  format: 'iife',
  dest: './js/dist_module.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}]