const koa = require('koa')
const route = require('koa-path-match')({})
const { list, receive } = require('./sms.service')

const listRoute = route('/sms/list').get(list)

const receiveRoute = route('/sms/receive').post(receive)

/**
 * 注册路由到koa实例(由controller入口传进来)
 * @param {koa} instance
 */
module.exports = (instance) => {
  instance.use(listRoute)
  instance.use(receiveRoute)
}
