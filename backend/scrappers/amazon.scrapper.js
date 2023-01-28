import axios from 'axios'
import * as cheerio from 'cheerio'
import { laptop } from "../models/laptop.model.js"

export default async function scrapLaptopsFromAmazon(fromEveryPage = false) {
    try {
        const response = await axios.get('https://www.amazon.com/Laptops/s?k=Laptops')
        const $ = await cheerio.load(response.data)
        let totalPages = $('.s-pagination-container').find('.s-pagination-disabled:eq(1)').text()
        if (!fromEveryPage) {
            totalPages = 10
        }
        for (let i = 1; i <= totalPages; i++) {
            const response = await axios.get(`https://www.amazon.com/Laptops/s?k=Laptops&page=${i}`)
            const $ = await cheerio.load(response.data)
            $('.s-asin').each(async (i, el) => {
                const id = $(el).attr('data-asin')
                const existing = await laptop.findOne({ id })
                if (!existing) {
                    const name = $(el).find('h2 span').text()
                    const price = $(el).find('.a-price-whole').text()
                    const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label')
                    const image = $(el).find('.s-image').attr('src')
                    const link = 'https://www.amazon.com' + $(el).find('.a-link-normal').attr('href')
                    laptop.create({
                        id: id,
                        name: name,
                        price: price,
                        rating: rating,
                        image: image,
                        link: link
                    })
                        .then((listing) => {
                            console.log(listing)
                        })
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}
