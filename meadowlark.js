const express = require('express')
const app = express()
app.set('port', process.env.PORT || 3005 )

app.get('/', (req, res)=>{
  res.type('text/plain')
  res.send('Meadowlark Travel')
})
app.get('/about', (req, res)=>{ 
  res.type('text/plain')
  res.send('О Meadowlark Travel') 
})

app.use((req, res)=>{
  res.type('text/plain') 
  res.status(404) 
  res.send('404 — Не найдено')
})

app.use((err, req, res, next)=>{
  console.error(err.stack) 
  res.type('text/plain') 
  res.status(500)
  res.send('500 — Ошибка сервера')
})
app.listen(app.get('port'), ()=>{
  console.log( `Server run on http://localhost: ${app.get('port')} GoodLuck.` )
})