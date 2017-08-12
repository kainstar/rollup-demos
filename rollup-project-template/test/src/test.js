/**
 * 这是测试的入口文件，你的测试代码可以写在这个文件或是这个文件引用的文件中
 */
import assert from 'power-assert'
import { funA, funB } from '../../src/lib'

describe('lib.js funciton test', function () {
    it('funA test', function () {
        assert(funA() === 'A')
    })

    it('funB test', function () {
        assert(funB() === 'B')
    })
})