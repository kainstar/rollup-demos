/**
 * 你的源代码，也是rollup打包的入口文件
 */
import { funA } from './lib'

function runFunA() {
    console.log(`function funA return ${funA()}`)
}

let development = '{{DEVELOPMENT}}' === 'development'
if (development) {
    console.log('开发模式')
} else {
    console.log('打包模式')
}

export default {
    version: '{{VERSION}}',
    runFunA: runFunA
}