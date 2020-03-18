const Browser = require('zombie'), assert = require('chai').assert
let browser
suite('Межстраничные тесты', ()=>{
  setup(()=>{
    browser = new Browser()
  })
  test(`запрос расценок для групп со страницы туров по реке Худ \n должен заполнять поле реферера`, (done)=>{
    const referrer = 'http://localhost:3005/tours/hood-river'
      browser.visit(referrer, ()=>{
        browser.clickLink('.requestGroupRate', ()=>{
           assert(browser.field('referrer').value === referrer)
             done()
        })
      })
    })
  test(`запрос расценок для групп со страницы: \n  туров пансионата "Орегон Коуст" \n должен заполнять поле реферера`, (done)=>{
    const referrer = 'http://localhost:3005/tours/oregon-coast'
    browser.visit(referrer, ()=>{
      browser.clickLink('.requestGroupRate', ()=>{
         assert(browser.field('referrer').value === referrer)
          done()
      })
    })
  })
  test(`посещение страницы "Запрос цены для групп" напрямую \n должен приводить к пустому полю реферера`, (done)=>{
       browser.visit('http://localhost:3005/tours/request-group-rate', ()=>{
        assert(browser.field('referrer').value=== '')
         done()
       }) 
  })
})