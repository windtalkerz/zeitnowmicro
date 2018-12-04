
const micro = require('micro')
const { send, json } = micro

module.exports = async (req, res) => {

    // parse body
    const body = await json(req)
    console.log(body)

    send(res, 200, { "success": true })
}