
import test from "ava"      // https://github.com/avajs/ava


test('failing test', t => {
    t.fail("this shall fail")
})

test('passing test', t => {
    t.pass("this shall pass")
})