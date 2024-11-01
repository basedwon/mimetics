# Mimetics

> Know thy files

[![npm](https://img.shields.io/npm/v/mimetics?style=flat&logo=npm)](https://www.npmjs.com/package/mimetics)
[![pipeline](https://gitlab.com/basedwon/mimetics/badges/master/pipeline.svg)](https://gitlab.com/basedwon/mimetics/-/pipelines)
[![license](https://img.shields.io/npm/l/mimetics)](https://gitlab.com/basedwon/mimetics/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/mimetics)](https://www.npmjs.com/package/mimetics) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/basedwon/mimetics)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/mimetics)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

Mimetics identifies file types based on magic bytes, patterns, and other unique file attributes. It provides an intuitive API for both synchronous and asynchronous file type detection, supporting various file formats including text, image, audio, video, and archive types.

## Installation

To add Mimetics to your project, use:

```bash
npm install mimetics
```

## Usage

Mimetics allows you to detect file types from file buffers, file names, and even File objects in browser environments. You can also extend its functionality by adding custom definitions.

### Basic Example

```javascript
const Mimetics = require('mimetics')
const fs = require('fs')

// Load a buffer from a file (e.g., sample.txt)
const buffer = fs.readFileSync('sample.txt')
const mimetics = new Mimetics()

// Synchronous file type detection
const fileType = mimetics.parse(buffer)
console.log(fileType) // Output: { tag: 'text', type: 'text', ext: 'txt', mime: 'text/plain' }

// Asynchronous file type detection (for ZIP files, etc.)
mimetics.parseAsync(buffer).then(fileType => {
  console.log(fileType)
})
```

### Adding Custom Definitions

You can extend Mimetics with custom definitions for additional file types.

```javascript

const Mimetics = require('mimetics')

const customDefinitions = [
  {
    tag: 'custom',
    type: 'myfiletype',
    ext: 'myft',
    mime: 'application/x-myfiletype',
    magic: [0x12, 0x34, 0x56],
    pattern: /^MYFILE/i,
  }
]

const mimetics = new Mimetics()
mimetics.addDefinitions(customDefinitions)

const buffer = /* load a buffer for a custom file type */
const fileType = mimetics.parse(buffer)
console.log(fileType) // Output should match custom definition
```

### Browser Example

```javascript
const Mimetics = require('mimetics')

const fileInput = document.querySelector('#fileInput')
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0]
  const mimetics = new Mimetics()
  
  const fileType = await mimetics.fromFile(file)
  console.log(fileType) // Output: file type information
})
```

## Supported File Types

Mimetics currently supports a variety of formats, including but not limited to:

- **Text**: Plain text (`txt`), Markdown (`md`), LaTeX (`tex`), RTF (`rtf`)
- **Image**: JPEG (`jpg`, `jpeg`), PNG (`png`), GIF (`gif`), BMP (`bmp`), ICON (`ico`), WebP (`webp`), PDF (`pdf`), SVG (`svg`)
- **Audio**: MP3 (`mp3`), OGG (`ogg`), WAV (`wav`)
- **Video**: MP4 (`mp4`), QuickTime (`mov`), AVI (`avi`), MKV (`mkv`), WebM (`webm`), FLV (`flv`)
- **Archive**: ZIP (`zip`), RAR (`rar`), GZIP (`gz`), 7ZIP (`7z`)
- **Ebook**: EPUB (`epub`)

## API Reference

### `parse(buffer, name)`

Synchronously parses a buffer to identify the file type.

- **Parameters**:
  - `buffer` (Uint8Array | ArrayBuffer): The file buffer to parse.
  - `name` (string, optional): The file name, which can help in detection.

- **Returns**: File type object or `null` if no match is found.

### `parseAsync(buffer, name)`

Asynchronously parses a buffer to identify the file type, with support for ZIP archive analysis.

- **Parameters**:
  - `buffer` (Uint8Array | ArrayBuffer): The file buffer to parse.
  - `name` (string, optional): The file name, which can assist in detection.

- **Returns**: A promise resolving to a file type object or `null` if no match is found.

### `fromName(filePath)`

Determines file type based on the file name extension.

- **Parameters**:
  - `filePath` (string): The file path or name.

- **Returns**: File type object based on the file extension or `null` if no match is found.

### `fromFile(file)`

Asynchronously determines the file type from a File object (for browser use).

- **Parameters**:
  - `file` (File): File object to analyze.

- **Returns**: A promise resolving to a file type object.

### `addDefinitions(definitions)`

Adds custom file definitions to the existing set.

- **Parameters**:
  - `definitions` (Array<Object>): Array of custom file definitions to add, with each object containing properties like `tag`, `type`, `ext`, `mime`, `magic`, and `pattern`.


For more detailed API documentation, see the [API reference](docs/api.md) and the comments in the code.

## Contributing

Contributions are welcome. Submit a Pull Request or open an Issue to discuss any changes. Please read [contributing.md](docs/contributing.md) for details on our code of conduct, and the process for submitting merge requests to us.

## Testing

Mimetics includes a test suite built with [testr](https://npmjs.com/package/@basd/testr).

To run the test, first clone the respository:

```sh
git clone https://github.com/basedwon/mimetics.git
```

Install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

Mimetics is [MIT licensed](./LICENSE).
