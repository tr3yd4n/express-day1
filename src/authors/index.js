import express from "express"
import fs from "fs"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import uniqid from "uniqid"

const fileName = fileURLToPath(import.meta.url)
const directoryName = dirname(fileName)
const authorsFilePath = path.join(directoryName, "authors.json")
const router = express.Router()

//get all authors
router.get('/', async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)
        res.send(fileAsJson)
        console.log(fileAsJson)
    } catch (error) {
        res.sendStatus(500).send({ message: error.message })
    }
})

//get single author
router.get('/:id', async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)
        const author = fileAsJson.find(author => author.id === req.params.id)
        if (!author) {
            res.sendStatus(404).send({ message: "Author with ${req.params.id} not found!" })
        }
        res.send(author)
    } catch (error) {
        res.sendStatus(500).send({ message: error.message })
    }
})

//create author
router.post('/', async (req, res, next) => {
    try {
        const { forname, surname, email, dateOfBirth } = req.body
        const author = {
            id: uniqid(),
            forname,
            surname,
            email,
            dateOfBirth,
            avatar: 'https://ui-avatars.com/api/?name=${forname}+${surname}',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)
        fileAsJson.push(author)
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJson))
        res.send(author)

    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

//ammend author
router.put('/:id', async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJson = JSON.parse(fileAsString)
        const authorIndex = fileAsJson.findIndex(author => author.id === req.params.id)
        if (!authorIndex == -1) {
            res.sendStatus(404).send({ message: "Author with ${req.params.id} not found!" })
        }
        const previousAuthorData = fileAsJson[authorIndex]
        const changedAuthor = { ...previousAuthorData, ...req.body, updatedAt: new Date(), id: req.params.id }
        fileAsJson[authorIndex] = changedAuthor
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJson))
        res.send(changedAuthor)
    } catch (error) {
        res.sendStatus(500).send({ message: error.message })
    }
})

//delete author
router.delete('/:id', async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(authorsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJson = JSON.parse(fileAsString)
        const author = fileAsJson.find(author => author.id === req.params.id)
        if (!author) {
            res.sendStatus(404).send({ message: "Author with ${req.params.id} not found!" })
        }
        fileAsJson = fileAsJson.filter((author) => author.id !== req.params.id)
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJson))
        res.sendStatus(204).send({ message: "Deleted" })
    } catch (error) {
        res.sendStatus(500).send({ message: error.message })
    }
})

export default router