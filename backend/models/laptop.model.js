import { Schema, model } from 'mongoose'

const schema = new Schema({

    id: String,
    brand: String,
    name: String,
    price: String,
    rating: String,
    image: String,
    link: String
}, {
    timestamps: true
})

export const laptop = model('laptop', schema)
