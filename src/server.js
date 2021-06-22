import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

const server = express()

PORT = 3001

server.use(cors())

server.use(express.json)

console.log(listEndpoints(server))

server.listen(PORT, () => console.log("server is running on port", PORT))

server.on("error", (error) => console.log("server is not running due to", error))