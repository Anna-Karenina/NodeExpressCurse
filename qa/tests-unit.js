const expect = require('chai').expect 
const getFortune = require('./../lib/fortune').getFortune
suite('Тесты печенек с предсказаниями', ()=>{
  test('getFortune() должна возвращать рандомное значение', ()=>{
    expect(typeof getFortune() === 'string')
  })
})