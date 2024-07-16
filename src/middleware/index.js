const koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const responseTime = require('koa-response-time')
const uaIntercept = require('./ua-intercept')
const errorIntercept = require('./error-intercept')

/**
 * 加载koa中间件
 * @param { koa } instance
 * @returns
 */
async function loadMiddleWare(instance) {
  instance.use(responseTime())

  // https://github.com/koajs/cors#corsoptions
  instance.use(
    cors({
      origin: '*',
    })
  )

  instance.use(koaBody())
  instance.use(errorIntercept())
  instance.use(uaIntercept())

  return instance
}

module.exports = {
  loadMiddleWare,
}
