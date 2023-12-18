import express from 'express'
import routesHelper from '../../utils/helpers/routes.helper.mjs'
import controllers from '../../controllers/index.mjs'
import middleware from '../../middleware/index.mjs'

const routes = function (app = express()) {
    var router = express.Router()

    router.post(routesHelper.loginNameRoute, controllers.authController.login)
    router.post(routesHelper.logoutNameRoute, middleware.authMiddleware.validateToken, controllers.authController.logout)
    router.post(routesHelper.refreshTokenNameRoute, controllers.authController.refreshToken)

    app.use(routesHelper.apiRoute, router)
}

export default {routes}