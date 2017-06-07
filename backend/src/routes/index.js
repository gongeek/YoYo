const { appendUniqueName } = require('../utils')
const CONFIG = require('../../config.json')

const appendModFlag = (comment) => {
  if (comment.user === CONFIG.adminEmail) {
    return Object.assign({ mod: true }, comment)
  }

  return Object.assign({ mod: false }, comment)
}

module.exports = [
  {
    path: '/health',
    method: 'GET',
    handler: async (ctx) => {
      ctx.body = 'OK'
    }
  },
  {
    path: '/comments',
    method: 'GET',
    handler: async (ctx, dal) => {
      const query = ctx.query
      const comments = await dal.find(query)
      ctx.body = appendUniqueName(comments).map(appendModFlag)
    }
  },
  {
    path: '/comments',
    method: 'POST',
    handler: async (ctx, dal, hooks) => {
      const { user, uri, text, parents } = ctx.request.body

      let error = null
      if (parents && parents.length > 0) {
        for (const parent of parents) {
          try {
            await dal.create({
              user,
              uri,
              text,
              parent,
              date: (new Date()).toISOString()
            }, hooks)
          } catch (e) {
            error = e
          }
        }
      } else {
        try {
          await dal.create({
            user,
            uri,
            text,
            date: (new Date()).toISOString()
          }, hooks)
        } catch (e) {
          error = e
        }
      }

      if (error === null) {
        ctx.status = 201
      } else {
        ctx.status = 500
        ctx.message = `comment created met some errors: ${error}`
      }
    }
  },
  {
    path: '/admin/login',
    method: 'POST',
    handler: async (ctx) => {
    }
  },
  {
    path: '/admin/comments',
    method: 'GET',
    handler: async (ctx, dal) => {
      const query = ctx.query
      const comments = await dal.queryWithUri(query)
      ctx.body = comments
    }
  },
  {
    path: '/admin/comments/:id',
    method: 'DELETE',
    handler: async (ctx, dal) => {
      const id = ctx.params.id
      await dal.deleteOne(id)
      ctx.status = 204
    }
  }
]
