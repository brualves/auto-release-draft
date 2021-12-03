const core = require('@actions/core')
const event  = require('./event.js');
const version = require('./version.js');

// most @actions toolkit packages have async methods
async function run() {
  try {

    const tag = event.getCreatedTag()

    if ( !version.isSemVer( tag ) ) {
       //todo
    }
    core.setOutput( 'release-url', 'https://example.com')
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
