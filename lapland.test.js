
const
c = console.log,
test = title => [failMsg => c("TEST: "+title) || c("FAIL: "+failMsg),
                   okMsg => c("TEST: "+title) || c("OK: "+okMsg)]

moduleSpec = async ()=> {
  const [ fail, ok ] = test("lapland module supposed to be exporting an object with one method - an async function .wish(details)")

  const lapland = require('./lapland')
  if (typeof lapland != 'object')
    fail("lapland.js doesn't export an object")
  else if (Object.keys(lapland).length != 1)
    fail("lapland object expected to have exactly one property")
  else if (!lapland.wish || typeof lapland.wish != 'function')
    fail("there's no .wish(details) method")
  else if (lapland.wish.length != 1)
    fail("the .wish() method supposed to expect one argument")
  else if (!(lapland.wish({}) instanceof Promise))
    fail(".wish(details) is not an async function")
  else ok("and it does!")
}

moduleSpec()