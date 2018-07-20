// app-server.js
import express from 'express'
import http_module from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from './config/config'
import cors from 'cors'
const app = express()
app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json())
app.use(compression())
// app.engine('html', hogan)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))
app.set('trust proxy', 1) // trust first proxy

app.use((req, res, next) => {
  if (req.url === '/favicon.ico')
    return res.end()
  // Set global variables
  res.locals.year = new Date().getFullYear()
  // Set dev
  if (process.env.NODE_ENV === 'development')
    res.locals.is_dev = true
  else
    res.locals.is_dev = false
  next()
})
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
require('./routes')(app, config, partials)
const http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})