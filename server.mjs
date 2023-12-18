import express from 'express'
import cors from 'cors'
import db from './src/models/index.mjs'
import routes from './src/routes/index.mjs'

const app = express()

var corsOptions = {
origin: "http://localhost:8081"
};

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({urlencoded : true}))

app.set('view engine','ejs')

db.sequelize.sync()

app.get("/", (_req, res) => {
    res.json({ message: 'My Node js app with docker' })
  })

routes.profileRoutes.routes(app)
routes.authRoutes.routes(app)

const PORT = process.env.NODE_DOCKER_PORT || 8081
app.listen(process.env.NODE_DOCKER_PORT, function () {
    console.log('Server listening at: ' + PORT)})
