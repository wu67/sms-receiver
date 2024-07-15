const Koa = require('koa')
const app = new Koa()

const { loadMiddleWare } = require('./src/middleware')
loadMiddleWare(app)

const { controllerRegister } = require('./src/controller')
controllerRegister(app)

app.listen(3001)
