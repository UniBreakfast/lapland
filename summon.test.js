
const
c = console.log,
fsp = require('fs').promises,
exec = require('child_process').exec,
test = (title, finish, err) => [
  failMsg => !err && c("TEST: "+title) || c("FAIL: "+failMsg) || (err=1),
  ()=> !err && (c("TEST: "+title) || c("OK: "+finish))
],

allModules = async ()=> {
  const [ fail, ok ] = test('"npm run summon" command supposed to git clone all lapland submodules', "and it does!")
  let modules =
    'santa, home, api, apielf, seself, pasself, dataelf'.split(', ')


  await Promise.all(modules.map(m => fsp.rmdir(m, {recursive: true})))

  exec("npm run summon", async ()=>{
    for (const m of modules.slice()) {
      try {
        if ((await fsp.stat(m)).isDirectory())
          modules = modules.filter(mod => m!=mod)
      } catch {}
    }
    modules.length?
      fail("but it doesn't clone these modules: "+modules.join(', ')) : ok()
  })
}

allModules()

setTimeout(c, 36e6)
