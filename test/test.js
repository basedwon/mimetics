const fs = require('fs')
const path = require('path')
const Mimetics = require('../lib/mimetics')

describe('Mimetics', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')

  const asyncFiles = [
    { filename: 'powerpoint.pptx',
      expected: { tag: 'office', type: 'powerpoint', ext: 'pptx', 
        mime: 'application/vnd.openxmlformats-officedocument' }},
    { filename: 'spreadsheet.xlsx',
      expected: { tag: 'office', type: 'excel', ext: 'xlsx', 
        mime: 'application/vnd.openxmlformats-officedocument' }},
    { filename: 'word-doc.docx',
      expected: { tag: 'office', type: 'word', ext: 'docx', 
        mime: 'application/vnd.openxmlformats-officedocument' }},
  ]

  const testFiles = [
    { filename: 'code.js',
      expected: { tag: 'code', type: 'javascript', ext: 'js', mime: 'application/javascript' } },
    { filename: 'compressed.zip',
      expected: { tag: 'compressed', type: 'zip', ext: 'zip', mime: 'application/zip' } },
    { filename: 'epub.epub',
      expected: { tag: 'compressed', type: 'zip', ext: 'zip', mime: 'application/zip' } },
    { filename: 'image.gif',
      expected: { tag: 'image', type: 'gif89a', ext: 'gif', mime: 'image/gif' } },
    { filename: 'image.jpeg',
      expected: { tag: 'image', type: 'jpeg', ext: 'jpg', mime: 'image/jpeg' } },
    { filename: 'image.png',
      expected: { tag: 'image', type: 'png', ext: 'png', mime: 'image/png' } },
    { filename: 'PDF.pdf',
      expected: { tag: 'image', type: 'pdf', ext: 'pdf', mime: 'application/pdf' } },
    { filename: 'RTF.rtf',
      expected: { tag: 'text', type: 'rtf', ext: 'rtf', mime: 'application/rtf' } },
    { filename: 'txt.txt',
      expected: { tag: 'text', type: 'text', ext: 'txt', mime: 'text/plain' } },
    { filename: 'unknown',
      expected: { tag: 'text', type: 'text', ext: 'txt', mime: 'text/plain' } },
    { filename: 'music.wav',
      expected: { tag: 'audio', type: 'wav', ext: 'wav', mime: 'audio/wav' } },
    { filename: 'music.mp3',
      expected: { tag: 'audio', type: 'mp3', ext: 'mp3', mime: 'audio/mpeg' } },
  ]
  
  describe('parse()', () => {
    testFiles.forEach(({ filename, expected }) => {
      it(`should correctly identify ${filename} synchronously`, () => {
        const filePath = path.join(fixturesDir, filename)
        const buffer = fs.readFileSync(filePath)
        
        const result = Mimetics.parse(buffer)
        
        if (expected) {
          expect(result).to.be.an('object')
          expect(result.tag).to.equal(expected.tag)
          expect(result.type).to.equal(expected.type)
          if (Array.isArray(result.ext)) expect(result.ext).to.include(expected.ext)
          else expect(result.ext).to.equal(expected.ext)
          expect(result.mime).to.equal(expected.mime)
        } else {
          expect(result).to.be.null
        }
      })
    })
  })

  describe('parseAsync()', () => {
    testFiles.concat(asyncFiles).forEach(({ filename, expected }) => {
      it(`should correctly identify ${filename}`, async () => {
        const filePath = path.join(fixturesDir, filename)
        const buffer = fs.readFileSync(filePath)
        const result = await Mimetics.parseAsync(buffer)
        if (expected) {
          expect(result).to.be.an('object')
          expect(result.tag).to.equal(expected.tag)
          expect(result.type).to.equal(expected.type)
          if (Array.isArray(result.ext)) expect(result.ext).to.include(expected.ext)
          else expect(result.ext).to.equal(expected.ext)
          expect(result.mime).to.equal(expected.mime)
        } else {
          expect(result).to.be.null
        }
      })
    })
  })

  describe('fromName()', () => {
    testFiles.concat(asyncFiles).forEach(({ filename, expected }) => {
      it(`should identify file type from name: ${filename}`, () => {
        const filePath = path.join(fixturesDir, filename)
        
        const result = Mimetics.fromName(filePath)
        
        if (expected) {
          expect(result).to.be.an('object')
          expect(result.tag).to.equal(expected.tag)
          if (Array.isArray(result.ext)) expect(result.ext).to.include(expected.ext)
          else expect(result.ext).to.equal(expected.ext)
          expect(result.mime).to.equal(expected.mime)
        } else {
          expect(result).to.be.null
        }
      })
    })
  })

  if (typeof window !== 'undefined') {
    describe('fromFile()', () => {
      testFiles.forEach(({ filename, expected }) => {
        it(`should correctly identify ${filename} using fromFile()`, async () => {
          const filePath = path.join(fixturesDir, filename)
          const fileBuffer = fs.readFileSync(filePath)
          const mockFile = new Blob([fileBuffer], { type: expected ? expected.mime : 'application/octet-stream' })
          mockFile.name = filename

          const result = await Mimetics.fromFile(mockFile)

          if (expected) {
            expect(result).to.be.an('object')
            expect(result.tag).to.equal(expected.tag)
            expect(result.type).to.equal(expected.type)
            if (Array.isArray(result.ext)) expect(result.ext).to.include(expected.ext)
            else expect(result.ext).to.equal(expected.ext)
            expect(result.mime).to.equal(expected.mime)
          } else {
            expect(result).to.be.null
          }
        })
      })
    })
  }
})
