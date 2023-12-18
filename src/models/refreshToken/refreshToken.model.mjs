import { Sequelize, Model, DataTypes } from "sequelize"

class RefreshToken extends Model {}

const db = (sequelize = new Sequelize()) => {
    return RefreshToken.init({
        token : {
            type: DataTypes.STRING
        },
        expiryDate: {
            type: DataTypes.DATE
        },
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
    sequelize,
    modelName: 'refreshToken',
    tableName: 'token'
    })
}

export default {db}