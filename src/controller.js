const koa = require('koa')
const router = new require('@koa/router')()
const sms = require('./modules/sms/sms.controller')
/**
 * 注册 控制器/路由
 * @param {koa} instance
 */
function controllerRegister(instance) {
  router.get('/hello', async (ctx) => {
    ctx.body = 'success'
  })


  router.use('/sms', sms.routes())

  instance.use(router.routes())
  // .use(router.allowedMethods())
}

module.exports = {
  controllerRegister,
}
