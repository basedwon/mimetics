## Classes

<dl>
<dt><a href="#Mimetics">Mimetics</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#CONSTANTS">CONSTANTS</a> : <code>Object</code></dt>
<dd><p>Collection of constants used in the Mimetics library.</p>
</dd>
<dt><a href="#ERRORS">ERRORS</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd><p>Collection of error messages used in the library.</p>
</dd>
</dl>

<a name="Mimetics"></a>

## Mimetics
**Kind**: global class  

* [Mimetics](#Mimetics)
    * [new Mimetics()](#new_Mimetics_new)
    * [.parse(buffer, name)](#Mimetics+parse) ⇒ <code>Object</code> \| <code>null</code>
    * [.parseSync(buffer, name)](#Mimetics+parseSync) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.parseAsync(buffer, name)](#Mimetics+parseAsync) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
    * [.magicMatch(magic, buffer)](#Mimetics+magicMatch) ⇒ <code>boolean</code>
    * [.detectByMagicNumber(buffer)](#Mimetics+detectByMagicNumber) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.sortMatches(matches)](#Mimetics+sortMatches) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.analyzeZipContents(buffer, matches)](#Mimetics+analyzeZipContents) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.sniffContent(buffer)](#Mimetics+sniffContent) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.decodeBufferToString(buffer)](#Mimetics+decodeBufferToString) ⇒ <code>string</code>
    * [.buildResponse(definition)](#Mimetics+buildResponse) ⇒ <code>Object</code> \| <code>null</code>
    * [.defaultResponse()](#Mimetics+defaultResponse) ⇒ <code>Object</code>
    * [.validateBuffer(buffer)](#Mimetics+validateBuffer)
    * [.parseFileName(filePath)](#Mimetics+parseFileName) ⇒ <code>Object</code>
    * [.fromName(filePath)](#Mimetics+fromName) ⇒ <code>Object</code>
    * [.getBufferFromFile(file)](#Mimetics+getBufferFromFile) ⇒ <code>Promise.&lt;Uint8Array&gt;</code>
    * [.fromFile(file)](#Mimetics+fromFile) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Mimetics_new"></a>

### new Mimetics()
Singleton instance of Mimetics

**Returns**: [<code>Mimetics</code>](#Mimetics) - - Singleton instance of Mimetics class  
<a name="Mimetics+parse"></a>

### mimetics.parse(buffer, name) ⇒ <code>Object</code> \| <code>null</code>
Parses the buffer synchronously and returns the first matching file type.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Object</code> \| <code>null</code> - - File type object or null if no match found.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer to parse. |
| name | <code>string</code> | Optional name of the file. |

<a name="Mimetics+parseSync"></a>

### mimetics.parseSync(buffer, name) ⇒ <code>Array.&lt;Object&gt;</code>
Parses the buffer and returns all matching file types.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - List of matching file types.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer to parse. |
| name | <code>string</code> | Optional name of the file. |

<a name="Mimetics+parseAsync"></a>

### mimetics.parseAsync(buffer, name) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Parses the buffer asynchronously, analyzing ZIP contents if necessary.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - - Promise resolving to the matching file type or null.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer to parse. |
| name | <code>string</code> | Optional name of the file. |

<a name="Mimetics+magicMatch"></a>

### mimetics.magicMatch(magic, buffer) ⇒ <code>boolean</code>
Matches a buffer against a specified magic byte sequence.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>boolean</code> - - True if magic bytes match, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| magic | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Expected magic byte(s). |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer to match against. |

<a name="Mimetics+detectByMagicNumber"></a>

### mimetics.detectByMagicNumber(buffer) ⇒ <code>Array.&lt;Object&gt;</code>
Detects file type based on magic numbers within the buffer.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Array of matching file definitions with scores.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer. |

<a name="Mimetics+sortMatches"></a>

### mimetics.sortMatches(matches) ⇒ <code>Array.&lt;Object&gt;</code>
Sorts matches by their score in descending order.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Sorted matches.  

| Param | Type | Description |
| --- | --- | --- |
| matches | <code>Array.&lt;Object&gt;</code> | List of matches to sort. |

<a name="Mimetics+analyzeZipContents"></a>

### mimetics.analyzeZipContents(buffer, matches) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Analyzes ZIP contents for matching definitions based on required internal files.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - Array of verified matches with updated scores.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The ZIP file buffer. |
| matches | <code>Array.&lt;Object&gt;</code> | List of initial matches to verify. |

<a name="Mimetics+sniffContent"></a>

### mimetics.sniffContent(buffer) ⇒ <code>Array.&lt;Object&gt;</code>
Attempts to match file type based on content patterns.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Array of file type definitions that match by content pattern.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer. |

<a name="Mimetics+decodeBufferToString"></a>

### mimetics.decodeBufferToString(buffer) ⇒ <code>string</code>
Decodes a buffer into a string for pattern matching.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>string</code> - - Decoded string content.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The file buffer. |

<a name="Mimetics+buildResponse"></a>

### mimetics.buildResponse(definition) ⇒ <code>Object</code> \| <code>null</code>
Constructs a response object based on a file type definition.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Object</code> \| <code>null</code> - - Constructed response object, or null if no definition provided.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>Object</code> | The file type definition. |

<a name="Mimetics+defaultResponse"></a>

### mimetics.defaultResponse() ⇒ <code>Object</code>
Returns a default response, typically for unknown or generic text file types.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Object</code> - - Default response object.  
<a name="Mimetics+validateBuffer"></a>

### mimetics.validateBuffer(buffer)
Validates the provided buffer to ensure it’s a valid file buffer.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Throws**:

- <code>Error</code> - Throws if buffer is invalid.


| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Uint8Array</code> \| <code>ArrayBuffer</code> | The buffer to validate. |

<a name="Mimetics+parseFileName"></a>

### mimetics.parseFileName(filePath) ⇒ <code>Object</code>
Parses a file name to extract metadata like extension and slug.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Object</code> - - Object with parsed name, slug, path, and extension.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path or name of the file. |

<a name="Mimetics+fromName"></a>

### mimetics.fromName(filePath) ⇒ <code>Object</code>
Determines file type from file name extension.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Object</code> - - File type definition or default response if not found.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path or name of the file. |

<a name="Mimetics+getBufferFromFile"></a>

### mimetics.getBufferFromFile(file) ⇒ <code>Promise.&lt;Uint8Array&gt;</code>
Converts a file to a buffer asynchronously.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Promise.&lt;Uint8Array&gt;</code> - - Promise resolving to the file buffer.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | The file object to read. |

<a name="Mimetics+fromFile"></a>

### mimetics.fromFile(file) ⇒ <code>Promise.&lt;Object&gt;</code>
Determines file type from a file object by reading its buffer and name.

**Kind**: instance method of [<code>Mimetics</code>](#Mimetics)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Promise resolving to file type definition or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | The file object to analyze. |

<a name="CONSTANTS"></a>

## CONSTANTS : <code>Object</code>
Collection of constants used in the Mimetics library.

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BUFFER_CHECK_SIZE | <code>number</code> | Number of bytes to check in a buffer for type detection. |
| MAGIC_NUMBER_SCORE | <code>number</code> | Score assigned to a file type when a magic number match is found. |
| ZIP_HEADER_SCORE | <code>number</code> | Additional score given to ZIP files that contain specific internal files. |

<a name="ERRORS"></a>

## ERRORS : <code>Object.&lt;string, string&gt;</code>
Collection of error messages used in the library.

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| INVALID_BUFFER | <code>string</code> | Error message for invalid buffer input. |

