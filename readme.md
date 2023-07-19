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

# Usage

  ## Usage V1

  ```js
  const Mimetics = require('mimetics')
  const fs = require('fs')

  const buffer = fs.readFileSync('example.jpg')
  const fileInfo = Mimetics.parse(buffer)
  console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
  ```

  In this example, the `parse` method of the Mimetics instance is used to analyze the content of 'example.jpg' and determine its file type, MIME type, and media type.




  **Basic Usage**

  In this example, we're reading a file and passing the resulting buffer to Mimetics, which analyzes it to determine its file type, MIME type, and media type:

  ```js
  const Mimetics = require('mimetics')
  const fs = require('fs')

  const buffer = fs.readFileSync('example.pdf')
  const fileInfo = Mimetics(buffer)

  console.log(fileInfo) // Logs { ext: 'pdf', mime: 'application/pdf', media: 'application' }
  ```

  **Using `parse` Method**

  Alternatively, you can create an instance of the Mimetics class and use its `parse` method:

  ```js
  const Mimetics = require('mimetics')
  const fs = require('fs')

  const buffer = fs.readFileSync('example.png')
  const mime = new Mimetics()
  const fileInfo = mime.parse(buffer)

  console.log(fileInfo) // Logs { ext: 'png', mime: 'image/png', media: 'image' }
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

  These examples should help you to get started with using the Mimetics library!



  ## UsageV2

  ```js
  const Mimetics = require('mimetics');
  const fs = require('fs');

  const buffer = fs.readFileSync('./path/to/your/file');
  const result = Mimetics.parse(buffer);

  console.log(result);
  // { ext: 'png', mime: 'image/png', media: 'image' }
  ```


  ## Usage V3

  Here is a basic example:

  ```js
  const Mimetics = require('mimetics')
  const fs = require('fs')

  const buffer = fs.readFileSync('example.jpg')
  const fileInfo = Mimetics.parse(buffer)
  console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
  ```
  
  ## Usage V4
  ```js
  const Mimetics = require('mimetics')
  const fs = require('fs')

  const buffer = fs.readFileSync('example.jpg')
  const fileInfo = Mimetics.parse(buffer)
  console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
  ```

# API

  ## API V1

  ### Mimetics.parse(buffer)

  Takes a buffer as input, identifies the file type, mime type, and media type, and returns an object containing these three properties: `ext`, `mime`, `media`.

  ```js
  const result = Mimetics.parse(buffer);
  console.log(result);
  // { ext: 'png', mime: 'image/png', media: 'image' }
  ```

  ## API V2

  Mimetics provides a comprehensive API to customize and extend the default behavior:

  - **setOptions(opts: Object): Mimetics** - Sets options for the instance, enabling the addition of custom magic numbers, MIME types, file types and edge cases.
  - **addMagicNumber(ext: string, magicNumber: Array<number>): void** - Adds a new magic number to the instance's magicNumbers map.
  - **addMimeType(ext: string, mimeType: string): void** - Adds a new MIME type to the instance's mimeTypeMap.
  - **addFileType(ext: string, regex: RegExp): void** - Adds a new file type to the instance's fileTypeMap.
  - **addEdgeCase(specialExt: string, extList: Array<string>): void** - Adds a new edge case to the instance's edgeCases map.

  For more detailed API documentation, see the comments in the code.

  ## API V3

  Mimetics exports a single class with the following static methods:

  - `parse(buffer: Buffer): Object` - Takes in a Buffer and returns an object with the file type (`ext`), MIME type (`mime`), and media type (`media`).
  - `getFileType(buffer: Buffer): string` - Determines the file type from the provided buffer.
  - `getMimeType(extension: string): string` - Returns the MIME type for the provided file extension.
  - `getMediaType(extension: string): string` - Returns the media type for the provided file extension.

  ## API V4

  ### `Mimetics.parse(buffer)`
  Parses the input buffer to determine the file type, mime type, and media type.

  #### Parameters
  - `buffer` - Buffer - The input buffer to be parsed.

  #### Returns
  An object containing the determined file type, mime type, and media type.






## Contributing

  Please feel free to submit issues and pull requests.

  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  Contributions are welcome. Please submit a Pull Request or open an Issue to discuss any changes.

  Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

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
