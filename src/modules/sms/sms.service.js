const { packSuccess } = require('../../utils/pack-response')
const { SMS } = require('./sms.model')
const JOI = require('joi')

const list = async (ctx) => {
  const params = ctx.request.query
  // console.log(ctx.request.query)
  const option = {
    raw: true,
    limit: 1,
    order: [['receive_time', 'DESC']],
  }
  if (params.limit && params.limit > 0) {
    option.limit = params.limit >= 100 ? 100 : params.limit
  }
  const result = await SMS.findAll(option)
  ctx.body = packSuccess(result)
}

const receive = async (ctx) => {
  const params = ctx.request.body
  try {
    await JOI.object({
      // 最小5位. 运营商号码就是5位的
      fromPhone: JOI.string().min(5).max(30).required(),
      phone: JOI.string().min(7).max(20).required(),
      pwd: JOI.string().required(),
      content: JOI.string().min(4).max(512).required(),
    }).validateAsync(params, { allowUnknown: true })

    if (params.pwd !== require('../../../config').smsPassword) {
      ctx.state.code = 400
      ctx.message = 'pwd error'
      return
    }

    const row = {
      fromPhone: params.fromPhone,
      phone: params.phone,
      content: params.content,
      receiveTime: new Date(),
    }

    await SMS.create(row)
    ctx.body = packSuccess('ok')
  } catch (e) {
    console.error(e)
    ctx.state.code = 400
    ctx.message = e.message || e.toString()
  }
}

module.exports = {
  list,
  receive,
}
