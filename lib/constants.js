/**
 * Collection of constants used in the Mimetics library.
 * @type {Object}
 * @property {number} BUFFER_CHECK_SIZE - Number of bytes to check in a buffer for type detection.
 * @property {number} MAGIC_NUMBER_SCORE - Score assigned to a file type when a magic number match is found.
 * @property {number} ZIP_HEADER_SCORE - Additional score given to ZIP files that contain specific internal files.
 */
exports.CONSTANTS = {
  BUFFER_CHECK_SIZE: 100,
  MAGIC_NUMBER_SCORE: 50,
  ZIP_HEADER_SCORE: 10,
}

/**
 * Collection of error messages used in the library.
 * @type {Object.<string, string>}
 * @property {string} INVALID_BUFFER - Error message for invalid buffer input.
 */
exports.ERRORS = {
  INVALID_BUFFER: 'Invalid input: buffer is required and must be an instance of Buffer',
}
