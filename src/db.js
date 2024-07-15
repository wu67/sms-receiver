const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/wu67/Projects/sms/sms.db',
})

const baseOption = {
  sequelize: sequelize, // sequelize 实例
  // 冻结表名, 即上面定义的modelName, 否则会按sequelize的内部逻辑自己整出一个表名...
  freezeTableName: true,
  // 数据字段名 下划线转小驼峰
  underscored: true,
  // 每张表默认都有这两字段, 可以禁用掉.
  createdAt: false,
  updatedAt: false,
}

module.exports = {
  sequelize,
  baseOption,
}
