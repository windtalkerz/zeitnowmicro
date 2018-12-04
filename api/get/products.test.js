
import test from "ava"      // https://github.com/avajs/ava
import http from 'ava-http' // https://www.npmjs.com/package/ava-http


const URL = `https://micro.supermario.io/api/get/products.lambda.js`

test(`GET ${URL}`, async t => {
    try {
        const json = await http.get(URL)
        t.true(typeof json === "object")

        const { products } = json
        t.true(typeof products === "object")
        t.true(products.length > 0)
        t.true(typeof products[0] === "object")

        const product = products[0]
        t.truthy(product.name)

    } catch (err) {
        console.log(err)
    }

})



