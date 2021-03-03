'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mentor.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      description: DataTypes.TEXT,
      linkedinURL: DataTypes.STRING,
      bookingURL: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      categories: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Mentor',
    }
  )
  return Mentor
}
