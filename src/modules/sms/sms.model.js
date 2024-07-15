const { DataTypes, Model } = require('sequelize')
const { baseOption } = require('../../db')

class SMS extends Model {}

SMS.init(
  {
    phone: DataTypes.STRING,
    content: DataTypes.STRING,
    receiveTime: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      primaryKey: true,
      type: DataTypes.DATE,
    },
  },
  Object.assign({}, baseOption, { modelName: 'message' })
)

module.exports = {
  SMS,
}
