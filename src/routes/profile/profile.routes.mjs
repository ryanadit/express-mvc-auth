import controllers from '../../controllers/index.mjs'
import express from 'express'
import routesHelper from '../../utils/helpers/routes.helper.mjs'
import middleware from '../../middleware/index.mjs'

const routes =  function (app = express()) {
    var router = express.Router()

    router.post(routesHelper.registerNameRoute, controllers.profileController.register)
    router.post(routesHelper.detailProfileNameRoute, middleware.authMiddleware.validateToken, controllers.profileController.detail)

    app.use(routesHelper.apiRoute, router)
}

export default {routes}