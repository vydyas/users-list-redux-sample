var webpackCfg = require('./../webpack.config.js')

// Set node environment to testing
process.env.NODE_ENV = 'test'

module.exports = function (config) {
  config.set({
    basePath: './',
    browsers: [ 'PhantomJS' ],
    files: [ 'loadTests.js' ],
    port: 8999,
    captureTimeout: 60000,
    frameworks: [ 'jasmine' ],
    singleRun: true,
    reporters: [ 'dots', 'coverage' ],
    preprocessors: { 'loadTests.js': [ 'webpack', 'sourcemap' ] },
    webpack: webpackCfg,
    webpackServer: { noInfo: true },
    coverageReporter: {
      dir: '../reports/coverage/',
      reporters: [ { type: 'html' } ]
    }
  })
}
