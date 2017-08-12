import scss from 'rollup-plugin-scss'

export default {
  entry: './src/js/index.js',
  format: 'iife',
  dest: './dist/js/dist.js',
  sourceMap: true,
  plugins: [
    scss({
      output: './dist/css/style.css'
    })
  ]
}