
const
c = console.log,
fsp = require('fs').promises,
exec = command => new Promise(resolve =>
  require('child_process').exec(command, resolve)),
test = (title, finish, err) => [
  failMsg => !err && c("TEST: "+title) || c("FAIL: "+failMsg) || (err=1),
  ()=> !err && (c("TEST: "+title) || c("OK: "+finish))
],

allModules = async ()=> {
  const [ fail, ok ] = test('"npm run summon" command supposed to git clone all lapland submodules', "and it does!")
  let modules =
    'santa, home, api, apielf, seself, pasself, dataelf'.split(', ')


  await Promise.all(modules.map(m => fsp.rmdir(m, {recursive: true})))

  await exec("npm run summon")
  for (const m of modules.slice()) {
    try {
      if ((await fsp.stat(m)).isDirectory())
        modules = modules.filter(mod => m!=mod)
    } catch {}
  }
  modules.length?
    fail("but it doesn't clone these modules: "+modules.join(', ')) : ok()

},

noModules = async ()=> {
  const [ fail, ok ] = test('"npm run unsummon" command supposed to remove all lapland submodules', "and it does!")
  let modules =
    'santa, home, api, apielf, seself, pasself, dataelf'.split(', ')

  await exec("npm run unsummon")
  const left = []
  for (const m of modules) {
    try { if ((await fsp.stat(m)).isDirectory()) left.push(m) } catch {}
  }
  left.length?
    fail("but it didn't remove these modules: "+left.join(', ')) : ok()
}

(async ()=>{
  await allModules()
  await noModules()
})()

setTimeout(c, 36e6)
