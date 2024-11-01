const JSZip = require('jszip')
const fileDefinitions = require('./definitions')
const { CONSTANTS, ERRORS } = require('./constants')
const log = console.log.bind(console)

class Mimetics {
  /**
   * Initializes a singleton instance of Mimetics.
   * @param {Array<Object>} customDefinitions - Optional array of custom definitions to add.
   * @returns {Mimetics} - Singleton instance of Mimetics class
   */
  constructor(customDefinitions = []) {
    if (Mimetics.instance) {
      if (customDefinitions.length)
        Mimetics.instance.addDefinitions(customDefinitions)
      return Mimetics.instance
    }
    this.fileDefinitions = fileDefinitions
    if (customDefinitions.length)
      this.addDefinitions(customDefinitions)
    Mimetics.instance = this
  }

  /**
   * Adds custom file definitions.
   * @param {Array<Object>} definitions - Array of custom definitions to add.
   */
  addDefinitions(definitions) {
    if (!Array.isArray(definitions)) definitions = [definitions]
    this.fileDefinitions.push(...definitions)
  }

  /**
   * Parses the buffer synchronously and returns the first matching file type.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer to parse.
   * @param {string} name - Optional name of the file.
   * @returns {Object|null} - File type object or null if no match found.
   */
  parse(buffer, name) {
    const results = this.parseSync(buffer, name)
    return results[0] || null
  }

  /**
   * Parses the buffer and returns all matching file types.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer to parse.
   * @param {string} name - Optional name of the file.
   * @returns {Array<Object>} - List of matching file types.
   */
  parseSync(buffer, name) {
    this.validateBuffer(buffer)
    let matches = this.detectByMagicNumber(buffer)
    if (!matches.length) matches = this.sniffContent(buffer)
    if (!matches.length && !!name) matches = this.parseFromName(name)
    return matches.length ? this.sortMatches(matches) : [this.defaultResponse()]
  }

  /**
   * Parses the buffer asynchronously, analyzing ZIP contents if necessary.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer to parse.
   * @param {string} name - Optional name of the file.
   * @returns {Promise<Object|null>} - Promise resolving to the matching file type or null.
   */
  async parseAsync(buffer, name) {
    const results = this.parseSync(buffer, name)
    if (results.length === 0) return null
    if (results.length === 1) return this.buildResponse(results[0])
    if (results.some(m => m.zipped)) {
      const matches = await this.analyzeZipContents(buffer, results)
      return this.buildResponse(this.sortMatches(matches)[0])
    }
    return this.buildResponse(results[0])
  }

  /**
   * Matches a buffer against a specified magic byte sequence.
   * @param {Array<number>|Array<Array<number>>} magic - Expected magic byte(s).
   * @param {Uint8Array|ArrayBuffer} buffer - The buffer to match against.
   * @returns {boolean} - True if magic bytes match, otherwise false.
   */
  magicMatch(magic, buffer) {
    if (Array.isArray(magic[0]))
      return magic.some(arr => this.magicMatch(arr, buffer))
    for (let index = 0; index < magic.length; index++) {
      const magi = magic[index]
      const buff = buffer[index]
      if (magi !== '*' && magi !== buff) return false
    }
    return true
  }

  /**
   * Detects file type based on magic numbers within the buffer.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer.
   * @returns {Array<Object>} - Array of matching file definitions with scores.
   */
  detectByMagicNumber(buffer) {
    return this.fileDefinitions.map(def => {
      let score = 0
      if (def.magic && this.magicMatch(def.magic, buffer)) {
        score += CONSTANTS.MAGIC_NUMBER_SCORE
      }
      return { ...def, score }
    }).filter(def => def.score > 0)
  }

  /**
   * Sorts matches by their score in descending order.
   * @param {Array<Object>} matches - List of matches to sort.
   * @returns {Array<Object>} - Sorted matches.
   */
  sortMatches(matches) {
    return matches.sort((a, b) => b.score - a.score)
  }

  /**
   * Analyzes ZIP contents for matching definitions based on required internal files.
   * @param {Uint8Array|ArrayBuffer} buffer - The ZIP file buffer.
   * @param {Array<Object>} matches - List of initial matches to verify.
   * @returns {Promise<Array<Object>>} - Array of verified matches with updated scores.
   */
  async analyzeZipContents(buffer, matches) {
    const zip = await JSZip.loadAsync(buffer)
    matches = matches.filter(m => m.zipped)
    for (const match of matches) {
      if (typeof match.zipped === 'string') match.zipped = [match.zipped]
      if (Array.isArray(match.zipped)) {
        if (match.zipped.every(rule => !!zip.files[rule])) {
          match.score += CONSTANTS.ZIP_HEADER_SCORE
        }
      }
    }
    return matches
  }

  /**
   * Attempts to match file type based on content patterns.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer.
   * @returns {Array<Object>} - Array of file type definitions that match by content pattern.
   */
  sniffContent(buffer) {
    const content = this.decodeBufferToString(buffer)
    return this.fileDefinitions.filter(def => def.pattern && content.match(def.pattern))
  }

  /**
   * Decodes a buffer into a string for pattern matching.
   * @param {Uint8Array|ArrayBuffer} buffer - The file buffer.
   * @returns {string} - Decoded string content.
   */
  decodeBufferToString(buffer) {
    return typeof window !== 'undefined' 
      ? new TextDecoder().decode(buffer.slice(0, CONSTANTS.BUFFER_CHECK_SIZE))
      : buffer.toString('utf8', 0, CONSTANTS.BUFFER_CHECK_SIZE)
  }

  /**
   * Constructs a response object based on a file type definition.
   * @param {Object} definition - The file type definition.
   * @returns {Object|null} - Constructed response object, or null if no definition provided.
   */
  buildResponse(definition) {
    if (!definition) return null
    const { ext, mime, type, tag } = definition
    const exts = Array.isArray(ext) ? ext : (typeof ext === 'string' ? [ext] : [])
    return {
      tag,
      type,
      ext: exts[0] || null,
      exts,
      mime
    }
  }

  /**
   * Returns a default response, typically for unknown or generic text file types.
   * @returns {Object} - Default response object.
   */
  defaultResponse() {
    const definition = this.fileDefinitions.find(def => def.type === 'text')
    return this.buildResponse(definition)
  }

  /**
   * Validates the provided buffer to ensure it’s a valid file buffer.
   * @param {Uint8Array|ArrayBuffer} buffer - The buffer to validate.
   * @throws {Error} - Throws if buffer is invalid.
   */
  validateBuffer(buffer) {
    if (!buffer || !(buffer instanceof Uint8Array || buffer instanceof ArrayBuffer))
      throw new Error(ERRORS.INVALID_BUFFER)
  }

  /**
   * Parses a file name to extract metadata like extension and slug.
   * @param {string} filePath - Path or name of the file.
   * @returns {Object} - Object with parsed name, slug, path, and extension.
   */
  parseFileName(filePath) {
    const ext = filePath.split('.').pop()
    const name = filePath.split('/').pop()
    const slug = name.split('.').slice(0, -1).join('.')
    return { name, slug, path: filePath, ext }
  }

  /**
   * Parses the file extension from a file path and finds matching file definitions.
   * @param {string} filePath - The file path or name to parse.
   * @returns {Array<Object>} - Array of matching file definitions based on the file extension.
   */
  parseFromName(filePath) {
    const obj = this.parseFileName(filePath)
    return this.fileDefinitions.filter(def =>
      Array.isArray(def.ext) ? def.ext.includes(obj.ext) : def.ext === obj.ext)
  }

  /**
   * Determines the file type based on the file extension from the file path.
   * Uses matches from parseFromName and builds a response object.
   * @param {string} filePath - The file path or name to parse.
   * @returns {Object} - File type definition object or default response if no match is found.
   */
  fromName(filePath) {
    const matches = this.parseFromName(filePath)
    if (matches.length === 1) {
      return this.buildResponse(matches[0])
    } else if (matches.length > 1) {
      return this.buildResponse(this.sortMatches(matches)[0])
    } else {
      return this.defaultResponse()
    }
  }

  /**
   * Converts a file to a buffer asynchronously.
   * @param {File} file - The file object to read.
   * @returns {Promise<Uint8Array>} - Promise resolving to the file buffer.
   */
  async getBufferFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
  }

  /**
   * Determines file type from a file object by reading its buffer and name.
   * @param {File} file - The file object to analyze.
   * @returns {Promise<Object>} - Promise resolving to file type definition or null if not found.
   */
  async fromFile(file) {
    const buffer = await this.getBufferFromFile(file)
    const name = file.name || file.webkitRelativePath || null
    const obj = name ? this.parseFileName(name) : null
    const match = this.parse(buffer)
    return obj ? { ...match, ...obj } : { ...match }
  }
}

module.exports = new Proxy(Mimetics, {
  apply: (target, __, [buffer, opts]) => new target().parse(buffer),
  get (target, prop, receiver) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
    const mm = new target()
    if (typeof mm[prop] === 'function') return mm[prop].bind(mm)
    return mm[prop]
  }
})
