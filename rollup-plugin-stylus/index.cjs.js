'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var stylus = _interopDefault(require('stylus'));

// 递归创建文件夹
function mkdirs(dir) {
    return new Promise(function (resolve, reject) {
        fs.exists(dir, function (exist) {
            if (exist) {
                resolve();
            } else {
                mkdirs(path.dirname(dir)).then(function () {
                    fs.mkdir(dir, function (err) {
                        if (err) {
                            reject();
                        } else {
                            resolve();
                        }
                    });
                });
            }
        });
    });
}

// 导出一个function
function stylusPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 创建一个文件过滤器，过滤以css，styl结尾的文件
    var stylusFilter = rollupPluginutils.createFilter(options.include || ['**/*.css', '**/*.styl'], options.exclude);

    // dest用来保存指定的输出路径
    var dest = options.output,

    // styleNodes用来暂存不同文件的css代码
    styleNodes = {};

    // 编译stylus文件
    function complier(str, stylusOpt) {
        return new Promise(function (resolve, reject) {
            stylus.render(str, stylusOpt, function (err, css) {
                if (err) {
                    reject(err);
                } else {
                    resolve(css);
                }
            });
        });
    }

    return {
        // 插件名称
        name: 'rollup-plugin-stylus',

        resolveId: function resolveId(importee, importer) {
            console.log(importee);
            console.log(importer);
        },


        // 解析import时调用，获取文件名称和具体代码，将它们保存起来
        transform: function transform(code, id) {
            if (!stylusFilter(id)) {
                return;
            }

            styleNodes[id] = code;
            return '';
        },

        // generate时调用，用stylus解析代码，并输出到指定目录中
        ongenerate: async function ongenerate(genOpt) {
            var css = '';
            for (var id in styleNodes) {
                // 合并所有css代码
                css += styleNodes[id] || '';
            }

            // 编译stylus代码
            if (css.length) {
                try {
                    css = await complier(css, Object.assign({}, options.stylusOpt));
                } catch (error) {
                    console.log(error);
                }
            }

            // 没有指定输出文件路径时，设置一个默认文件
            if (typeof dest !== 'string') {
                if (!css.length) {
                    return;
                }

                dest = genOpt.dest || 'bundle.js';
                if (dest.endsWith('.js')) {
                    dest = dest.slice(0, -3);
                }
                dest = dest + '.css';
            }

            // 创建目录，并将css写入到结果文件内
            await mkdirs(path.dirname(dest));
            return new Promise(function (resolve, reject) {
                fs.writeFile(dest, css, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    };
}

module.exports = stylusPlugin;
