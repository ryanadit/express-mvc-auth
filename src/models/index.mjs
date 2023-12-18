'use strict'
import dbConfig from "../config/db.config.mjs"
import Sequelize from "sequelize"
import profileModel from './profile/profile.model.mjs'
import refreshTokenModel from "./refreshToken/refreshToken.model.mjs"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const profiles = profileModel.db(sequelize)
const refreshToken = refreshTokenModel.db(sequelize)

refreshToken.belongsTo(profiles, {
  foreignKey: 'userId',
})

profiles.hasOne(refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id'
})

export default {Sequelize, sequelize, profiles, refreshToken}