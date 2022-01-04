const path = require(`path`)
const express = require(`express`)
const cloudinary = require(`cloudinary`).v2
const cors = require(`cors`)
const passport = require(`passport`)
const cookieSession = require(`cookie-session`)
const cookieParser = require(`cookie-parser`)
const connectDB = require(`./connection/connection`)
const dotenv = require(`dotenv`)
const googleRouter = require(`./auth/googleAuth`)
const authAPI_Router = require(`./auth/authAPI`)
const productsRoute = require(`./routes/productsRoute`)
const usersCartRoute = require(`./routes/usersCartRoute`)
dotenv.config({ path: `./config.env` })
const app = express()

app.use(cors())

require('./auth/passport')

//parse incoming bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, `public`)))
app.use(cookieParser())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

//connectDB
connectDB()

app.use(
  cookieSession({
    maxAge: 90 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(`/auth/google`, googleRouter)
app.use(`/api/user/cart`, usersCartRoute)
app.use(`/api/products`, productsRoute)
app.use(`/api`, authAPI_Router)

const PORT = process.env.PORT || 7000
app.listen(PORT, console.log(`server listening on http://localhost:${PORT}`))
