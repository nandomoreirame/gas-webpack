/** @module Helpers */

/**
 * @desc TODO DESCRIPTION
 * @param {string} file
 * @returns {string} TODO RETURNS DESCRIPTION
 * @since v1.0.0
 */
export const include = file =>
  HtmlService
    .createHtmlOutputFromFile(file)
    .getContent()
