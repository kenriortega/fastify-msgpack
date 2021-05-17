# Fastify-msgpack

Fastify and MessagePack, together at last. Uses @msgpack/msgpack by default.

## Functionality

Provides transparent middleware that can be used to support clients requesting Accept: application/msgpack from endpoints using res.json or sending Content-Type: application/msgpack to any endpoint. You can continue to use req.body and res.json and fastifyMsgpack will handle the conversion in the background using @msgpack/msgpack.

Installation
------------

```bash
$ npm install --save fastify-msgpack
// or
$ yarn add fastify-msgpack
```

Usage
-----

```javascript
const fastifyMsgpack = require("fastify-msgpack");

// ...
// custom plugin
fastify.register(fastifyMsgpack)
```

Usage in a simple app
---------------------

```javascript
'use strict'

const fastify = require('fastify')({
    logger: true
})

// custom plugin
fastify.register(require('./fastify-msgpack'))

fastify.post('/decode', (req, reply) => {
    // http POST http://localhost:5000/decode Accept:application/msgpack Content-Type:application/msgpack @msgpack\package-msgpack.dat

    const body = req.body
    return body
})
fastify.get('/encode', (req, reply) => {
    // http http://localhost:5000/encode Accept:application/msgpack

    reply.send({ hello: 'fastify-plugin' })
})

const start = async () => {
    try {
        await fastify.listen(5000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
```
