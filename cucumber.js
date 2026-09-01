module.exports = {
  default: {
    language: 'pt',
    require: [
      'src/e2e/support/**/*.ts',
      'src/e2e/steps/**/*.ts'
    ],
    paths: ['src/e2e/features/**/*.feature'],
    format: [
      'summary',
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};