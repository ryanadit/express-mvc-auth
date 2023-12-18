import models from '../../models/index.mjs'
import express from 'express'
import middleware from '../../middleware/index.mjs'

const profileDb = models.profiles
const registerMiddleware = middleware.registerMiddleware

const lengthId = 12
const lengthEncryptPassword = 10

const register = async (req = express.request, res = express.response) => {
    try {
        const {email, password, city, name, gender} = req.body
        if (!password && !email) {
            res.status(400).send({
                message : 'email & password not be empty'
            })
            return
        }
    
        const pass = await registerMiddleware.encryptPassword(password, lengthEncryptPassword)
        const profile = {
            name: name,
            email: email,
            password: pass,
            user_id: registerMiddleware.getId(lengthId),
            city: city,
            gender: gender,
        }

        const user = await profileDb.findOne({ 
            where : { 
                email : email 
            },
            attributes : {
                exclude: ['password']
            }
        })

        if (!user) {
            profileDb.create(profile)
            .then( () => {
                res.status(200).send({
                    success: true,
                    message: 'Success Register'
                })
                return
            })
            .catch(err => {
                res.status(500).send({
                    message: 'error register '+err
                })
                return
            })
        } else {
            res.status(500).send({
                message : 'Email has taken'
            })
            return
        }
    
        
    } catch (error) {
        return res.status(401).send({
            error : error
        })
    }

}

const detail = async (req = express.request, res = express.response) => {
    try {
        const id = req.user_id
        const user = await profileDb.findOne({
            where: {
                user_id : id
            },
            attributes : {
                exclude: ['password']
            }
        })
        if (user) {
            res.status(200).send({
                data : user
            })
            return
        } else {
            res.status(404).send({
                message : 'User not found'
            })
            return
        }
    } catch (error) {
        res.status(401).send({
            error : error
        })
    }
}

export default {register, detail}