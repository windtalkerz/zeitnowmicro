const micro = require('micro')
const test = require('ava')
const axios = require("axios")



const url = "https://micro.supermario.io/api/get/characters.lambda.js?name=mario"

test(url, async t => {

    const mario = {
        "_id": "5c054977627966094cd725fe",
        "name": "mario",
        "color": "red",
        "skill": "jumpNrun"
    }

    const { character } = (await axios.get(url)).data
    t.deepEqual(character, mario)

})