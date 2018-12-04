
const micro = require('micro')
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || null

// #####################################################################################
// MONDODB -> MONGOOSE
// #####################################################################################
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


module.exports = async (req, res) => {


    characters.findOne({ name: "mario" }, (error, character) => {
        if (error) micro.sendError(req, res, error)
        micro.send(res, 200, character)
    })
}