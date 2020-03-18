const express = require('express')
const app = express()
const fortune = require('./lib/fortune')
const getWeatherData = require('./lib/weaterData').getWeatherData
//120 страница
// _____Установка механизма представления handlebars
const handlebars = require('express-handlebars')
  .create({defaultLayout:'main',
  helpers:{
      section: (name, options)=>{
          if(!this._sections){this._sections = {}}
          this._sections[name] = options.fn(this)
          return null;
      }
    }
  }) 
  app.engine('handlebars', handlebars.engine)
  app.set('view engine', 'handlebars')
//_______


app.set('port', process.env.PORT || 3005 )
app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
  if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = getWeatherData()
    next()
})

app.use((req, res, next)=>{
  res.locals.showTests = app.get('env') !== 'production' &&
  req.query.test === '1' 
  next()
});

app.get('/', (req, res)=>{
  console.log(`_ip : ${req.ip}`)
  console.log(`_Hostname: ${req.hostname}`)
  console.log(`_reqpath: ${req.path}`)
  res.render('home')
})
app.get('/headers', function(req,res){ res.set('Content-Type','text/plain'); var s = '';
for(var name in req.headers)
s += name + ': ' + req.headers[name] + '\n'; res.send(s);
});
app.get('/about', (req, res)=>{ 
  res.render('about', {
      fortune: fortune.getFortune(), 
      pageTestScript: '/qa/tests-about.js'
  })
})
app.get('/tours/hood-river', (req, res)=>{ 
  res.render('tours/hood-river')
});
app.get('/tours/request-group-rate', (req, res)=>{
  res.render('tours/request-group-rate'); 
});
app.use((req, res)=>{
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next)=>{
  console.error(err.stack) 
  res.type('text/plain') 
  res.status(500)
  res.render('500')
})
app.listen(app.get('port'), ()=>{
  console.log( `Server run on http://localhost:${app.get('port')} GoodLuck.${app.get('env')}` )
})

