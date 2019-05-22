module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  globals: {
    OAuth2: true,
    SpreadsheetApp: true,
    HtmlService: true,
    Session: true,
    PropertiesService: true,
    UrlFetchApp: true,
    Logger: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
