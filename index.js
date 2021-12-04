const core = require('@actions/core')
const event  = require('./event.js');
const version = require('./version.js');
const git = require('./git.js');
const github = require('./github.js');

// most @actions toolkit packages have async methods
async function run() {
  try {

    const token = core.getInput('repo-token')
    const tag = event.getCreatedTag()
    let releaseURL = ''
    
    if ( tag && !version.isSemVer( tag ) ) {
       const changelog = await git.getChangesIntroducedByTag( tag )
       releaseURL = await github.createDraftRelease( token, tag, changelog )
    }
    
    core.setOutput( 'release-url', releaseURL )

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
