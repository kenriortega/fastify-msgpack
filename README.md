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