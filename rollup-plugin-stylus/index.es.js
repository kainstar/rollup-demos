import { createFilter } from 'rollup-pluginutils'
import fs from 'fs'
import path from 'path'
import stylus from 'stylus'

// 递归创建文件夹
function mkdirs(dir) {
    return new Promise((resolve, reject) => {
        fs.exists(dir, (exist) => {
            if (exist) {
                resolve()
            } else {
                mkdirs(path.dirname(dir)).then(() => {
                    fs.mkdir(dir, (err) => {
                        if (err) {
                            reject()
                        } else {
                            resolve()
                        }
                    })
                })
            }
        })
    })
}

// 导出一个function
export default function stylusPlugin(options = {}) {
    // 创建一个文件过滤器，过滤以css，styl结尾的文件
    const stylusFilter = createFilter(options.include || ['**/*.css', '**/*.styl'], options.exclude)

    // dest用来保存指定的输出路径
    let dest = options.output,
    // styleNodes用来暂存不同文件的css代码
        styleNodes = {}

    // 编译stylus文件
    function complier(str, stylusOpt) {
        return new Promise((resolve, reject) => {
            stylus.render(str, stylusOpt, (err, css) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(css)
                }
            })
        })
    }

    return {
        // 插件名称
        name: 'rollup-plugin-stylus',
        
        // 解析import时调用，获取文件名称和具体代码，将它们保存起来
        transform (code, id) {
            if (!stylusFilter(id)) {
                return
            }

            styleNodes[id] = code
            return ''
        },
        // generate时调用，用stylus解析代码，并输出到指定目录中
        async ongenerate (genOpt) {
            let css = ''
            for (let id in styleNodes) {
                // 合并所有css代码
                css += styleNodes[id] || ''
            }

            // 编译stylus代码
            if (css.length) {
                try {
                    css = await complier(css, Object.assign({}, options.stylusOpt))
                } catch (error) {
                    console.log(error)
                }
            }

            // 没有指定输出文件路径时，设置一个默认文件
            if (typeof dest !== 'string') {
                if (!css.length) {
                    return
                }

                dest = genOpt.dest || 'bundle.js'
                if (dest.endsWith('.js')) {
                    dest = dest.slice(0, -3)
                }
                dest = dest + '.css'
            }

            // 创建目录，并将css写入到结果文件内
            await mkdirs(path.dirname(dest))
            return new Promise((resolve, reject) => {
                fs.writeFile(dest, css, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
        }
    }
}