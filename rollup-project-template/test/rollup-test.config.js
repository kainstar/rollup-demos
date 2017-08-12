/**
 * 测试相关的rollup配置文件
 */
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import path from 'path'

const testSrcDir = path.join(__dirname, './src')
const entry = path.join(__dirname, './src/test.js')
const dest = path.join(__dirname, './dist/test.js')

export default {
    entry: entry,
    format: 'cjs',
    dest: dest,
    external: ['power-assert'],
    plugins: [
        eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: testSrcDir + '/**'
        }),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}