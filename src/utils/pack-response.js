/**
 * 包装返回的json结构
 */
function packSuccess(data, msg = 'success') {
  return {
    code: 200,
    message: msg,
    data,
  }
}

/**
 * 包装返回接口错误状态json结构
 * @param {Number} code
 * @param {String} msg
 * @returns
 */
function packError(msg = 'error', code = 404, data = {}) {
  return {
    code: code,
    message: msg,
    data,
  }
}

module.exports = {
  packError,
  packSuccess,
}
