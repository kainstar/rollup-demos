import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
    // eslint检查
    eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/js/**'],
        exclude: ['node_modules/**']
    }),
    // 替换源文件内容
    replace({
        delimiters: ['{{', '}}'],
        DEVELOPMENT: process.env.NODE_ENV,
        VERSION: pkg.version
    }),
    // 解决第三方模块依赖
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    // commonjs转es6模块
    commonjs(),
    // 解析babel语法
    babel({
        exclude: 'node_modules/**'
    })
]
const devPlugins = []
const prodPlugins = [
    // 压缩文件
    uglify()
]

let plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins)

const entryFile = './src/index.js'
const destFile = isProd ? './dist/dist.min.js' : './dist/dist.js'

export default {
    entry: entryFile,
    format: 'umd',
    dest: destFile,
    moduleName: pkg.name,
    sourceMap: isProd,
    plugins: plugins
}