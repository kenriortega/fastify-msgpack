'use strict'

const fp = require('fastify-plugin')
const msgpack = require('@msgpack/msgpack')

/**
 *
 * @param {FastifyInstance} fastify
 * @param {*} options
 * @param {*} next
 */
function fastifyMsgpack (fastify, options, next) {
  fastify.register(require('fastify-accepts-serializer'), {
    serializers: [
      {
        regex: /^application\/x-msgpack$/,
        serializer: body => Buffer.from(msgpack.encode(body))
      }
    ],
    default: 'application/json'
  })

  fastify.addContentTypeParser('application/x-msgpack', {
    parseAs: 'buffer'
  }, (req, body, done) => {
    try {
      const res = msgpack.decode(body)
      return res
    } catch (err) {
      done(err)
    }
  })

  next()
}

module.exports = fp(fastifyMsgpack, {
  fastify: '3.x',
  name: 'fastify-msgpack'
})
