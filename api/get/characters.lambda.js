const micro = require("micro")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const query = require("micro-query")

dotenv.config()
const PORT = process.env.PORT || null

const DB_HOST = process.env.DB_HOST //"ds123844.mlab.com"
const DB_PORT = process.env.DB_PORT //"23844"
const DB_NAME = process.env.DB_NAME //"supermario-fortress"
const DB_USER = process.env.DB_USER //"supermario-fortress"
const DB_PASSWORD = process.env.DB_PASSWORD //"123supermario-fortress"

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
        micro.send(res, 200, { character })
    })
}

