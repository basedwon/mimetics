const fs = require('fs')
const path = require('path')
const { ERRORS, DEFAULT_FILE_TYPE } = require('../lib/const')
const Mimetics = require('../lib/mimetics')
const fixture = file => path.resolve(__dirname, 'fixtures', file)

describe('Mimetics', () => {
  describe('parse', () => {
    it('should correctly identify the file type, mime type, and media type', () => {
      const buffer = fs.readFileSync(fixture('image.jpeg'))
      const result = Mimetics.parse(buffer)
      expect(result).to.deep.equal({ ext: 'jpg', mime: 'image/jpeg', media: 'image' })
    })
    it('should throw an error for invalid buffer', () => {
      expect(() => Mimetics.parse('not a buffer')).to.throw(Error, ERRORS.INVALID_BUFFER)
    })
  })

  describe('getMediaType', () => {
    it('should return correct media type for a given extension', () => {
      expect(Mimetics.getMediaType('html')).to.equal('text')
    })
  })

  describe('getFileType', () => {
    it('should correctly identify the file type from binary content', () => {
      const buffer = fs.readFileSync(fixture('image.jpeg'))
      const fileType = Mimetics.getFileType(buffer)
      expect(fileType).to.equal('jpg')
    })

    it('should correctly identify the file type from text content', () => {
      const buffer = fs.readFileSync(fixture('code.js'))
      const fileType = Mimetics.getFileType(buffer)
      expect(fileType).to.equal('js')
    })
  })

  describe('getFileTypeFromMagicNumbers', () => {
    it('should correctly identify the file type from binary content', () => {
      const buffer = fs.readFileSync(fixture('image.jpeg'))
      const fileType = Mimetics.getFileTypeFromMagicNumbers(buffer)
      expect(fileType).to.equal('jpg')
    })

    it('should return null if the file type could not be identified from binary content', () => {
      const buffer = Buffer.from('unrecognizable content')
      const fileType = Mimetics.getFileTypeFromMagicNumbers(buffer)
      expect(fileType).to.be.null
    })
  })

  describe('getFileTypeFromTextContent', () => {
    it('should correctly identify the file type from text content', () => {
      const buffer = fs.readFileSync(fixture('code.js'))
      const fileType = Mimetics.getFileTypeFromTextContent(buffer)
      expect(fileType).to.equal('js')
    })

    it(`should return "${DEFAULT_FILE_TYPE}" if file type couldn't be identified from text content`, () => {
      const buffer = Buffer.from('unrecognizable content')
      const fileType = Mimetics.getFileTypeFromTextContent(buffer)
      expect(fileType).to.equal(DEFAULT_FILE_TYPE)
    })
  })

  describe('validateBuffer', () => {
    it('should throw an error when a non-Buffer argument is provided', () => {
      expect(() => Mimetics.validateBuffer('string')).to.throw(ERRORS.INVALID_BUFFER)
      expect(() => Mimetics.validateBuffer(123)).to.throw(ERRORS.INVALID_BUFFER)
      expect(() => Mimetics.validateBuffer(null)).to.throw(ERRORS.INVALID_BUFFER)
      expect(() => Mimetics.validateBuffer(undefined)).to.throw(ERRORS.INVALID_BUFFER)
      expect(() => Mimetics.validateBuffer({})).to.throw(ERRORS.INVALID_BUFFER)
    })
    it('should not throw an error when a Buffer argument is provided', () => {
      expect(() => Mimetics.validateBuffer(Buffer.from(''))).to.not.throw()
    })
  })

  describe('getMimeType', () => {
    it('should return correct MIME type for a given extension', () => {
      expect(Mimetics.getMimeType('html')).to.equal('text/html')
    })

    it('should throw an error for invalid extension', () => {
      expect(() => Mimetics.getMimeType(123)).to.throw(Error, ERRORS.INVALID_EXTENSION)
    })

    it('should throw an error for unrecognized extension', () => {
      expect(() => Mimetics.getMimeType('xyz')).to.throw(Error, ERRORS.UNRECOGNIZED_EXTENSION('xyz'))
    })

    it('should throw an error when a non-string argument is provided', () => {
      expect(() => Mimetics.getMimeType(Buffer.from(''))).to.throw(ERRORS.INVALID_EXTENSION)
      expect(() => Mimetics.getMimeType(123)).to.throw(ERRORS.INVALID_EXTENSION)
      expect(() => Mimetics.getMimeType(null)).to.throw(ERRORS.INVALID_EXTENSION)
      expect(() => Mimetics.getMimeType(undefined)).to.throw(ERRORS.INVALID_EXTENSION)
      expect(() => Mimetics.getMimeType({})).to.throw(ERRORS.INVALID_EXTENSION)
    })

    it('should throw an error when an unrecognized extension is provided', () => {
      expect(() => Mimetics.getMimeType('unrecognized'))
        .to.throw(ERRORS.UNRECOGNIZED_EXTENSION('unrecognized'))
    })

    it('should not throw an error when a recognized string extension is provided', () => {
      expect(() => Mimetics.getMimeType('jpg')).to.not.throw()
    })
  })

  describe('edge cases', () => {
    it('should correctly handle png file extensions', () => {
      const buffer = fs.readFileSync(fixture('image.png'))
      const result = Mimetics.parse(buffer)
      expect(result.ext).to.equal('png')
    })
    it('should correctly handle errors with edge cases', () => {
      const buffer = fs.readFileSync(fixture('unknown'))
      // log(Mimetics.parse(buffer))
      // expect(() => Mimetics.parse(buffer)).to.throw(ERRORS.UNRECOGNIZED_EXTENSION('jpg'))
    })
  })
})
