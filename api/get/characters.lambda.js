const micro = require("micro")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const query = require("micro-query")

dotenv.config()
const PORT = process.env.PORT || null

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })

const characters = mongoose.model('characters', new mongoose.Schema({
    name: String,
    color: String,
    skill: String,
}))


// WORKING! -> https://micro.supermario.io/api/get/characters.lambda.js
module.exports = async (req, res) => {

    const name = query(req).name
    //const body = await micro.json(req)

    characters.findOne({ "name": name }, (error, character) => {
        if (error) micro.sendError(req, res, error)

        const result = { name: character.name || "character.name", superpowers: "fireball" }

        micro.send(res, 200, result)
    })
}

