
const mongoose = require("mongoose")
const micro = require('micro') // https://github.com/zeit/micro-dev
//const query = require('micro-query') // https://www.npmjs.com/package/micro-query
const parseURL = require('url-parse') // https://github.com/unshiftio/url-parse
const { send, sendError, json } = micro



// LAMBDA: ROUTE

module.exports = async (req, res) => {


    const parse = async (req) => {
        const parse = true
        const url = parseURL(req.url, parse)
        // console.log(url)
        // { slashes: false,
        //     protocol: '',
        //     hash: '',
        //     query: { name: 'mario', age: '45' },
        //     pathname: '/_id5000/food',
        //     auth: '',
        //     host: '',
        //     port: '',
        //     hostname: '',
        //     password: '',
        //     username: '',
        //     origin: 'null',
        //     href: '/_id5000/food?name=mario&age=45' 
        // }
        return {
            headers: req.headers,
            query: url.query,
            body: await micro.json(req),
            url,
            params: `${url.pathname}`.split("/").filter(e => e !== "")
        }
    }



    // #####################################################################################
    // MONDODB -> MONGOOSE
    // #####################################################################################
    const DB_HOST = "ds123844.mlab.com"
    const DB_PORT = "23844"
    const DB_NAME = "supermario-fortress"
    const DB_USER = "supermario-fortress"
    const DB_PASSWORD = "123supermario-fortress"

    mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })

    const characters = mongoose.model('characters', new mongoose.Schema({
        name: String,
        color: String,
        skill: String,
    }))




    // if (tooManyRequests) {
    //     throw createError(429, 'Rate limit exceeded')
    // }

    const { headers, query, body, url, params } = await parse(req)
    // console.log({
    //     headers,
    //     query,
    //     body,
    //     url,
    //     params,
    // })

    const name = query.name

    characters.findOne({ name }, (error, character) => {
        if (error) sendError(req, res, error)
        send(res, 200, character)
    })

}

