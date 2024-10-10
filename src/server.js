import express from "express"
import configViewEngine from './configs/viewEngine'
import initWebRoutes from "./routes/web"
require("dotenv").config()
import bodyParser from 'body-parser'



const app = express()
const PORT = process.env.PORT || 8080;

// const fileUpload = require('express-fileupload')
// app.use(fileUpload());

//config view engine
configViewEngine(app)

//config body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(">>> Shub coding assessment is running on port = " + PORT)
})