/**
 * A map of file extensions to magic numbers for binary file type detection.
 * @type {Object.<string, Array<number>>}
 * @module magicNumbers
 */
module.exports = {
  jpg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46, 0x38],
  pdf: [0x25, 0x50, 0x44, 0x46],
  tif: [0x49, 0x49, 0x2a, 0x00],
  tiff: [0x4d, 0x4d, 0x00, 0x2a],
  bmp: [0x42, 0x4d],
  ico: [0x00, 0x00, 0x01, 0x00],
  webp: [0x52, 0x49, 0x46, 0x46],
  mp3: [0xff, 0xfb],
  mp4: [0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70],
  mov: [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70],
  avi: [0x52, 0x49, 0x46, 0x46],
  mkv: [0x1a, 0x45, 0xdf, 0xa3],
  flv: [0x46, 0x4c, 0x56, 0x01],
  txt: [0x74, 0x68, 0x69, 0x73],
  doc: [0xd0, 0xcf, 0x11, 0xe0],
  docx: [0x50, 0x4b, 0x03, 0x04],
  xls: [0xd0, 0xcf, 0x11, 0xe0],
  xlsx: [0x50, 0x4b, 0x03, 0x04],
  ppt: [0xd0, 0xcf, 0x11, 0xe0],
  pptx: [0x50, 0x4b, 0x03, 0x04],
  zip: [0x50, 0x4b, 0x03, 0x04],
  rar: [0x52, 0x61, 0x72, 0x21],
  gz: [0x1f, 0x8b],
  '7z': [0x37, 0x7a, 0xbc, 0xaf],

  tiff_big_endian: [0x4d, 0x4d, 0x00, 0x2a],
  tiff_little_endian: [0x49, 0x49, 0x2a, 0x00],
  GIF87a: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
  GIF89a: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
}
