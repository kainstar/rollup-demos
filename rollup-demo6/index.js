import compact from 'lodash/compact'

import $ from 'jquery'

const array = [0, 1, false, 2, '', 3]
const compctedArray = compact(array)
console.log(compctedArray)

$('#p').html('rollup打包，将jquery当成外部引入模块')