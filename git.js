'use strict'

const exec = require('@actions/exec')
const core = require('@actions/core')

const git = {}


git.getChangesIntroducedByTag = async function (tag) {
    const previousTag =  await git.getPreviousVersionTag( tag )

    return previousTag  ? git.getCommitMessagesBetween( previousTag , tag ) : git.getCommitMessagesFrom( tag )
}


git.getPreviousVersionTag = async function  getPreviousVersionTag (tag) {
    let previousTag = ''

    const options = { 
        listeners : {
            stdout : (data) =>{
                previousTag += data.toString()
            }
        },
        silent : true,
        ignoreReturnCode : true
    }

    const exitCode = await exec(
        'git',
        [
            'describe',
            '--match', 'v[0-9]*',
            '--abbrev=0',
            '--first-parent',
            `${tag}^` 
        ],
        options
    )

    core.debug()
    return exitCode === 0 ? previousTag.trim() : null
}


git.getCommitMessagesBetween = async function (firstTag , secondTag ) {
    let commitMessages = ''

    const options = { 
        listeners : {
            stdout : (data) =>{
                commitMessages += data.toString()
            }
        },
        silent : true,
        ignoreReturnCode : true
    }

    await exec(
        'git',
        [ 'log',
        '--format=%s', 
        `${firstTag}..${secondTag}`
        ],
        options
    )

    core.debug(`The commit messages between ${firstTag} and ${secondTag} are: \n ${commitMessages}`) 

    return commitMessages.trim()
}

git.getCommitMessagesFrom = async function ( tag ) {
    let commitMessages = ''

    const options = { 
        listeners : {
            stdout : (data) =>{
                commitMessages += data.toString()
            }
        },
        silent : true,
        ignoreReturnCode : true
    }

    await exec(
        'git',
        [ 'log',
        '--format=%s', 
        `${tag}`
        ],
        options
    )

    core.debug(`The commit messages from ${tag} are: \n ${commitMessages}`) 

    return commitMessages.trim()
}


module.exports = git