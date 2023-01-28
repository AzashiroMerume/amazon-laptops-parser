import { Router } from "express"
import mongoose from "mongoose"
import { laptop } from "../models/laptop.model.js"

const router = Router()

router.get('/', (req, res) => {
    laptop.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error ' + err))
})

export default router