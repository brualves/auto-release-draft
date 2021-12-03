'use strict'

const github = require("@actions/github")
const core = require("@actions/core")



function getCreatedTag() {
    
    if ( github.context.eventName  != 'create') {
        core.info( `The event name was ${ github.context.eventName }`)
        return null
    }

    if (github.context.payload.ref_type != 'tag') {
        core.info( 'The created reference was a branch, not a tag') 
        return null
    }

    return github.context.payload.ref

}

module.exports = { getCreatedTag : getCreatedTag }