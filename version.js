'use strict'

const semver  = require("semver")

const version = {}

version.isSemVer = function isSemVer( version ) {
    
    return semver.valid( version ) !== null 
}

version.isPrerelease = function isPrerelease(version) {
    return semver.prerelease(version) !== null 
}


version.removePrefix = function removePrefix(version) {
    const parsedVersion = semver.valid( version )

    return parsedVersion ? parsedVersion : version 
}

module.exports = version

