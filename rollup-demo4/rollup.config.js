import babel from 'rollup-plugin-babel'

export default [{
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      // 和.babelrc中的plugin任选一个
      // plugins: ['external-helpers']
    })
  ]
}]