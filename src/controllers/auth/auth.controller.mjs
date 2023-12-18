import models from '../../models/index.mjs'
import express from 'express'
import bcrypt from 'bcrypt'
import middleware from '../../middleware/index.mjs'

const profileDb = models.profiles
const tokenDb = models.refreshToken
const authMiddleware = middleware.authMiddleware

const login = async (req = express.request, res = express.response) => {
    try {
        const {email, password} = req.body
        if (!password && !email) {
            res.status(400).send({
                message : 'email & password not be empty'
            })
            return
        }

        const user = await profileDb.findOne({
            where: {
                email : email
            },
        })

        if (user && (await bcrypt.compare(password , user.password))) {
            let token = authMiddleware.generateToken(user.user_id, user.email)
            let refreshToken = await authMiddleware.createToken(user.user_id)
            
            res.status(200).send({
                message : 'Success login',
                accessToken: token,
                refreshToken: refreshToken
            })
            return
        } else {
            res.status(401).send({
                message: 'Wrong password or email!',
            })
            return
        }
    } catch (error) {
        res.status(401).send({
            error : error
        })
    }
}

const logout = async (req = express.request, res = express.response) => {
    try {
        const { refreshToken: requestToken } = req.body
        if (requestToken == null) {
            return res.status(403).json({ message: 'Refresh Token is required!' })
        }
        let refreshToken = await tokenDb.findOne({ 
            where : {
                token: requestToken
            }
        })
        if (refreshToken) {
            await tokenDb.destroy({ where: { id: refreshToken.id } })
            res.status(200).send({
                message : 'Success Logout'
            })
            return
        }
        
    } catch (error) {
        res.status(401).send({
            error : error
        })
    }
}

const refreshToken = async (req = express.request, res = express.response) => {
    try {
        const { refreshToken: requestToken } = req.body
        if (requestToken == null) {
            return res.status(403).json({ message: 'Refresh Token is required!' })
        }

        let refreshToken = await tokenDb.findOne({ 
            where : {
                token: requestToken
            }
        })

        if (!refreshToken) {
            res.status(403).json({ message: 'Refresh token is not in database!' })
            return
        }

        if (authMiddleware.verifyExpiration(refreshToken)) {
            await tokenDb.destroy({where: {id: refreshToken.id}})
            res.status(403).json({
                message: 'Refresh token was expired. Please make a new signin request',
            })
            return
        }

        const user = await profileDb.findOne({
            where: {
                user_id : refreshToken.userId
            }
        })
        if (user) {
            let newAccessToken = authMiddleware.generateToken(user.user_id, user.email)
            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token,
            })
        } else {
            res.status(401).send({
                message: 'User not found'
            })
        }

    } catch (error) {
        res.status(401).send({
            error : error
        })
    }
}

export default {login, logout, refreshToken} 