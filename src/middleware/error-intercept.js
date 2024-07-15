const { packError } = require('../utils/pack-response')

module.exports = function () {
  return async function (ctx, next) {
    try {
      await next()
    } catch (e) {
      // console.log('程序出错的会到这里', e.toString())
      // 把http状态码劫持成业务代码. 即http200, 但是返回body里面业务代码是其他的自定, 当然这里也混合了原http状态码
      if (e.status === 401) {
        ctx.body = packError('Login Request', e.status)
      } else if (e.name === 'SequelizeDatabaseError') {
        ctx.body = packError('SQL Error', 500, e)
      } else {
        ctx.body = packError('Internal Server Error', 500)
      }
      return false
    } finally {
      if (ctx.status != 200) {
        // console.log('没有正常返回的ctx.body的会执行到这里, 默认的status会是404')
        ctx.body = packError(ctx.message, ctx.state.code || ctx.status)
      }
    }
  }
}
