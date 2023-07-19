/**
 * @file
 * A map between special file extensions and their normal forms.
 * @type {Object.<string, Array<string>>}
 * @module edgeCases
 */
module.exports = {
  tiff: ['tiff_big_endian', 'tiff_little_endian'],
  gif: ['GIF87a', 'GIF89a']
}
