import { Schema, model } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    characteristics: {
        type: String,
        required: true,
    },
})

export const laptops = model('laptops', schema)
