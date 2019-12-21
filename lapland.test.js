
const
c = console.log,

moduleSpec = async ()=> {
  c("lapland module supposed to be exporting an object with one method - an async function .wish(details)")

  const lapland = require('./lapland')
  if (typeof lapland != 'object')
    c("lapland.js doesn't export an object")
  else if (Object.keys(lapland).length != 1)
    c("lapland object expected to have exactly one property")
  else if (!lapland.wish || typeof lapland.wish != 'function')
    c("there's no .wish(details) method")
  else if (lapland.wish.length != 1)
    c("the .wish() method supposed to expect one argument")
  else if (!(lapland.wish({}) instanceof Promise))
    c(".wish(details) is not an async function")
  else c("and it does!")
}

moduleSpec()