// 单打包项配置
// export default {
//   entry: 'index.js',
//   format: 'cjs',
//   dest: './dist/dist.js'
// }

// 多打包项配置
// export default [{
//   entry: 'index.js',
//   format: 'cjs',
//   dest: './dist/distA.js'
// },{
//   entry: 'indexB.js',
//   format: 'iife',
//   moduleName: 'indexB',
//   dest: './dist/distB.js'
// }]

// target属性
export default {
  entry: 'index.js',
  targets: [{
      dest: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/bundle.umd.js',
      moduleName: 'res',
      format: 'umd'
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es'
    },
  ]
}