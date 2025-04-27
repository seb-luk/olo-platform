/**
 * Defines common file or content types, particularly focusing on text-based formats
 * relevant within the OLO platform.
 *
 * These values might be used to indicate the format of textual content or files,
 * distinguishing between plain text, markup languages, and specific olo formats.
 */
export enum FileType {
  /**
   * olo rich text format, a specific structured format for rich text content
   * within the OLO ecosystem.
   */
  ort = 'OloRichText',

  /**
   * Encoded version of  olo rich text.
   * This might imply a serialized or otherwise processed form of `ort`.
   */
  orte = 'OloRichTextEncoded',

  /**
   * Standard HyperText Markup Language (HTML) format.
   */
  html = 'HyperTextMarkupLanguage',

  /**
   * Simple, unformatted plain text without any specific markup or structure.
   */
  plain = 'PlainText',

  /**
   * Text formatted using Markdown syntax, a lightweight markup language.
   */
  markdown = 'MarkDown',
}
