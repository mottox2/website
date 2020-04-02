require('ts-node').register()

exports.onCreateNode = require('./gatsby/onCreateNode').onCreateNode
exports.createPages = require('./gatsby/createPages').createPages
