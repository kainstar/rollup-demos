import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  sourceMap: true,
  plugins: [
    uglify()
  ]
}