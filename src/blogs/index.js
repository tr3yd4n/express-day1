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
const writeBlogs = content => fs.writeFileSync(blogsJsonPath, JSON.stringify(content))

router.get("/", async (req, res, next) => {
    try {
        const blogs = getBlogsArray()
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const blogs = getBlogsArray()
        const blog = blogs.find(blog => blog.id === req.params.id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const newBlog = { ...req.body, id: uniqid(), createdAt: new Date() }
        const blogs = getBlogsArray()
        blogs.push(newBlog)
        writeBlogs(blogs)
        res.status(201).send(newBlog)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const blogs = getBlogsArray()
        const remainingBlogs = blogs.filter(blog => blog.id !== req.params.id)
        const updatedBlog = { ...req.body, id: req.params.id }
        remainingBlogs.push(updatedBlog)
        writeBlogs(remainingBlogs)
        res.send(updatedBlog)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const blogs = getBlogsArray()
        const remainingBlogs = blogs.filter(blog => blog.id !== req.params.id)
        writeBlogs(remainingBlogs)
        res.status(200).send("deleted!")

    } catch (error) {
        next(error)
    }
})
export default router