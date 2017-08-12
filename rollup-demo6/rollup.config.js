import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './js/dist.js',
  external: ['jquery'],
  globals: {
    jquery: 'jQuery'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}