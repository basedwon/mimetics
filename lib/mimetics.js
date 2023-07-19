/**
 * @file
 * Mimetics - A library to determine the file type, MIME type and media type of a given file.
 * This library performs file type detection using magic numbers and text content analysis.
 * It also maps file extensions to their MIME types and media types.
 *
 * @author Basedwon
 * @version 0.0.1
 * @license MIT
 *
 * @example
 * const Mimetics = require('mimetics')
 * const fs = require('fs')
 *
 * const buffer = fs.readFileSync('example.jpg')
 * const fileInfo = Mimetics.parse(buffer)
 * console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
 * 
 * @module Mimetics
 */

/**
 * Importing required modules and constants.
 * These modules provide the necessary mappings and constants for the library to function.
 */
const { BUFFER_CHECK_SIZE, DEFAULT_FILE_TYPE, ERRORS } = require('./const')
const ucf = str => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * @class Mimetics
 * @description Class for file type and MIME type detection using magic numbers and content analysis.
 * @param {Object} opts The options to customize the detection. The options object can have any of magic, mime, file, and edge properties, which should be a plain object and contain key-value pairs for that respective setting.
 * @property {Object} magicNumbers Map of file extensions to magic numbers.
 * @property {Object} mimeTypeMap Map of file extensions to MIME types.
 * @property {Object} fileTypeMap Map of file extensions to regular expression patterns for detecting file types from text content.
 * @property {Object} edgeCases Map of special file extensions to lists of normal file extensions.
 * @returns {Mimetics} Returns the Mimetics singleton instance.
 */
class Mimetics {
  /**
   * @constructor
   * @param {Object} [opts] Optional initial configuration for the Mimetics instance.
   */
  constructor(opts = {}) {
    if (Mimetics.instance)
      return Mimetics.instance.setOptions(opts)
    Mimetics.instance = this
    this.magicNumbers = require('./magic')
    this.mimeTypeMap = require('./mimes')
    this.fileTypeMap = require('./types')
    this.edgeCases = require('./edge')
    this.setOptions(opts)
  }
  /**
   * @method setOptions
   * @description Sets options for the instance, enabling the addition of custom magic numbers, MIME types, file types and edge cases.
   * @param {Object} opts The options to set. The options object can have any of magic, mime, file, and edge properties, which should be a plain object and contain key-value pairs for that respective setting.
   * @returns {Mimetics} Returns the Mimetics instance.
   */
  setOptions(opts = {}) {
    const labels = [['magic', 'number'], ['mime', 'type'], ['file', 'type'], ['edge', 'case']]
    for (const [label, slug] of labels) {
      if (opts[label]) {
        const method = `add${ucf(label)}${ucf(slug)}`
        if (typeof this[method] !== 'function')
          throw new Error(ERRORS.INVALID_METHOD(method))
        for (const [key, value] of Object.entries(opts[label]))
          this[method](key, value)
      }
    }
    return this
  }
  /**
   * @method addMagicNumber
   * @description Adds a new magic number to the instance's magicNumbers map.
   * @param {string} ext The file extension.
   * @param {Array<number>} magicNumber The magic number.
   */
  addMagicNumber(ext, magicNumber) {
    this.magicNumbers[ext] = magicNumber
  }
  /**
   * @method addMimeType
   * @description Adds a new MIME type to the instance's mimeTypeMap.
   * @param {string} ext The file extension.
   * @param {string} mimeType The MIME type.
   */
  addMimeType(ext, mimeType) {
    this.mimeTypeMap[ext] = mimeType
  }
  /**
   * @method addFileType
   * @description Adds a new file type to the instance's fileTypeMap.
   * @param {string} ext The file extension.
   * @param {RegExp} regex The regular expression pattern for the file type.
   */
  addFileType(ext, regex) {
    this.fileTypeMap[ext] = regex
  }
  /**
   * @method addEdgeCase
   * @description Adds a new edge case to the instance's edgeCases map.
   * @param {string} specialExt The special file extension.
   * @param {Array<string>} extList The list of normal file extensions.
   */
  addEdgeCase(specialExt, extList) {
    this.edgeCases[specialExt] = extList
  }
  /**
   * @method parse
   * @description Parses a buffer and returns an object containing the file type, MIME type, and media type.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer to parse.
   * @returns {Object} Returns an object containing `ext`, `mime`, and `media`.
   */
  parse(buffer) {
    this.validateBuffer(buffer)
    const ext = this.getFileType(buffer)
    const mime = this.getMimeType(ext)
    const media = this.getMediaType(ext)
    return { ext, mime, media }
  }
  /**
   * @method validateBuffer
   * @description Validates a buffer.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer to validate.
   * @throws Will throw an error if the buffer is invalid.
   */
  validateBuffer(buffer) {
    if (!buffer || !(buffer instanceof Uint8Array || buffer instanceof ArrayBuffer))
      throw new Error(ERRORS.INVALID_BUFFER)
  }
  /**
   * @method getFileType
   * @description Gets the file type of a buffer.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer.
   * @returns {string|null} Returns the file type or null.
   */
  getFileType(buffer) {
    this.validateBuffer(buffer)
    if (buffer instanceof ArrayBuffer) buffer = new Uint8Array(buffer)
    const magicFileType = this.getFileTypeFromMagicNumbers(buffer)
    if (magicFileType) return magicFileType
    return this.getFileTypeFromTextContent(buffer) || null
  }
  /**
   * @method getFileTypeFromMagicNumbers
   * @description Gets the file type of a buffer using magic numbers.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer.
   * @returns {string|null} Returns the file type or null.
   */
  getFileTypeFromMagicNumbers(buffer) {
    for (const [ext, magicNumber] of Object.entries(this.magicNumbers)) {
      const match = magicNumber.every((byte, ii) => buffer[ii] === byte)
      if (match) {
        for (const [specialExt, extList] of Object.entries(this.edgeCases))
          if (extList.includes(ext)) return specialExt
        return ext
      }
    }
    return null
  }
  /**
   * @method getFileTypeFromTextContent
   * @description Gets the file type of a buffer using its text content.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer.
   * @returns {string} Returns the file type.
   */
  getFileTypeFromTextContent(buffer) {
    const content = this.decodeBufferToString(buffer)
    for (const [fileType, pattern] of Object.entries(this.fileTypeMap))
      if (content.match(pattern)) return fileType
    return DEFAULT_FILE_TYPE
  }
  /**
   * @method decodeBufferToString
   * @description Decodes a buffer to a string.
   * @param {Uint8Array|ArrayBuffer} buffer The buffer.
   * @returns {string} Returns the decoded string.
   */
  decodeBufferToString(buffer) {
    return typeof window !== 'undefined' 
      ? new TextDecoder().decode(buffer.slice(0, BUFFER_CHECK_SIZE))
      : buffer.toString('utf8', 0, BUFFER_CHECK_SIZE)
  }
  /**
   * @method getMimeType
   * @description Gets the MIME type of a file extension.
   * @param {string} extension The file extension.
   * @returns {string} Returns the MIME type.
   * @throws Will throw an error if the extension is invalid or unrecognized.
   */
  getMimeType(extension) {
    if (!extension || typeof extension !== 'string')
      throw new Error(ERRORS.INVALID_EXTENSION)
    const mimeType = this.mimeTypeMap[extension]
    if (!mimeType || typeof mimeType !== 'string')
      throw new Error(ERRORS.UNRECOGNIZED_EXTENSION(extension))
    return mimeType
  }
  /**
   * @method getMediaType
   * @description Gets the media type of a file extension.
   * @param {string} extension The file extension.
   * @returns {string} Returns the media type.
   */
  getMediaType(extension) {
    const mimeType = this.getMimeType(extension)
    return mimeType.split('/').shift()
  }
}

/**
 * Export a Proxy wrapped Mimetics. When the exported object is called as a function, it
 * behaves like a Mimetics constructor and `parse` method combination. When a property is accessed,
 * it first checks if the property exists on the Mimetics class, and if not, it treats the property as
 * a property or method on an instance of the Mimetics class.
 */
module.exports = new Proxy(Mimetics, {
  apply: (target, __, [buffer, opts]) => new target(opts).parse(buffer),
  get (target, prop, receiver) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
    const mm = new target()
    if (typeof mm[prop] === 'function') return mm[prop].bind(mm)
    return mm[prop]
  }
})
