import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import laptopRoutes from './routes/laptop.routes.js'
import scrapLaptopsFromAmazon from './scrappers/amazon.scrapper.js';

mongoose.set('strictQuery', false)

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use(laptopRoutes)

async function start() {
    try {
        await mongoose.connect(process.env.url, {
            useNewUrlParser: true
        })
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
        await scrapLaptopsFromAmazon()
    } catch (error) {
        console.log(error)
    }
}

start()