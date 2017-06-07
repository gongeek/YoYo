const Comments = require('./comments')

function Dal(config) {
  this.comments = new Comments(Object.assign({ collectionName: 'Comments' }, config))
}

module.exports = Dal
