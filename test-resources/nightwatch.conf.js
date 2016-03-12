// nightwatch.conf.js

var nightwatchCucumber = require('nightwatch-cucumber')({
  /* configuration */
})

module.exports = {
  // "src_folders": [ "test-resources/e2e" ],
  "src_folders":  [nightwatchCucumber],
  "output_folder": "reports",
  "selenium": {
    "start_process": true,
    "log_path": "./",
    "server_path": "node_modules/selenium-standalone/.selenium/selenium-server/2.53.1-server.jar",
    "cli_args": {
      "webdriver.chrome.driver": "node_modules/selenium-standalone/.selenium/chromedriver/2.22-x64-chromedriver"
    }
  },
  "test_settings": {
    "default": { "desiredCapabilities": { "browserName": "chrome" } }
  }
}
