export default {
  entry: 'index.js',
  format: 'amd',
  dest: './dist/dist.js',
  external: ['jquery'],
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'
  }
}