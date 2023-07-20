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

Mimetics is a library to determine the file type, MIME type, and media type of a given file. It uses magic numbers and content analysis to detect the most likely file type and then maps that to the appropriate MIME and media type. I've included all of the file types that GPT could think of, but if I'm missing some please create a pull request.

## Features

+ Detects file type using magic numbers
+ Detects file type using text content analysis
+ Extracts the MIME and media types
+ Supports wide variety of file types.
+ Extendable with user-defined magic numbers, MIME types and file types

## Installation

```
npm install mimetics
```

## Usage

**Basic Usage**

Read a file and pass the resulting buffer to Mimetics, which analyzes it to determine its file type, MIME type, and media type:

```js
const mimetics = require('mimetics')
const fs = require('fs')

const buffer = fs.readFileSync('example.jpg')

// call it as a function:
const fileInfo = mimetics(buffer)

// or, you can call the `parse` method:
const fileInfo = mimetics.parse(buffer)

console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
```

**Adding Custom Magic Numbers**

Here, we're adding a custom magic number for a hypothetical file type and then using Mimetics to analyze a file of that type:

```js
const Mimetics = require('mimetics')
const fs = require('fs')

const buffer = fs.readFileSync('example.custom')
const mime = new Mimetics({
  magic: { custom: [0x43, 0x55, 0x53, 0x54] }
})
const fileInfo = mime.parse(buffer)

console.log(fileInfo) // Logs { ext: 'custom', mime: 'application/octet-stream', media: 'application' }
```

**Adding Custom MIME Types**

Here, we're adding a custom MIME type for a specific file extension:

```js
const Mimetics = require('mimetics')
const fs = require('fs')

const buffer = fs.readFileSync('example.custom')
const mime = new Mimetics()
mime.addMimeType('custom', 'application/x-custom')

const fileInfo = mime.parse(buffer)

console.log(fileInfo) // Logs { ext: 'custom', mime: 'application/x-custom', media: 'application' }
```

## API

Mimetics exports a single class with the following methods:

- `parse(buffer: Buffer): Object` - Takes in a Buffer and returns an object with the file type (`ext`), MIME type (`mime`), and media type (`media`).
- `getFileType(buffer: Buffer): string` - Determines the file type from the provided buffer.
- `getMimeType(extension: string): string` - Returns the MIME type for the provided file extension.
- `getMediaType(extension: string): string` - Returns the media type for the provided file extension.

Mimetics also provides a comprehensive API to customize and extend the default behavior:

- `setOptions(opts: Object): Mimetics` - Sets options for the instance, enabling the addition of custom magic numbers, MIME types, file types and edge cases.
- `addMagicNumber(ext: string, magicNumber: Array<number>): void` - Adds a new magic number to the instance's magicNumbers map.
- `addMimeType(ext: string, mimeType: string): void` - Adds a new MIME type to the instance's mimeTypeMap.
- `addFileType(ext: string, regex: RegExp): void` - Adds a new file type to the instance's fileTypeMap.
- `addEdgeCase(specialExt: string, extList: Array<string>): void` - Adds a new edge case to the instance's edgeCases map.

### `Mimetics.parse(buffer)`

Takes a buffer as input, identifies the file type, mime type, and media type, and returns an object containing these three properties: `ext`, `mime`, `media`.

#### Parameters
- `buffer` - Buffer - The input buffer to be parsed.

#### Returns
An object containing the determined file type, mime type, and media type.

---

For more detailed API documentation, see the [API reference](docs/api.md) and the comments in the code.

## Contributing

Contributions are welcome. Submit a Pull Request or open an Issue to discuss any changes. Please read [contributing.md](docs/contributing.md) for details on our code of conduct, and the process for submitting merge requests to us.

## Testing

Mimetics includes a test suite built with [Testr](https://npmjs.com/package/@basd/testr).

To run the test, first clone the respository:

```sh
git clone https://github.com/basedwon/mimetics.git
```

Install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## License

Mimetics is [MIT licensed](./LICENSE).
