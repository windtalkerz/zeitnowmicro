
const mongoose = require("mongoose")
const micro = require('micro')
const { send } = micro


const SUPERMARIO_FORTRESS = "mongodb://supermario-fortress:123456@ds123844.mlab.com:23844/supermario-fortress"

module.exports = async (req, res) => {

    const body = await json(req)
    const name = body.name || 'Mario'

    mongoose.connect(SUPERMARIO_FORTRESS)

    const Character = mongoose.model('Character', { name: String })
    const char = new Character({ name })
    char
        .save()
        .then(() => send(res, 200, "safed char mario with mongoose"))
        .catch(error => send(res, 500, error))

}