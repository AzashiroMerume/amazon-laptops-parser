import { Router } from "express"
import mongoose from "mongoose"
import { Cheerio } from 'cheerio'
import LaptopModel from "../models/laptops_model"

const router = Router()

router.get('/', (req, res) => {
    console.log('Hello')
    res.json({ message: "ok" });
})