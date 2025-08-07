const log = console.log.bind(console)
const fs = require('fs')
const path = require('path')

const fixture = file => path.resolve(__dirname, 'fixtures', file)

const Mimetics = require('../lib/mimetics')

async function test() {
  const mm = new Mimetics()

  // fileName = 'image.jpeg'
  fileName = 'webp.webp'
  // fileName = 'RTF.rtf'
  // fileName = 'image.png'
  // fileName = 'code.js'
  // fileName = 'compressed.zip'
  // fileName = 'word-doc.docx'
  // fileName = 'word-doc.docx'
  // fileName = 'PDF.pdf'
  // fileName = 'spreadsheet.xlsx'
  // fileName = 'powerpoint.pptx'
  // fileName = 'unknown'
  // fileName = 'image.gif'
  // fileName = 'music.mp3'
  // fileName = 'music.wav'
  // fileName = 'epub.epub'

  const filePath = fixture(fileName)

  // let obj = mm.parseFileName(filePath)
  // log({ obj })
  // const buffer = fs.readFileSync(obj.path)

  log({ filePath })
  const buffer = fs.readFileSync(filePath)
  // res = mm.parse(buffer)
  res = Mimetics.parseSync(buffer)
  // // res = mm.parseSync(buffer)
  // res = await Mimetics.parseAsync(buffer)
  // // res = await mm.parseAsync(buffer)
  log({ res })

  // log(mm)

  // log(mm.fromName(filePath))
}

log();test().then(() => log())
