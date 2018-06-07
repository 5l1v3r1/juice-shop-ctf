const writeToZipFile = require('../writeToZipFile')
const writeToJsonFile = require('../writeToJsonFile')
const options = require('../options')

const createCTFdExport = require('./ctfd')
const createFBCTFExport = require('./fbctf')

async function generateCTFExport (ctfFramework, challenges, settings) {
  switch (ctfFramework) {
    case options.ctfdFramework:
      const ctfdData = await createCTFdExport(challenges, settings)
      const ctfdFile = await writeToZipFile(ctfdData, settings.outputLocation)

      console.log('Backup archive written to ' + ctfdFile)
      console.log()
      console.log('For a step-by-step guide to import the ZIP-archive into ' + 'CTFd'.bold + ', please refer to')
      console.log('https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part1/ctf.html#running-ctfd'.bold)
      break
    case options.fbctfFramework:
      const fbctfData = await createFBCTFExport(challenges, settings)
      const fbctfFile = await writeToJsonFile(fbctfData, settings.outputLocation)

      console.log('Full Game Export written to ' + fbctfFile)
      console.log()
      console.log('For a a step-by-step guide to import this file into ' + 'FBCTF'.bold + ', please refer to')
      console.log('https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part1/ctf.html#running-fbctf'.bold)
      console.log()
      console.log('TODO:'.cyan + ' Above documentation is work in progress!')
      console.log('Please refer to the official FBCTF documentation for now: ' + 'https://github.com/facebook/fbctf'.cyan)
      break
    default:
      throw new Error('Unknown CTF Framework of type: ' + ctfFramework)
  }
}

module.exports = generateCTFExport
