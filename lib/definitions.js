const MAGIC_BYTES = {
  ZIP: [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08],
  ],
  OFFICE: [0xd0, 0xcf, 0x11, 0xe0],
}

module.exports = [
  // Image Types
  { tag: 'image', type: 'jpeg',
    ext: ['jpg', 'jpeg'],
    mime: 'image/jpeg',
    magic: [0xff, 0xd8, 0xff],
    pattern: null,
  },
  { tag: 'image', type: 'png',
    ext: 'png',
    mime: 'image/png',
    magic: [0x89, 0x50, 0x4e, 0x47],
    pattern: null,
  },
  { tag: 'image', type: 'gif87a',
    ext: 'gif',
    mime: 'image/gif',
    magic: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    pattern: null,
  },
  { tag: 'image', type: 'gif89a',
    ext: 'gif',
    mime: 'image/gif',
    magic: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
    pattern: null,
  },
  { tag: 'image', type: 'tif',
    ext: ['tif', 'tiff'],
    mime: 'image/tiff',
    magic: [0x49, 0x49, 0x2a, 0x00], // Little endian
    pattern: null,
  },
  { tag: 'image', type: 'tif',
    ext: ['tif', 'tiff'],
    mime: 'image/tiff',
    magic: [0x4d, 0x4d, 0x00, 0x2a], // Big endian
    pattern: null,
  },
  { tag: 'image', type: 'bitmap',
    ext: 'bmp',
    mime: 'image/bmp',
    magic: [0x42, 0x4d],
    pattern: null,
  },
  { tag: 'image', type: 'icon',
    ext: 'ico',
    mime: 'image/x-icon',
    magic: [0x00, 0x00, 0x01, 0x00],
    pattern: null,
  },
  { tag: 'image', type: 'webp',
    ext: 'webp',
    mime: 'image/webp',
    magic: [0x52, 0x49, 0x46, 0x46, 0x57, 0x45, 0x42, 0x50], // RIFFWEBP
    pattern: null,
  },
  { tag: 'image', type: 'pdf',
    ext: 'pdf',
    mime: 'application/pdf',
    magic: [0x25, 0x50, 0x44, 0x46],
    pattern: null,
  },
  { tag: 'image', type: 'svg',
    ext: 'svg',
    mime: 'image/svg+xml',
    magic: null,
    pattern: /^\s*<\s*svg[^>]*>/i,
  },
  // Video Types
  { tag: 'video', type: 'mp4',
    ext: 'mp4',
    mime: 'video/mp4',
    magic: [0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70],
    pattern: null,
  },
  { tag: 'video', type: 'quicktime',
    ext: 'mov',
    mime: 'video/quicktime',
    magic: [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70],
    pattern: null,
  },
  { tag: 'video', type: 'avi',
    ext: 'avi',
    mime: 'video/x-msvideo',
    magic: [0x52, 0x49, 0x46, 0x46, 0x41, 0x56, 0x49, 0x20], // RIFFAVI 
    pattern: null,
  },
  { tag: 'video', type: 'mkv',
    ext: 'mkv',
    mime: 'video/x-matroska',
    magic: [0x1a, 0x45, 0xdf, 0xa3],
    pattern: null,
  },
  { tag: 'video', type: 'webm',
    ext: 'webm',
    mime: 'video/webm',
    magic: [0x1a, 0x45, 0xdf, 0xa3], // Same as MKV
    pattern: null,
  },
  { tag: 'video', type: 'flv',
    ext: 'flv',
    mime: 'video/x-flv',
    magic: [0x46, 0x4c, 0x56, 0x01],
    pattern: null,
  },
  // Audio Types
  { tag: 'audio', type: 'mp3',
    ext: 'mp3',
    mime: 'audio/mpeg',
    magic: [
      [0x49, 0x44, 0x33],
      [0xff, 0xfb],
      [0xff, 0xf3],
      [0xff, 0xf2],
    ],
    pattern: null,
  },
  { tag: 'audio', type: 'ogg',
    ext: 'ogg',
    mime: 'audio/ogg',
    magic: [0x4F, 0x67, 0x67, 0x53], // OggS
    pattern: null,
  },
  { tag: 'audio', type: 'wav',
    ext: 'wav',
    mime: 'audio/wav',
    magic: [0x52, 0x49, 0x46, 0x46, '*', '*', '*', '*', 0x57, 0x41, 0x56, 0x45],
    pattern: null,
  },
  // Compressed Types
  { tag: 'compressed', type: 'zip',
    ext: ['zip', 'epub'],
    mime: 'application/zip',
    zipped: true,
    magic: MAGIC_BYTES.ZIP,
    pattern: null,
  },
  { tag: 'compressed', type: 'rar',
    ext: 'rar',
    mime: 'application/x-rar-compressed',
    magic: [0x52, 0x61, 0x72, 0x21],
    pattern: null,
  },
  { tag: 'compressed', type: 'gzip',
    ext: 'gz',
    mime: 'application/gzip',
    magic: [0x1f, 0x8b],
    pattern: null,
  },
  { tag: 'compressed', type: '7zip',
    ext: '7z',
    mime: 'application/x-7z-compressed',
    magic: [0x37, 0x7a, 0xbc, 0xaf],
    pattern: null,
  },
  { tag: 'compressed', type: 'tar',
    ext: 'tar',
    mime: 'application/x-tar',
    magic: null, // TAR files can be identified by their file structure
    pattern: null,
  },
  // Microsoft Office Types
  { tag: 'office', type: 'word',
    ext: 'doc',
    mime: 'application/vnd.ms-office',
    magic: MAGIC_BYTES.OFFICE,
    pattern: null,
  },
  { tag: 'office', type: 'excel',
    ext: 'xls',
    mime: 'application/vnd.ms-office',
    magic: MAGIC_BYTES.OFFICE,
    pattern: null,
  },
  { tag: 'office', type: 'powerpoint',
    ext: 'ppt',
    mime: 'application/vnd.ms-office',
    magic: MAGIC_BYTES.OFFICE,
    pattern: null,
  },
  { tag: 'office', type: 'word',
    ext: 'docx',
    mime: 'application/vnd.openxmlformats-officedocument',
    zipped: [`[Content_Types].xml`, `word/document.xml`],
    magic: MAGIC_BYTES.ZIP,
    pattern: null,
  },
  { tag: 'office', type: 'excel',
    ext: 'xlsx',
    mime: 'application/vnd.openxmlformats-officedocument',
    zipped: [`[Content_Types].xml`, `xl/workbook.xml`],
    magic: MAGIC_BYTES.ZIP,
    pattern: null,
  },
  { tag: 'office', type: 'powerpoint',
    ext: 'pptx',
    mime: 'application/vnd.openxmlformats-officedocument',
    zipped: [`[Content_Types].xml`, `ppt/presentation.xml`],
    magic: MAGIC_BYTES.ZIP,
    pattern: null,
  },
  // Code
  { tag: 'code', type: 'html',
    ext: ['html', 'htm'],
    mime: 'text/html',
    magic: null,
    pattern: /^\s*(<!DOCTYPE\s+html|<html)/i,
  },
  { tag: 'code', type: 'shell',
    ext: 'sh',
    mime: 'application/x-sh',
    magic: null,
    pattern: /^\s*#\!/,
  },
  { tag: 'code', type: 'ruby',
    ext: 'rb',
    mime: 'text/x-ruby',
    magic: null,
    pattern: /^\s*(class|module|require)/i,
  },
  { tag: 'code', type: 'python',
    ext: 'py',
    mime: 'text/x-python',
    magic: null,
    pattern: /^\s*(def|class|import)/i,
  },
  { tag: 'code', type: 'java',
    ext: 'java',
    mime: 'text/x-java-source',
    magic: null,
    pattern: /^\s*(package|import)/i,
  },
  { tag: 'code', type: 'css',
    ext: 'css',
    mime: 'text/css',
    magic: null,
    pattern: null,
  },
  { tag: 'code', type: 'json',
    ext: 'json',
    mime: 'application/json',
    magic: null,
    pattern: /^\s*{\s*"name"/,
  },
  { tag: 'code', type: 'xml',
    ext: 'xml',
    mime: 'application/xml',
    magic: null,
    pattern: /^\s*(<?xml)/i,
  },
  { tag: 'code', type: 'csv',
    ext: 'csv',
    mime: 'text/csv',
    magic: null,
    pattern: null,
  },
  { tag: 'code', type: 'javascript',
    ext: 'js',
    mime: 'application/javascript',
    magic: null,
    pattern: /^\s*(import|const|let|var|function)/i,
  },
  { tag: 'code', type: 'php',
    ext: 'php',
    mime: 'application/x-httpd-php',
    magic: null,
    pattern: /^\s*<\?php/i,
  },
  { tag: 'code', type: 'yaml',
    ext: ['yml', 'yaml'],
    mime: 'application/x-yaml',
    magic: null,
    pattern: /^\s*---\s*$/i,
  },
  { tag: 'code', type: 'sql',
    ext: 'sql',
    mime: 'application/sql',
    magic: null,
    pattern: /^\s*(SELECT|FROM|INSERT\s+INTO|UPDATE|DELETE|CREATE\s+TABLE)/i,
  },
  { tag: 'code', type: 'go',
    ext: 'go',
    mime: 'text/x-go',
    magic: null,
    pattern: /^\s*(package|import|func|var|const)/i,
  },
  { tag: 'code', type: 'groovy',
    ext: 'groovy',
    mime: 'text/x-groovy',
    magic: null,
    pattern: /^\s*(class|def|if|else|for|while)/i,
  },
  { tag: 'code', type: 'kotlin',
    ext: ['kt', 'kts'],
    mime: 'text/x-kotlin',
    magic: null,
    pattern: /^\s*(fun|val|var|class|import)/i,
  },
  { tag: 'code', type: 'rust',
    ext: 'rs',
    mime: 'text/x-rust',
    magic: null,
    pattern: /^\s*(fn|struct|enum|impl|use)/i,
  },
  { tag: 'code', type: 'typescript',
    ext: 'ts',
    mime: 'text/x-typescript',
    magic: null,
    pattern: /^\s*(interface|type|function|const|let|var|import|export)/i,
  },
  { tag: 'code', type: 'swift',
    ext: 'swift',
    mime: 'text/x-swift',
    magic: null,
    pattern: /^\s*(@|\/\/)/,
  },
  { tag: 'code', type: 'perl',
    ext: 'pl',
    mime: 'text/x-perl',
    magic: null,
    pattern: /^\s*(use|package|my)/i,
  },
  { tag: 'code', type: 'c',
    ext: 'c',
    mime: 'text/x-csrc',
    magic: null,
    pattern: /^\s*(\/\*|\*\/|\*|#)/,
  },
  { tag: 'code', type: 'cpp',
    ext: 'cpp',
    mime: 'text/x-c++src',
    magic: null,
    pattern: /^\s*(\/\/|#)/,
  },
  { tag: 'code', type: 'csharp',
    ext: 'cs',
    mime: 'text/x-csharp',
    magic: null,
    pattern: /^\s*(public|private|class|import)/i,
  },
  { tag: 'code', type: 'visualbasic',
    ext: 'vb',
    mime: 'text/x-vb',
    magic: null,
    pattern: /^\s*(using|namespace|public)/i,
  },
  { tag: 'code', type: 'powershell',
    ext: 'ps',
    mime: 'application/x-powershell',
    magic: null,
    pattern: /^\s*%!/,
  },
  { tag: 'code', type: 'configuration',
    ext: 'conf',
    mime: 'text/plain',
    magic: null,
    pattern: /^\s*%\w+\s*=/,
  },
  { tag: 'code', type: 'ini',
    ext: 'ini',
    mime: 'text/plain',
    magic: null,
    pattern: /^\s*;\s*module\s*=/,
  },
  { tag: 'code', type: 'batch',
    ext: 'bat',
    mime: 'application/x-bat',
    magic: null,
    pattern: /^\s*#!/,
  },
  { tag: 'code', type: 'c-header',
    ext: 'h',
    mime: 'text/x-chdr',
    magic: null,
    pattern: /^\s*#\s*(include|define)/i,
  },
  { tag: 'code', type: 'pem',
    ext: 'pem',
    mime: 'application/x-pem-file',
    magic: null,
    pattern: /^\s*(BEGIN|END)/,
  },
  { tag: 'code', type: 'r',
    ext: 'r',
    mime: 'text/x-r-source',
    magic: null,
    pattern: /^\s*(library|function|if|else|for|while)/i,
  },
  // Text
  { tag: 'text', type: 'text',
    ext: 'txt',
    mime: 'text/plain',
    magic: null,
    pattern: null,
  },
  { tag: 'text', type: 'markdown',
    ext: 'md',
    mime: 'text/markdown',
    magic: null,
    pattern: /^\s*(#{1,6}\s+\w+|\*\s+\w+|-\s+\w+|\d+\.\s+\w+|\[.+\]\(http.+)/i,
  },
  { tag: 'text', type: 'latex',
    ext: 'tex',
    mime: 'application/x-latex',
    magic: null,
    pattern: /^\s*(\\documentclass|\\begin|\\end)/i,
  },
  { 
    tag: 'text', type: 'rtf',
    ext: 'rtf',
    mime: 'application/rtf',
    magic: [0x7B, 0x5C, 0x72, 0x74, 0x66], // ASCII for "{\rtf"
    pattern: /^\{\\rtf/i,
  },
]
