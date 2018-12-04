const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
app.use(express.json())

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


// zeit:now: LAMBDA: funktioniert nur wenn die url "*" ist
app.get('*', (req, res) => {
    const name = `${req.query.name}` || "req.query.name"

    characters.findOne({ "name": name }, (err, character) => {
        if (err) res.send(err)
        res.send({
            character
        })
    })
})

app.listen(PORT)

// app.get('*', (req, res) => {
//     const name = req.query.name || "req.query.name"
//     res.send(`GET req.query.name: ${name}`);
// })
// app.listen()





// app.get('/:name', (req, res) => {
//     const name = req.params.name || "req.params.name"
//     res.send(`GET req.params.name: ${name}`);
// })
// app.get('/', (req, res) => {
//     const name = req.query.name || "req.query.name"
//     res.send(`GET req.query.name: ${name}`);
// })
// app.post('/', (req, res) => {
//     const name = req.body.name || "req.body.name"
//     res.send(`POST req.body.name: ${name}`);
// })
// app.patch('/:name', (req, res) => {
//     const name = req.params.name || "req.params.name"
//     res.send(`PATCH req.params.name: ${name}`);
// })
// app.delete('/:name', (req, res) => {
//     const name = req.params.name || "req.params.name"
//     res.send(`DELETE req.params.name: ${name}`);
// })









// app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))

