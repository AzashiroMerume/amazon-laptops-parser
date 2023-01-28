import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import laptopRoutes from './models/laptops_model'

mongoose.set('strictQuery', false)

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use(laptopRoutes)

async function start() {
    try {
        await mongoose.connect(process.env.url, {
            useNewUrlParser: true
        })
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    } catch (error) {
        console.log(error)
    }
}

start()