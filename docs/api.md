## Modules

<dl>
<dt><a href="#module_Mimetics">Mimetics</a></dt>
<dd><p>Mimetics - A library to determine the file type, MIME type and media type of a given file.
This library performs file type detection using magic numbers and text content analysis.
It also maps file extensions to their MIME types and media types.</p>
</dd>
<dt><a href="#module_edgeCases">edgeCases</a> : <code>Object.&lt;string, Array.&lt;string&gt;&gt;</code></dt>
<dd><p>A map between special file extensions and their normal forms.</p>
</dd>
<dt><a href="#module_magicNumbers">magicNumbers</a> : <code>Object.&lt;string, Array.&lt;number&gt;&gt;</code></dt>
<dd><p>A map of file extensions to magic numbers for binary file type detection.</p>
</dd>
<dt><a href="#module_mimeTypeMap">mimeTypeMap</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd><p>A map between file extensions and their corresponding MIME types.</p>
</dd>
<dt><a href="#module_fileTypeMap">fileTypeMap</a> : <code>Object.&lt;string, RegExp&gt;</code></dt>
<dd><p>A map between file types and their regular expression patterns for text content.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#BUFFER_CHECK_SIZE">BUFFER_CHECK_SIZE</a> : <code>number</code></dt>
<dd><p>Size of buffer to check for text content. The first BUFFER_CHECK_SIZE bytes are used to
check text content for determining file type.</p>
</dd>
<dt><a href="#DEFAULT_FILE_TYPE">DEFAULT_FILE_TYPE</a> : <code>string</code></dt>
<dd><p>Fallback file type extension if other methods don&#39;t find a match</p>
</dd>
<dt><a href="#ERRORS">ERRORS</a> : <code>Object.&lt;string, (string|function())&gt;</code></dt>
<dd><p>Collection of error messages used in the library.</p>
</dd>
</dl>

<a name="module_edgeCases"></a>

## edgeCases : <code>Object.&lt;string, Array.&lt;string&gt;&gt;</code>
A map between special file extensions and their normal forms.

<a name="module_magicNumbers"></a>

## magicNumbers : <code>Object.&lt;string, Array.&lt;number&gt;&gt;</code>
A map of file extensions to magic numbers for binary file type detection.

<a name="module_mimeTypeMap"></a>

## mimeTypeMap : <code>Object.&lt;string, string&gt;</code>
A map between file extensions and their corresponding MIME types.

<a name="module_Mimetics"></a>

## Mimetics
Mimetics - A library to determine the file type, MIME type and media type of a given file.
This library performs file type detection using magic numbers and text content analysis.
It also maps file extensions to their MIME types and media types.

**Version**: 0.0.1  
**Author**: Basedwon  
**License**: MIT  
**Example**  
```js
const Mimetics = require('mimetics')
const fs = require('fs')

const buffer = fs.readFileSync('example.jpg')
const fileInfo = Mimetics.parse(buffer)
console.log(fileInfo) // Logs { ext: 'jpg', mime: 'image/jpeg', media: 'image' }
```

* [Mimetics](#module_Mimetics)
    * [module.exports](#exp_module_Mimetics--module.exports) ⏏
        * [~Mimetics](#module_Mimetics--module.exports..Mimetics)
            * [new Mimetics(opts)](#new_module_Mimetics--module.exports..Mimetics_new)
            * [new Mimetics([opts])](#new_module_Mimetics--module.exports..Mimetics_new)
        * [~Mimetics](#module_Mimetics--module.exports..Mimetics)
            * [new Mimetics(opts)](#new_module_Mimetics--module.exports..Mimetics_new)
            * [new Mimetics([opts])](#new_module_Mimetics--module.exports..Mimetics_new)
        * [~setOptions(opts)](#module_Mimetics--module.exports..setOptions) ⇒ <code>Mimetics</code>
        * [~addMagicNumber(ext, magicNumber)](#module_Mimetics--module.exports..addMagicNumber)
        * [~addMimeType(ext, mimeType)](#module_Mimetics--module.exports..addMimeType)
        * [~addFileType(ext, regex)](#module_Mimetics--module.exports..addFileType)
        * [~addEdgeCase(specialExt, extList)](#module_Mimetics--module.exports..addEdgeCase)
        * [~parse(buffer)](#module_Mimetics--module.exports..parse) ⇒ <code>Object</code>
        * [~validateBuffer(buffer)](#module_Mimetics--module.exports..validateBuffer)
        * [~getFileType(buffer)](#module_Mimetics--module.exports..getFileType) ⇒ <code>string</code> \| <code>null</code>
        * [~getFileTypeFromMagicNumbers(buffer)](#module_Mimetics--module.exports..getFileTypeFromMagicNumbers) ⇒ <code>string</code> \| <code>null</code>
        * [~getFileTypeFromTextContent(buffer)](#module_Mimetics--module.exports..getFileTypeFromTextContent) ⇒ <code>string</code>
        * [~decodeBufferToString(buffer)](#module_Mimetics--module.exports..decodeBufferToString) ⇒ <code>string</code>
        * [~getMimeType(extension)](#module_Mimetics--module.exports..getMimeType) ⇒ <code>string</code>
        * [~getMediaType(extension)](#module_Mimetics--module.exports..getMediaType) ⇒ <code>string</code>

<a name="exp_module_Mimetics--module.exports"></a>

### module.exports ⏏
Export a Proxy wrapped Mimetics. When the exported object is called as a function, it
behaves like a Mimetics constructor and `parse` method combination. When a property is accessed,
it first checks if the property exists on the Mimetics class, and if not, it treats the property as
a property or method on an instance of the Mimetics class.

**Kind**: Exported member  
<a name="module_Mimetics--module.exports..Mimetics"></a>

#### module.exports~Mimetics
**Kind**: inner class of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| magicNumbers | <code>Object</code> | Map of file extensions to magic numbers. |
| mimeTypeMap | <code>Object</code> | Map of file extensions to MIME types. |
| fileTypeMap | <code>Object</code> | Map of file extensions to regular expression patterns for detecting file types from text content. |
| edgeCases | <code>Object</code> | Map of special file extensions to lists of normal file extensions. |


* [~Mimetics](#module_Mimetics--module.exports..Mimetics)
    * [new Mimetics(opts)](#new_module_Mimetics--module.exports..Mimetics_new)
    * [new Mimetics([opts])](#new_module_Mimetics--module.exports..Mimetics_new)

<a name="new_module_Mimetics--module.exports..Mimetics_new"></a>

##### new Mimetics(opts)
Class for file type and MIME type detection using magic numbers and content analysis.

**Returns**: <code>Mimetics</code> - Returns the Mimetics singleton instance.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | The options to customize the detection. The options object can have any of magic, mime, file, and edge properties, which should be a plain object and contain key-value pairs for that respective setting. |

<a name="new_module_Mimetics--module.exports..Mimetics_new"></a>

##### new Mimetics([opts])

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> | Optional initial configuration for the Mimetics instance. |

<a name="module_Mimetics--module.exports..Mimetics"></a>

#### module.exports~Mimetics
**Kind**: inner class of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  

* [~Mimetics](#module_Mimetics--module.exports..Mimetics)
    * [new Mimetics(opts)](#new_module_Mimetics--module.exports..Mimetics_new)
    * [new Mimetics([opts])](#new_module_Mimetics--module.exports..Mimetics_new)

<a name="new_module_Mimetics--module.exports..Mimetics_new"></a>

##### new Mimetics(opts)
Class for file type and MIME type detection using magic numbers and content analysis.

**Returns**: <code>Mimetics</code> - Returns the Mimetics singleton instance.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | The options to customize the detection. The options object can have any of magic, mime, file, and edge properties, which should be a plain object and contain key-value pairs for that respective setting. |

<a name="new_module_Mimetics--module.exports..Mimetics_new"></a>

##### new Mimetics([opts])

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> | Optional initial configuration for the Mimetics instance. |

<a name="module_Mimetics--module.exports..setOptions"></a>

#### module.exports~setOptions(opts) ⇒ <code>Mimetics</code>
Sets options for the instance, enabling the addition of custom magic numbers, MIME types, file types and edge cases.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>Mimetics</code> - Returns the Mimetics instance.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | The options to set. The options object can have any of magic, mime, file, and edge properties, which should be a plain object and contain key-value pairs for that respective setting. |

<a name="module_Mimetics--module.exports..addMagicNumber"></a>

#### module.exports~addMagicNumber(ext, magicNumber)
Adds a new magic number to the instance's magicNumbers map.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>string</code> | The file extension. |
| magicNumber | <code>Array.&lt;number&gt;</code> | The magic number. |

<a name="module_Mimetics--module.exports..addMimeType"></a>

#### module.exports~addMimeType(ext, mimeType)
Adds a new MIME type to the instance's mimeTypeMap.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>string</code> | The file extension. |
| mimeType | <code>string</code> | The MIME type. |

<a name="module_Mimetics--module.exports..addFileType"></a>

#### module.exports~addFileType(ext, regex)
Adds a new file type to the instance's fileTypeMap.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>string</code> | The file extension. |
| regex | <code>RegExp</code> | The regular expression pattern for the file type. |

<a name="module_Mimetics--module.exports..addEdgeCase"></a>

#### module.exports~addEdgeCase(specialExt, extList)
Adds a new edge case to the instance's edgeCases map.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| specialExt | <code>string</code> | The special file extension. |
| extList | <code>Array.&lt;string&gt;</code> | The list of normal file extensions. |

<a name="module_Mimetics--module.exports..parse"></a>

#### module.exports~parse(buffer) ⇒ <code>Object</code>
Parses a buffer and returns an object containing the file type, MIME type, and media type.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>Object</code> - Returns an object containing `ext`, `mime`, and `media`.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer to parse. |

<a name="module_Mimetics--module.exports..validateBuffer"></a>

#### module.exports~validateBuffer(buffer)
Validates a buffer.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Throws**:

- Will throw an error if the buffer is invalid.


| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer to validate. |

<a name="module_Mimetics--module.exports..getFileType"></a>

#### module.exports~getFileType(buffer) ⇒ <code>string</code> \| <code>null</code>
Gets the file type of a buffer.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> \| <code>null</code> - Returns the file type or null.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer. |

<a name="module_Mimetics--module.exports..getFileTypeFromMagicNumbers"></a>

#### module.exports~getFileTypeFromMagicNumbers(buffer) ⇒ <code>string</code> \| <code>null</code>
Gets the file type of a buffer using magic numbers.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> \| <code>null</code> - Returns the file type or null.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer. |

<a name="module_Mimetics--module.exports..getFileTypeFromTextContent"></a>

#### module.exports~getFileTypeFromTextContent(buffer) ⇒ <code>string</code>
Gets the file type of a buffer using its text content.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> - Returns the file type.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer. |

<a name="module_Mimetics--module.exports..decodeBufferToString"></a>

#### module.exports~decodeBufferToString(buffer) ⇒ <code>string</code>
Decodes a buffer to a string.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> - Returns the decoded string.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer. |

<a name="module_Mimetics--module.exports..getMimeType"></a>

#### module.exports~getMimeType(extension) ⇒ <code>string</code>
Gets the MIME type of a file extension.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> - Returns the MIME type.  
**Throws**:

- Will throw an error if the extension is invalid or unrecognized.


| Param | Type | Description |
| --- | --- | --- |
| extension | <code>string</code> | The file extension. |

<a name="module_Mimetics--module.exports..getMediaType"></a>

#### module.exports~getMediaType(extension) ⇒ <code>string</code>
Gets the media type of a file extension.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_Mimetics--module.exports)  
**Returns**: <code>string</code> - Returns the media type.  

| Param | Type | Description |
| --- | --- | --- |
| extension | <code>string</code> | The file extension. |

<a name="module_fileTypeMap"></a>

## fileTypeMap : <code>Object.&lt;string, RegExp&gt;</code>
A map between file types and their regular expression patterns for text content.

<a name="BUFFER_CHECK_SIZE"></a>

## BUFFER\_CHECK\_SIZE : <code>number</code>
Size of buffer to check for text content. The first BUFFER_CHECK_SIZE bytes are used to
check text content for determining file type.

**Kind**: global variable  
<a name="DEFAULT_FILE_TYPE"></a>

## DEFAULT\_FILE\_TYPE : <code>string</code>
Fallback file type extension if other methods don't find a match

**Kind**: global variable  
<a name="ERRORS"></a>

## ERRORS : <code>Object.&lt;string, (string\|function())&gt;</code>
Collection of error messages used in the library.

**Kind**: global variable  
