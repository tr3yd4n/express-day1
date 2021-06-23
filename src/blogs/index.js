import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import createError from "http-errors"
import { validationResult } from "express-validator"
import { loggerMiddleware } from "./middlewares.js"
import { usersValidation } from "./validation.js"
import { nextTick } from "process"

const blogsRouter = express.Router()

const blogsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "blogs.json")

const getBlogsArray = () => {
    fs.readFileSync(blogsJsonPath)
    return JSON.parse(content)
}

blogsRouter.get("/", (req, res, next) => {
    try {
        const blogs = getBlogsArray
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})