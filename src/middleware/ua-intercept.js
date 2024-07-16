module.exports = function () {
  return async (ctx, next) => {
    if (ctx.header['user-agent'] !== require('../../config').ua) {
      ctx.status = 404
    } else {
      await next()
    }
  }
}
