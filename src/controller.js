const koa = require('koa')
const route = require('koa-path-match')({})
const smsRegister = require('./modules/sms/sms.controller')

/**
 * 注册 控制器/路由
 * @param {koa} instance
 */
function controllerRegister(instance) {
  smsRegister(instance)

  instance.use(route('*', async (ctx) => (ctx.body = 'hello')))
}

module.exports = {
  controllerRegister,
}
