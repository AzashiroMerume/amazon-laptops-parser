import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cheerio from 'cheerio'
import laptopRoutes from './routes/laptop.routes.js'

mongoose.set('strictQuery', false)

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use(laptopRoutes)

axios.get('https://www.amazon.com/b?node=13896615011&ref=lp_565108_nr_n_1')
    .then(response => {
        const $ = cheerio.load(response.data);
        // Extract data from website using cheerio selectors
        const data = {
            title: $('title').text(),
            h1: $('h1').text()
        };
        console.log(data);
    })
    .catch(console.error);

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