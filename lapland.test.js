
const
c = console.log,
test = (title, finish, err) => [
  failMsg => !err && c("TEST: "+title) || c("FAIL: "+failMsg) || (err=1),
  ()=> !err && (c("TEST: "+title) || c("OK: "+finish))
],

moduleSpec = async ()=> {
  const [ fail, ok ] = test("lapland module supposed to be exporting an object with one method - an async function .wish(details)", "and it does!")

  const lapland = require('./lapland')

  if (typeof lapland != 'object')
    fail("lapland.js doesn't export an object")

  if (Object.keys(lapland).length != 1)
    fail("lapland object expected to have exactly one property")

  if (!lapland.wish || typeof lapland.wish != 'function')
    fail("there's no .wish(details) method")
  else {
    if (lapland.wish.length != 1)
      fail("the .wish() method supposed to expect one argument")

    if (!(lapland.wish({}) instanceof Promise))
      fail(".wish(details) is not an async function")
  }
  ok()
}

moduleSpec()