export default [{
  entry: 'index.js',
  format: 'cjs',
  dest: './dist/dist.js',
  watch: {
    exclude: ['node_modules/**']
  }
}]