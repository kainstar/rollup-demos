import eslint from 'rollup-plugin-eslint'

export default {
  entry: './src/index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    })
  ],
  banner: '/*eslint-disable */'
}