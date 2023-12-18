import { Sequelize, Model, DataTypes } from "sequelize"

class Profile extends Model {}

const db = (sequelize = new Sequelize()) => {
  return Profile.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'profile',
    tableName: 'profile'
  })
}

export default {db}