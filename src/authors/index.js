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
        const author = fileAsJson.filter(req.param.id)
        res.sendStatus(200).send(author)
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

    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

//delete author
router.delete('/:id', async (req, res, next) => {
    try {

    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

export default router