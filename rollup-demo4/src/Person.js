export default class Person {
    constructor (name, gender = '男') {
        this.name = name
        this.gender = gender
    }

    say () {
        console.log(`我的名字是${this.name}，是一个${this.gender}生`)
    }
}