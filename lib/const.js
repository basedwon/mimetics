/**
 * Size of buffer to check for text content. The first BUFFER_CHECK_SIZE bytes are used to
 * check text content for determining file type.
 * @type {number}
 */
exports.BUFFER_CHECK_SIZE = 100

/**
 * Fallback file type extension if other methods don't find a match
 * @type {string}
 */
exports.DEFAULT_FILE_TYPE = 'txt'

/**
 * Collection of error messages used in the library.
 * @type {Object.<string, string|function>}
 */
exports.ERRORS = {
  INVALID_BUFFER: 'Invalid input: buffer is required and must be an instance of Buffer',
  INVALID_EXTENSION: 'Invalid input: extension is required and must be a string',
  INVALID_METHOD: method => `Invalid method: ${method}`,
  UNRECOGNIZED_EXTENSION: ext => `Unrecognized file extension: ${ext}`
}
