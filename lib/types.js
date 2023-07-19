/**
 * A map between file types and their regular expression patterns for text content.
 * @type {Object.<string, RegExp>}
 * @module fileTypeMap
 */
module.exports = {
  'php': /^\s*<\?php/i,
  'js': /^\s*(import|const|let|var|function)/i,
  'html': /^\s*(<!DOCTYPE\s+html|<html)/i,
  'sh': /^\s*#\!/,
  'rb': /^\s*(class|module|require)/i,
  'py': /^\s*(def|class|import)/i,
  'java': /^\s*(package|import)/i,
  'pl': /^\s*(use|package|my)/i,
  'xml': /^\s*(<?xml)/i,
  'c': /^\s*(\/\*|\*\/|\*|#)/,
  'cpp': /^\s*(\/\/|#)/,
  'cs': /^\s*(public|private|class|import)/i,
  'vb': /^\s*(using|namespace|public)/i,
  'swift': /^\s*(@|\/\/)/,
  'json': /^\s*{\s*"name"/,
  'pem': /^\s*(BEGIN|END)/,
  'ps': /^\s*%!/,
  'conf': /^\s*%\w+\s*=/,
  'ini': /^\s*;\s*module\s*=/,
  'bat': /^\s*#!/,
  'h': /^\s*#\s*(include|define)/i,
  'md': /^\s*(#{1,6}\s+\w+|\*\s+\w+|-\s+\w+|\d+\.\s+\w+|\[.+\]\(http.+)/i,
  'yml': /^\s*---\s*$/i,
  'sql': /^\s*(SELECT|FROM|INSERT\s+INTO|UPDATE|DELETE|CREATE\s+TABLE)/i,
  'tex': /^\s*(\\documentclass|\\begin|\\end)/i,
  'r': /^\s*(library|function|if|else|for|while)/i,
  'go': /^\s*(package|import|func|var|const)/i,
  'groovy': /^\s*(class|def|if|else|for|while)/i,
  'kt': /^\s*(fun|val|var|class|import)/i,
  'rs': /^\s*(fn|struct|enum|impl|use)/i,
  'ts': /^\s*(interface|type|function|const|let|var|import|export)/i,
}
