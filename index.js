const core = require('@actions/core')
const event  = require('./event.js');
const version = require('./version.js');
const git = require('./git.js');

// most @actions toolkit packages have async methods
async function run() {
  try {

    const tag = event.getCreatedTag()

    if ( tag && !version.isSemVer( tag ) ) {
       const changelog = await git.getChangesIntroducedByTag( tag )
    }
    core.setOutput( 'release-url', 'https://example.com')
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
