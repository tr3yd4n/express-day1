import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import createError from "http-errors"

const router = express.Router()

const blogsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "blogs.json")

const getBlogsArray = () => {
    const content = fs.readFileSync(blogsJsonPath)
    return JSON.parse(content)
}

router.get("/", async (req, res, next) => {
    try {
        const blogs = getBlogsArray()
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})

export default router