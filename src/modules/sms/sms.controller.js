const Route = require('@koa/router')
const smsRoute = new Route()
const { list, receive } = require('./sms.service')

smsRoute.get('/list', list)

smsRoute.post('/receive', receive)

module.exports = smsRoute
