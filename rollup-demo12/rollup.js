const rollup = require('rollup').rollup

rollup({
    entry: 'index.js'
}).then(bundle => {

    // 保存所有Promise的列表
    let writePromiseList = []
    // 声明所有需要打包的模块类型
    let moduleTypesList = ['es','cjs','amd','umd','iife']

    moduleTypesList.forEach(function(moduleType) {
        writePromiseList.push(bundle.write({
            dest: './dist/dist.' + moduleType + '.js',
            format: moduleType,
            sourceMap: true
        }))
    })

    return Promise.all(writePromiseList)

}).then(() => {
    console.log('全部模块格式打包完毕')
    // 其他代码
})