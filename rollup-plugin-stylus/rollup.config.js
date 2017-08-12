import babel from 'rollup-plugin-babel'

export default {
    entry: './index.es.js',
    dest: './index.cjs.js',
    format: 'cjs',
    external: ['path','fs','stylus','rollup-pluginutils'],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}