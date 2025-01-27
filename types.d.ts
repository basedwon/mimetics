declare module "mimetics" {
  /**
   * Mimetics class for detecting file types based on magic bytes, patterns, and other properties.
   */
  /**
   * Represents the Mimetics class for file type detection.
   */
  class Mimetics {
    /**
     * Creates an instance of Mimetics.
     * @param customDefinitions - Optional array of custom file definitions.
     * @param scoringValues - Optional scoring values for different detection methods. Default is:
     * ```typescript
     * {
     *   magic: CONSTANTS.MAGIC_NUMBER_SCORE,
     *   content: 1,
     *   fileExtension: 1,
     *   zipHeader: CONSTANTS.ZIP_HEADER_SCORE,
     * }
     * ```
     */
    constructor(
      customDefinitions?: FileType[],
      scoringValues?: {
        magic: number;
        content: number;
        fileExtension: number;
        zipHeader: number;
      }
    );

    /**
     * Synchronously parses a buffer to identify the file type.
     * @param buffer - The file buffer to parse.
     * @param name - Optional file name, useful for detection.
     * @returns A file type object or null if no match is found.
     */
    parse(buffer: Uint8Array | ArrayBuffer, name?: string): FileType | null;

    /**
     * Synchronously parses a buffer and returns all matching file types.
     * @param buffer - The file buffer to parse.
     * @param name - Optional file name, useful for detection.
     * @returns Array of matching file types.
     */
    parseSync(buffer: Uint8Array | ArrayBuffer, name?: string): FileType[];

    /**
     * Asynchronously parses a buffer to identify the file type, with support for ZIP analysis.
     * @param buffer - The file buffer to parse.
     * @param name - Optional file name, useful for detection.
     * @returns A promise resolving to a file type object or null if no match is found.
     */
    parseAsync(
      buffer: Uint8Array | ArrayBuffer,
      name?: string
    ): Promise<FileType | null>;

    /**
     * Determines file type from a file name extension.
     * @param filePath - Path or name of the file.
     * @returns File type object based on the extension or null if not found.
     */
    fromName(filePath: string): FileType | null;

    /**
     * Asynchronously determines file type from a File object in a browser environment.
     * @param file - The file object to analyze.
     * @returns A promise resolving to a file type object.
     */
    fromFile(file: File): Promise<FileType | null>;

    /**
     * Adds custom file definitions.
     * @param {FileType | Array<FileType>} definitions - Array of custom definitions to add.
     */
    addDefinitions(definitions: FileType | FileType[]): void;
  }

  /**
   * File type definition object.
   */
  type FileType = {
    id?: symbol;
    tag: string;
    ext: string | string[];
    type: string;
    magic: number[] | number[][] | null;
    pattern: RegExp | null;
    mime: string;
    zipped?: boolean | string[];
  };

  /**
   * CONSTANTS used in Mimetics library.
   */
  export const CONSTANTS: {
    BUFFER_CHECK_SIZE: number;
    MAGIC_NUMBER_SCORE: number;
    ZIP_HEADER_SCORE: number;
  };

  /**
   * Error messages used in the Mimetics library.
   */
  export const ERRORS: {
    INVALID_BUFFER: string;
  };

  export default Mimetics;
}
