import { Router } from "express"
import mongoose from "mongoose"
import { laptop } from "../models/laptop.model.js"

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: "Hello" });
})

export default router