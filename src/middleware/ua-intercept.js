module.exports = function () {
  return async (ctx, next) => {
    if (
      // chrome发起的请求无法更改user-agent. 只能新定一个属性用来检验.
      ![ctx.header['ua'], ctx.header['user-agent']].includes(
        require('../../config').ua
      )
    ) {
      ctx.status = 404
    } else {
      await next()
    }
  }
}
