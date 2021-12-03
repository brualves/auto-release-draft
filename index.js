const core = require('@actions/core');

// most @actions toolkit packages have async methods
async function run() {
  try {

    core.setOutput( 'release-url', 'https://example.com')
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = { run : run }
