'use strict'

const t = require('tap')
const test = t.test
const plugin = require('../')
const Fastify = require('fastify')
const msgpack = require('@msgpack/msgpack')

test('serializer', t => {
    t.plan(1)
    const fastify = Fastify()

    fastify.register(plugin)

    fastify.get('/encode', (req, reply) => {
        reply.send({ hello: 'fastify-plugin' })
    })

    t.test('application/x-msgpack -> msgpack', t => {
        t.plan(3)
        fastify.inject({
            method: 'GET',
            url: '/encode',
            payload: {},
            headers: {
                accept: 'application/x-msgpack'
            }
        }, (err, res) => {
            t.error(err)
            t.strictSame(res.headers['content-type'], 'application/x-msgpack')
            t.strictSame(res.payload, "��hello�fastify-plugin")
        })
    })
})

test('serializer - default = application/json by fastify', t => {
    t.plan(1)
    const fastify = Fastify()

    fastify.register(plugin)

    fastify.get('/request', function (req, reply) {
        reply.send({ hello: 'world' })
    })

    t.test('no match -> json', t => {
        t.plan(4)

        fastify.inject({
            method: 'GET',
            url: '/request'
        }, (err, response) => {
            t.error(err)
            t.equal(response.statusCode, 200)
            t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
            t.same(response.json(), { hello: 'world' })
        })

    })
})