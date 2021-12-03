const core = require('@actions/core')
const event  = require('./event.js')

// most @actions toolkit packages have async methods
async function run() {
  try {

    const tag = event.getCreatedTag()

    core.setOutput( 'release-url', 'https://example.com')
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = { run : run }
