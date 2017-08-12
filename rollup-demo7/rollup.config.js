import builtins from 'rollup-plugin-node-builtins'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    builtins()
  ]
}