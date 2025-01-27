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
      // 运营商号码就是5位的. 最离谱的是小红薯, 验证码来信人是3个字母
      fromPhone: JOI.string().min(3).max(30).required(),
      phone: JOI.string().min(7).max(30).required(),
      pwd: JOI.string().required(),
      content: JOI.string().min(4).max(512).required(),
    }).validateAsync(params, { allowUnknown: true })

    if (params.pwd !== require('../../../config').smsPassword) {
      ctx.state.code = 400
      ctx.message = 'pwd error'
      return
    }
    // 国内个人来信号码打个码. 其他的暂时不管.
    let fromPhone = params.fromPhone.split('')
    if (/^(\+?\d\d)?1[3-9]\d{9}/.test(params.fromPhone)) {
      for (let i = fromPhone.length - 8; i < fromPhone.length - 4; i++) {
        fromPhone[i] = '*'
      }
    }
    let content = params.content
    let list = require('../../../config').someWord
    if (list.length) {
      list.forEach((i) => {
        if (i.length) content = content.replace(i.trim(), '**')
      })
    }
    const row = {
      fromPhone: fromPhone.join(''),
      phone: params.phone,
      content: content,
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
